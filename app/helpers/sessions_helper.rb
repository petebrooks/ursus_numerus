module SessionsHelper

  def current_user
    return nil unless session[:user_id]
    @user ||= User.find(session[:user_id])
  end

  def logged_in?
    current_user != nil
  end

end
