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


// メイン関数
function main() {
  // TODO: Firestoreの情報を取得

  // 合計額の計算処理
  calcSum();

  // TODO: サブスクの一覧を表示
}


// DOM読み込み後にメイン関数を実行
document.addEventListener("DOMContentLoaded", main);
