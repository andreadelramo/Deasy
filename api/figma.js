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

  // ejemplo simple: extraer nombres de páginas
  const pages = data.document.children.map(page => ({
    name: page.name,
    id: page.id
  }));

  res.status(200).json({ pages });
}