<template>
  <q-layout view="hHh Lpr lff" class="shadow-2 rounded-borders">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        <q-toolbar-title class="text-h6 text-bold">Admin Farmer's Warehouse</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      show-if-above

      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      mini-to-overlay

      :width="200"
      :breakpoint="500"
      bordered
      content-class="bg-grey-10"
    >
      <q-scroll-area class="fit">
        <q-list dark padding>

          <q-item
            v-for="nav in navs"
            :key="nav.label"
            :to="nav.to"
            active-class="bg-primary text-white"
            style="color: #141E30"
            exact
            clickable>
            <q-item-section avatar>
              <q-icon :name="nav.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ nav.label }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            class="absolute-bottom text-primary"
            @click="logout()"
            clickable>
            <q-item-section avatar>
              <q-icon name="logout" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Logout</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
export default {
  data () {
    return {
      drawer: false,
      miniState: true,
      navs: [
        {
          label: 'Data Barang',
          icon: 'assessment',
          to: { name: 'homeadmin' },
          drawer: false
        },
        {
          label: 'Data Kategori',
          icon: 'label',
          to: { name: 'kategori' },
          drawer: false
        }
      ]
    }
  },
  methods: {
    logout () {
      // console.log('yeashh')
      this.$q.localStorage.clear()
      this.$router.push({ name: 'loginPage' })
    }
  }
}
</script>
