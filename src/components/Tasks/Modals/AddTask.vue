<template>
  <q-card>
    <modal-header>タスク追加</modal-header>
    <form @submit.prevent="submitForm">
      <q-card-section class="q-pt-none">
        <!-- タスク入力欄呼び出し. ボタンモーダルでvalidateするため、refを追記-->
        <modal-task-name :name.sync="taskToSubmit.name" ref="modalTaskName"></modal-task-name>

        <!-- 期日テキスト欄呼び出し. clearDueDateメソッドはclearとして渡す。-->
        <modal-due-date :dueDate.sync="taskToSubmit.dueDate" @clear="clearDueDate"></modal-due-date>

        <!-- 期日時間のテキスト欄呼び出し -->
        <modal-due-time v-if="taskToSubmit.dueDate" :dueTime.sync="taskToSubmit.dueTime"></modal-due-time>
      </q-card-section>

      <!-- 保存ボタン呼び出し -->
      <modal-button></modal-button>
      <!-- コンポーネント間で受け渡しができているか確認する。 -->
      <!-- <pre>{{ taskToSubmit }}</pre> -->
    </form>
  </q-card>
</template>

<script>
import { mapActions } from "vuex";
import mixinAddEditTask from "src/mixins/mixin-add-edit-task";

export default {
  mixins: [mixinAddEditTask],
  data() {
    return {
      taskToSubmit: {
        name: "",
        dueDate: "",
        dueTime: "",
        completed: false
      }
    };
  },
  methods: {
    // store-tasks.jsのaddTaskを実行できるようにする
    ...mapActions("tasks", ["addTask"]),
    submitTask() {
      // console.log("submitTask");
      this.addTask(this.taskToSubmit);
      // PageTodo.vueの@closeで追加モーダルの表示を制御
      this.$emit("close");
    }
  }
};
</script>

<style>
</style>
