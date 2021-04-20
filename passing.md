
---
# input 標準入力　インプット
#### １行の取得
```javascript
process.stdin.resume();
process.stdin.setEncoding('utf8');

var 変数 = ""; // 変数の定義
var reader = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
reader.on('line', (line) => {
    変数 = line; // 変数にに入力値を代入
    
});
reader.on('close', () => {
    // 変数を使った処理
    
});
```
-　<font color="red">注意点</font>
    > 文字列として入力される

####　複数行の取得
```javascript
var 変数 = []; // リスト型の定義
var reader = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
reader.on('line', (line) => {
    lines.push(変数); // リストに格納していく

});
reader.on('close', () => {
    // リスト型を使った処理
});
```

#### 即時実行関数で表したもの
```js
(stdin => {
    const inputs = stdin.toString().trim().split('\n')
    // inputsに１行づつlist型でデータが入る
})(require('fs').readFileSync('/dev/stdin', 'utf8'))
```



---

---
# list リスト　
####　リスト型の使い方
```javascript
// リストの指定
var hoge = []; 

// リストに格納
hoge.push(変数); 

// リストの削除
hoge.pop();

// join
hoge.join('\n'); // \nで間を区切る

// リストの追加
hoge.concat(['huga']);

// リストの挿入
hoge.unshift('huga'); // 最初にhugaを挿入する

// 最初の要素を取り出す
hoge.shift();

// リストの長さ
hoge.length;

// リストのスライス
hoge.slice(値, 値) // 値から値までをスライス、短縮はできない

// リストの数値のインデックス番号に変数を入れる
hoge[数値] = 変数; 
```

#### Map/Reduce(高階関数)
```js
// リストの定義
let hoge = ['1', '2', '3'];
let huga = [1, 2, 3];

// map int変換
hoge.map(Number);

// filter 条件
huga.filter(v => v % 2 === 0); // v % 2 == 0 が成り立つものだけ取り出す

// reduce
huga.reduce((a, b) => a + b); // この関数は合計が出る

// some どれかひとつ
huga.some(v => v % 2 === 0); // どれか一つでも2で割れたらTrueを返す

// every 全て
huga.every(v => v % 2 === 0); // 全て2で割れたらTrueを返す

// flat リストの平坦化
[1, [1, 2, 3], 3].flat(); // => [1, 1, 2, 3, 3]

// map リスト内の扱い
huga.map((v, i, a) => [v, v + a[i + 1]]); // vに要素 iにvのインデックス番号 aはhuga
// ⇑⇑うえ⇑⇑この関数は、隣の文字との合計値を返す

// flatMap flatとMapを合わせたもの
[1,2,3,4,5].flatMap((v, i, a) => [v, v + a[i + 1]]); // map + flatって感じｗ 
```

#### Denger Manipulation 並び替え 反転
```js
// リストの定義
const hoge = [1, 5, 3, 12];

// sort 並び替え
hoge.sort(); // 文字として並び替える　=> hoge = [1, 12, 3, 5]
hoge.sort((a, b) => a - b); // 数字として並び替え

// reverse 反転
hoge.reverse(); // 反転

// splice 削除
list.splice(値1, 値2); //値1にインデックス番号　値2に何個要素を削除するか

// sharow copy
const huga = [...hoge] // [...hoge]の後にsort()やreverse()でsorted()やreversed()の作成
```

#### serch
```js
// リストの定義
const hoge = [1, 2, 3, 4, 5];

// find
hoge.find(v => v > 3); // 3 < v を満たす最初の値が返される　見つからなかった場合undefinedが返される

// findIndex
hoge.findIndex(v => v === 値); // 値のインデックス番号を返す

// includes
hoge.includes(値);  // hogeに値がはいっているかの条件式

// indexOf
hoge.indexOf(値); // 値のインデックス番号を返す　ない場合　-1 を返す

// lastIndexOf
hoge.lastIndexOf(値); // 最後のインデックス番号を返す
```

#### other
```js
Array.from(Array(値).keys()); // 値の数の長さのリストを作成
Array.from(Array(値).fill(0)); // fillは0うめ
```

#### リストを使うときのfor文
```js
for (var huga in hoge){
    // hugaにhogeの値が１つづつ入る
    // 注意点！！順番になるとは限らない
} 

for (var huga of hoge){
    // hugaにhogeの値が順番に入る
}

hoge.forEach (huga => {
    // hugaにhogeの値を順番良く入れる
    // １つ上の var of のに似ている
})
```

