// 契約中のサブスクの一覧
let subscription_list = [
  {
    name: 'GooglePlay',
    price: 250,
    day: '02',
    type: 'month',
  },
  {
    name: 'Netflix',
    price: 1490,
    day: '07',
    type: 'month',
  },
  {
    name: 'AppleMusic',
    price: 1850,
    day: '14',
    type: 'month',
  },
  {
    name: 'GitHub',
    price: 431,
    day: '15',
    type: 'month',
  },
  {
    name: 'ZOOM',
    price: 2200,
    day: '17',
    type: 'month',
  },
  {
    name: 'Adobe',
    price: 3278,
    day: '21',
    type: 'month',
  },
]


// 合計額の計算処理
function calcSum() {
  // 合計額格納用の変数
  let total_price = 0;

  // 全サブスクの値を合計
  for(let subscription in subscription_list) {
    total_price += subscription_list[subscription].price;
  }

  // 合計額の表示を変更
  document.getElementById('subsc_total_price').innerHTML = '&yen;' + total_price.toLocaleString();
}


// サブスクの一覧を表示
function printSubscription() {
  // 一覧の追加先エレメントを変数へ格納
  const list_area = document.getElementById('subsc_list')

  // サブスクの一覧から1つずつDOMに追加していく
  for(let subscription in subscription_list) {
    // エレメントを作成
    let new_element = document.createElement('tr');

    // HTMLを書き込み
    new_element.innerHTML = `
      <td class="pay_day"><span>${ subscription_list[subscription].day }</span></td>
      <td class="pay_name">${ subscription_list[subscription].name }</td>
      <td class="pay_price"><span>&yen;${ subscription_list[subscription].price.toLocaleString() }</span>/month</td>
    `

    // 一覧に追加
    list_area.appendChild(new_element);
  }
}

// 今月の年月を取得
function getMonth() {
  // 今日の日付を取得
  const today = new Date;

  // 年月を表示
  document.getElementById('this_month').innerText =
    today.getFullYear() + '/' + ( '00' + today.getMonth() ).slice( -2 );
}

// メイン関数
function main() {
  // TODO: Firestoreの情報を取得

  // 年月を表示
  getMonth();

  // 合計額の計算処理
  calcSum();

  // サブスクの一覧を表示
  printSubscription();
}


// DOM読み込み後にメイン関数を実行
document.addEventListener("DOMContentLoaded", main);
