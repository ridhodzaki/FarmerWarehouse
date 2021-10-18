<template>
  <q-page class="q-pa-md">
    <div class="row q-pb-xl">
      <div class="text-h5 text-weight-medium">Log in</div>
    </div>
    <div>
      <q-btn class="full-width" outline no-caps style="color: #AEAEAE">
        <q-icon left size="1.5em" name="fab fa-google"/>
        <span style="color: #373737">Log in with Google</span>
      </q-btn>
      <q-separator class="q-my-md"/>
      <div class="column q-mb-sm">
        <span class="text-weight-medium">Email</span>
        <q-input
          placeholder="example@gmail.com"
          outlined
          v-model="email"
          dense/>
      </div>
      <div class="column q-mb-sm">
        <span class="text-weight-medium">Password</span>
        <q-input v-model="password" outlined :type="isPwd ? 'password' : 'text'" dense>
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
      </div>
      <q-checkbox v-model="remember" label="Remember Me" />
      <div class="column q-gutter-sm">
        <q-btn color="primary" no-caps :to="{ name: 'homeuser' }" label="Login" />
        <q-btn flat color="primary" no-caps label="Forgot Password?" />
      </div>
      <q-separator class="q-my-md"/>
      <div class="column">
        <span class="flex flex-center">Don't Have an account?</span>
        <q-btn flat color="primary" :to="{ name: 'register' }" no-caps label="Sign up" />
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      password: '',
      email: '',
      isPwd: true,
      remember: false,

      accept: false,
      alert: false
    }
  }
}
</script>
<style lang="scss">
.header {
  font-size: 40px;
  font-family: 'Ubuntu';
  color: #1976D2;
}
</style>
