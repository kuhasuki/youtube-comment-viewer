defmodule YtComments.PageControllerTest do
  use YtComments.ConnCase

  test "GET /", %{conn: conn} do
    conn = get conn, "/"
    assert html_response(conn, 200) =~ "Youtube Live Stream Comment App"
  end
end
