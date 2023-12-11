import 'dotenv/config'
import cron from 'node-cron'
import axios from 'axios'
import mongoose from 'mongoose'
import { parseISO } from 'date-fns'
import { ClubModel, Club } from './src/models/Club'
import { PlayerModel, Player } from './src/models/Player'
import { BattleLogModel, BattleLog } from './src/models/BattleLog'
import { BattleModel } from './src/models/Battle'
import { MemberModel } from './src/models/Member'

// Log the external IP address to determine Brawl Stars api key
axios
  .get('https://api.ipify.me')
  .then((response) => console.log('IP address:', response.data))
  .catch((error) => {
    console.error('Error retrieving external IP address:', error.message)
  })

const winRate = (battleLogs: BattleLog[]): number => {
  // Map battles to an array of boolean values indicating victory or top 3 rank
  const results = battleLogs.map((battleLog) =>
    battleLog.battle.result === 'victory' || (battleLog.battle.rank && battleLog.battle.rank <= 3)
      ? true
      : false
  )
  // Calculate win rate by counting true values and dividing by total battles
  const winRateResponse = results.filter(Boolean).length / battleLogs.length

  return winRateResponse
}

const lastBattle = (battleLogs: BattleLog[]): BattleLog => {
  // Use reduce to find the battle with the latest battle time
  return battleLogs.reduce(
    (prev, current) => (prev.battleTime > current.battleTime ? prev : current),
    battleLogs[0]
  )
}
interface BrawlerWinRateAggregation {
  _id: string
  brawlerId: string
  totalWins: number
  totalBattles: number
  winRate: number
}
const getBrawlerBattleInfo = async (playerTag: string): Promise<BrawlerWinRateAggregation[]> => {
  const pipeline = [
    {
      $match: {
        playerTag: playerTag
      }
    },
    {
      $group: {
        _id: '$brawlerId',
        totalWins: {
          $sum: {
            $cond: [
              {
                $eq: ['$win', true]
              },
              1,
              0
            ]
          }
        },
        totalBattles: {
          $sum: 1
        }
      }
    },
    {
      $project: {
        brawlerId: '$_id',
        totalWins: '$totalWins',
        totalBattles: '$totalBattles',
        winRate: {
          $divide: ['$totalWins', '$totalBattles']
        }
      }
    }
  ]
  return await BattleModel.aggregate<BrawlerWinRateAggregation>(pipeline)
}
let prefix = ''
// Run every 15 minutes
cron.schedule(process.env.CRON_STRING || '*/15 * * * *', async () => {
  prefix = 'DB'
  try {
    // Define your MongoDB connection URL
    const mongoURL = process.env.MONGO_URL as string

    // Connect to MongoDB
    console.log(`[${prefix}] Connecting to DB`)
    await mongoose.connect(mongoURL)
  } catch (error) {
    console.error(error)
  }
  // const start = async () => {
  try {
    prefix = 'club'
    // Get club data
    const clubData: Club = await getClub()

    // Store data in MongoDB
    console.log(`[${prefix}] Storing club ${clubData.name} (${clubData.tag})`)
    await ClubModel.updateOne({ _id: clubData.tag }, clubData, {
      upsert: true
    })

    // Delete all non club players
    const memberTags = clubData.members.map((member) => member.tag)
    console.log(`[${prefix}] Deleting non member players`)
    await PlayerModel.deleteMany({
      tag: {
        $nin: memberTags
      }
    })
    // Delete all non club players
    console.log(`[${prefix}] Deleting non members`)
    await MemberModel.deleteMany({
      tag: {
        $nin: memberTags
      }
    })

    for (const member of clubData.members) {
      prefix = `Player: ${member.tag}`
      const player: Player = await getPlayer(member.tag)

      console.log(`[${prefix}] Storing player ${player.name} (${player.tag})`)

      // Get brawler win rates
      console.log(`[${prefix}] Storing brawler battle information`)
      const battleInfo = await getBrawlerBattleInfo(member.tag)

      player.brawlers.forEach((brawler) => {
        const data = battleInfo.find((item) => item.brawlerId == `${brawler.id}`)
        brawler.winRate = data?.winRate
        brawler.totalWins = data?.totalWins
        brawler.totalBattles = data?.totalBattles
      })

      await PlayerModel.updateOne({ _id: player.tag }, player, {
        upsert: true
      })

      // Get battle logs for player
      const battleLogs: BattleLog[] = await getBattleLogs(member.tag)

      console.log(`[${prefix}] Storing battle logs`)
      battleLogs.forEach(async (battleLog: BattleLog) => {
        const battleLogId = battleTimeToUnix(battleLog.battleTime as string)
        battleLog.battleTime = parseISO(battleLog.battleTime as string)

        await BattleLogModel.updateOne({ _id: battleLogId }, battleLog, {
          upsert: true
        })

        // Store battle in player battles
        const battleId = `${member.tag}_${battleLogId}`
        const battleData = new BattleModel({
          _id: battleId,
          playerTag: member.tag,
          battleLogId: battleLogId,
          battleTime: battleLog.battleTime,
          brawlerId: getBrawlerIdFromBattleLog(member.tag, battleLog),
          eventId: battleLog.event.id,
          clubLeague: null, //Because no more club league
          megaPig: isMegaPig(battleLog),
          win: isBattleLogWin(battleLog),
          starPlayer: isStarPlayer(member.tag, battleLog)
        })

        await BattleModel.updateOne({ _id: battleId }, battleData, {
          upsert: true
        })
      })

      // Store members with win rate and last played battle for dashboard
      const memberData = new MemberModel({
        _id: member.tag,
        winRate: winRate(battleLogs),
        lastPlayed: lastBattle(battleLogs).battleTime,
        ...member
      })
      console.log(`[${prefix}] Storing member`)
      await MemberModel.updateOne({ _id: member.tag }, memberData, {
        upsert: true
      })
    }

    // Disconnect from MongoDB after operations
  } catch (error: any) {
    console.error('Error:', error.message)
  }
  if (mongoose.connection.readyState == 1) {
    setTimeout(async () => {
      prefix = 'DB'
      console.log(`[${prefix}] Disconnecting from DB`)
      await mongoose.disconnect()
    }, 10000)
  }
})
// };
// start();

