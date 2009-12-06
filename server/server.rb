#! ruby -Ku

require "rubygems"
require "sinatra"
require "activesupport"

require "naive_bayes_categorizer"

thresholds = {
  "a" => 0.5,
  "b" => 3.5,
}

tokenizer   = BigramTokenizer.new
categorizer = NaiveBayesCategorizer.load(tokenizer, "bayes.db")

process = proc { |records|
  records.each { |record|
    title = record["title"].strip
    unless title.empty?
      category = categorizer.categorize(title, thresholds) || "unknown"
      record["visible"] = (category == "a") || (category == "unknown")
      p [title, category]
    end
  }
  records
}

get "/" do
  content_type :json
  ActiveSupport::JSON.encode(process[ActiveSupport::JSON.decode(params[:data])])
end

post "/" do
  content_type :json
  ActiveSupport::JSON.encode(process[ActiveSupport::JSON.decode(params[:data])])
end
