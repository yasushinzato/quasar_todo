# QuasarでTodo

Vue.jsベースのフレームワーク。
Quasarでいろいろなプラットフォーム(Windows,Mac,android,iphone)と
PCとモバイルでの開発が容易にできるフレームワーク

`npm install -g @quasar/cli`
`quasar create hogeProject`
`quasar dev`
起動は2分くらいと遅いが、ソースコードを保存すると即反映されるようになる。

## firebaseホスティング
https://awesome-todo-7b83c.web.app/#/auth


- 利用イメージ
![usage_image](./Doc_image/Quasar_todo.gif)

- PCサイズでの画面表示  
![PC_image](./Doc_image/PC_size.PNG)


- モバイルサイズでの画面表示  
![mobile_image](./Doc_image/mobile_size.PNG)


## firebase
bootファイルを使用してプロジェクトにFirebaseを追加する。

https://quasar.dev/quasar-cli/boot-files#Usage-of-boot-files

対象フォルダで以下コマンドを実行(名前はfirebaseにする。)
`quasar new boot firebase`
quasar.conf.jsファイルに`boot:['firebase']`を記述する

boot\firebase.js
が作られるので、→の記述を行う。`boot:['firebase']`

Node.jsアプリを構成する。
ステップ 3: Firebase SDK を追加して Firebase を初期化する
https://firebase.google.com/docs/web/setup?authuser=0#node.js-%E3%82%A2%E3%83%97%E3%83%AA
`npm install --save firebase`
上で決めた名前のjsファイルにコピーして貼り付ける。今回は認証だけなので、firestoreは除いておく。
```javascript
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
// import "firebase/firestore";
```

```javascript
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: ,
    authDomain: ,
    databaseURL: "https://awesome-todo-7b83c.firebaseio.com",
    projectId: "awesome-todo-7b83c",
    storageBucket: "awesome-todo-7b83c.appspot.com",
    messagingSenderId: "729272041436",
    appId: "1:729272041436:web:48e2d6ca7d0c418b629919"
  };
  // Initialize Firebase
  // 認証用で下記の通り書き換える
  let firebaseApp = firebase.initializeApp(firebaseConfig);
  let firebaseAuth = firebaseApp.auth()

  export { firebaseAuth }
```

### URLでログイン状態によりauthページを表示させる
コマンドを実行する
`quasar new boot router-auth`  
quasar.config.js
が作られるので、→の記述を行う。`boot:['router-auth']`

### firebaseへデプロイ
Firebaseへホスティングする。
フォルダーはdist/spa を指定する。
```
quasar build
firebase init
firebase deploy
```

