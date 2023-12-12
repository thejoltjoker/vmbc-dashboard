<script setup lang="ts">
import { ref, computed } from 'vue'
import { sortBy } from 'lodash'

import ListItemBase from '@/components/lists/ListItemBase.vue'
import IconSort from '@/components/icons/IconSort.vue'
import type { ListHeaderField, ListItem } from '@/models/list.model'
import _ from 'lodash'

const props = defineProps<{
  fields: ListHeaderField[]
  listItems: ListItem[]
}>()

const sortColumn = ref<string>('lastPlayed')
const sortDirection = ref<'asc' | 'desc'>('desc')

// Use a computed property to handle sorting
const sortedItems = computed(() => {
  let sorted = props.listItems

  sorted = sortBy(props.listItems, [(listItem) => _.get(listItem, sortColumn.value)])

  if (sortDirection.value == 'asc') {
    return sorted
  } else {
    return sorted.reverse()
  }
})

const sort = (column: string) => {
  if (sortColumn.value === column) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortColumn.value = column
    sortDirection.value = 'asc'
  }
}
</script>

<template>
  <div :class="`grid grid-cols-${fields.length} p-2 sm:p-3`">
    <template v-for="field in fields" :key="field.id">
      <div class="inline-flex items-center cursor-pointer">
        {{ field.title }}
        <span v-if="field.sortable" class="w-3 h-3">
          <IconSort class="w-3 h-3 opacity-50 ms-0.5" />
        </span>
      </div>
    </template>
  </div>

  <ul>
    <ListItemBase
      v-for="item of sortedItems"
      :key="item.id"
      :fields="item.fields"
      :img="item.img"
      :link="item.link"
    />
  </ul>
</template>
