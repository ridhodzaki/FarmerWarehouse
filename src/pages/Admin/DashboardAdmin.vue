<template>
  <q-page padding>
    <div class="row q-mb-md col-gutter-md">
      <div class="col">
        <div class="row">
          <div class="col-auto">
            <div class="left blue"></div>
          </div>
          <div class="col">
            <q-banner inline-actions class="text-blue-grey-14">
              <div class="text-h6 text-bold">Data Barang</div>
              <div>Data Katalog Barang Anda</div>
            </q-banner>
          </div>
        </div>
      </div>
      <q-space></q-space>
      <div class="items-center flex flex-center">
        <q-btn :to="{ name: 'inputData' }" class="q-pa-sm" dense label="Input Barang" icon="add" color="primary"></q-btn>
      </div>
    </div>
    <q-table
      :rows="data"
      :columns="columns"
      row-key="namaBarang"
      selection="multiple"
      v-model:selected="selected"
      :filter="filter"
      :rows-per-page-options="[0]"
      grid
      hide-header
      hide-bottom
    >
      <template v-slot:top>
        <q-input outlined style="width: 100%" dense debounce="200" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:item="props">
        <div
          class="q-pa-xs col-xs-12 col-sm-6 col-md-3 col-lg-3 grid-style-transition"
          :style="props.selected ? 'transform: scale(0.95);' : ''"
        >
          <q-card :class="props.selected ? 'bg-grey-2' : ''">
            <q-card-section class="row">
              <q-checkbox dense v-model="props.selected" />
              <q-space />
              <q-btn
                icon="edit"
                :to="{ name: 'editData', params: {id: props.row._id} }"
                :color="props.selected ? 'grey-10' : 'amber'"
                dense
                flat
                :disable="props.selected ? true : false" />
              <q-btn
                @click="deleteData(props.row._id)"
                icon="delete"
                :color="props.selected ? 'grey-10' : 'negative'"
                dense
                flat
                :disable="props.selected ? true : false" />
            </q-card-section>
            <q-separator />
            <q-card-section>
              <q-img
                style="height:100px"
                :src="`${this.$baseImage}/${props.row.image[0]}`"></q-img>
            </q-card-section>
            <div
              class="column q-px-md q-pb-sm">
              <q-item-label class="text-h5">{{ props.row.namaBarang }}</q-item-label>
              <q-item-label caption>{{ props.row.pembuat }}</q-item-label>
              <q-item-label class="text-subtitle2 text-weight-bold">Rp. {{ props.row.hargaBarang }}</q-item-label>
            </div>
          </q-card>
        </div>
      </template>
    </q-table>
    <div :class="this.$q.dark.isActive ? 'q-pa-lg text-black' : 'q-pa-lg text-white'">a</div>
    <q-footer reveal >
      <div
        v-if="this.selected.length > 0"
        class=" q-pa-sm bg-grey-2">
        <div class="row">
          <div class="text-negative flex flex-center">
            {{ selected.length }} item selected
          </div>
          <q-space></q-space>
          <div class="q-pl-md">
            <q-btn icon="delete" @click="deleteSelected()" color="negative" flat dense></q-btn>
          </div>
        </div>
      </div>
    </q-footer>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      confirm: false,
      selected: [],
      filter: '',
      columns: [
        {
          name: 'namaBarang',
          required: true,
          label: 'Nama Produk',
          align: 'left',
          field: row => row.namaBarang,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'hargaBarang', align: 'left', label: 'Harga', field: 'hargaBarang', sortable: true }
      ],

      data: []
    }
  },
  created () {
    // console.log(this.$q.localStorage.getItem('dataUser'))
    // console.log(this.$token())
    this.getdata()
  },
  methods: {
    deleteSelected () {
      let success = 0
      // console.log(this.selected.length)
      this.$q.dialog({
        title: 'Konfirmasi',
        message: 'Apakah Anda Yakin Menghapus ' + this.selected.length + ' Item Ini ?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        for (const i in this.selected) {
          // console.log(i)
          this.$q.loading.show()
          this.$api.delete(`barang/deleteBarang/${this.selected[i]._id}`, this.$token())
            .then(res => {
              if (res.data.sukses) {
                success = success + 1
                // this.$showNotif(res.data.pesan, 'positive')
                this.getdata()
              } else if (res.data === 'invalid token') {
                this.$showDialog(res.data, 'negative')
                this.$router.push({ name: 'loginPage' })
              }
            })
        }
        this.$q.loading.hide()
        this.getData()
        this.$showNotif('Berhasil Menghapus', 'positive')
        this.selected = []
      })
    },
    deleteData (id) {
      this.$q.dialog({
        title: 'Konfirmasi',
        message: 'Apakah Anda Yakin?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$api.delete(`barang/deleteBarang/${id}`, this.$token())
          .then(res => {
            if (res.data.sukses) {
              this.$showNotif(res.data.pesan, 'positive')
              this.getdata()
            } else if (res.data === 'invalid token') {
              this.$showDialog(res.data, 'negative')
              this.$router.push({ name: 'loginPage' })
            } else {
              this.$showNotif(res.data.pesan, 'negative')
            }
          })
      })
    },
    getdata () {
      this.$api.get('barang/dataBarang')
        .then((res) => {
          console.log(res)
          if (res.data.sukses) {
            this.data = res.data.data
            // console.log(this.data)
          } else if (res.data === 'invalid token') {
            this.$showDialog(res.data, 'negative')
            this.$router.push({ name: 'loginPage' })
          } else {
            this.$showNotif(res.data.pesan, 'negative')
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
<style scoped>
.left {
  width: 5px;
  height: 100%;
  background-color: rgb(14, 14, 100);
}
.grid-style-transition {
  transition: transform .28s, background-color .28s
}
.formDelete {
  /* border-style: solid;
  border-width: 1px; */
  border-radius: 10px;
  /* border-color: red; */
}
</style>
