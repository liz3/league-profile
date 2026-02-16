#!/usr/bin/env node
import { build, context } from "esbuild";
import { copy } from "esbuild-plugin-copy";
import fs from "node:fs";
import http from "node:http";

const loaders = {
  ".png": "file",
  ".jpg": "dataurl",
  ".jpeg": "dataurl",
  ".webp": "file",
  ".ttf": "file",
  ".otf": "file",
  ".svg": "dataurl",
  ".mjs": "jsx",
  ".js": "jsx",
};
// dev server
if (process.argv.some((e) => e === "--dev")) {
  fs.rmSync("./.build", { recursive: true, force: true });
  const ctx = await context({
    entryPoints: ["serve_add.mjs"],
    bundle: true,
    sourcemap: true,
    loader: loaders,
    outfile: ".build/index.js",
     publicPath: "/", 
    target: [],
    plugins: [
      copy({
        resolveFrom: "cwd",
        assets: {
          from: ["./public/*"],
          to: ["./.build"],
        },
        watch: true,
      }),
    ],
  });
  await ctx.watch();

  const { host, port } = await ctx.serve({
    servedir: ".build",
  });
  const server = http.createServer((req, res) => {
    const options = {
      hostname: host,
      port: port,
      path: req.url,
      method: req.method,
      headers: req.headers,
    };

    const proxyReq = http.request(options, (proxyRes) => {
      if (proxyRes.statusCode === 404) {
        res.writeHead(200, { "Content-Type": "text/html" });
        const content = fs.readFileSync("./public/index.html");
        res.end(content);
        return;
      }

      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res, { end: true });
    });

    req.pipe(proxyReq, { end: true });
  });
  let p = process.env.PORT || 3000;
  let listening = false;
  for (let i = 0; i <= 15; i++) {
    try {
      server.listen((typeof p === "string" ? Number.parseInt(p) : p) + i);
      console.log(
        "Listening on",
        `http://localhost:${
          (typeof p === "string" ? Number.parseInt(p) : p) + i
        }`,
      );
      listening = true;
      break;
    } catch (err) {
      console.error(
        "port",
        (typeof p === "string" ? Number.parseInt(p) : p) + i,
        "in use already!",
      );
    }
  }
  if (!listening) {
    console.error(
      "ports 3000-3015 in use, aboorting dev server, please free one of the ports to start or set PORT ENV VAR",
    );
    process.exit(1);
  }
} else {
  // output
  fs.rmSync("./build", { recursive: true, force: true });
  await build({
    entryPoints: ["src/index.js"],
    bundle: true,
    minify: true,
    loader: loaders,
    outfile: "build/index.js",
     publicPath: "/", 
    target: [],
    plugins: [
      copy({
        resolveFrom: "cwd",
        assets: {
          from: ["./public/*"],
          to: ["./build"],
        },
        watch: true,
      }),
    ],
  });
  console.log("Build created in ./build");
}