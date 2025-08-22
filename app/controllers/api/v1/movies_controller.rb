class Api::V1::MoviesController < ApplicationController
  def index
    movies = Movie.all.with_attached_thumbnail.with_attached_videos
    render json: movies.map { |movie| movie_json(movie) }
  end

  def show
    movie = Movie.find(params[:id])
    render json: movie_json(movie)
  end

  def create
    movie = Movie.new(movie_params)
    if movie.save
      if params[:movie][:thumbnail]
        movie.thumbnail.attach(params[:movie][:thumbnail])
      end
      if params[:movie][:videos]
        Array(params[:movie][:videos]).each { |video| movie.videos.attach(video) }
      end
      render json: movie_json(movie)
    else
      render json: { error: "Failed to save" }, status: 422
    end
  end

  private

  def movie_params
    params.require(:movie).permit(:title, :description)
  end

  def movie_json(movie)
    {
      id: movie.id,
      title: movie.title,
      description: movie.description,
      thumbnail_url: movie.thumbnail.attached? ? url_for(movie.thumbnail) : nil,
      videos: movie.videos.map { |video| url_for(video) }
    }
  end
end
