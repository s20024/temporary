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
      $('#memo').val($('#memo').val() + item);
    });
  });
});
