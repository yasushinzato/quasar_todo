import Vue from 'vue'

const state = {
  // タスク配列をオブジェクト構造に変更
  tasks: {
    'ID1': {
      name: "QuasarでTodo作成",
      completed: false,
      dueDate: "2020/05/17",
      dueTime: "18:00"
    },
    'ID2': {
      name: "「あなたはなぜチェックリストを使わないのか？」を読む",
      completed: false,
      dueDate: "2020/05/18",
      dueTime: "13:00"
    },
    'ID3': {
      name: "「時間は存在しない」を読む",
      completed: true,
      dueDate: "2020/05/18",
      dueTime: "15:30"
    },
  },
}

const mutations = {
  updateTask(state, payload) {
    // console.log('payload (from mutation)', payload)
    Object.assign(state.tasks[payload.id], payload.updates)
  },
  deleteTask(state, id) {
    // console.log('delete id(mutations):', id)
    // 画面には表示されないので、組み込みのビューメソッドを使用する. Vueをインポートしておく。
    // delete state.tasks[id]
    Vue.delete(state.tasks, id)
  }
}

const actions = {
  // mutationsで状態を変更する
  updateTask({ commit }, payload) {
    // console.log('updateTask action')
    // console.log('payload', payload)
    commit('updateTask', payload)
  },
  deleteTask({ commit }, id) {
    // console.log('delete id:', id)
    commit('deleteTask', id)
  }
}

const getters = {
  tasks: (state) => {
    return state.tasks
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
