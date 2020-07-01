$(function() {

  function appendUsers(users) {
    var html =`<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${users.user_name}</p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${users.id}" data-user-name="${users.user_name}">追加</div>
              </div>`
    $("#user-search-result").append(html);
  }
  function appendNoUser() {
    var html =`<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">ユーザーが見つかりません</p>
               </div>`
    $("#user-search-result").append(html);
  }   

  function appendUserToMember(data_user_id, data_user_name) {
    var html = `
          <div class='chat-group-user'>
            <input name='group[user_ids][]' type='hidden' value='${data_user_id}'>
            <p class='chat-group-user__name'>${data_user_name}</p>
            <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
          </div>
          `
    $("#chat-group-users.js-add-user").append(html);
  } 
  

  $("#user-search-field").on("keyup", function() {
    let input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      dataType: 'json',
      data: { keyword: input }
      
    })
      .done(function(users) {
        $("#user-search-result").empty();
        if (users.length !== 0) {
          users.forEach(function(users) {
            appendUsers(users);
          });
        } else if (input.length == 0) {
          return false;
        } else {
            appendNoUser();
        }
      })
      .fail(function() {
        alert("通信エラーです。ユーザーが表示できません");
      });
   });

  $("#user-search-result").on('click', ".user-search-add.chat-group-user__btn.chat-group-user__btn--add", function(){
    let data_user_id = $(this).data('user-id');
    let data_user_name = $(this).data('user-name');
    appendUserToMember(data_user_id, data_user_name)
   });
});
