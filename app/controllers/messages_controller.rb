class MessagesController < ApplicationController
  def index
    @messages = Message.all
  end

  def create
    Message.create(messgae_params)
  end

  private
  def message_params
    params.require(:message).permit(:body, :image).merge(user_id: current_user.id, group_id: params[:group_id])
  end
end
