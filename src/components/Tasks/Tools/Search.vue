<template>
  <q-input v-model="searchField" outlined label="検索" class="col">
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
  }
};
</script>

<style>
</style>
