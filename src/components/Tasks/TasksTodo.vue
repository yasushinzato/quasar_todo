<template>
  <!-- バナーはhttps://quasar.dev/vue-components/banner参照. -->
  <!-- エラーがでるので、divで囲む。 -->
  <!-- Component template should contain exactly one root element. If you are using v-if on multiple elements, use v-else-if to chain them instead. -->
  <div>
    <list-header bgcolor="bg-orange-4">タスク一覧</list-header>

    <!-- タスク一覧 タスクがないときバーが表示されるので、非表示にする-->
    <q-list separator bordered>
      <task v-for="(task, key) in tasksTodo" :key="key" :task="task" :id="key"></task>
    </q-list>
  </div>
</template>

<script>
export default {
  props: ["tasksTodo"],
  components: {
    task: require("components/Tasks/Task.vue").default,
    "list-header": require("components/Shared/ListHeader.vue").default
  }
};
</script>

<style>
</style>
