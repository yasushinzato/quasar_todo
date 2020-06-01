
import { LocalStorage } from 'quasar'

export default ({ router }) => {
  // something to do
  // https://jp.vuejs.org/v2/guide/migration-vue-router.html#router-beforeEach-%E5%A4%89%E6%9B%B4
  // 起動時にローカルストレージのログイン状態により、画面の表示を制御する.
  router.beforeEach((to, from, next) => {
    let loggedIn = LocalStorage.getItem('quasar-todo-loggedIn')
    // console.log('to:', to);
    // console.log('from:', from);
    if (!loggedIn && to.path !== '/auth') {
      next('/auth')
    } else {
      next()
    }
  })
}
