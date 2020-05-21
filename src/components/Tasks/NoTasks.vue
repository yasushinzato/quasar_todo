<template>
  <q-banner class="bg-grey-3">
    <template v-slot:avatar>
      <q-icon name="check" color="primary" />
    </template>
    作業中のタスクはありません。タスクを登録してください。
    <template v-slot:action>
      <q-btn @click="$emit('showAddTask')" flat color="primary" label="タスク登録" />
    </template>
  </q-banner>
</template>

<script>
export default {};
</script>

<style>
</style>
