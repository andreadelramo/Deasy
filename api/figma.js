export default async function handler(req, res) {
  const FILE_KEY = "DdrBhynQU7O9ma5Rr8vzFj";
  const FIGMA_TOKEN = process.env.FIGMA_TOKEN;

  const response = await fetch(
    `https://api.figma.com/v1/files/${FILE_KEY}`,
    {
      headers: {
        "X-Figma-Token": FIGMA_TOKEN,
      },
    }
  );

  const data = await response.json();

  const tokensPage = data.document.children.find(
    page => page.name === "Tokens"
  );

  const section = tokensPage?.children?.[0];

  const tokens = {};

  section?.children?.forEach((group, groupIndex) => {
    const scaleName = `color${groupIndex + 1}`;

    group.children?.forEach(item => {
      const fill = item.fills?.[0];

      if (fill?.color) {
        const { r, g, b } = fill.color;

        const toHex = (c) =>
          Math.round(c * 255)
            .toString(16)
            .padStart(2, "0");

        const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;

        // extraer el número (ej: /100 → 100)
        const match = item.name.match(/\/(\d+)/);
        const step = match ? match[1] : "unknown";

        const tokenName = `${scaleName}-${step}`;

        tokens[tokenName] = hex;
      }
    });
  });

  res.status(200).json({ tokens });
}