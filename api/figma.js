export default async function handler(req, res) {
  const fileKey = req.query.fileKey;

  const response = await fetch(`https://api.figma.com/v1/files/${fileKey}`, {
    method: "GET",
    headers: {
      "X-Figma-Token": `${process.env.FIGMA_TOKEN}`
    }
  });

  const text = await response.text();

  res.status(200).send(text);
}