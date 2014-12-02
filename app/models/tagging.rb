class Tagging < ActiveRecord::Base
  belongs_to :post
  belongs_to :tag

  validates :user, :tag, presence: true
end
