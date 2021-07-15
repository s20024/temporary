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
    li.className = "list_class"
    li.id = i
    var a = document.createElement('a')
    a.href = `../view/view.html?id=${i}`
    a.id = `link${i}`
    a.className = "link"
    var div_cell = document.createElement('div')
    div_cell.className = "listview_cell"
    div_cell.id = `listview_cell_id${i}`
    var title = document.createElement('h3')
    title.className = 'list_cell_title'
    title.id = `h3${i}`
    title.textContent = memos[i].name
    var content = document.createElement('p')
    content.className = 'list_cell_content'
    content.id = `content${i}`
    content.textContent = memos[i].value
    document.getElementById('list').appendChild(li)
    document.getElementById(`${i}`).appendChild(a)
    document.getElementById(`link${i}`).appendChild(div_cell)
    document.getElementById(`listview_cell_id${i}`).appendChild(title)
    document.getElementById(`listview_cell_id${i}`).appendChild(content)
  }
})

$('#changetoinput').on('click', function() {
  location.href = '../input/input.html'
})
