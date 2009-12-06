
require "rubygems"
require "sinatra"

get "/" do
  ""
end

post "/" do
  content_type("application/json")
  "{foo: 'bar'}"
end
