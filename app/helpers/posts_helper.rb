module PostsHelper
  def generate_markdown(text)
    Kramdown::Document.new(text).to_html.html_safe
  end

  def cleanup(text)
    html = generate_markdown(text)
    Sanitize.fragment(html)
  end
end
