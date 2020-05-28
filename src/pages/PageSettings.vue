<template>
  <q-page>
    <!-- <q-page padding>Setting Page</q-page> -->
    <q-list class="q-mb-md" bordered padding>
      <q-item-label header>設定</q-item-label>

      <!-- 時間表示設定 -->
      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>12時 表示形式</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-toggle color="blue" v-model="show12HourTimeFormat" />
        </q-item-section>
      </q-item>

      <!-- リスト纏め表示 -->
      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>タスクを纏めて表示</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-toggle color="blue" v-model="showTasksInOneList" />
        </q-item-section>
      </q-item>
    </q-list>

    <!-- その他 -->
    <q-list bordered padding>
      <q-item-label header>その他</q-item-label>

      <!-- ヘルプページ -->
      <q-item to="/settings/help" tag="label" v-ripple>
        <q-item-section>
          <q-item-label>ヘルプ</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="help"></q-icon>
        </q-item-section>
      </q-item>

      <!-- メール問合せ -->
      <q-item @click="email" tag="label" v-ripple>
        <q-item-section>
          <q-item-label>メール問合せ</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="mail"></q-icon>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  // data() {
  //   return {
  //     show12HourTimeFormat: true
  //   };
  // },
  computed: {
    ...mapGetters("settings", ["settings"]),
    show12HourTimeFormat: {
      get() {
        return this.settings.show12HourTimeFormat;
      },
      set(value) {
        this.setShow12HourTimeFormat(value);
      }
    },
    showTasksInOneList: {
      get() {
        return this.settings.showTasksInOneList;
      },
      set(value) {
        this.setShowTasksInOneList(value);
      }
    }
  },
  methods: {
    ...mapActions("settings", [
      "setShow12HourTimeFormat",
      "setShowTasksInOneList"
    ]),
    email() {
      window.location.href =
        "mailto:yayuki.shin@gmail?subject=Todoアプリに関して";
    }
  }
};
</script>

<style>
</style>
