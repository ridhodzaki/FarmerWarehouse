<template>
  <q-layout class="bg-blue-grey-1" view="lHh Lpr Lff">
    <q-page-container>
      <q-page padding class="row items-center justify-center">
        <div class="row full-width">
          <div class="col-md-8 offset-md-2 col-xs-12 q-pl-md">
            <q-card flat class="text-blue-grey-14">
              <div class="row items-center">
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <div class="row q-pt-md q-pb-md">
                    <div class="col-md-8 offset-2">
                      <q-img src="../../assets/headerlogo.jpg"/>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-card-section>
                    <div class="text-h4">Farmer's Warehouse</div>
                    <div>Login Akun Anda</div>
                  </q-card-section>
                  <q-form>
                    <q-card-section class="q-gutter-md">
                      <q-input v-model="email" outlined stack-label placeholder="example@gmail.com" label = "Email"/>
                      <q-input v-model="password" outlined :type="isPwd ? 'password' : 'text'" label="Password">
                        <template v-slot:append>
                          <q-icon
                            :name="isPwd ? 'visibility_off' : 'visibility'"
                            class="cursor-pointer"
                            @click="isPwd = !isPwd"
                          />
                        </template>
                      </q-input>
                    </q-card-section>
                    <q-card-section>
                      <q-btn class="full-width" type="submit" unelevated color="primary" label="Login"/>
                    </q-card-section>
                  </q-form>
                </div>
              </div>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
export default {
  data () {
    return {
      isPwd: false,
      email: null,
      password: null
    }
  }
}
</script>
