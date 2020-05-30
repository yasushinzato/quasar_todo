<template>
  <q-page padding>
    <!-- タブ。scriptもコピー https://quasar.dev/vue-components/tab-panels#With-QTabs -->
    <q-card class="auth-tabs">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <!-- <q-tab name="login" label="ログイン" />
        <q-tab name="register" label="登録" />-->
        <q-tab name="ログイン" label="ログイン" />
        <q-tab name="登録" label="登録" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <!-- <q-tab-panel name="login"> -->
        <q-tab-panel name="ログイン">
          <login-register :tab="tab" />
        </q-tab-panel>

        <!-- <q-tab-panel name="register"> -->
        <q-tab-panel name="登録">
          <login-register :tab="tab" />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      tab: "ログイン"
    };
  },
  components: {
    "login-register": require("components/Auth/LoginRegister.vue").default
  }
};
</script>

<style>
.auth-tabs {
  max-width: 500px;
  margin: 0 auto;
}
</style>
