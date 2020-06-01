import { firebaseAuth } from 'boot/firebase'

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
    // console.log("registerUser:", payload);
    // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#createuserwithemailandpassword
    // firebase.auth().createUserWithEmailAndPassword(email, password)
    firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password).then(response => {
      console.log('response: ', response);
    }).catch(error => {
      console.log('error.message:', error.message)
    })
  },
  // ログイン
  loginUser({ }, payload) {
    // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signinwithemailandpassword
    firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password).then(response => {
      console.log('response: ', response);
    }).catch(error => {
      console.log('error.message:', error.message)
    })
  },
  // ログアウト. MainLayout.vueで管理しているので、
  logoutUser() {
    // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signout
    firebaseAuth.signOut()
  },
  // ログイン状態によりボタンの制御を行う。起動時のログイン状態を確認するため、App.vueに定義
  handleAuthStateChange({ commit }) {
    // console.log('handleAuthStateChange');
    // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#onauthstatechanged
    firebaseAuth.onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        commit('setLoggedIn', true)
      } else {
        commit('setLoggedIn', false)
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
