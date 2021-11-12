<template>
  <q-layout :class="this.$q.screen.xl || this.$q.screen.lg ? 'bg-blue-grey-1' : 'bg-white'" view="lHh Lpr Lff">
    <q-page-container>
      <q-page padding class="row items-center justify-center">
        <div class="row full-width">
          <div class="col-md-8 offset-md-2 col-xs-12 q-pl-md">
            <q-card flat class="text-blue-grey-14">
              <div class="row flex flex-center">
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <div class="row">
                    <div class="col-md-8 offset-md-2 col-xs-12">
                      <q-img
                        src="../../assets/headerlogo.jpg"/>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <q-card-section>
                    <div class="text-h4">Farmer's Warehouse</div>
                    <div>Login Akun Anda</div>
                  </q-card-section>
                  <q-form
                    @submit="onSubmit">
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
                      <q-btn class="full-width" type="submit" color="primary" label="Login"/>
                      <q-btn class="full-width" :to="{ name: 'homeuser' }" color="primary" label="Back To Dashboard User" flat/>
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
      isPwd: true,
      email: null,
      password: null
    }
  },
  methods: {
    onSubmit () {
      this.$api.post('user/login', {
        email: this.email,
        password: this.password
      }).then((res) => {
        if (res.data.sukses) {
          this.$q.localStorage.set('dataUser', res.data.data)
          this.$q.cookies.set('data', res.data.data)
          // console.log(res.data.data.level)
          // console.log(this.$q.localStorage.getItem('dataUser'))
          if (res.data.data.level === 1) {
            this.$router.push({ name: 'homeadmin' })
          } else {
            this.$router.push({ name: 'login' })
          }
        }
      })
      // this.$router.push({ name: 'homeadmin' })
    }
  }
}
</script>
