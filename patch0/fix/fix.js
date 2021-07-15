let memo;
let memos;
let name;
chrome.storage.local.get(['chromememo'], function(obj){
  memos = obj.chromememo;
})
var url = new URL(window.location.href)
var params = url.searchParams
var id = Number.parseInt(params.get('id'), 10)

loadData();

//データの読み込み
function loadData(){
  chrome.storage.local.get(['chromememo'], function(obj){
    name = obj.chromememo[id].name;
    memo = obj.chromememo[id].value;

    $('#memo').val(memo);
    $('#name').val(name)
  });
}

//保存ボタンが押されたとき
$('#fix').on('click', function(){
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

  memos[id] = {"name": name.text, "value": memo.text}
  chrome.storage.local.set({chromememo: memos}, function(){
    alert('内容を変更しました。');
  });
});

$('#changetolistview').on('click', function() {
  location.href = '../listview/listview.html'
})
