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

  }
}

const actions = {
  updateTask({ commit }, payload) {
    // console.log('updateTask action')
    // console.log('payload', payload)
    commit('updateTask', payload)
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
