class Tagging < ActiveRecord::Base
  belongs_to :post
  belongs_to :tag

  validates :post, :tag, presence: true
end
