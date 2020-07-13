function make_Th() {
  var th_text = ["選択", "ユーザーID", "パスワード"];
  for (var item in th_text) {
      $('<li>', { class:'th', text:th_text[item] }).appendTo('#list');
  }
}

function make_List(allData) {
  $(list).empty();
  make_Th();

  for (var i in allData) {
      /* チェックボックス */
      var ch = $('<li>').appendTo($(list));
      $('<input>', { type:'checkbox', name: 'ck', value:allData[i].userId }).appendTo(ch);

      /* ユーザーID */
      $('<li>', { text: allData[i].userId }).appendTo($(list));

      /* パスワード */
      $('<li>', { text: allData[i].password }).appendTo($(list));
  }

}


let inputFunc = function() {
  var adduserId = $('#userId').val();
  var addpassword = $('#password').val();
  $('.input-msg').text('');

  // エラーチェック
  let errFlg = false;
  if (adduserId.trim().length <= 0) {
      $('.input-userId').text('未入力');
      errFlg = true;
  } 
  if (addpassword.trim().length <= 0) {
      $('.input-password').text('未入力');
      errFlg = true;
  }

  if (errFlg == false) {
      $('.confirm-userId').text(adduserId);
      $('.confirm-password').text(addpassword);

      $('#input').hide();
      $('#confirm').show();
      $('#finish').hide();

  }


};

let confirmFunc = function() {

  var adduserId = $('#userId').val();
  var addpassword = $('#password').val();

  allData.push({ "userId": adduserId, "password": addpassword });
  sessionStorage.setItem('allSampleData', JSON.stringify(allData));

  $('#input').hide();
  $('#confirm').hide();
  $('#finish').show();
};

let confirmUpdateFunc = function(updateIndex) {
  // var adduserId = $('#userId').val();
  var password = $('#password').val();

  // allData.push({ "userId": adduserId, "password": addpassword });
  allData[updateIndex].password = password;
  sessionStorage.setItem('allSampleData', JSON.stringify(allData));

  $('#input').hide();
  $('#confirm').hide();
  $('#finish').show();

};

let finishFunc = function(msg) {
  make_List(allData);

  $('#input').hide();
  $('#confirm').hide();
  $('#finish').hide();

};
