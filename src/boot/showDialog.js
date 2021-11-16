import { Dialog } from 'quasar'
import { boot } from 'quasar/wrappers'
// import router from '@/router'
// import vue from 'vuex'

const showDialog = () => {
  // const $router = router()
  Dialog.create({
    title: 'Sesi Anda Telah Berakhir',
    message: 'Silahkan login kembali',
    persistent: true
  }).onOk(() => {
    console.log('OK')
  })
}

export default boot(({ app }) => {
  app.config.globalProperties.$showDialog = showDialog
})

export { showDialog }
