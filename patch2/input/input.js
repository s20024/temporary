let memo;
let memos;
let name;
chrome.storage.local.get(['chromememo'], function(obj){
  memos = obj.chromememo;
})

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
    chrome.storage.local.set({chromememo: [{"name": name.text, "value": memo.text}]}, function(){})
  }

  chrome.storage.local.set({chromememo: memos}, function(){
    alert('保存が完了しました');
  });
});

$('#changetolistview').on('click', function() {
  location.href = '../listview/listview.html'
})

$('#copy').on('click', function(){

  // 対象のタブのidを取得したい
  chrome.tabs.query( {active:true, currentWindow:true}, function(tabs){

    // 取得したタブid(tabs[0].id)を利用してsendMessageする
    chrome.tabs.sendMessage(tabs[0].id, {message: '選択範囲ちょうだい'}, function(item){

      // sendMessageのレスポンスが item で取得できるのでそれを使って処理する
      if(!item){
        alert('選択範囲が見つかりませんでした');
        return;
      }
      $('#memo').val(item);
    });
  });
});
