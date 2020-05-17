<template>
  <!-- <q-page class="flex flex-center">
    <img alt="Quasar logo" src="~assets/quasar-logo-full.svg" />
  </q-page>-->
  <q-page padding>
    <button style="position: absolute; right: 10px" @click="counter++">{{ counter }}</button>
    <input
      v-model="message"
      @keyup.esc="clearMessage"
      @keyup.enter="aleartMessage"
      v-autofocus
      :style="errorStyle"
      ref="messageInput"
    />
    <!--errorStyle は右と同じ       v-bind:class="{ 'error' : message.length > 22}"
    -->
    <button @click="clearMessage">Clear</button>

    <div>{{ message.length }}</div>

    <h5 v-if="message.length" class="border-grey">{{ message }}</h5>
    <h6 v-else>No message</h6>

    <hr />

    <!-- <p>Uppercase message: {{ messageUppercase() }}</p> methodsの場合は()が必要-->
    <p>大文字メッセージ: {{ messageUppercase }}</p>
    <p>少文字メッセージ: {{ message | messageLowercase}}</p>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      message: "I love Vue.js",
      counter: 0
    };
  },
  computed: {
    messageUppercase() {
      console.log("messageUppercase was fired");
      return this.message.toUpperCase() + this.counter;
    },
    errorStyle() {
      if (this.message.length > 22) {
        return {
          color: "red",
          background: "pink"
        };
      }
    }
  },
  methods: {
    clearMessage() {
      this.message = "";
    },
    //
    // handleKeyup(e) {
    //   console.log(e);
    //   if (e.keyCode == 27) {
    //     // Escキーを押したときメッセージをクリア
    //     this.clearMessage();
    //   } else if (e.keyCode == 13) {
    //     // Enterキーを押したとき、アラートメッセージを表示
    //     this.aleartMessage(this.message);
    //   }
    // },
    aleartMessage() {
      alert(this.message);
    }
    // messageUpperCase() {
    //   return this.message.toUpperCase();
    // }
  },
  // フィルターではdata変数にアクセスできない。値を受け取って、変更し、それを画面に出力する
  filters: {
    messageLowercase(value) {
      return value.toLowerCase();
    }
  },
  directives: {
    autofocus: {
      inserted(el) {
        el.focus();
      }
    }
  },
  mounted() {
    console(this.$refs);
    this.$refs.messageInput.className = "bg-green";
  }
  // beforeCreate() {
  //   console.log("beforeCreate 1番最初に呼ばれる");
  // },
  // created() {
  //   console.log("created 2番目に呼ばれる");
  // },
  // beforeMount() {
  //   console.log("beforeMount 3番目に呼ばれる");
  // },
  // mounted() {
  //   console.log("mounted 4番目に呼ばれる");
  // },
  // beforeUpdate() {
  //   console.log("beforeUpdate");
  // },
  // updated() {
  //   console.log("updated");
  // },
  // beforeDestroy() {
  //   console.log("beforeDestroy");
  // },
  // destroyed() {
  //   console.log("destroyed");
  // }
};
</script>

<style>
.border-grey {
  border: 1px solid grey;
}
.input,
button {
  font-size: 23px;
}
.error {
  color: red;
  background: pink;
}
</style>
