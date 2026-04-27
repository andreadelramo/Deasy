export default async function handler(req, res) {
  const { fileKey } = req.query;

  // 1. Validación input
  if (!fileKey) {
    return res.status(400).json({
      error: "fileKey is required",
    });
  }

  // 2. Token
  console.log('ENV ' + process.env.FIGMA_TOKEN);
  const token = process.env.FIGMA_TOKEN;

  if (!token) {
    return res.status(500).json({
      error: "Missing FIGMA_TOKEN",
    });
  }

  console.log("fileKey:", fileKey);
  console.log("hasToken:", !!token);

  try {
    // 3. Request a Figma
    const response = await fetch(
      `https://api.figma.com/v1/files/${fileKey}`,
      {
        headers: {
          "X-Figma-Token": token,
        }
      }
    );

    // 4. Manejo de errores
    if (response.status === 403) {
      return res.status(403).json({
        error: "INVALID_TOKEN",
      });
    }

    if (response.status === 404) {
      return res.status(404).json({
        error: "FILE_NOT_FOUND",
      });
    }

    if (!response.ok) {
      return res.status(500).json({
        error: "FIGMA_API_ERROR",
      });
    }

    // 5. Success
    const data = await response.json();

    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({
      error: "INTERNAL_ERROR",
    });
  }
  
}

