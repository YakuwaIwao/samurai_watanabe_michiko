

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

let getStorageData = function() {
  let allData = [];
  // let sessionData = sessionStorage.getItem("allSampleData");
  // if (sessionData != null) {
  //   allData = JSON.parse(sessionData);
  // }

  console.log('call 1');

  $.ajax({
    url: './list',
    type: 'get',
    dataType: 'json',
    async: false
  })
  .done(function(data) {
    console.log('call 2');
    // alert('成功');
    // console.dir(data);
    allData = data;
  })
  .fail(function() {
    console.log('webAPI list 失敗');
  });
  ;

  console.log('call 3');

  return allData;
};

let refresh = function() {
  // if (sessionStorage.getItem("allSampleData")) {
  //   let allData = JSON.parse(sessionStorage.getItem("allSampleData"));
  //   if (allData.length > 0) make_List(allData);
  // }

  let allData = getStorageData();
  if (allData.length > 0) {
    make_List(allData);
  }

};

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

  let strJson = JSON.stringify({
    userId: adduserId,
    password: addpassword
  });

  // let allData = getStorageData();

  // allData.push({ "userId": adduserId, "password": addpassword });
  // sessionStorage.setItem('allSampleData', JSON.stringify(allData));
  $.ajax({
    url: './add',
    type: 'post',
    data: strJson,
    dataType: 'json',
    contentType: 'application/json',
    async: false
  })
  .done(function(data) {
    console.log('add success');
    $('#confirm').hide();
    $('#finish').show();
  })
  .fail(function() {
    console.log('webAPI add 失敗');
  });
  
}

let finishFunc = function() {
  // make_List(allData);
  refresh();
  $('#finish').hide();
};

