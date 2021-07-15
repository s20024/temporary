let memos
var url = new URL(window.location.href)
var params = url.searchParams
var id = Number.parseInt(params.get('id'), 10)

chrome.storage.local.get(['chromememo'], function(obj){
  memos = obj.chromememo
  
  var title = document.getElementById("name")
  $('#name').val(memos[id].name)

  var content = document.getElementById("memo")
  content.textContent = memos[id].value
})

$('#copy_content').on('click', function() {
  var copyTarget = document.getElementById("memo")
  var range = document.createRange()
  range.selectNodeContents(copyTarget)

  var selection = window.getSelection()
  selection.removeAllRanges()
  selection.addRange(range)
  if(document.execCommand('copy')) {
    alert('コピーしました。')
  } else {
    alert('ctrl + c を押してください。')
  }
  window.close()
})

$('#delete_this').on('click', function() {
  if(confirm('削除していいですか？')) {
    chrome.storage.local.get(['chromememo'], function(obj) {
      memos = obj.chromememo
      memos.splice(id, 1)
      chrome.storage.local.set({chromememo: memos}, function() {
        alert('削除しました。')
        window.close()
      })
    })
  } else {
    alert('キャンセルしました。')
  }
})

$('#changetolistview').on('click', function() {
  location.href = '../listview/listview.html'
})

$('#changetofix').on('click', function() {
  var url = new URL(window.location.href)
  var params = url.searchParams
  var id = Number.parseInt(params.get('id'), 10)
  location.href = `../fix/fix.html?id=${id}`
})
