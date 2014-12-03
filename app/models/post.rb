class Post < ActiveRecord::Base
  has_many :taggings
  has_many :tags, :through => :taggings
  belongs_to :user

  validates :user, :title, :body, presence: true

  def all_tags=(names)
    self.tags = names.split(',').map do |name|
      Tag.where(name: name.strip).first_or_create!
    end
  end

  def all_tags
    self.tags.map(&:name).join(', ')
  end

  def to_html
    Kramdown::Document.new(self.body).to_html.html_safe
  end

  def to_plain_text
    html = to_html
    Sanitize.fragment(html)
  end
end
