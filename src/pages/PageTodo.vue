<template>
  <q-page class="q-pa-md">
    <!-- タスクがない場合バナーで無しメッセージ表示.NoTasks.vue側のクリックイベントを呼び出し -->
    <no-tasks v-if="!Object.keys(tasksTodo).length" @showAddTask="showAddTask = true" />

    <!-- タスク一覧 -->
    <tasks-todo v-else :tasksTodo="tasksTodo" />

    <!-- タスク完了一覧 -->
    <tasks-todo-complete
      v-if="Object.keys(tasksTodoCompleted).length"
      :tasksTodoCompleted="tasksTodoCompleted"
    ></tasks-todo-complete>

    <!-- タスク追加ボタン -->
    <div class="absolute-bottom text-center q-mb-lg">
      <q-btn @click="showAddTask = true" round color="primary" size="24px" icon="add" />
    </div>

    <!-- 追加用モーダル(コンポーネント化) -->
    <q-dialog v-model="showAddTask">
      <add-task @close="showAddTask = false" />
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      // 追加モーダルの表示制御
      showAddTask: false
    };
  },
  computed: {
    ...mapGetters("tasks", ["tasksTodo", "tasksTodoCompleted"])
  },
  methods: {},
  components: {
    // Task.vueはそれぞれの親であるコンポーネント側で読み込む。
    "tasks-todo": require("components/Tasks/TasksTodo.vue").default,
    "no-tasks": require("components/Tasks/NoTasks.vue").default,
    "tasks-todo-complete": require("components/Tasks/TasksTodoCompleted.vue")
      .default,
    "add-task": require("components/Tasks/Modals/AddTask.vue").default
  }
};
</script>

<style>
</style>
