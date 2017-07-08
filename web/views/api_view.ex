defmodule YtComments.ApiView do
  use YtComments.Web, :view

  def render("index.json", %{}) do
  	%{
  		status: "ok"
  	}
  end
end