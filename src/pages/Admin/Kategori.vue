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
              <div class="text-h6 text-bold">Kategori</div>
              <div>Data Kategori Anda</div>
            </q-banner>
          </div>
        </div>
      </div>
      <q-space></q-space>
      <div class="items-center flex flex-center">
        <q-btn @click="input = true" class="q-pa-sm" dense label="Tambah Kategori" icon="add" color="primary"></q-btn>
      </div>
    </div>
    <q-table
      hide-bottom
      :rows="data"
      :columns="columns"
      row-key="_id"
      selection="multiple"
      v-model:selected="selected"
      :filter="filter"
      grid
      hide-header
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
              <q-item-label class="q-pl-sm flex flex-center">{{ props.row.Kategori }}</q-item-label>
              <q-space />
              <q-btn
                icon="edit"
                @click="editData(props.row)"
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
          </q-card>
        </div>
      </template>
    </q-table>
    <q-dialog v-model="edit" full-width persistent>
      <q-card style="min-width: 350px">
        <q-card-section class="row">
          <div class="text-h6">Edit Kategori</div>
          <q-space></q-space>
          <q-btn flat icon="close" @click="getdata()" dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="activeData.Kategori" persistent label="Nama Kategori" autofocus @keyup.enter="editKategori()" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Edit Kategori" @click="editKategori()"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="input" persistent>
      <q-card style="min-width: 350px">
        <q-card-section class="row">
          <div class="text-h6">Input Kategori</div>
          <q-space></q-space>
          <q-btn flat icon="close" dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="kategori" persistent label="Nama Kategori" autofocus @keyup.enter="inputKategori()" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Input Kategori" @click="inputKategori()"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div class="q-pa-lg text-white">a</div>
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
      edit: false,
      input: false,
      confirm: false,
      selected: [],
      kategori: '',
      filter: '',
      columns: [
        {
          name: 'Kategori',
          required: true,
          label: 'Nama Kategori',
          align: 'left',
          field: row => row.Kategori,
          format: val => `${val}`,
          sortable: true
        }
      ],
      activeData: [],
      data: []
    }
  },
  created () {
    // console.log(this.$q.localStorage.getItem('dataUser'))
    // console.log(this.$token())
    this.getdata()
  },
  methods: {
    editData (data) {
      this.activeData = data
      this.edit = true
    },
    inputKategori () {
      // console.log(this.kategori)
      this.$api.post('kategori/input', {
        Kategori: this.kategori
      }, this.$token()).then((res) => {
        // console.log(res)
        if (res.data.sukses) {
          this.$showNotif(res.data.pesan, 'positive')
          this.getdata()
          this.input = false
          this.kategori = ''
        } else {
          this.$showNotif(res.data.pesan, 'negative')
        }
      })
    },
    editKategori () {
      this.$api.put(`kategori/edit/${this.activeData._id}`, {
        Kategori: this.activeData.Kategori
      }, this.$token())
        .then((res) => {
          // console.log(res)
          if (res.data.sukses) {
            this.$showNotif(res.data.pesan, 'positive')
            this.getdata()
            this.edit = false
          } else {
            this.$showNotif(res.data.pesan, 'negative')
          }
        })
    },
    deleteData (id) {
      // console.log(id)
      this.$q.dialog({
        title: 'Konfirmasi',
        message: 'Apakah Anda Yakin?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$api.delete(`kategori/hapus/${id}`, this.$token())
          .then(res => {
            if (res.data.sukses) {
              this.$showNotif(res.data.pesan, 'positive')
              this.getdata()
            } else if (res.data === 'invalid token') {
              this.$showNotif(res.data.pesan, 'negative')
            }
          })
      })
    },
    deleteSelected () {
      let success = 0
      // console.log(success)
      // console.log(panjangarray)
      this.$q.dialog({
        title: 'Konfirmasi',
        message: 'Apakah Anda Yakin Menghapus ' + this.selected.length + ' Item Ini ?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        for (const i in this.selected) {
          this.$q.loading.show()
          this.$api.delete(`kategori/hapus/${this.selected[i]._id}`, this.$token())
            .then(res => {
              // console.log(res)
              if (res.data.sukses) {
                success = success + 1
                // console.log(success)
                // this.$showNotif(res.data.pesan, 'positive')
                this.getdata()
              } else if (res.data === 'invalid token') {
                this.$showNotif(res.data.pesan, 'negative')
              }
            })
        }
        this.selected = []
        this.getdata()
        this.$q.loading.hide()
        // this.$showNotif('Berhasil Menghapus', 'positive')
      })
    },
    getdata () {
      this.$api.get('kategori/dataKategori', this.$token())
        .then((res) => {
          if (res.data.sukses) {
            this.data = res.data.data
            // console.log(this.data)
          } else if (res.status === 404) {
            this.$router.push({ name: 'login' })
          } else {
            this.$showNotif(res.data.pesan, 'Negative')
          }
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
