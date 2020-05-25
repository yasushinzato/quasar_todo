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
    <!-- タスク名 cssはApp.vue側で設定. 検索結果に合致した箇所のハイライト化 -->
    <q-item-section>
      <q-item-label　:class="{ 'text-strikethrough' : task.completed }" v-html="$options.filters.searchHighlight(task.name,search)">
        <!-- {{ task.name | searchHighlight(search) }} タグが解釈されずにそのまま表示されるので、上記で実装-->
      </q-item-label>
    </q-item-section>
    <!-- 日付と時間。横並びで日付と時間は縦並び. 日付が登録されてなければ非表示 -->
    <q-item-section v-if="task.dueDate" side>
      <div class="row">
        <div class="column justify-center">
          <q-icon name="event" size="18px" class="q-mr-xs" />
        </div>
        <div class="column">
          <q-item-label class="row justify-end" caption>{{ task.dueDate | niceDate }}</q-item-label>
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
// 検索結果のテキストを取得するため、mapStateをインポート
import  { mapState, mapActions } from 'vuex'
import { date } from 'quasar'
// destructuring to keep only what is needed
const { addToDate } = date
const { formatDate } = date


export default {
  props: ["task", "id"],
  data() {
    return {
      showEditTask: false
    }
  },
  computed: {
    ...mapState('tasks', ['search'])
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
  filters: {
    // 日付書式を修正。月は変換されるが、日はDoだとthになる。なので、苦肉の策として日を強制的に表示する。
    niceDate(value) {
      return date.formatDate(value, 'MMM D') + "日"
    },
    // 検索した結果のうち、ヒットしている単語を強調する
    searchHighlight(value, search) {
      console.log('検索タスクvalue:', value);
      console.log('検索テキスト:', search);
      if (search) {
        // return value.replace(search, '<span class="bg-yellow-6">' + search + '</span>')
        // iで大文字小文字関係なくヒットした箇所、gで複数箇所でヒットした文言を正規表現で取得する
        let searchRegExp = new RegExp(search, 'ig')
        return value.replace(searchRegExp, (match) => {
          return '<span class="bg-yellow-6">' + match + '</span>'
        })
      }
      return value
    }
  },
  components: {
    "edit-task": require("components/Tasks/Modals/EditTask.vue").default
  }
};
</script>

<style>
</style>
