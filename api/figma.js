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

  const items = section?.children?.map(item => ({
    name: item.name,
    type: item.type
  }));

  res.status(200).json({ items });
}