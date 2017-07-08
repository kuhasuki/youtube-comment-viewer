defmodule YtComments.ApiController do
  use YtComments.Web, :controller
  require Logger

  def index(conn, _params) do
  	Logger.info "Logging works"
  	json_data = HTTPoison.get! "https://www.googleapis.com/youtube/v3/search?part=snippet&eventType=live&type=video&videoCategoryId=20&order=viewCount&regionCode=US&maxResults=50&key=AIzaSyCku4Nca2kMUfOKpDFXIBx1CZdBrmak1eU"
  	# https://www.googleapis.com/youtube/v3/videos?id=#{video_id}&key=#{System.get_env("YOUTUBE_API_KEY")}&part=snippet,statistics,contentDetails&fields=items(id,snippet(title,thumbnails(high)),statistics(viewCount),contentDetails(duration))"
    # Logger.info json_data
    data = Poison.decode!(json_data.body, keys: :atoms)
    streams = data.items
    Logger.info inspect(streams)
    render(conn, "streams.json", streams: streams)
  end
end
