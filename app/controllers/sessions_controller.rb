class SessionsController < ApplicationController
  def new
  end

  def create
    user = User.find_by_login(params[:session][:login])
    password = params[:session][:password]
    if user && user.authenticate(password)
      session[:user_id] = user.id
      redirect_to blog_path
    else
      render :new
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to blog_path
  end
end
