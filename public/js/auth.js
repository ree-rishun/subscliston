// 認証処理作成箇所
function auth() {
  const provider = new firebase.auth.GoogleAuthProvider();
  // Google認証のポップアップ表示
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      // 新規コード追加部分
      updateUserinfo(result.user);
      document.getElementById('signin_modal_layout').style.display = 'none';
      pageInit();
    })
    .catch(function (error) {
      // 認証失敗
      alert("アカウント連携に失敗しました");
      console.log({ error });
    });
}

// ユーザ情報登録/更新
function updateUserinfo(user) {
  const  db = firebase.firestore();
  // DBにユーザ情報を登録
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

  console.log(firebase.auth())
}
