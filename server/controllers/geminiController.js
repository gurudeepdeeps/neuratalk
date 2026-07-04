export const handleChat = async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const modelName = process.env.GEMINI_MODEL || "gemini-2.5-flash";

    if (!apiKey) {
      return res.status(500).json({
        error: "Gemini API key is not configured on the server"
      });
    }

    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        error: "Request body must include a text message"
      });
    }

    const url =
      "https://generativelanguage.googleapis.com/v1beta/models/" +
      modelName +
      ":generateContent?key=" +
      apiKey;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: message
              }
            ]
          }
        ],
        systemInstruction: {
          parts: [
            {
              text: "You are a helpful AI assistant. Provide a clear, comprehensive answer using markdown formatting in the 'reply' field. Additionally, suggest 3 highly relevant and engaging follow-up questions or next steps (recommendations) the user can ask to explore the topic deeper, and place them in the 'recommendations' array."
            }
          ]
        },
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              reply: {
                type: "STRING"
              },
              recommendations: {
                type: "ARRAY",
                items: {
                  type: "STRING"
                }
              }
            },
            required: ["reply", "recommendations"]
          }
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage =
        (data && data.error && data.error.message) ||
        "Failed to generate AI response";

      return res.status(response.status || 500).json({
        error: errorMessage
      });
    }

    const text =
      data &&
      data.candidates &&
      data.candidates[0] &&
      data.candidates[0].content &&
      data.candidates[0].content.parts &&
      data.candidates[0].content.parts[0] &&
      data.candidates[0].content.parts[0].text;

    let reply = "I could not generate a response.";
    let recommendations = [];

    if (text) {
      try {
        const parsed = JSON.parse(text);
        reply = parsed.reply || reply;
        recommendations = parsed.recommendations || [];
      } catch (e) {
        reply = text;
      }
    }

    return res.json({
      reply,
      recommendations
    });
  } catch (error) {
    console.error("Gemini API error:", error);

    let message = "Failed to generate AI response";

    if (error && typeof error === "object") {
      if (error.message) {
        message = error.message;
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.error &&
        typeof error.response.data.error.message === "string"
      ) {
        message = error.response.data.error.message;
      }
    }

    return res.status(500).json({
      error: message
    });
  }
};