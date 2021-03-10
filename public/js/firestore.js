// サブスクの新規追加処理
function addSubsc() {
  const form = document.forms['add_form'].getElementsByTagName("input");

  // TODO: ログイン中のユーザ情報を取得
  const user = firebase.auth().currentUser;

  // TODO: Firestoreオブジェクトのインスタンスを作成
  const  db = firebase.firestore();

  // TODO: サブスクの新規追加とユーザ情報への追加
  db.collection('subscription').add({
    title: form['title'].value, // サブスク名
    price: form['price'].value  // 価格
  })
    .then((docRef) => { // 成功した場合
      // ユーザのサブスク一覧に追加
      db.collection('users').doc(user.uid).collection('subscription').doc(docRef.id).set({
        id: docRef.id,
        startedAt: form['startedAt'].value
      });

      // ページの表示を変更する
      pageInit();

      // モーダルを閉じる
      switchAddModal();
    })
    .catch((error) => { // 失敗した場合
      console.error("Error adding document: ", error);
    });
}


// サブスクの一覧を取得
function printSubscription() {
  // 一覧の追加先エレメントを変数へ格納
  const user = firebase.auth().currentUser;

  // サブスク一覧リストを初期化
  subscription_list = {};

  // TODO: Firestoreオブジェクトのインスタンスを作成
  const  db = firebase.firestore();

  // TODO: サブスクの一覧を取得
  db.collection('users')
    .doc(user.uid).collection('subscription')
    .get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      // 取得したサブスクを1個ずつ処理
      db.collection('subscription').doc(doc.data().id).get()
        .then((subsc_doc) => {
          if (doc.exists) { // ドキュメントが取得できたとき
            // 開始日の日付のみを取得
            const day = new Date(doc.data().startedAt);

            // サブスク一覧に格納
            subscription_list[doc.data().id] =
              {
                id: doc.data().id,
                title: subsc_doc.data().title,
                price: subsc_doc.data().price,
                day: ( '00' + day.getDate() ).slice( -2 ),
                startedAt: doc.data().startedAt,
                type: 'month',
              }
          } else {  // ドキュメントが見つからなかった場合
            console.log("No such document!");
          }
        }).catch((error) => {
        console.log("Error getting document:", error);
      })
        .then(() => {
          updateList();
        })
    });
  });
}


// 編集結果の保存
function saveEdit(id) {
  // フォームを取得
  const form = document.forms['edit_form'].getElementsByTagName("input");
  const  db = firebase.firestore();

  // TODO: サブスクの情報を更新
  db.collection('subscription').doc(id).update({
    title: form['title'].value, // サブスク名
    price: form['price'].value  // 価格
  })
    .then((docRef) => { // 成功した場合
    })
    .catch((error) => { // 失敗した場合
      console.error("Error adding document: ", error);
    });

  // ページ内のコンテンツをリフレッシュ
  pageInit();

  // 非表示にする
  document.getElementById('edit_modal_layout').style.display = 'none';
}


// 解約処理
function subsc_cancel(id) {
  // TODO: ログイン中のユーザ情報を取得
  const user = firebase.auth().currentUser;

  // TODO: Firestoreオブジェクトのインスタンスを作成
  const  db = firebase.firestore();

  // TODO: サブスクをFirestoreから削除する
  db.collection('subscription').doc(id).delete().then(() => {
    console.log("Document successfully deleted!");
  }).catch((error) => {
    console.error("Error removing document: ", error);
  });

  // TODO: サブスクのIDをユーザ情報から削除する
  db.collection('users').doc(user.uid).collection('subscription').doc(id).delete().then(() => {
    console.log("Document successfully deleted!");
  }).catch((error) => {
    console.error("Error removing document: ", error);
  });

  // ページ内のコンテンツをリフレッシュ
  pageInit();

  // 非表示にする
  document.getElementById('edit_modal_layout').style.display = 'none';
}
