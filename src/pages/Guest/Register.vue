<template>
  <q-page class="q-pa-md">
    <div class="row q-pb-xl">
      <div class="text-h5 text-weight-medium">Sign Up</div>
    </div>
    <div>
      <q-btn class="full-width border" outline no-caps style="color: #AEAEAE">
        <q-icon left size="1.5em" name="fab fa-google"/>
        <span style="color: #373737">Sign up with Google</span>
      </q-btn>
      <q-separator class="q-my-md"/>
      <div class="column q-mb-sm">
        <span class="text-weight-medium">Name</span>
        <q-input
          outlined
          v-model="name"
          dense/>
      </div>
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
      <q-checkbox v-model="remember" label="I agree with Terms and Privacy" />
      <div class="column q-gutter-sm">
        <q-btn color="primary border" :to="{ name: 'login' }" no-caps label="Sign up" />
      </div>
      <q-separator class="q-my-md"/>
      <div class="column">
        <span class="flex flex-center">Already have an account?</span>
        <q-btn flat color="primary" no-caps :to="{ name: 'login' }" label="Log in" />
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      name: '',
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
.border {
  border-radius: 10px;
}
</style>
