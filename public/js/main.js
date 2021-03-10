// 契約中のサブスクの一覧
let subscription_list = {};

// 合計額の計算処理
function calcSum() {
  // 合計額格納用の変数
  let total_price = 0;

  // 全サブスクの値を合計
  for(let subscription in subscription_list) {
    total_price += Number(subscription_list[subscription].price);
  }

  // 合計額の表示を変更
  document.getElementById('subsc_total_price').innerHTML = '&yen;' + total_price.toLocaleString();
}

// サブスクの一覧を表示
function printSubscription() {
  // 一覧の追加先エレメントを変数へ格納
  const list_area = document.getElementById('subsc_list');
  const user = firebase.auth().currentUser;
  const  db = firebase.firestore();

  // サブスクの一覧を取得
  db.collection('users').doc(user.uid).collection('subscription').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      db.collection('subscription').doc(doc.data().id).get()
        .then((subsc_doc) => {
          if (doc.exists) {
            console.log("Document data:", subsc_doc.data());
            const day = new Date(doc.data().startedAt);
            subscription_list[doc.data().id] =
              {
                id: doc.data().id,
                title: subsc_doc.data().title,
                price: subsc_doc.data().price,
                day: ( '00' + day.getDate() ).slice( -2 ),
                startedAt: doc.data().startedAt,
                type: 'month',
              }
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        }).catch((error) => {
        console.log("Error getting document:", error);
      })
        .then(() => {
          // サブスク一覧を初期化
          list_area.innerHTML = '';

          // サブスクの一覧から1つずつDOMに追加していく
          for(let subscription in subscription_list) {
          // エレメントを作成
          let new_element = document.createElement('tr');

          // HTMLを書き込み
          new_element.innerHTML = `
            <td class="pay_day"><span>${ subscription_list[subscription].day }</span></td>
            <td class="pay_name" onclick="openEditModal('${ subscription }')">${ subscription_list[subscription].title }</td>
            <td class="pay_price"><span>&yen;${ subscription_list[subscription].price.toLocaleString() }</span>/month</td>
          `

          new_element.onclick = 'openEditModal(doc.data().id)';

          // 一覧に追加
          list_area.appendChild(new_element);

          // 合計額を更新
          calcSum();
        }
      })
    });
  });
}

// 編集モーダルの表示
function openEditModal(id) {
  // フォームを取得
  const form = document.forms['edit_form'].getElementsByTagName("input");

  // フォームに情報を追加
  form['title'].value = subscription_list[id].title;
  form['price'].value = subscription_list[id].price;
  document.getElementById('startAt').innerText = subscription_list[id].startedAt;

  // ボタンを上書き
  document.getElementById('save_button').onclick = function () {saveEdit(id)};

  // 表示する
  document.getElementById('edit_modal_layout').style.display = 'block';
}

// 編集結果の保存
function saveEdit(id) {
  // フォームを取得
  const form = document.forms['edit_form'].getElementsByTagName("input");
  const  db = firebase.firestore();

  // TODO: Firebaseへの追加処理

  // サブスク情報の上書き
  db.collection('subscription').doc(id).update({
    title: form['title'].value, // サブスク名
    price: form['price'].value  // 価格
  })
    .then((docRef) => { // 成功した場合
    })
    .catch((error) => { // 失敗した場合
      console.error("Error adding document: ", error);
    });

  pageInit();

  // 非表示にする
  document.getElementById('edit_modal_layout').style.display = 'none';
}

// 今月の年月を取得
function getMonth() {
  // 今日の日付を取得
  const today = new Date;

  // 年月を表示
  document.getElementById('this_month').innerText =
    today.getFullYear() + '/' + ( '00' + (today.getMonth() + 1) ).slice( -2 );
}

// 初期日を追加
function dateInit() {
  // 今日の日付を取得
  const today = new Date;

  // 年月を表示
  document.forms['add_form'].getElementsByTagName("input")['startedAt'].value =
    today.getFullYear() + '-' + ( '00' + (today.getMonth() + 1) ).slice( -2 ) + '-' + ( '00' + (today.getDate()) ).slice( -2 );
}

// 新規追加モーダルを開く
function switchAddModal() {
  let addModal = document.getElementById('add_modal_layout');

  // 日付選択部分の初期化
  dateInit();

  if (addModal.style.display === 'block') {
    addModal.style.display = 'none';
  } else {
    addModal.style.display = 'block';
  }
}

// ページ情報の初期化
function pageInit() {
  // 年月を表示
  getMonth();

  // サブスクの一覧を表示
  printSubscription();
}

// 新規追加処理
function addSubsc() {
  const form = document.forms['add_form'].getElementsByTagName("input");
  const user = firebase.auth().currentUser;
  const  db = firebase.firestore();

  // TODO: Firebaseへの追加処理

  // DBにユーザ情報を登録
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

      pageInit();
      // モーダルを閉じる
      switchAddModal();
    })
    .catch((error) => { // 失敗した場合
      console.error("Error adding document: ", error);
    });
}
