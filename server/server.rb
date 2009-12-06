
require "rubygems"
require "sinatra"
require "json"

require "naive_bayes_categorizer"

thresholds = {
  "rail" => 1.0,
  "rest" => 3.5,
}

tokenizer   = BigramTokenizer.new
categorizer = NaiveBayesCategorizer.load(tokenizer, "out.full.db")

process = proc {
  #data = JSON.parse(params[:data])

  title = "愛知・貸金業者遺体発見　遺棄容疑で男逮捕　殺害も捜査"
  title = "ＪＲ西歴代３社長を再び不起訴　宝塚線事故で神戸地検"
  category = categorizer.categorize(title, thresholds) || "unknown"

  result = {
    "category" => category,
  }

  #content_type :json
  JSON.unparse(result)
}

p process[]

=begin
get "/" do
  process[]
end

post "/" do
  process[]
end
=end
