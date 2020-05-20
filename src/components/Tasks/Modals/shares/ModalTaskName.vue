<template>
  <!-- テキスト入力。 Validationはrulesを追加するだけでいける https://quasar.dev/vue-components/input#Validation-->
  <div class="row q-mb-sm">
    <q-input
      clearable
      outlined
      :value="name"
      @input="$emit('update:name', $event)"
      color="purple-12"
      autofocus
      ref="name"
      label="タスク内容"
      class="col"
      :rules="[val => !!val || 'タスクが未入力です']"
    >
      <slot></slot>
      <!-- ☓ボタンを実装している場合、@click="$emit('update:name', '')" -->
    </q-input>
    <!-- <q-input outlined v-model="taskToSubmit.name" label="タスク内容" /> -->
  </div>
</template>

<script>
export default {
  props: ["name"]
};
</script>

<style>
</style>
