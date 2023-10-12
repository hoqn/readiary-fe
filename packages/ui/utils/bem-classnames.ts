const bemRaw =
  (block: string, element?: string) =>
  (...modifiers: string[]) => {
    const base = element ? `${block}__${element}` : block;
    return `${base} ${modifiers.map((mod) => `${base}--${mod}`).join(" ")}`;
  };

const bemBind =
  <T extends Record<string, string>>(styles: T) =>
  (block: string, element?: string) =>
  (...modifiers: string[]) => {
    const base = element ? `${block}__${element}` : block;
    return modifiers.reduce((ac, mod) => String.prototype.concat(ac, " ", styles[`${base}--${mod}`]), styles[base]);
  };

const bem = Object.assign(bemRaw, {
  bind: bemBind,
});

export { bem, bemRaw, bemBind };
