$('#copy').on('click', function() {
  copy(memos[id].value.toString())
})
$('#back').on('click', function() {
  location.href = '../listview/listview.html'
})
