import { existsSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { object2sass } from "./obj-to-sass";
import colors from "../src/colors";

function write(colorsObj: object) {
  const p = resolve(__dirname, "../dist");

  if (!existsSync(p)) mkdirSync(p, { recursive: true });
  
  writeFileSync(resolve(p, "_colors.sass"), object2sass(colorsObj, { prefix: "color-", mode: "sass" }));
}

write(colors);
