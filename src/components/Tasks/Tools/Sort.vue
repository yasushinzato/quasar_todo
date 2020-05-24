<template>
  <q-select
    v-model="sortBy"
    :options="options"
    emit-value
    map-options
    class="col q-ml-sm"
    filled
    label="ソート選択"
    stack-label
  />
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      // sortBy: null, ストア側に変数を定義

      options: [
        {
          label: "名称",
          value: "name"
        },
        {
          label: "日付",
          value: "dueDate"
        }
      ]
    };
  },
  computed: {
    ...mapState("tasks", ["sort"]),
    sortBy: {
      get() {
        return this.sort;
      },
      set(value) {
        this.setSort(value);
      }
    }
  },
  methods: {
    ...mapActions("tasks", ["setSort"])
  }
};
</script>

<style scoped>
.q-select {
  flex: 0 0 200px;
}
</style>
