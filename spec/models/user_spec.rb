require 'rails_helper'

RSpec.describe User, :type => :model do
  describe 'find_by_login' do
    it 'finds a user by email' do
      email = Faker::Internet.email
      user = User.create(name: Faker::Name.name, email: email, password: Faker::Internet.password)
      expect(User.find_by_login(email)).to eq user
    end

    it 'finds a user by username' do
      username = Faker::Internet.user_name
      user = User.create(name: Faker::Name.name, email: Faker::Internet.email, username: username, password: Faker::Internet.password)
      expect(User.find_by_login(username)).to eq user
    end
  end
end
