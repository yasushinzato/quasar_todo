<template>
  <!-- チェックされたら、薄い緑色、未完了は薄いオレンジ -->
  <q-item
    @click="updateTask({ id: id, updates: { completed: !task.completed }})"
    :class="!task.completed ?  'bg-orange-1' : 'bg-green-1'"
    clickable
    v-ripple
  >
  <!-- チェックボックス -->
    <q-item-section side top>
      <q-checkbox v-model="task.completed" />
    </q-item-section>
    <!-- タスク名 cssはApp.vue側で設定 -->
    <q-item-section>
      <q-item-label　:class="{ 'text-strikethrough' : task.completed }">{{ task.name }}</q-item-label>
    </q-item-section>
    <!-- 日付と時間。横並びで日付と時間は縦並び -->
    <q-item-section side>
      <div class="row">
        <div class="column justify-center">
          <q-icon name="event" size="18px" class="q-mr-xs" />
        </div>
        <div class="column">
          <q-item-label class="row justify-end" caption>{{ task.dueDate }}</q-item-label>
          <q-item-label class="row justify-end" caption>
            <small>{{ task.dueTime }}</small>
          </q-item-label>
        </div>
      </div>
    </q-item-section>
    <!-- 削除ボタン ボタンはquasar公式の→を参照 https://quasar.dev/vue-components/button#QBtn-API-->
    <q-item-section side>
      <!-- .stopで親要素のボタンクリックによるcomplitedを更新しないようにする -->
      <q-btn @click.stop="promptToDelete(id)" flat round color="red" dense icon="delete" />
    </q-item-section>
  </q-item>

</template>

<script>
import  { mapActions } from 'vuex'

export default {
  props: ["task", "id"],
  methods: {
    // mapActionsでstore-tasks.jsのActionを呼び出す
    ...mapActions('tasks', ['updateTask', 'deleteTask']),
    promptToDelete(id) {
      // ダイアログは　quasar公式の　https://quasar.dev/quasar-plugins/dialog
      this.$q.dialog({
        title: '確認',
        message: '本当に削除しますか？',
        ok: {
          push: true
        },
        cancel: {
          color: 'negative'
        },
        persistent: true
      }).onOk(() => {
        this.deleteTask(id)
      })
    }
  }
};
</script>

<style>
</style>
