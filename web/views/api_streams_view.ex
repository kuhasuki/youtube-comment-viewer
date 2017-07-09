defmodule YtComments.ApiStreamsView do
  use YtComments.Web, :view

  def render("streams.json", %{streams: streams}) do
  	%{streams: streams}
  end
end