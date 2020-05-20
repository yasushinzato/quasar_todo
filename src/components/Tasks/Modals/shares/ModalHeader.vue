<template>
  <q-card-section class="row">
    <div class="text-h6">
      <slot></slot>
    </div>
    <q-space />
    <!-- クローズ処理(ClosePopup API)は　https://quasar.dev/vue-directives/close-popup　参照 -->
    <q-btn push dense v-close-popup color="primary" round icon="close" />
  </q-card-section>
</template>

<script>
export default {};
</script>

<style>
</style>
