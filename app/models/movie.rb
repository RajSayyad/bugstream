class Movie < ApplicationRecord
  has_one_attached :thumbnail
  has_many_attached :videos
end
