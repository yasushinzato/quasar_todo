<template>
  <transition appear enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
    <!-- ヘッダーを表示 -->
    <!-- 設定画面の真偽値(settings.showTasksInOneList)でリストを一つにまとめて表示するか制御する -->
    <div :class="{ 'q-mt-lg' : !settings.showTasksInOneList}">
      <!-- 設定画面の真偽値でリストを一つにまとめて表示するか制御する -->
      <list-header v-if="!settings.showTasksInOneList" bgcolor="bg-green-4">タスク完了</list-header>

      <!-- タスク一覧 タスクがないときバーが表示されるので、非表示にする-->
      <q-list separator bordered>
        <!-- <q-list separator bordered> -->
        <task v-for="(task, key) in tasksTodoCompleted" :key="key" :task="task" :id="key"></task>
      </q-list>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ["tasksTodoCompleted"],
  // 設定情報ページのリストまとめて表示の真偽値を取得
  computed: {
    ...mapGetters("settings", ["settings"])
  },
  components: {
    task: require("components/Tasks/Task.vue").default,
    "list-header": require("components/Shared/ListHeader.vue").default
  }
};
</script>

<style>
</style>
