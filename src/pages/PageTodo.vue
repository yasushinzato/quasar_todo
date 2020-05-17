<template>
  <q-page class="q-pa-md">
    <q-list separator bordered>
      <!-- チェックされたら、薄い緑色、未完了は薄いオレンジ -->
      <q-item
        v-for="task in tasks"
        :key="task.id"
        @click="task.completed = !task.completed"
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
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      tasks: [
        {
          id: 1,
          name: "QuasarでTodo作成",
          completed: false,
          dueDate: "2020/05/17",
          dueTime: "18:00"
        },
        {
          id: 2,
          name: "「あなたはなぜチェックリストを使わないのか？」を読む",
          completed: false,
          dueDate: "2020/05/18",
          dueTime: "13:00"
        },
        {
          id: 3,
          name: "「時間は存在しない」を読む",
          completed: true,
          dueDate: "2020/05/18",
          dueTime: "15:30"
        }
      ]
    };
  },
  methods: {},
  components: {}
};
</script>

<style>
</style>
