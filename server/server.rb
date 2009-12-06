
require "rubygems"
require "sinatra"
require "json"

require "naive_bayes_categorizer"

thresholds = {
  "a" => 1.0,
  "b" => 3.5,
}

tokenizer   = BigramTokenizer.new
categorizer = NaiveBayesCategorizer.load(tokenizer, "out.full.db")

process = proc { |records|
  records.each { |record|
    title = record["title"].strip
    unless title.empty?
      category = categorizer.categorize(title, thresholds) || "unknown"
      record["visible"] = (category == "a")
    end
  }
  records
}

get "/" do
  content_type :json
  JSON.unparse(process[JSON.parse(params[:data])])
end

post "/" do
  content_type :json
  JSON.unparse(process[JSON.parse(params[:data])])
end
