require("esbuild").build({
    entryPoints: ["./src/index.js"],
    bundle: true,
    platform: "node",
    outdir: './build',
    external: ["express", "mongodb", "axios"],
    minify: true
}).catch(() => process.exit(1))