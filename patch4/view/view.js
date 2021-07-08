let memos
chrome.storage.local.get(['chromememo'], function(obj){
  memos = obj.chromememo

  var url = new URL(window.location.href)
  var params = url.searchParams
  
  var id = Number.parseInt(params.get('id'), 10)
  
  var title = document.createElement('h3')
  title.textContent = memos[id].name.toString()
  document.getElementById('titleview').appendChild(title)

  var content = document.createElement('p')
  content.textContent = memos[id].value.toString()
  document.getElementById('contentview').appendChild(content)
  // deletethis(id)
})

$('#copy_content').on('click', function() {
  var copyTarget = document.getElementById("contentview")
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
  var url = new URL(window.location.href)
  var params = url.searchParams
  
  var id = Number.parseInt(params.get('id'), 10)

  deletethis(id)
})

$('#back').on('click', function() {
  location.href = '../listview/listview.html'
})

$('#fix').on('click', function() {
  var url = new URL(window.location.href)
  var params = url.searchParams
  var id = Number.parseInt(params.get('id'), 10)
  location.href = `../fix/fix.html?id=${id}`
})
