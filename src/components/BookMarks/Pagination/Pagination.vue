<template>
  <div>
    <ul class="pagination">
      <li class="pagination-item">
        <button
          type="button"
          @click="onClickFirstPage"
          class="first-last"
          :disabled="isInFirstPage"
          aria-label="Go to first page"
        >
          {{ screenWidth ? '<<' : 'Fast Page' }}
        </button>
      </li>

      <li class="pagination-item">
        <button
          type="button"
          @click="onClickPreviousPage"
          :disabled="isInFirstPage"
          aria-label="Go to previous page"
          class="next-prev"
        >
          &lt;
        </button>
      </li>

      <li v-for="(page, index) in pages" :key="index" class="pagination-item">
        <button
          type="button"
          @click="onClickPage(page.name)"
          :disabled="page.isDisabled"
          :class="{ active: isPageActive(page.name), 'pag-button': true }"
          :aria-label="`Go to page number ${page.name}`"
        >
          {{ page.name }}
        </button>
      </li>

      <li class="pagination-item">
        <button
          class="next-prev"
          type="button"
          @click="onClickNextPage"
          :disabled="isInLastPage"
          aria-label="Go to next page"
        >
          >
        </button>
      </li>

      <li class="pagination-item">
        <button
          type="button"
          class="first-last"
          @click="onClickLastPage"
          :disabled="isInLastPage"
          aria-label="Go to last page"
        >
          {{ screenWidth ? '>>' : 'Last Page' }}
        </button>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { computed } from 'vue';

const emit = defineEmits(['pagechanged'])

const props = defineProps({
  maxVisibleButtons: {
    type: Number,
    required: false,
    default: 3
  },
  totalPages: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  perPage: {
    type: Number,
    required: true
  },
  currentPage: {
    type: Number,
    required: true
  }
})

const startPage = computed(() => {
  if (props.currentPage <= Math.floor(props.maxVisibleButtons / 2) + 1) {
    return 1
  }

  if (props.currentPage >= props.totalPages - Math.floor(props.maxVisibleButtons / 2)) {
    return props.totalPages - props.maxVisibleButtons + 1
  }

  return props.currentPage - Math.floor(props.maxVisibleButtons / 2)
})

const endPage = computed(() => {
  if (startPage.value + props.maxVisibleButtons - 1 <= props.totalPages) {
    return Math.min(startPage.value + props.maxVisibleButtons - 1, props.totalPages)
  }
  return props.totalPages
})

const pages = computed(() => {
  const range = []
  for (let i = startPage.value; i <= endPage.value; i += 1) {
    range.push({
      name: i,
      isDisabled: i === props.currentPage
    })
  }

  return range
})

const isInFirstPage = computed(() => {
  return props.currentPage === 1
})

const isInLastPage = computed(() => {
  return props.currentPage === props.totalPages
})

const screenWidth = computed(() => {
  return screen.width < 424
     
})


function onClickFirstPage() {
  emit('pagechanged', 1)
}

function onClickPreviousPage() {
  emit('pagechanged', props.currentPage - 1)
}

function onClickPage(page) {
  emit('pagechanged', page)
}

function onClickNextPage() {
  emit('pagechanged', props.currentPage + 1)
}

function onClickLastPage() {
  emit('pagechanged', props.totalPages)
}

function isPageActive(page) {
  return props.currentPage === page
}

</script>
<style scoped>
.pagination {
  list-style-type: none;
}

.pagination-item {
  display: inline-block;
  margin: 0 5px;
}

.active {
  background-color: #4aae9b;
  color: #ffffff;
}

button {
  /* background-color: #0195ff78 !important; */
  color: white !important;
  border: none;
  cursor: pointer;
}

.pag-button {
  padding: 0.5rem 0.8rem;
  border-radius: 2px;
}

.next-prev {
  padding: 0.3rem 0.8rem;
  border-radius: 2px;
  background-color: #0195ff78;
  color: white !important;
  border: none;
}

.first-last {
  padding: 0.2rem 0.8rem;
  border-radius: 2px;
  background-color: #0195ff78;
  color: white !important;
  border: none;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

@media screen and (max-width: 424px) {
  .pagination-item {
    display: inline-block;
    margin: 0 7px;
  }
}
</style>
