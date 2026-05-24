// Render.com production server
// Wraps the TanStack Start SSR handler in a Node.js HTTP server
// Also serves static files from dist/client/

import { createServer } from "node:http";
import { existsSync, readFileSync } from "node:fs";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const STATIC_DIR = join(__dirname, "dist/client");
const PORT = process.env.PORT || 3000;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript",
  ".mjs": "application/javascript",
  ".css": "text/css",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".json": "application/json",
  ".pdf": "application/pdf",
  ".webp": "image/webp",
  ".txt": "text/plain",
  ".xml": "application/xml",
};

// Import the built TanStack Start SSR handler
const { default: handler } = await import("./dist/server/server.js");

createServer(async (req, res) => {
  try {
    const pathname = req.url.split("?")[0];
    const staticPath = join(STATIC_DIR, pathname);

    // Serve static files first
    if (existsSync(staticPath) && !pathname.endsWith("/")) {
      const ext = extname(staticPath);
      const mime = MIME[ext] || "application/octet-stream";
      const file = readFileSync(staticPath);
      const headers = {
        "Content-Type": mime,
        "Content-Length": file.length,
      };
      // Cache hashed assets aggressively, everything else short-term
      if (pathname.startsWith("/assets/")) {
        headers["Cache-Control"] = "public, max-age=31536000, immutable";
      } else {
        headers["Cache-Control"] = "public, max-age=3600";
      }
      res.writeHead(200, headers);
      res.end(file);
      return;
    }

    // Pass everything else to the SSR handler
    const url = `http://localhost:${PORT}${req.url}`;
    const reqHeaders = {};
    for (const [k, v] of Object.entries(req.headers)) {
      if (v != null) reqHeaders[k] = Array.isArray(v) ? v.join(", ") : v;
    }

    const webReq = new Request(url, {
      method: req.method,
      headers: reqHeaders,
      body: ["GET", "HEAD"].includes(req.method ?? "GET") ? undefined : req,
      duplex: "half",
    });

    const webRes = await handler.fetch(webReq, {}, {});

    const resHeaders = {};
    webRes.headers.forEach((value, key) => {
      resHeaders[key] = value;
    });
    res.writeHead(webRes.status, resHeaders);

    const buffer = await webRes.arrayBuffer();
    res.end(Buffer.from(buffer));
  } catch (err) {
    console.error("[server error]", err);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
  }
}).listen(PORT, () => {
  console.log(`✅ Portfolio running on http://localhost:${PORT}`);
});
