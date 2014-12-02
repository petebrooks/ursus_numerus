class User < ActiveRecord::Base
  has_secure_password
  has_many :posts
  validates :email, :name, :password_digest, presence: true

  def self.find_by_login(login)
    email_login = User.find_by(email: login)
    return email_login unless email_login.nil?
    User.find_by(username: login)
  end
end
