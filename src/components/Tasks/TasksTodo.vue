<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut absolute-top"
  >
    <!-- バナーはhttps://quasar.dev/vue-components/banner参照. -->
    <!-- エラーがでるので、divで囲む。 -->
    <!-- Component template should contain exactly one root element. If you are using v-if on multiple elements, use v-else-if to chain them instead. -->
    <div>
      <!-- 設定画面の真偽値でリストを一つにまとめて表示するか制御する -->
      <list-header v-if="!settings.showTasksInOneList" bgcolor="bg-orange-4">タスク一覧</list-header>

      <!-- タスク一覧 タスクがないときバーが表示されるので、非表示にする-->
      <q-list separator bordered>
        <task v-for="(task, key) in tasksTodo" :key="key" :task="task" :id="key"></task>
      </q-list>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ["tasksTodo"],
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
