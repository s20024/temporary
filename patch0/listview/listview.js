let memos;
chrome.storage.local.get(['chromememo'], function(obj){
  memos = obj.chromememo

  try {
    console.log(memos[0])
  } catch(error) {
    memos = []
  }

  for (var i = 0; i < memos.length; i++){
    var li = document.createElement('li')
    li.id = i
    var a = document.createElement('a')
    a.textContent = memos[i].name
    a.href = `../view/view.html?id=${i}`
    document.getElementById('list').appendChild(li)
    document.getElementById(`${i}`).appendChild(a)
  }
})

$('#toinput').on('click', function() {
  location.href = '../input/input.html'
})
