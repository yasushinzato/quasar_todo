import { LocalStorage } from 'quasar'

// 12時表記の設定と
// 一覧を一つにまとめる設定
const state = {
  settings: {
    show12HourTimeFormat: true,
    showTasksInOneList: false
  }
}

const mutations = {
  setShow12HourTimeFormat(state, value) {
    state.settings.show12HourTimeFormat = value
  },
  setShowTasksInOneList(state, value) {
    state.settings.showTasksInOneList = value
  },
  // ローカルストレージ保存
  setSettings(state, settings) {
    Object.assign(state.settings, settings)
  }

}

const actions = {
  setShow12HourTimeFormat({ commit, dispatch }, value) {
    commit('setShow12HourTimeFormat', value)
    // ローカルストレージに保存
    // localStorage.setItem('show12HourTimeFormat', value) ←プラグインをインストールしないで使える
    dispatch('saveSettings')

  },
  setShowTasksInOneList({ commit, dispatch }, value) {
    commit('setShowTasksInOneList', value)
    // ローカルストレージに保存
    // localStorage.setItem('showTasksInOneList', value) ←プラグインをインストールしないで使える
    dispatch('saveSettings')
  },
  // ローカルストレージ保存アクション
  saveSettings({ settings }) {
    LocalStorage.set('quasar-todo-settings-shin', state.settings)
  },
  // ローカルストレージ取得アクション
  getSettings({ commit }) {
    console.log("settingストア");
    let settings = LocalStorage.getItem('quasar-todo-settings-shin')
    if (settings) {
      commit('setSettings', settings)
    }
  }

}

const getters = {
  settings: state => {
    return state.settings
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
