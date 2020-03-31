require 'erb'
require 'date'

source = DATA.read

messages = %w(<p>こんにちは、かわいい犬ですね。</p>
<p>こんにちは、かわいい犬ですね.</p>
<p>こんにちは、かわいい犬ですね!</p>)

30.times {
  date = Date.today - (rand(5000) + 2500)
  date = date.to_time.strftime('%m/%d/%Y')
  title = %w(こんにちは おはようございます おやすみなさい).sample
  bodys = []
  (1 + rand(10)).times { bodys << messages.sample }
  body = bodys.join("\n")
  out = ERB.new(source).result(binding)
  puts out
}

__END__
AUTHOR: secondlife
TITLE: <%= title %>
STATUS: Publish
DATE: <%= date %> 00:00:00
-----
BODY:
<div class="section">
  <h3 class="title"><%= title %></h3>
  <%= body %>
</div>
-----
--------
