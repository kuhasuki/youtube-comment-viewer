defmodule YtComments.ApiCommentsUpdateView do
  use YtComments.Web, :view
  require Logger

  def render("comments.json", %{comments: comments}) do
  	%{comments: comments}
  end
end