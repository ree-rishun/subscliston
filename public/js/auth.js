// 認証処理作成箇所
function auth() {
  // TODO: Googleプロバイダオブジェクトのインスタンスを作成
  const provider = new firebase.auth.GoogleAuthProvider();

  // TODO: Google認証のポップアップ表示
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => { // 認証成功
      // TODO: ユーザ情報の更新関数
      updateUserinfo(result.user);

      // モーダルを非表示にする
      document.getElementById('signin_modal_layout').style.display = 'none';

      // ページ情報を読み込む
      pageInit();
    })
    .catch(function (error) { // 認証失敗
      alert("アカウント連携に失敗しました");
      console.log({ error });
    });
}

// ユーザ情報登録/更新
function updateUserinfo(user) {
  // TODO: Firestoreオブジェクトのインスタンスを作成
  const  db = firebase.firestore();

  // TODO: DBにユーザ情報を登録
  db.collection("users").doc(user.uid).set({
    uid: user.uid,                  // UID
    displayName: user.displayName,  // 表示名
    photoURL: user.photoURL         // アイコン
  })
    .then(() => { // 成功時
      console.log("Document successfully written!");
    })
    .catch((error) => { // 失敗時
      console.error("Error writing document: ", error);
    });
}
