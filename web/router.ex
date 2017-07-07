defmodule YtComments.Router do
  use YtComments.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug YtComments.Plugs.SetUser
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", YtComments do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
  end

  scope "/auth", YtComments do
    pipe_through :browser
    
    get "/signout", AuthController, :delete
    get "/:provider", AuthController, :request
    get "/:provider/callback", AuthController, :new
  end

  # Other scopes may use custom stacks.
  # scope "/api", YtComments do
  #   pipe_through :api
  # end
end
