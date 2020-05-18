<template>
  <q-card>
    <q-card-section class="row">
      <div class="text-h6">タスク追加</div>
      <q-space />
      <!-- クローズ処理(ClosePopup API)は　https://quasar.dev/vue-directives/close-popup　参照 -->
      <q-btn push dense v-close-popup color="primary" round icon="close" />
    </q-card-section>

    <form @submit.prevent="submitForm">
      <!-- テキスト入力。 Validationはrulesを追加するだけでいける https://quasar.dev/vue-components/input#Validation-->
      <q-card-section class="q-pt-none">
        <div class="row q-mb-sm">
          <q-input
            clearable
            outlined
            color="purple-12"
            ref="name"
            v-model="taskToSubmit.name"
            label="タスク内容"
            class="col"
            :rules="[val => !!val || 'タスクが未入力です']"
          />
          <!-- <q-input outlined v-model="taskToSubmit.name" label="タスク内容" /> -->
        </div>

        <!-- 日付（カレンダー付き） https://quasar.dev/vue-components/date#With-QInput -->
        <div class="row q-mb-sm">
          <q-input outlined v-model="taskToSubmit.dueDate" label="日付">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="taskToSubmit.dueDate" @input="() => $refs.qDateProxy.hide()" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>

        <!-- 時間（時計付き） https://quasar.dev/vue-components/time#With-QInput-->
        <div class="row q-mb-sm">
          <q-input outlined v-model="taskToSubmit.dueTime" label="時間">
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-time v-model="taskToSubmit.dueTime" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </q-card-section>

      <!-- 保存ボタン. -->
      <q-card-actions align="right">
        <q-btn label="保存" color="primary" type="submit" />
      </q-card-actions>
    </form>
  </q-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      taskToSubmit: {
        name: "",
        dueDate: "",
        dueTime: "",
        complited: false
      }
    };
  },
  methods: {
    // store-tasks.jsのaddTaskを実行できるようにする
    ...mapActions("tasks", ["addTask"]),
    submitForm() {
      // console.log("submitForm");
      this.$refs.name.validate();
      // console.log(this.$refs.name);  // 未入力の場合、hasErrorがtrueになる。
      if (!this.$refs.name.hasError) {
        this.submitTask();
      }
    },
    submitTask() {
      // console.log("submitTask");
      this.addTask(this.taskToSubmit);
    }
  }
};
</script>

<style>
</style>
