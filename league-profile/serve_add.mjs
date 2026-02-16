import "./src/index.js";

try {
    new EventSource("/esbuild").addEventListener("change", () =>
        location.reload(),
    );
} catch {}