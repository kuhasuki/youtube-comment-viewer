defmodule YtComments.ApiStreamsController do
  use YtComments.Web, :controller
  require Logger

  def index(conn, _params) do
  	Logger.info "Logging works"
  	json_data = HTTPoison.get! "https://www.googleapis.com/youtube/v3/search?part=snippet&eventType=live&type=video&videoCategoryId=20&order=viewCount&regionCode=US&maxResults=50&key=#{System.get_env("YOUTUBE_API_KEY")}"
    data = Poison.decode!(json_data.body, keys: :atoms)
    streams = data.items
    Logger.info inspect(streams)
    render(conn, "streams.json", streams: streams)
  end
end
