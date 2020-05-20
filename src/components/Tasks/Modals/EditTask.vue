<template>
  <q-card>
    <modal-header>タスク編集</modal-header>
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

export default {
  // 編集なので、propsを追記
  props: ["task", "id"],
  data() {
    return {
      taskToSubmit: {}
    };
  },
  methods: {
    // store-tasks.jsのupdateTaskを実行できるようにする
    ...mapActions("tasks", ["updateTask"]),
    submitForm() {
      // console.log("submitForm");
      this.$refs.modalTaskName.$refs.name.validate();
      // console.log(this.$refs.name);  // 未入力の場合、hasErrorがtrueになる。
      if (!this.$refs.modalTaskName.$refs.name.hasError) {
        this.submitTask();
      }
    },
    submitTask() {
      // console.log("submitTask");
      // updateではidとタスクオブジェクトを渡す。
      this.updateTask({
        id: this.id,
        updates: this.taskToSubmit
      });
      // PageTodo.vueの@closeで追加モーダルの表示を制御
      this.$emit("close");
    },
    clearDueDate() {
      this.taskToSubmit.dueDate = "";
      this.taskToSubmit.dueTime = "";
    }
  },
  components: {
    "modal-header": require("components/Tasks/Modals/shares/ModalHeader.vue")
      .default,
    "modal-task-name": require("components/Tasks/Modals/shares/ModalTaskName.vue")
      .default,
    "modal-due-date": require("components/Tasks/Modals/shares/ModalDueDate.vue")
      .default,
    "modal-due-time": require("components/Tasks/Modals/shares/ModalDueTime.vue")
      .default,
    "modal-button": require("components/Tasks/Modals/shares/ModalButton.vue")
      .default
  },
  mounted() {
    // 編集モーダルが読み込まれたとき、オブジェクトをセットする。
    this.taskToSubmit = Object.assign({}, this.task);
  }
};
</script>

<style>
</style>
