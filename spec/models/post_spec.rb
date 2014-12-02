require 'rails_helper'

RSpec.describe Post, :type => :model do
  describe '#all_tags=' do
    it 'adds tags to post' do
      post = Post.new(title: Faker::Lorem.word, body: Faker::Lorem.paragraph)
      post.all_tags = 'try, these, tags'
      expect(post.tags.length).to be 3
    end

    it 'creates new tags if they do not exist' do
      post = Post.new(title: Faker::Lorem.word, body: Faker::Lorem.paragraph)
      post.all_tags = 'sum, w33rd, tag$z'
      expect(Tag.where(name: 'w33rd')).to_not be nil
    end
  end
end
