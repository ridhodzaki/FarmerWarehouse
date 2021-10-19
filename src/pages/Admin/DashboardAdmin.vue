<template>
  <q-page padding>
    <div class="row q-mb-md col-gutter-md">
      <div class="col-md-12 col-xs-12 col-lg-12">
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
    </div>
    <q-card dense flat>
      <q-table
      title="Treats"
      :data="data"
      :columns="columns"
      row-key="name"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="judul" :props="props">
            {{ props.row.judulfilm }}
          </q-td>
          <q-td key="harga" :props="props">
            Rp. {{ props.row.harga }} -
          </q-td>
          <q-td key="tahun" :props="props">
            {{ props.row.tahun }}
          </q-td>
          <q-td key="genre" :props="props">
            {{ props.row.genre }}
          </q-td>
          <q-td key="deskripsi" :props="props">
            <div class="ellipsis" style="max-width: 200px">
              {{ props.row.deskripsi }}
            </div>
          </q-td>
          <q-td key="judul" :props="props">
            <q-img
              :src="`${$baseImageURL}/${props.row.image}`"
              spinner-color="white"
            />
          </q-td>
          <q-td key="aksi" :props="props">
            <div class="row q-gutter-sm">
              <q-btn label="Edit" :to="{ name:'edit', params: { id:props.row._id} }" icon="edit" color="warning" />
              <q-btn @click="deletemovie(props.row._id)" label="Hapus" icon="edit" color="red" />
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    </q-card>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      columns: [
        { name: 'Nama Produk', align: 'left', label: 'Nama Produk', field: 'Nama Profuk', sortable: true },
        { name: 'Harga', align: 'left', label: 'Harga', field: 'Harga', sortable: true },
        { name: 'Deskripsi', align: 'left', label: 'Deskripsi', field: 'Deskripsi', sortable: true },
        { name: 'Lokasi', align: 'left', label: 'Lokasi', field: 'Lokasi', sortable: true },
        { name: 'Kategori', align: 'left', label: 'Kategori', field: 'Kategori', sortable: true },
        { name: 'gambar', align: 'left', label: 'Gambar', field: 'gambar' },
        { name: 'aksi', align: 'left', label: 'Aksi', field: 'aksi', sortable: true }
      ],

      data: []
    }
  },
  created () {
    this.getdata()
  },
  methods: {
    deletemovie (id) {
      this.$q.dialog({
        title: 'Konfirmasi',
        message: 'Apakah Anda Yakin?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$axios.delete(`movie/delete/${id}`)
          .then(res => {
            if (res.data.sukses) {
              this.$showNotif(res.data.pesan, 'positive')
              this.getdata()
            } else {
              this.$showNotif(res.data.pesan, 'negative')
            }
          })
      })
    },
    getdata () {
      this.$axios.get('movie/getall')
        .then((res) => {
          if (res.data.sukses) {
            this.data = res.data.data
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
</style>
