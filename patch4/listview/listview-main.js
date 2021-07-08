let memos;
let moveurl;
chrome.storage.local.get(['chromememo'], function(obj){
  memos = obj.chromememo
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
/*
li.addEventlistener('click', ()=> {
  location.href = `./next.html?id=${item}`
})
*/
