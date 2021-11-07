import { Notify } from 'quasar'
import { boot } from 'quasar/wrappers'
// import vue from 'vuex'

const showNotif = (message, jenis) => {
  Notify.create({
    message: message,
    color: jenis,
    timeout: 1000
  })
}

export default boot(({ app }) => {
  app.config.globalProperties.$showNotif = showNotif
})

export { showNotif }
