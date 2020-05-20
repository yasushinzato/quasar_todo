<template>
  <!-- 日付（カレンダー付き） https://quasar.dev/vue-components/date#With-QInput -->
  <div class="row q-mb-sm">
    <!-- コンポーネント化するにあたり、v-modelから:valueへ変更 -->
    <q-input outlined :value="dueDate" label="期日" @input="$emit('update:dueDate', $event)">
      <template v-slot:append>
        <!-- ☓ボタンでの入力クリアの位置調整したいのと他項目とも連動するので、clearable 属性ではなく、実装する -->
        <q-icon v-if="dueDate" name="close" @click="$emit('clear')" class="cursor-pointer" />
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy>
            <q-date :value="dueDate" @input="$emit('update:dueDate', $event)" />
            <!-- <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale"> -->
            <!-- <q-date :value="dueDate" @input="() => $refs.qDateProxy.hide()" /> -->
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script>
export default {
  props: ["dueDate"]
};
</script>

<style>
</style>
