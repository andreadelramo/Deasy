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

  // encontrar página Tokens
  const tokensPage = data.document.children.find(
    page => page.name === "Tokens"
  );

  if (!tokensPage) {
    return res.status(404).json({ error: "Tokens page not found" });
  }

  // sacar los grupos dentro de Tokens
  const groups = tokensPage.children.map(group => ({
    name: group.name,
    id: group.id
  }));

  res.status(200).json({ groups });
}