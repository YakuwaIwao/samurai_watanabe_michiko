function make_Th() {
  let th_text = ["選択", "ユーザーID", "パスワード"];
  for (let item in th_text) {
      $('<li>', { class:'th', text:th_text[item] }).appendTo('#list');
  }
}

function make_List(allData) {
  $(list).empty();
  make_Th();

  for (let i in allData) {
      /* チェックボックス */
      let ch = $('<li>').appendTo($(list));
      $('<input>', { type:'checkbox', name: 'ck', value:allData[i].userId }).appendTo(ch);

      /* ユーザーID */
      $('<li>', { text: allData[i].userId }).appendTo($(list));

      /* パスワード */
      $('<li>', { text: allData[i].password }).appendTo($(list));
  }

}


let inputFunc = function() {
  // 入力画面
  let adduserId = $('#userId').val();
  let addpassword = $('#password').val();
  $('.input-msg').text('');

  // エラーチェック
  let errFlag = false;
  if (adduserId.trim().length <= 0) {
      $('.input-userId').text('未入力');
      errFlag = true;
  }
  if (addpassword.trim().length <= 0) {
      $('.input-password').text('未入力');
      errFlag = true;
  }

  if (errFlag == false) {
      $('.confirm-userId').text(adduserId);
      $('.confirm-password').text(addpassword);

      $('#input').hide();
      $('#confirm').show();
  }
};

let confirmFunc = function() {
  var adduserId = $('#userId').val();
  var addpassword = $('#password').val();

  allData.push({ "userId": adduserId, "password": addpassword });
  sessionStorage.setItem('allSampleData', JSON.stringify(allData));

  $('#confirm').hide();
  $('#finish').show();
  
}

let finishFunc = function() {
  make_List(allData);
  $('#finish').hide();
};

