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
  search: ''
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
  },
  setSearch(state, value) {
    state.search = value
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
  },
  setSearch({ commit }, value) {
    commit('setSearch', value)
  }
}

const getters = {
  // 検索結果のタスク. それぞれのタスク一覧にgettersで取得させる
  tasksFilterd: (state) => {
    let tasksFilterd = {}
    if (state.search) {
      Object.keys(state.tasks).forEach(function (key) {
        let task = state.tasks[key],
          // アルファベットの大文字と小文字が区別されるので、少文字に変換
          taskNameLowerCase = task.name.toLowerCase(),
          searchLowerCase = state.search.toLowerCase()
        // if (task.name.includes(state.search)) {
        if (taskNameLowerCase.includes(searchLowerCase)) {
          tasksFilterd[key] = task
        }
      })
      return tasksFilterd
    }
    return state.tasks
  },

  // 作業中のタスク一覧
  tasksTodo: (state, getters) => {
    let tasksFilterd = getters.tasksFilterd
    let tasks = {}
    Object.keys(tasksFilterd).forEach(function (key) {
      let task = tasksFilterd[key]
      // console.log('task:', task)
      if (!task.completed) {
        tasks[key] = task
      }
    })
    return tasks
  },
  // 完了のタスク一覧
  tasksTodoCompleted: (state, getters) => {
    let tasksFilterd = getters.tasksFilterd
    let tasks = {}
    Object.keys(tasksFilterd).forEach(function (key) {
      let task = tasksFilterd[key]
      if (task.completed) {
        tasks[key] = task
      }
    })
    return tasks
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
