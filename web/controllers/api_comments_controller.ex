defmodule YtComments.ApiCommentsController do
  use YtComments.Web, :controller

  def index(conn, params) do
    live_stream_json = HTTPoison.get! "https://www.googleapis.com/youtube/v3/videos?id=#{params["id"]}&key=#{System.get_env("YOUTUBE_API_KEY")}&part=liveStreamingDetails"
    stream_data = Poison.decode!(live_stream_json.body, keys: :atoms)

    # check if response contains activeLiveChatId (some streams disable chat)
    if Map.has_key?(hd(stream_data.items).liveStreamingDetails, :activeLiveChatId) do
      chat_id = hd(stream_data.items).liveStreamingDetails.activeLiveChatId
      initial_chat_json = HTTPoison.get! "https://www.googleapis.com/youtube/v3/liveChat/messages?liveChatId=#{chat_id}&part=id,snippet,authorDetails&key=#{System.get_env("YOUTUBE_API_KEY")}"
      render(conn, "comments.json", comments: Poison.decode!(initial_chat_json.body, keys: :atoms))
    else 
      render(conn, "comments.json", comments: %{"error" => "This stream has disabled live chat"})
    end  
  end
end