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
  document.getElementById('cancel_button').onclick = function () {subsc_cancel(id)};

  // 表示する
  document.getElementById('edit_modal_layout').style.display = 'block';
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

  // フォームを取得
  const form = document.forms['add_form'].getElementsByTagName("input");
  form['title'].value = '';
  form['price'].value = 0;

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

// サブスク一覧を更新
function updateList() {
  // サブスクの一覧を取得
  const list_area = document.getElementById('subsc_list');

  // サブスク一覧を初期化
  list_area.innerHTML = '';

  // サブスクの一覧から1つずつDOMに追加していく
  for(let subscription in subscription_list) {
    // エレメントを作成
    let new_element = document.createElement('tr');

    // HTMLを書き込み
    new_element.innerHTML = `
            <td class="pay_day"><span>${subscription_list[subscription].day}</span></td>
            <td class="pay_name" onclick="openEditModal('${subscription}')">${subscription_list[subscription].title}</td>
            <td class="pay_price"><span>&yen;${subscription_list[subscription].price.toLocaleString()}</span>/month</td>
          `

    new_element.onclick = 'openEditModal(doc.data().id)';

    // 一覧に追加
    list_area.appendChild(new_element);
  }

    // 合計額を更新
    calcSum();
}
