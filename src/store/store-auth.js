import { LocalStorage, Loading } from 'quasar'
import { firebaseAuth } from 'boot/firebase'
import { showErrorMessage } from 'src/function/function-show-error-message'

const state = {
  // ログイン状態を管理。MainLayoutのヘッダーのボタンを制御する
  loggedIn: false

}

const mutations = {
  setLoggedIn(state, value) {
    state.loggedIn = value
  }
}

const actions = {
  // ユーザの登録（作成）
  registerUser({ }, payload) {
    Loading.show()
    // console.log("registerUser:", payload);
    // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#createuserwithemailandpassword
    // firebase.auth().createUserWithEmailAndPassword(email, password)
    firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password).then(response => {
      console.log('response: ', response);
    }).catch(error => {
      // console.log('error.message:', error.message)
      showErrorMessage(error.message)
    })
  },
  // ログイン
  loginUser({ }, payload) {
    Loading.show()
    // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signinwithemailandpassword
    firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password).then(response => {
      console.log('response: ', response);
    }).catch(error => {
      // console.log('エラー', error)
      // console.log('error.message:', error.message)
      // エラーコードでメッセージを表示する。エラーメッセージは英語なので、日本語メッセージを設定する。
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        showErrorMessage('メールアドレスまたはパスワードの<font color="red">エラー</font>です。<br>再入力してください。')
      } else {
        showErrorMessage(error.message)
      }
    })
  },
  // ログアウト. MainLayout.vueで管理しているので、
  logoutUser() {
    // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signout
    firebaseAuth.signOut()
  },
  // ログイン状態によりボタンの制御を行う。起動時のログイン状態を確認するため、App.vueに定義
  handleAuthStateChange({ commit, dispatch }) {
    // console.log('handleAuthStateChange');
    // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#onauthstatechanged
    firebaseAuth.onAuthStateChanged(user => {
      Loading.hide()
      if (user) {
        // User is signed in.
        commit('setLoggedIn', true)
        LocalStorage.set('quasar-todo-loggedIn', true)
        // ログインしていたら、トップページを表示。 functionだと独自関数があるため、ルーターのトップページ遷移が利用できない。
        // NavigationDuplicatedエラーになるので、catchを追加
        this.$router.push('/').catch(err => 0)
        // Firebaseデータベースへのデータ読み込みを実行する。実装はstore-tasks.js
        // NavigationDuplicated
        dispatch('tasks/fbReadData', null, { root: true })
      } else {
        // ログアウト状態ならローディングの真偽値をfalseにしておく
        commit('tasks/setTasksDownloaded', false, { root: true })
        commit('setLoggedIn', false)
        commit('setLoggedIn', false)
        LocalStorage.set('quasar-todo-loggedIn', false)
        // ユーザー履歴を削除して、認証ページを表示する。
        this.$router.replace('/auth').catch(err => 0)
      }
    });


  }
}

const getters = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
