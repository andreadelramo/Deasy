export default async function handler(req, res) {
  // 0. Método permitido
  if (req.method !== "GET") {
    return res.status(405).json({
      error: "METHOD_NOT_ALLOWED",
    });
  }

  const { fileKey } = req.query;

  // 1. Validación input
  if (!fileKey) {
    return res.status(400).json({
      error: "fileKey is required",
    });
  }

  // 2. Token
  const token = process.env.FIGMA_TOKEN;

  if (!token) {
    return res.status(500).json({
      error: "Missing FIGMA_TOKEN",
    });
  }

  console.log("DEBUG:", {
    fileKey,
    hasToken: !!token,
  });

  try {
    // 3. Request a Figma (FIX AQUÍ 👇)
    const response = await fetch(
      `https://api.figma.com/v1/files/${fileKey}`,
      {
        headers: {
          "X-Figma-Token": token,
        },
      }
    );

    const text = await response.text();

    // 4. Manejo de errores MEJORADO
    if (!response.ok) {
      console.error("FIGMA ERROR:", {
        status: response.status,
        body: text,
      });

      return res.status(response.status).json({
        error: "FIGMA_API_ERROR",
        status: response.status,
        details: text,
      });
    }

    // 5. Success
    const data = JSON.parse(text);

    return res.status(200).json(data);

  } catch (error) {
    console.error("INTERNAL ERROR:", error);

    return res.status(500).json({
      error: "INTERNAL_ERROR",
    });
  }
}