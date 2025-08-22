class RemoveVideoUrlAndThumbnailUrlFromMovies < ActiveRecord::Migration[7.2]
  def change
    remove_column :movies, :video_url, :string
    remove_column :movies, :thumbnail_url, :string
  end
end
