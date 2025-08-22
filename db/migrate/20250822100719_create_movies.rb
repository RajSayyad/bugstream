class CreateMovies < ActiveRecord::Migration[7.2]
  def change
    create_table :movies do |t|
      t.string :title
      t.text :description
      t.string :video_url
      t.string :thumbnail_url

      t.timestamps
    end
  end
end
