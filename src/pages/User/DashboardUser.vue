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
            <div class="col-sm-12 col-md-3 q-mt-md">
              <span class="text-h4 text-white text-weight-bold">
                Farmer's Warehouse
              </span>
            </div>
            <div class="col-sm-12 col-md-9 full-width">
              <div class="row q-pa-sm">
                <div class="col-md-11 col-xs-10">
                  <q-input
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
                </q-input></div>
                <q-space></q-space>
                <div class="col-1 items-center flex flex-center">
                  <q-btn-dropdown size="16px" color="white text-indigo-10" dropdown-icon="tune">
                    <q-list>
                      <q-item clickable v-close-popup >
                        <q-item-section>
                          <q-item-label>Beras</q-item-label>
                        </q-item-section>
                      </q-item>

                      <q-item clickable v-close-popup >
                        <q-item-section>
                          <q-item-label>Sayur</q-item-label>
                        </q-item-section>
                      </q-item>

                      <q-item clickable v-close-popup>
                        <q-item-section>
                          <q-item-label>Buah</q-item-label>
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
      <div class="row col-gutter-md q-mt-md q-pr-sm q-pl-sm q-mb-sm">
      <div class="col-md-12 col-xs-12 col-lg-12">
        <div class="row">
          <div class="col-auto">
            <div class="left blue"></div>
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
            v-for="i in 10"
            :key="i"
            class="col-xs-12 col-md-2 q-pl-sm q-pb-sm q-pr-sm q-pt-sm">
            <div
              clickable
              @click="dialog = true"
              class="row q-pa-sm card">
              <div class="flex flex-center col-xs-4 col-md-12">
                <q-img
                  style="width: 100px; height: 100px"
                  src="https://s2.bukalapak.com/img/76225256052/s-463-463/data.png.webp"/>
              </div>
              <div class="col-xs-8 col-md-12 q-pl-sm q-pt-sm">
                <span class="text-h6 text-weight-bolder" style="color: #000046;">
                  Beras Radja Udang
                </span>
                <br>
                <span class="text-h6 text-weight-bold" style="color: #383E58;">
                  Rp.50.000,00
                </span>
                <br>
                <q-icon
                  name="location_city"
                  style="color: #AEAEAE;"></q-icon>
                <span class="text-caption" style="color: #AEAEAE;">
                  PT. Pencari Cinta Sejati
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <q-dialog
        v-model="dialog"
        persistent
        maximized
        transition-show="slide-up"
        transition-hide="slide-down"
      >
        <q-card style="color: #555555">
          <!-- <q-header class="q-pt-sm bg-white row flex flex-center"> -->
            <div class="flex flex-center">
              <q-btn flat color="primary" icon="keyboard_double_arrow_down" v-close-popup/>
            </div>
          <!-- </q-header> -->
          <div class="row" style="background-image: linear-gradient(238.14deg, #FFFFFF 24.95%, #C5D7BD 100%);">
            <div class="col-xs-12 col-md-6">
              <q-img
                src="https://s2.bukalapak.com/img/76225256052/s-463-463/data.png.webp"/>
            </div>
            <div class="col-xs-12 col-md-6">
              <div class="q-pt-md q-pl-md carddialog">
                <div class="text-h5 text-weight-medium">Beras Raja Udang</div>
                <div class="q-pt-sm">
                  <span class="text-weight-medium">Deskripsi : </span>
                  <br>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium nihil possimus, nam magni optio inventore reiciendis explicabo a sed quod earum! Vel veniam, ipsa repellendus enim quis quam voluptates eum.
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
                      <q-btn flat>
                        <q-avatar>
                          <img src="~assets/shopper.png">
                        </q-avatar>
                      </q-btn>
                      <q-btn flat>
                        <q-avatar>
                          <img src="~assets/lazada.png">
                        </q-avatar>
                      </q-btn>
                      <q-btn flat>
                        <q-avatar>
                          <img src="~assets/tokopedia.png">
                        </q-avatar>
                      </q-btn>
                      <q-btn flat>
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
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      dialog: false,
      search: ''
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
  border-radius: 30px 30px 0px 0px;
  background: #FFFFFF;
  /* background-image: linear-gradient(238.14deg, #FFFFFF 24.95%, #C5D7BD 100%); */
}

.left {
  width: 5px;
  height: 100%;
  background-color: rgb(14, 14, 100);
}
</style>
