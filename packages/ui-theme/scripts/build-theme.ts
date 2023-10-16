import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { object2sass } from "./obj-to-sass";
import theme from "../src/theme";

function write(themeObj: object) {
  const p = resolve(__dirname, "../dist");

  if (!existsSync(p)) mkdirSync(p, { recursive: true });

  writeFileSync(resolve(p, "_theme.sass"), object2sass(themeObj, { prefix: "theme-", mode: "sass" }));
}

write(theme);
