<template>
  <q-layout view="hHh Lpr lff" class="shadow-2 rounded-borders">
    <q-header elevated class="bg-white">
      <div class="row no-wrap items-center"
        >
        <q-btn
          flat
          v-go-back.single
          color="primary"
          round
          dense
          icon="arrow_back" />

        <q-toolbar-title
          class="absolute-center text-primary">
          {{ title }}
        </q-toolbar-title>
      </div>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>

export default {
  data () {
    return {
    }
  },
  methods: {
  },
  computed: {
    title () {
      const currentPath = this.$route.name
      if (currentPath === 'checkout') {
        return 'Checkout'
      } else if (currentPath === 'detail') {
        return 'Detail Barang'
      } else {
        return 'Profile'
      }
    }
  }
}
</script>
