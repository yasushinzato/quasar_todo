<template>
  <q-page>
    <div class="q-pa-md absolute full-width full-height column">
      <!-- データ読み込み完了したら表示 -->
      <template v-if="tasksDownloaded">
        <!-- 検索ボックス -->
        <div class="row q-mb-lg">
          <search></search>
          <sort></sort>
        </div>
        <p
          v-if="search && !Object.keys(tasksTodo).length && !Object.keys(tasksTodoCompleted).length"
        >検索結果はありません</p>

        <q-scroll-area class="q-scroll-area-tasks">
          <!-- タスクがない場合バナーで無しメッセージ表示.NoTasks.vue側のクリックイベントを呼び出し -->
          <!-- 検索結果がない場合、タスクなしメッセージを表示しない。 -->
          <no-tasks
            v-if="!Object.keys(tasksTodo).length && !search"
            @showAddTask="showAddTask = true"
          />

          <!-- タスク一覧 -->
          <tasks-todo v-if="Object.keys(tasksTodo).length" :tasksTodo="tasksTodo" />

          <!-- タスク完了一覧 -->
          <tasks-todo-complete
            v-if="Object.keys(tasksTodoCompleted).length"
            :tasksTodoCompleted="tasksTodoCompleted"
            class="q-mb-xl"
          ></tasks-todo-complete>
        </q-scroll-area>

        <!-- タスク追加ボタン. タスクが多いとタスク一覧の内容とボタンが重なったとき、一覧のクリックイベントが効かなくなるので、no-ponterを追加 -->
        <div class="absolute-bottom text-center q-mb-lg no-pointer-events">
          <!-- ボタンの反応をさせるため、all-pointerクラスを追加 -->
          <q-btn
            @click="showAddTask = true"
            round
            class="all-pointer-events"
            color="primary"
            size="24px"
            icon="add"
          />
        </div>
      </template>

      <!-- データ読み込み中はローディングを表示 　https://quasar.dev/vue-components/spinners#Usage-->
      <template v-else>
        <span class="absolute-center">
          <q-spinner color="primary" size="3em" />
        </span>
      </template>
    </div>

    <!-- 追加用モーダル(コンポーネント化) -->
    <q-dialog v-model="showAddTask">
      <add-task @close="showAddTask = false" />
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  data() {
    return {
      // 追加モーダルの表示制御
      showAddTask: false
    };
  },
  computed: {
    ...mapGetters("tasks", ["tasksTodo", "tasksTodoCompleted"]),
    ...mapState("tasks", ["search", "tasksDownloaded"])
  },
  methods: {},
  components: {
    // Task.vueはそれぞれの親であるコンポーネント側で読み込む。
    "tasks-todo": require("components/Tasks/TasksTodo.vue").default,
    "no-tasks": require("components/Tasks/NoTasks.vue").default,
    "tasks-todo-complete": require("components/Tasks/TasksTodoCompleted.vue")
      .default,
    "add-task": require("components/Tasks/Modals/AddTask.vue").default,
    search: require("components/Tasks/Tools/Search.vue").default,
    sort: require("components/Tasks/Tools/Sort.vue").default
  }
};
</script>

<style>
.q-scroll-area-tasks {
  display: flex;
  flex-grow: 1;
}
</style>
