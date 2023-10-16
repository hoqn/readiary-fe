function flattenObject(obj: object): object {
  const ret: Record<string, any> = {};

  Object.entries(obj).forEach(([key, value]) => {
    if (typeof value === "object" && !Array.isArray(value))
      Object.entries(flattenObject(value)).forEach(([subkey, subvalue]) => {
        ret[`${key}-${subkey}`] = subvalue;
      });
    else ret[key] = value;
  });

  return ret;
}

interface ObjectToSassOptions {
  prefix?: string;
  mode?: "sass" | "scss";
}

function object2sass(obj: object, options: ObjectToSassOptions = {}): string {
  const { prefix = "color-", mode = "sass" } = options;

  const endl = mode === "sass" ? "\n" : ";\n";

  return Object.entries(flattenObject(obj)).reduce<string>(
    (ac, [key, value]) => ac + `$${prefix}${key}: ${value}${endl}`,
    "/* Generated File */\n"
  );
}

export { object2sass };
