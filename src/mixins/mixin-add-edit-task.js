// AddモーダルとEditモーダルの共通処理
export default {
  methods: {
    submitForm() {
      // console.log("submitForm");
      this.$refs.modalTaskName.$refs.name.validate();
      // console.log(this.$refs.name);  // 未入力の場合、hasErrorがtrueになる。
      if (!this.$refs.modalTaskName.$refs.name.hasError) {
        this.submitTask();
      }
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
  }

};
