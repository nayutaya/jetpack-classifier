
require "rubygems"
require "sinatra"
require "json"

get "/" do
  ""
end

post "/" do
  data = params[:data]
  result = {1 => data}
  content_type :json
  JSON.unparse(result)
end
