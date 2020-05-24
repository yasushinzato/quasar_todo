<template>
  <q-input
    v-model="searchField"
    @keyup.esc="searchField = ''"
    v-select-all
    outlined
    label="検索"
    class="col"
  >
    <template v-slot:append>
      <q-icon
        v-if="searchField !== ''"
        name="close"
        @click="searchField = ''"
        class="cursor-pointer"
      />
      <q-icon name="search" />
    </template>
  </q-input>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { selectAll } from "src/directives/directive-select-all";

export default {
  // store-tasks.jsからsearch変数を取得する
  computed: {
    ...mapState("tasks", ["search"]),
    searchField: {
      // return this.search;
      get() {
        return this.search;
      },
      set(value) {
        this.setSearch(value);
      }
    }
  },
  // store-tasks.jsからsetSearchアクションを使用できるようにする
  methods: {
    ...mapActions("tasks", ["setSearch"])
  },
  directives: {
    // テキストを全選択状態にする。
    selectAll
  }
};
</script>

<style>
</style>
