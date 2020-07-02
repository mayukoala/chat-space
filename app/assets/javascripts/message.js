$(function() {


  function buildHTML(message){
    if (message.image) {
      var html =`<div class="message_block">
                  <div class="message_block__info">
                  <div class="message_block__info__name">
                    ${message.user_name}
                  </div>
                  <div class="message_block__info__datetime">
                    ${message.created_at}
                  </div>
                  </div>
                  <div class="message_block__message">
                  <p class="message_block__message__body">
                    ${message.body}
                  </p>
                  <img class="message_block__image" src="${message.image}">
                  </div>
                </div>`
    } else {
    var html =`<div class="message_block">
                <div class="message_block__info">
                  <div class="message_block__info__name">
                    ${message.user_name}
                  </div>
                  <div class="message_block__info__datetime">
                    ${message.created_at}
                  </div>
                </div>
                <div class="message_block__message">
                  <p class="message_block__message__body">
                    ${message.body}
                  </p>
                </div>
              </div>`
            };
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({ 
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){ 
      var html = buildHTML(data);
      $('.chat_main__message_list').append(html);
      $('.chat_main__message_list').animate({ scrollTop: $('.chat_main__message_list')[0].scrollHeight});
      $('.new_message')[0].reset();
      $('.send_btn').prop('disabled', false);
    })
    .fail(function() {
      alert('メッセージ送信に失敗しました');
      $('.new_message')[0].reset();
      $('.send_btn').prop('disabled', false);
    });
  });


  var reloadMessages = function() {
    var last_message_id = $('.message_block:last').data("message-id");
    $.ajax({
      url: "groups/${json.id}/api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      console.log('succcess');
    })
    .fail(function() {
      alert('error');
    })
  }
});