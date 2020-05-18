<template>
  <!-- チェックされたら、薄い緑色、未完了は薄いオレンジ -->
  <q-item
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

</template>

<script>
export default {
  props: ["task", "id"]
};
</script>

<style>
</style>
