defmodule YtComments.ApiController do
  use YtComments.Web, :controller

  def index(conn, _params) do
    render conn, "index.json"
  end
end
