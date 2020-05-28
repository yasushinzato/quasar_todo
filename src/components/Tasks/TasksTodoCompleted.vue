<template>
  <transition appear enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
    <!-- ヘッダーを表示 -->
    <div class="q-mt-lg">
      <list-header bgcolor="bg-green-4">タスク完了</list-header>

      <!-- タスク一覧 タスクがないときバーが表示されるので、非表示にする-->
      <q-list separator bordered>
        <!-- <q-list separator bordered> -->
        <task v-for="(task, key) in tasksTodoCompleted" :key="key" :task="task" :id="key"></task>
      </q-list>
    </div>
  </transition>
</template>

<script>
export default {
  props: ["tasksTodoCompleted"],
  components: {
    task: require("components/Tasks/Task.vue").default,
    "list-header": require("components/Shared/ListHeader.vue").default
  }
};
</script>

<style>
</style>
