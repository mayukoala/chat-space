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
      console.log("ibent")
   });
});
