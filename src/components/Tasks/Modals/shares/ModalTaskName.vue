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
      v-select-all
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
  props: ["name"],
  directives: {
    // 入力して再選択した場合、テキスト全体を選択状態にする。
    selectAll: {
      inserted(el) {
        // 開発ツールでCSSを確認する。 .のつけ忘れに注意すること
        let input = el.querySelector(".q-field__native");
        input.addEventListener("focus", () => {
          if (input.value.length) {
            input.select();
          }
        });
      }
    }
  }
};
</script>

<style>
</style>
