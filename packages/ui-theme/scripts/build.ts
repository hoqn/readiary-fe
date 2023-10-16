import { resolve } from "path";
import { existsSync, mkdirSync, copyFileSync, readdirSync } from "fs";

function writeIndex() {
  const s = resolve(__dirname, "../src/public");
  const p = resolve(__dirname, "../dist");

  if (!existsSync(p)) mkdirSync(p, { recursive: true });

  readdirSync(s).forEach((file) => {
    copyFileSync(resolve(s, file), resolve(p, file));
  });
}

(() => {
  import("./build-colors");
  import("./build-theme");

  writeIndex();
})();
