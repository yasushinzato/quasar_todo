<template>
  <!-- レイアウトの設定は公式ページ(https://quasar.dev/layout-builder)から設定して、コピーして使える。 -->
  <!-- <q-layout view="lHh Lpr lFf"> -->
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <!-- 標準で作成されるトグルボタンは削除 -->

        <q-toolbar-title class="absolute-center">Todo App</q-toolbar-title>

        <!-- ログイン -->
        <q-btn
          v-if="!loggedIn"
          flat
          icon-right="account_circle"
          label="ログイン"
          class="absolute-right"
        />
        <!-- ログアウト -->
        <q-btn
          v-else
          @click="logoutUser"
          flat
          icon-right="account_circle"
          label="ログアウト"
          class="absolute-right"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      :breakpoint="768"
      :width="250"
      show-if-above
      bordered
      content-class="bg-primary"
    >
      <!-- 背景色をヘッダーと同じにしたので、listをdarkに指定. textをgrey-4に設定 -->
      <q-list dark>
        <q-item-label header>Navigation</q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
          class="text-grey-5"
        />
      </q-list>
    </q-drawer>

    <q-footer>
      <q-tabs>
        <!-- <q-tab icon="list" label="Todo" to="/" exact />
        <q-tab icon="settings" label="Settings" to="/#/settings" exact />-->
        <!-- ルートタブにする keyを指定することでconsoleの警告をなくす-->
        <q-route-tab
          v-for="link in essentialLinks"
          :key="link.title"
          :icon="link.icon"
          :label="link.title"
          :to="link.link"
          exact
        />
        <!-- <q-route-tab icon="settings" label="Settings" to="/settings" exact /> -->
      </q-tabs>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapActions } from "vuex"; // ログイン状態を取得。ログアウトActionをimport
import EssentialLink from "components/EssentialLink";

export default {
  name: "MainLayout",

  components: {
    EssentialLink
  },

  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: [
        {
          title: "Todo",
          caption: "Todo登録",
          icon: "list",
          link: "/"
        },
        {
          title: "Settings",
          caption: "設定画面",
          icon: "settings",
          link: "/settings/"
        }
      ]
    };
  },
  computed: {
    ...mapState("auth", ["loggedIn"])
  },
  methods: {
    ...mapActions("auth", ["logoutUser"])
  }
};
</script>

<style lang="scss">
@media screen and (min-width: 768px) {
  /* フッターはモバイルサイズでは非表示にする */
  .q-footer {
    display: none;
  }

  /* ナビゲーションバーのアクティブ箇所を強調 */
  .q-drawer {
    .q-router-link--exact-active {
      color: white !important;
    }
  }
}
</style>
