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
              <div class="text-h6 text-bold">Edit Barang</div>
              <div>Edit Data Barang</div>
            </q-banner>
          </div>
        </div>
      </div>
    </div>
    <q-card flat>
      <q-card-section>
        <q-form
        @submit="onSubmit()"
        class="row justify-center"
        >
        <div class="col-md-5 q-mr-sm col-xs-12">
          <q-input
            class="q-pb-sm"
            filled
            dense
            v-model="form.namaBarang"
            label="Nama Barang"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <q-input
            class="q-pb-sm"
            filled
            dense
            type="number"
            v-model="form.hargaBarang"
            label="hargaBarang"
          >
            <template v-slot:prepend>
              <div class="text-subtitle2">Rp.</div>
            </template>
          </q-input>
          <q-select class="q-pb-sm" dense filled v-model="form.jenisBarang" :options="optiongenre" label="Pilih Kategori" />
          <q-input
            class="q-pb-sm"
            filled
            dense
            v-model="form.pemilik"
            label="Pemilik"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <q-input
            label="Deskripsi"
            v-model="form.deskripsi"
            filled
            type="textarea"
          />
          <q-file
            class="q-pt-sm"
            accept="jpg, image/*"
            color="primary"
            filled
            multiple
            v-model="image"
            label="Upload Gambar">
            <template v-slot:prepend>
              <q-icon name="upload" />
            </template>
          </q-file>
        </div>
        <div class="col-md-5 q-gutter-sm col-xs-12">
          <q-card
            :flat="this.$q.screen.xl || this.$q.screen.md ? false : true"
            :class="this.$q.screen.xl || this.$q.screen.md ? 'q-pt-lg q-pa-md bg-grey-1' : 'q-pt-md bg-white'">
            <div class="text-h5 text-weight-medium">Link Form</div>
            <q-input
              filled
              dense
              v-model="link.shoppe"
              label="Shoppe"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />
            <q-input
              filled
              dense
              v-model="link.lazada"
              label="Lazada"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />
            <q-input
              filled
              dense
              v-model="link.tokopedia"
              label="Tokopedia"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />
            <q-input
              filled
              dense
              v-model="link.blibli"
              label="Blibli"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />
            <div>
              <q-btn label="Submit" type="submit" color="primary"/>
              <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
            </div>
          </q-card>
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
        namaBarang: null,
        hargaBarang: null,
        jenisBarang: null,
        deskripsi: null,
        pemilik: null
      },
      link: {
        blibli: null,
        shoppe: null,
        tokopedia: null,
        lazada: null
      },
      optiongenre: [
        'Beras',
        'Sayur',
        'Buah'
      ],
      image: null
    }
  },
  created () {
    this.getData()
    this.getKategori()
  },
  methods: {
    getKategori () {
      this.$api.get('kategori/dataKategori', this.$token())
        .then((res) => {
          console.log(res)
          if (res.data.sukses) {
            const data = res.data.data
            if (data.length !== 0 || data !== null) {
              this.optiongenre = []
              let i = 0
              for (i in data) {
                this.optiongenre.push(data[i].Kategori)
              }
            }
            console.log(this.optiongenre)
          }
        })
    },
    getData () {
      this.$api.get('barang/dataBarang/' + this.$route.params.id, this.$token())
        .then((res) => {
          console.log(res)
          if (res.data.sukses) {
            const data = res.data.data
            this.form.namaBarang = data.namaBarang
            this.form.hargaBarang = data.hargaBarang
            this.form.jenisBarang = data.jenisBarang
            this.form.deskripsi = data.deskripsi
            this.form.pemilik = data.pemilik
            this.link = data.link
          } else if (res.data === 'invalid token') {
            this.$showDialog()
            // this.$router.push({ name: 'login' })
          } else {
            console.log(res.data)
          }
        })
    },
    onSubmit () {
      const formBara = Object.assign(this.form, {
        link: this.link
      })
      const formData = new FormData()
      // console.log(this.image)
      if (this.image !== null) {
        for (const i of Object.keys(this.image)) {
          formData.append('image', this.image[i])
        }
      } else {
        formData.append('image', this.image)
      }
      formData.append('data', JSON.stringify(formBara))
      // formData.append('link', JSON.stringify(this.link))
      // console.log(formData)
      // console.log(this.$token().headers)
      this.$api.put('barang/editBarang/' + this.$route.params.id, formData, this.$token())
        .then(res => {
          console.log(res)
          if (res.data.sukses) {
            this.$showNotif(res.data.pesan, 'positive')
            this.$router.push({ name: 'homeadmin' })
          } else if (res.data === 'invalid token') {
            this.$showDialog(res.data, 'negative')
            this.$router.push({ name: 'loginPage' })
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
