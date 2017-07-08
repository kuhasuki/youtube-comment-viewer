defmodule YtComments.ApiView do
  use YtComments.Web, :view
  require Logger

  def render("index.json", %{}) do
  	%{
  		status: "ok"
  	}
  end

  def render("streams.json", %{streams: streams}) do
  	Logger.info inspect(streams)
  	%{streams: streams}
  end
end