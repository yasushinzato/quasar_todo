<template>
  <!-- バックグラウンドカラーのクラスの変数について、コード整形の自動変換でキャメルケースができなくて正常に表示できない。なので、そのまま小文字で変数を指定 -->
  <q-banner dense inline-actions :class="bgcolor" class="list-header text-white text-center">
    <span class="text-bold text-subtitle">
      <slot></slot>
    </span>
  </q-banner>
</template>

<script>
export default {
  props: ["bgcolor"]
};
</script>

<style>
.list-header {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
</style>
