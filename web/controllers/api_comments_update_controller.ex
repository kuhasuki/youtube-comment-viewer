defmodule YtComments.ApiCommentsUpdateController do
  use YtComments.Web, :controller

  def index(conn, params) do
    chat_update_json = HTTPoison.get! "https://www.googleapis.com/youtube/v3/liveChat/messages?liveChatId=#{params["id"]}&part=id,snippet,authorDetails&key=#{System.get_env("YOUTUBE_API_KEY")}&pageToken=#{params["token"]}"
    response = Poison.decode!(chat_update_json.body, keys: :atoms)

    render(conn, "comments.json", comments: response)
  end
end