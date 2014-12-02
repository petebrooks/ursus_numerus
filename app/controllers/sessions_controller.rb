class SessionsController < ApplicationController
  def new
  end

  def create
    user = User.find_by_login(params[:session][:login])
    password = params[:session][:password]
    if user && user.authenticate(password)
      session[:user] = user.id
      redirect_to blog_path
    else
      render :new
    end
  end
end
