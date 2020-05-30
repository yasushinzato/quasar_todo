<template>
  <!-- https://quasar.dev/vue-components/banner#Usage -->
  <!-- submitイベントによるページリロードを止める。 -->
  <form @submit.prevent="submitForm">
    <div class="row q-mb-md">
      <q-banner class="bg-grey-3 col">
        <template v-slot:avatar>
          <q-icon name="account_circle" color="primary" />
        </template>
        {{ tab }}してタスク管理を利用する
      </q-banner>
    </div>
    <!-- メールアドレスフィールド。エスケープキーで内容をクリア -->
    <div class="row q-mb-md">
      <q-input
        outlined
        v-model="formData.email"
        :rules="[ val => isValidEmailAddress(val) || 'メールアドレスを入力してください' ]"
        lazy-rules
        ref="email"
        class="col"
        v-on:keyup.esc="formData.password = ''"
        label="メールアドレス"
        stack-label
      />
    </div>

    <!-- パスワードフィールド。エスケープキーで内容をクリア -->
    <!-- バリデーション。 https://quasar.dev/vue-components/input#Example--Maximum-length. https://quasar.dev/vue-components/input#Example--Lazy-rules -->
    <div class="row q-mb-md">
      <q-input
        outlined
        v-model="formData.password"
        type="password"
        :rules="[ val => val.length >= 6 || 'パスワードは6文字以上でお願いします。']"
        lazy-rules
        ref="password"
        v-on:keyup.esc="formData.password = ''"
        class="col"
        label="パスワード"
        stack-label
      />
    </div>
    <div class="row">
      <!-- スペースでボタンを右端にする。 -->
      <q-space />
      <q-btn color="primary" :label="tab" type="submit" />
    </div>
  </form>
</template>

<script>
export default {
  // pageAuthからのデータを受け取り
  props: ["tab"],
  data() {
    return {
      formData: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    // [javascript valid email address]で検索
    isValidEmailAddress(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    submitForm() {
      // console.log("submitForm");
      this.$refs.email.validate();
      this.$refs.password.validate();
      if (!this.$refs.email.hasError && !this.$refs.password.hasError) {
        if (this.tab == "login") {
          console.log("ログイン");
        } else {
          console.log("登録");
        }
      }
    }
  }
};
</script>

<style>
</style>
