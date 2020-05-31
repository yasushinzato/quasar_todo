import { firebaseAuth } from 'boot/firebase'

const state = {

}

const mutations = {

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
