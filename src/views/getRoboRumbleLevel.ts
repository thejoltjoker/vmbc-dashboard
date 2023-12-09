const getRoboRumbleLevel = (level: number) => {
  switch (level) {
    case 1:
      return 'Normal'
    case 2:
      return 'Hard'
    case 3:
      return 'Expert'
    case 4:
      return 'Master'
    case 5:
      return 'Insane'
    case 6:
      return 'Insane II'
    case 7:
      return 'Insane III'
    case 8:
      return 'Insane IV'
    case 9:
      return 'Insane V'
    case 10:
      return 'Insane VI'
    default:
      return 'Normal'
  }
}
