import Vue from 'vue'
import { uid } from 'quasar'
import { firebaseDb, firebaseAuth } from 'boot/firebase'

const state = {
  // タスク配列をオブジェクト構造に変更
  tasks: {
    // 'ID1': {
    //   name: "QuasarでTodo作成",
    //   completed: false,
    //   dueDate: "2020/05/17",
    //   dueTime: "18:00"
    // },
    // 'ID2': {
    //   name: "「あなたはなぜチェックリストを使わないのか？」を読む",
    //   completed: false,
    //   dueDate: "2020/05/20",
    //   dueTime: "13:00"
    // },
    // 'ID3': {
    //   name: "「時間は存在しない」を読む",
    //   completed: true,
    //   dueDate: "2020/05/18",
    //   dueTime: "15:30"
    // },
  },
  search: '',
  sort: 'name',
  tasksDownloaded: false
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
  // ログアウトしたときに、タスクをクリアする. store-authで呼び出す
  clearTasks(state) {
    state.tasks = {}
  },
  setSearch(state, value) {
    state.search = value
  },
  setSort(state, value) {
    state.sort = value
  },
  setTasksDownloaded(state, value) {
    state.tasksDownloaded = value
  }
}

const actions = {
  // mutationsで状態を変更する
  // Firebaseのデータベースに追加するためcommit を dispatchに修正
  updateTask({ dispatch }, payload) {
    // console.log('payload', payload)
    // commit('updateTask', payload)
    dispatch('fbUpdateTask', payload)
  },
  // Firebaseのデータベースに追加するためcommit を dispatchに修正
  deleteTask({ dispatch }, id) {
    // console.log('delete id:', id)
    // commit('deleteTask', id)
    dispatch('fbDeleteTask', id)
  },
  // タスクの追加。 タスクのIDは一意のキーに設定する。 https://quasar.dev/quasar-utils/other-utils#Generate-UID
  // Firebaseのデータベースに追加するためcommit を dispatchに修正
  addTask({ dispatch }, task) {
    let taskId = uid()
    // console.log('taskId:', taskId)
    let payload = {
      id: taskId,
      task: task
    }
    // commit('addTask', payload) 
    dispatch('fbAddTask', payload)
  },
  setSearch({ commit }, value) {
    commit('setSearch', value)
  },
  setSort({ commit }, value) {
    commit('setSort', value)
  },
  // FirebaseのDBにアクセスして、ユーザのタスクを取得する. 
  fbReadData({ commit }) {
    console.log('Firebaseデータベースにアクセス');
    // console.log(firebaseAuth.currentUser.uid);
    let userId = firebaseAuth.currentUser.uid
    let userTasks = firebaseDb.ref('tasks/' + userId)

    // 初回読み込み時のローディング
    userTasks.once('value', snapshot => {
      commit('setTasksDownloaded', true)
    })
    // console.log(userTasks)
    // 対象ユーザのデータを取得. mutationsに渡す引数をセットする
    userTasks.on('child_added', snapshot => {
      console.log('snapshot:', snapshot);
      let task = snapshot.val()
      console.log('task: ', task)

      let payload = {
        id: snapshot.key,
        task: task
      }

      commit('addTask', payload)
    })

    // 対象ユーザのデータが変更されたら、即反映させる. mutationsに渡す引数をセットする
    userTasks.on('child_changed', snapshot => {
      let task = snapshot.val()
      let payload = {
        id: snapshot.key,
        updates: task
      }
      commit('updateTask', payload)
    })

    // 削除されたら、即反映させる. mutationsに渡す引数をセットする
    userTasks.on('child_removed', snapshot => {
      let taskId = snapshot.key
      commit('deleteTask', taskId)
    })

  },
  // Firebaseのデータベースへタスクを追加する
  fbAddTask({ }, payload) {
    // console.log('fbAddTask payload', payload);
    let userId = firebaseAuth.currentUser.uid
    let taskRef = firebaseDb.ref('tasks/' + userId + '/' + payload.id)
    taskRef.set(payload.task)
  },
  // 更新されたら、Firebaseのデータベースへ反映する
  fbUpdateTask({ }, payload) {
    let userId = firebaseAuth.currentUser.uid
    let taskRef = firebaseDb.ref('tasks/' + userId + '/' + payload.id)
    taskRef.update(payload.updates)
  },
  // 削除されたら、Firebaseのデータベースへ反映する
  fbDeleteTask({ }, taskId) {
    let userId = firebaseAuth.currentUser.uid
    let taskRef = firebaseDb.ref('tasks/' + userId + '/' + taskId)
    taskRef.remove()
  },



}

const getters = {
  // タスクのソート
  tasksSorted: (state) => {
    let tasksSorted = {},
      keysOrderd = Object.keys(state.tasks)

    keysOrderd.sort((a, b) => {
      let taskAProp = state.tasks[a][state.sort].toLowerCase(),
        taskBProp = state.tasks[b][state.sort].toLowerCase()
      // 昇順で並び替え
      if (taskAProp > taskBProp) return 1
      else if (taskAProp < taskBProp) return - 1
      else return 0
    })

    // console.log('keyOrderd:', keysOrderd)
    keysOrderd.forEach((key) => {
      tasksSorted[key] = state.tasks[key]
    })

    return tasksSorted
  },
  // 検索結果のタスク. それぞれのタスク一覧にgettersで取得させる
  tasksFilterd: (state, getters) => {
    let tasksSorted = getters.tasksSorted,
      tasksFilterd = {}
    if (state.search) {
      Object.keys(tasksSorted).forEach(function (key) {
        let task = tasksSorted[key],
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
    return tasksSorted
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
