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
              <div class="text-h6 text-bold">Input Barang</div>
              <div>Input Data Barang Terbaru</div>
            </q-banner>
          </div>
        </div>
      </div>
    </div>
    <q-card flat>
      <q-card-section class="row">
        <q-form
        @submit="onSubmit()"
        @reset="onReset"
        class="q-gutter-md col-md-6 col-xs-12"
      >
        <q-input
          filled
          dense
          v-model="form.judulfilm"
          label="Nama Barang"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />

        <q-input
          filled
          dense
          type="number"
          v-model="form.harga"
          label="Harga"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />

        <q-select dense filled v-model="form.genre" :options="optiongenre" label="Pilih Kategori" />

        <q-input
          label="Deskripsi"
          v-model="form.deskripsi"
          filled
          type="textarea"
        />

        <q-file accept="jpg, image/*" color="teal" filled v-model="image" label="Upload Gambar">
          <template v-slot:prepend>
            <q-icon name="cloud_upload" />
          </template>
        </q-file>
        <div>
          <q-btn label="Submit" type="submit" color="primary"/>
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      form: {
        judulfilm: null,
        harga: 0,
        tahun: null,
        genre: null,
        rating: null,
        deskripsi: null
      },
      optiongenre: [
        'Beras',
        'Sayur',
        'Buah'
      ],
      image: null
    }
  },
  methods: {
    onSubmit () {
      const formData = new FormData()
      formData.append('image', this.image)
      formData.append('data', JSON.stringify(this.form))
      this.$axios.post('movie/insert', formData)
        .then(res => {
          if (res.data.sukses) {
            this.$showNotif(res.data.pesan, 'positive')
            this.$router.push({ name: 'datadvd' })
          } else {
            this.$showNotif(res.data.pesan, 'negative')
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
