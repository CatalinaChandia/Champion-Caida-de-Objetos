export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const payload = req.body;

    const gasUrl = process.env.GAS_WEBHOOK_URL;

    if (!gasUrl) {
      return res.status(500).json({
        ok: false,
        error: "GAS_WEBHOOK_URL no está configurado en Vercel",
      });
    }

    const gasResponse = await fetch(gasUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const text = await gasResponse.text();

    return res.status(200).json({
      ok: gasResponse.ok,
      forwarded: true,
      gasStatus: gasResponse.status,
      gasResponse: text,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: String(error),
    });
  }
}
