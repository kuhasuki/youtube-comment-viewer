defmodule YtComments.PageController do
  use YtComments.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
