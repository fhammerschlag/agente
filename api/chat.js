
export default async function handler(req, res) {
  const { messages } = req.body;
  const apiKey = process.env.OPENAI_API_KEY;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages,
      temperature: 0.7
    })
  });

  const data = await response.json();
  const result = data.choices?.[0]?.message?.content || "Hubo un problema con la respuesta.";

  res.status(200).json({ result });
}
