import { LocalStorage } from 'quasar'

export default () => {
  const profile = LocalStorage.getItem('dataUser')
  if (profile !== null || profile !== undefined) {
    return {
      headers: {
        'x-access-token': profile.token,
        email: profile.email
      }
    }
  } else {
    return {
      headers: {}
    }
  }
}
