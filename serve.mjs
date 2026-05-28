import http from "node:http";
import { Readable } from "node:stream";
import handler from "./dist/server/server.js";

const PORT = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
  try {
    const protocol = req.headers["x-forwarded-proto"] || "http";
    const host = req.headers["x-forwarded-host"] || req.headers.host || `localhost:${PORT}`;
    const url = `${protocol}://${host}${req.url}`;

    const headers = new Headers();
    for (const [key, value] of Object.entries(req.headers)) {
      if (value == null) continue;
      if (Array.isArray(value)) {
        for (const v of value) headers.append(key, v);
      } else {
        headers.set(key, value);
      }
    }

    const hasBody = req.method !== "GET" && req.method !== "HEAD";
    const body = hasBody ? Readable.toWeb(req) : undefined;

    const request = new Request(url, {
      method: req.method,
      headers,
      body,
      duplex: "half",
    });

    const response = await handler.fetch(request, {}, {});

    res.statusCode = response.status;
    for (const [key, value] of response.headers.entries()) {
      res.setHeader(key, value);
    }

    if (response.body) {
      const reader = response.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(value);
      }
    }
    res.end();
  } catch (err) {
    console.error("Server error:", err);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server listening on http://0.0.0.0:${PORT}`);
});
