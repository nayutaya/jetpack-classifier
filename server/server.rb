#! ruby -Ku

require "rubygems"
require "sinatra"
require "activesupport"

if false
  require "naive_bayes_categorizer"
  tokenizer   = BigramTokenizer.new
  categorizer = NaiveBayesCategorizer.load(tokenizer, "bayes.db")
  thresholds  = {"a" => 0.5, "b" => 3.5}
else
  require "mlp_categorizer"
  tokenizer   = BigramTokenizer.new
  categorizer = MlpCategorizer.load(tokenizer, "mlp.db")
  thresholds  = {"a" => 0.1, "b" => 0.3}
end

process = proc { |records|
  records.each { |record|
    title = record["title"].strip
    unless title.empty?
      category = categorizer.categorize(title, thresholds) || "unknown"
      visible = (category == "a") || (category == "unknown")
      p [visible, title]
    else
      visible = false
    end
    record["visible"] = visible
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
