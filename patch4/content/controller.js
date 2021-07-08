function deletethis(id) {
  chrome.storage.local.get(['chromememo'], function(obj) {
    memos = obj.chromememo;
    memos.splice(id, 1)
    chrome.storage.local.set({chromememo: memos}, function() {
      alert('削除しました。')
      window.close()
    })
  })
}

