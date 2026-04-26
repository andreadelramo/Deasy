export default async function handler(req, res) {
  const fileKey = req.query.fileKey;

  const response = await fetch(`https://api.figma.com/v1/files/${fileKey}`, {
    headers: {
      "X-Figma-Token": process.env.FIGMA_TOKEN
    }
  });

  const data = await response.json();

  res.status(200).json(data);
}
