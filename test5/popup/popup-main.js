let memo;
let memos;
let name;
chrome.storage.local.get(['chromememo'], function(obj){
  memos = obj.chromememo;
})


/*
loadData();

//データの読み込み
function loadData(){
  chrome.storage.local.get(['chromememo'], function(obj){
    memo = obj.chromememo;

    //データがない場合の初期化
    if(!memo){
      memo = [ {text: "", lastUpdate: new Date()} ];
      chrome.storage.local.set({chromememo:memo}, function(){});
      return;
    }
    $('#memo').val(memo.text);
  });
}
*/

//保存ボタンが押されたとき
$('#save').on('click', function(){
  name = {
    text: $('#name').val(),
    lastUpdate: new Date()
  }
  memo = {
    text: $('#memo').val(),
    lastUpdate: new Date()
  };

  if (name.text == "") {
    name = {
      text: "non_name",
      lastUpdate: new Date()
    }
  }

  try {
    memos.push({"name": name.text, "value": memo.text})
  } catch(error) {
    chrome.storage.local.set({chromememo: []}, function(){})
  }

  chrome.storage.local.set({chromememo: memos}, function(){
    alert('保存が完了しました');
  });
});

$('#changetolistview').on('click', function() {
  location.href = '../listview/listview.html'
})
