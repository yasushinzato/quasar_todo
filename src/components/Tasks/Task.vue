<template>
  <!-- チェックされたら、薄い緑色、未完了は薄いオレンジ -->
  <!-- 長押し(Touch Hold)で編集モーダルを表示する.メソッドで実装しないとモーダルが全表示されて閉じるボタンとかが使えなくなるので、メソッドで定義 -->
  <q-item
    @click="updateTask({ id: id, updates: { completed: !task.completed }})"
    :class="!task.completed ?  'bg-orange-1' : 'bg-green-1'"
    v-touch-hold:1000.mouse="showEditTaskModal"
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
    <!-- 日付と時間。横並びで日付と時間は縦並び. 日付が登録されてなければ非表示 -->
    <q-item-section v-if="task.dueDate" side>
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
      <div class="row">
        <!-- .stopで親要素のボタンクリックによるcompletedを更新しないようにする -->
        <q-btn @click.stop="showEditTaskModal" flat round color="primary" dense icon="edit" />
        <q-btn @click.stop="promptToDelete(id)" flat round color="red" dense icon="delete" />
      </div>
    </q-item-section>

    <!-- 修正用モーダルの表示 -->
    <q-dialog v-model="showEditTask">
      <edit-task @close="showEditTask = false" 
      :task="task"
      :id="id"/>
    </q-dialog>
  </q-item>

</template>

<script>
import  { mapActions } from 'vuex'

export default {
  props: ["task", "id"],
  data() {
    return {
      showEditTask: false
    }
  },
  methods: {
    showEditTaskModal() {
      // console.log("クリック長押し機能の確認")
      this.showEditTask = true
    },
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
  },
  components: {
    "edit-task": require("components/Tasks/Modals/EditTask.vue").default
  }
};
</script>

<style>
</style>
