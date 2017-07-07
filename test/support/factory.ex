defmodule YtComments.Factory do
  use ExMachina.Ecto, repo: YtComments.Repo

  def user_factory do
    %YtComments.User{
      token: "ffnebyt73bich9",
      email: "batman@example.com",
      first_name: "Bruce",
      last_name: "Wayne",
      provider: "google"
    }
  end
end