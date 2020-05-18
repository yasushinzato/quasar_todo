import Vue from 'vue'
import { uid } from 'quasar'

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
  },
  // AddTaskコンポーネント側にimportして利用する
  addTask(state, payload) {
    Vue.set(state.tasks, payload.id, payload.task)
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
  },
  // タスクの追加。 タスクのIDは一意のキーに設定する。 https://quasar.dev/quasar-utils/other-utils#Generate-UID
  addTask({ commit }, task) {
    let taskId = uid()
    // console.log('taskId:', taskId)
    let payload = {
      id: taskId,
      task: task
    }
    commit('addTask', payload)
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
