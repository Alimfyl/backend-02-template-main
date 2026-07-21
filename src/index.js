const http = require("http");
const { getUsers } = require("./modules/users");

const host = "127.0.0.1";
const port = process.env.PORT || 3003;

const server = http.createServer((request, response) => {
  const url = new URL(request.url, `http://${host}`);
  const params = url.searchParams;

  if (params.size === 0) {
    response.writeHead(200, {
      "Content-Type": "text/plain; charset=utf-8",
    });
    response.end("Hello, World!");
    return;
  }

  if (params.size !== 1) {
    response.writeHead(500, {
      "Content-Type": "text/plain; charset=utf-8",
    });
    response.end();
    return;
  }

  if (params.has("hello")) {
    const name = params.get("hello");

    if (!name) {
      response.writeHead(400, {
        "Content-Type": "text/plain; charset=utf-8",
      });
      response.end("Enter a name");
      return;
    }

    response.writeHead(200, {
      "Content-Type": "text/plain; charset=utf-8",
    });
    response.end(`Hello, ${name}.`);
    return;
  }

  if (params.has("users")) {
    getUsers((error, users) => {
      if (error) {
        response.writeHead(500, {
          "Content-Type": "text/plain; charset=utf-8",
        });
        response.end();
        return;
      }

      response.writeHead(200, {
        "Content-Type": "application/json; charset=utf-8",
      });
      response.end(users);
    });

    return;
  }

  response.writeHead(500, {
    "Content-Type": "text/plain; charset=utf-8",
  });
  response.end();
});

server.listen(port, host, () => {
  console.log(`Server is running at http://${host}:${port}`);
});