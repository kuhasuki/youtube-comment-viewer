defmodule YtComments.ApiStreamsView do
  use YtComments.Web, :view
  require Logger

  def render("streams.json", %{streams: streams}) do
  	%{streams: streams}
  end
end