function getBrawlerIdFromBattleLog(tag: string, battleLog: BattleLog): number {
  let brawlerId = 0

  if (battleLog.battle.teams) {
    // Iterate through teams in the battle data
    for (const team of battleLog.battle.teams) {
      // Iterate through players in each team
      for (const player of team) {
        // Check if the player's tag matches the tagToFind
        if (player.tag === tag) {
          // Return the brawler information if found
          if (player.brawler) {
            brawlerId = player.brawler?.id
          } else if (player.brawlers) {
            brawlerId = player.brawlers[0].id
          }
        }
      }
    }
  } else if (battleLog.battle.players) {
    // Iterate through teams in the battle data
    for (const player of battleLog.battle.players) {
      // Check if the player's tag matches the tagToFind
      if (player.tag === tag) {
        // Return the brawler information if found
        if (player.brawler) {
          brawlerId = player.brawler.id
        } else if (player.brawlers) {
          brawlerId = player.brawlers[0].id
        }
      }
    }
  }

  // Return null if the tag is not found in the battle data
  return brawlerId
}
function isBattleLogWin(battleLog: BattleLog) {
  let result = false
  if (
    battleLog.battle.mode == 'duoShowdown' &&
    battleLog.battle.rank &&
    battleLog.battle.rank <= 2
  ) {
    result = true
  } else if (
    battleLog.battle.mode == 'soloShowdown' &&
    battleLog.battle.rank &&
    battleLog.battle.rank <= 3
  ) {
    result = true
  } else if (battleLog.battle.result && battleLog.battle.result == 'victory') {
    result = true
  }

  return result
}
function isMegaPig(battleLog: BattleLog) {
  return battleLog.battle.type == 'ranked' && !battleLog.battle.trophyChange ? true : false
}
function isStarPlayer(tag: string, battleLog: BattleLog) {
  if (battleLog.battle.starPlayer && battleLog.battle.starPlayer.tag == tag) {
    return true
  }

  return false
}

function battleTimeToUnix(battleTime: string): number {
  const parsedDate = parseISO(battleTime)
  const unixTimestamp = Math.floor(parsedDate.getTime() / 1000)

  return unixTimestamp
}

async function getClub(): Promise<Club> {
  const response = await axios.get('https://api.brawlstars.com/v1/clubs/%23289VC0U29', {
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`
    }
  })

  const data = response.data
  return data
}

async function getPlayer(tag: string): Promise<Player> {
  const response = await axios.get(
    `https://api.brawlstars.com/v1/players/${encodeURIComponent(tag)}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`
      }
    }
  )

  const data = response.data
  return data
}
async function getBattleLogs(tag: string): Promise<BattleLog[]> {
  const response = await axios.get(
    `https://api.brawlstars.com/v1/players/${encodeURIComponent(tag)}/battlelog`,
    {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`
      }
    }
  )

  const data = response.data.items
  return data
}
