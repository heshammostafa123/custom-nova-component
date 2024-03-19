<template>
  <nav
    v-if="hasItems"
    class="text-gray-500 font-semibold"
    aria-label="breadcrumb"
  >
    <ol>
      <li class="inline-block breadcrumb-title">{{breadcrumbs[1].name}}</li>
      <li
        v-for="(item, index) in breadcrumbs" :key="index"
        class="inline-block"
        v-bind="{
          'aria-current': index === breadcrumbs.length - 1 ? 'page' : null,
        }"
      >
        <div class="flex items-center">
          <Link
            :href="$url(item.path)"
            v-if="item.path !== null && index < breadcrumbs.length - 1"
            class="link-default"
          >
            <span class="house" v-if="item.name === 'Home'"></span>
            <span v-else>{{ item.name }}</span>
          </Link>
          <span v-else>{{ item.name }}</span>
          <span
            v-if="index < breadcrumbs.length - 1"
            class="w-4 h-4 ml-2 text-gray-300 dark:text-gray-700"
          ><span class="chevron-right"></span></span>
        </div>
      </li>
    </ol>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['breadcrumbs']),

    hasItems() {
      return this.breadcrumbs.length > 0
    },
  },
}
</script>
