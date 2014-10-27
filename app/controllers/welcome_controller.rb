class WelcomeController < ApplicationController
  def index
  end

  def resume
  	send_file 'public/pete_brooks_resume.pdf', disposition: 'inline'
  end

  def jv
  end
end