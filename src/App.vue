<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  // getSettingsでローカルストレージの設定情報を取得
  methods: {
    ...mapActions("settings", ["getSettings"]),
    ...mapActions("auth", ["handleAuthStateChange"])
  },
  mounted() {
    this.getSettings();
    this.handleAuthStateChange();
  }
};
</script>

<style>
.text-strikethrough {
  text-decoration: line-through;
}
</style>
