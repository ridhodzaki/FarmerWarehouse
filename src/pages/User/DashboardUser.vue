<template>
  <q-layout class="background" view="lHh lpR fFf">
    <q-header reveal class="q-pt-sm header q-pb-md">
      <q-toolbar>
        <div class="row q-px-xs full-width">
          <!-- <q-btn
            dense
            color="white"
            flat
            icon="sort"/> -->
            <div clikable @click="ToAdmin()" class="col-sm-12 col-md-4 q-mt-md">
              <span class="text-h4 text-white text-weight-bold">
                Farmer's Warehouse
              </span>
            </div>
            <div class="col-sm-12 col-md-9 full-width">
              <div class="row q-pa-sm">
                <div class="col-md-11 col-xs-10">
                  <q-input
                    @keyup.enter="getBarangbySearch"
                    size="16px"
                    class="text-black"
                    color="black"
                    bg-color="white"
                    filled
                    v-model="search"
                    dense
                    placeholder="Search">
                    <template v-slot:prepend>
                      <q-icon name="search" />
                    </template>
                    <template v-if="search" v-slot:append>
                      <q-icon name="cancel" @click.stop="getOriginal" class="cursor-pointer" />
                    </template>
                  </q-input>
                </div>
                <q-space></q-space>
                <div class="col-1 items-center flex flex-center">
                  <q-btn-dropdown size="16px" color="white text-indigo-10" dropdown-icon="tune">
                    <q-list>
                      <q-item @click="getKategori('all')" clickable v-close-popup >
                        <q-item-section>
                          <q-item-label>Semua</q-item-label>
                        </q-item-section>
                      </q-item>

                      <q-item
                        v-for="k in kategori"
                        :key="k._id"
                        @click="getKategori(k.Kategori)"
                        clickable
                        v-close-popup>
                        <q-item-section>
                          <q-item-label>{{ k.Kategori }}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-btn-dropdown>
                </div>
              </div>
            </div>
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-pull-to-refresh @refresh="refresh">
        <div class="row col-gutter-md q-mt-md q-pr-sm q-pl-sm q-mb-sm">
        <div class="col-md-12 col-xs-12 col-lg-12">
          <div class="row">
            <div class="col-auto">
              <!-- <div class="left blue"></div> -->
            </div>
            <div class="col">
              <q-banner inline-actions class="text-blue-grey-14">
                <div class="text-h6 text-bold">Produk Terbaru</div>
                <div>Data produk terbaru Farmers House</div>
              </q-banner>
            </div>
          </div>
        </div>
        </div>
        <div class="column ">
          <div class="row">
            <div
              v-if="this.data.length <= 0"
              class="col-12">
              <div class="column flex flex-center">
                <q-icon name="report_problem" color="grey-7" size="5rem"></q-icon>
                <div class="text-h6 text-grey-7 text-center">Data Barang Tidak Ditemukan</div>
              </div>
            </div>
            <div
              v-for="d in data"
              :key="d._id"
              class="col-xs-12 col-md-2 q-pl-sm q-pb-sm q-pr-sm q-pt-sm">
              <div
                clickable
                @click="openDetail(d)"
                class="row q-pa-sm card">
                <div class="flex flex-center col-xs-4 col-md-12">
                  <q-img
                    style="width: 100%; height: 100px"
                    :src="`${this.$baseImage}/${d.image[0]}`"/>
                </div>
                <div class="col-xs-8 col-md-12 q-pl-sm q-pt-sm">
                  <span class="text-h6 text-weight-bolder" style="color: #000046;">
                  {{ d.namaBarang }}
                  </span>
                  <br>
                  <span class="text-h6 text-weight-bold" style="color: #383E58;">
                    Rp.{{ d.hargaBarang }},00
                  </span>
                  <br>
                  <q-icon
                    name="location_city"
                    style="color: #AEAEAE;"></q-icon>
                  <span class="text-caption" style="color: #AEAEAE;">
                    {{ d.pemilik }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <q-dialog v-model="dialogdesktop">
          <q-card style="width: 700px; max-width: 80vw; border-radius: 20px">
            <q-card-section class="row items-center q-pb-none">
              <div class="text-h5 q-pl-md text-weight-medium">
                {{ activeData.namaBarang }}
              </div>
              <q-space />
              <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>

            <q-card-section>
              <div class="row">
                <div class="col q-ma-md">
                  <q-img
                  style="width: 100%; height: 100%; border-style: solid; border-width: 2.5px; border-radius: 10px"
                  :src="`${this.$baseImage}/${activeData.image[0]}`"/>
                  <br>
                </div>
                <div class="col">
                  <div class="q-pt-md q-pl-md carddialog">
                    <div class="text-h5 text-weight-medium">
                      Rp. {{ activeData.hargaBarang}},00
                    </div>
                    <div class="q-pt-sm">
                      <span class="text-weight-medium">Deskripsi : </span>
                      <br>
                      {{ activeData.deskripsi }}
                    </div>
                    <div class="q-pt-sm text-weight-medium">
                      Tersedia di :
                    </div>
                    <div class="q-pt-sm">
                      <div class="col no-wrap">
                        <q-btn
                          flat
                          type="a"
                          target="_blank"
                          :href="`${activeData.link.shoppe}`">
                          <q-avatar>
                            <img src="~assets/shopper.png">
                          </q-avatar>
                        </q-btn>
                        <q-btn
                          flat
                          type="a"
                          target="_blank"
                          :href="`${activeData.link.lazada}`">
                          <q-avatar>
                            <img src="~assets/lazada.png">
                          </q-avatar>
                        </q-btn>
                        <q-btn
                          flat
                          type="a"
                          target="_blank"
                          :href="`${activeData.link.tokopedia}`">
                          <q-avatar>
                            <img src="~assets/tokopedia.png">
                          </q-avatar>
                        </q-btn>
                        <q-btn
                          flat
                          type="a"
                          target="_blank"
                          :href="`${activeData.link.lazada}`">
                          <q-avatar>
                            <img src="~assets/blibli.png">
                          </q-avatar>
                        </q-btn>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-dialog>
        <q-dialog
          v-touch-pan.mouse="handlePan"
          class="cursor-pointer"
          v-model="dialog"
          persistent
          maximized
          transition-show="slide-up"
          transition-hide="slide-down">
          <q-card style="color: #555555">
            <!-- <q-header class="q-pt-sm bg-white row flex flex-center"> -->
              <div class="flex flex-center">
                <q-btn flat color="primary full-width" icon="keyboard_double_arrow_down"  v-close-popup/>
              </div>
            <!-- </q-header> -->
            <div class="row">
              <div class="col-xs-12 col-md-6 q-pa-md">
                <q-img
                  style="height: 300px"
                  :src="`${this.$baseImage}/${activeData.image[0]}`"/>
              </div>
              <div class="col-xs-12 col-md-6">
                <div class="q-pt-md q-pl-md carddialog">
                  <div class="text-h5 text-weight-medium">
                    {{ activeData.namaBarang }}
                    <br>
                    Rp. {{ activeData.hargaBarang}},00</div>
                  <div class="q-pt-sm">
                    <span class="text-weight-medium">Deskripsi : </span>
                    <br>
                    {{ activeData.deskripsi }}
                  </div>
                  <div class="q-pt-sm text-weight-medium">
                    Tersedia di :
                  </div>
                  <div class="q-pt-sm">
                    <q-scroll-area
                      visible="false"
                      class="flex flex-center"
                      style="width: 90%; height: 90px;">
                      <div class="row no-wrap q-gutter-sm">
                        <q-btn
                          flat
                          type="a"
                          target="_blank"
                          :href="`${activeData.link.shoppe}`">
                          <q-avatar>
                            <img src="~assets/shopper.png">
                          </q-avatar>
                        </q-btn>
                        <q-btn
                          flat
                          type="a"
                          target="_blank"
                          :href="`${activeData.link.lazada}`">
                          <q-avatar>
                            <img src="~assets/lazada.png">
                          </q-avatar>
                        </q-btn>
                        <q-btn
                          flat
                          type="a"
                          target="_blank"
                          :href="`${activeData.link.tokopedia}`">
                          <q-avatar>
                            <img src="~assets/tokopedia.png">
                          </q-avatar>
                        </q-btn>
                        <q-btn
                          flat
                          type="a"
                          target="_blank"
                          :href="`${activeData.link.lazada}`">
                          <q-avatar>
                            <img src="~assets/blibli.png">
                          </q-avatar>
                        </q-btn>
                      </div>
                    </q-scroll-area>
                  </div>
                </div>
              </div>
            </div>
          </q-card>
        </q-dialog>
      </q-pull-to-refresh>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      dialog: false,
      dialogdesktop: false,
      search: '',
      data: [],
      original: [],
      activeData: [],
      kategori: [],
      info: null,
      paining: null
    }
  },
  created () {
    console.log(this.$q.cookies.get('xs'))
    this.getData()
  },
  methods: {
    refresh (done) {
      setTimeout(() => {
        this.getData()
        done()
      }, 1000)
    },
    getKategori (jenis) {
      if (jenis === 'all') {
        this.data = this.original
      } else {
        this.data = []
        for (const i in this.original) {
          if (this.original[i].jenisBarang === jenis) {
            this.data.push(this.original[i])
          }
        }
      }
    },
    getOriginal () {
      this.search = ''
      this.data = this.original
    },
    openDetail (data) {
      // console.log(data)
      this.activeData = data
      if (this.$q.screen.lt.sm) {
        this.dialog = true
      } else {
        this.dialogdesktop = true
      }
    },
    getData () {
      this.$api.get('barang/dataBarang')
        .then((res) => {
          if (res.data.sukses) {
            // console.log(res)
            this.data = this.original = res.data.data
          } else {
            this.$showNotif(res.data.pesan, 'negative')
          }
        })
      this.$api.get('kategori/dataKategori')
        .then((res) => {
          if (res.data.sukses) {
            this.kategori = res.data.data
          } else {
            this.$showNotif(res.data.pesan, 'negative')
          }
        })
    },
    getBarangbySearch () {
      this.$q.loading.show()
      this.data = this.original.filter(r => {
        return r.namaBarang.toLowerCase().includes(this.search.toLowerCase())
      })
      this.$q.loading.hide()
      // console.log(this.data)
    },
    ToAdmin () {
      this.$router.push({ name: 'loginPage' })
    },
    handlePan ({ evt, ...newInfo }) {
      this.info.value = newInfo

      // native Javascript event
      // console.log(evt)

      if (newInfo.isFirst) {
        this.panning.value = true
      } else if (newInfo.isFinal) {
        this.panning.value = false
      }

      // console.log(this.info)
    }
  }
}
</script>
<style>

.background {
  background: #E5E5E7
}
.header {
  /* height: 220px; */
  border-radius: 0px 0px 10px 10px;
  /* background: #383E56; */
  background-image: linear-gradient(90.14deg, #141E30 10%, #243B55 100%);
  /* background-image: url('../../assets/bck.jpg'); */
  /* background-size: 100% 100%; */
}
.card {
  border-radius: 10px 10px 10px 10px;
  background: #FFFFFF;
  /* background-image: linear-gradient(238.14deg, #FFFFFF 24.95%, #C5D7BD 100%); */
}

.carddialog {
  /* margin-top: -20px; */
  height: 100%;
  /* border-radius: 30px 30px 0px 0px; */
  background: #FFFFFF;
  /* background-image: linear-gradient(238.14deg, #FFFFFF 24.95%, #C5D7BD 100%); */
}

.left {
  width: 5px;
  height: 100%;
  background-color: rgb(14, 14, 100);
}
</style>
