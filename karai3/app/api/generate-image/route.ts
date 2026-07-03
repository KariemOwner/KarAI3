import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { prompt, referenceImages } = await request.json();

    if (!prompt || !prompt.trim()) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    let finalPrompt = prompt.trim();

    // If there are reference images, analyze them with Groq Vision first
    if (referenceImages && referenceImages.length > 0) {
      const groqApiKey = process.env.GROQ_API_KEY;
      if (!groqApiKey) {
        return NextResponse.json(
          { error: "Groq API key not configured on server" },
          { status: 500 }
        );
      }

      const imageDescriptions = await Promise.all(
        referenceImages.map(async (base64Image: string) => {
          const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${groqApiKey}`,
            },
            body: JSON.stringify({
              model: "llama-3.2-90b-vision-preview",
              messages: [
                {
                  role: "user",
                  content: [
                    {
                      type: "text",
                      text: "Analyze this image in detail. Describe the shapes, colors, poses, and distinctive features of objects or people. Be concise but thorough.",
                    },
                    {
                      type: "image_url",
                      image_url: { url: base64Image },
                    },
                  ],
                },
              ],
              max_tokens: 500,
            }),
          });

          if (!response.ok) {
            throw new Error("Failed to analyze image with Groq");
          }

          const data = await response.json();
          return data.choices[0].message.content;
        })
      );

      // Combine image descriptions with user prompt
      finalPrompt = `${prompt.trim()}\n\nReference image descriptions:\n${imageDescriptions.join("\n")}`;
    }

    // Send to Gemini for image generation
    const geminiApiKey = process.env.GEMINI_API_KEY;
    const geminiModel = process.env.GEMINI_IMAGE_MODEL || "gemini-2.0-flash-exp-image-generation";

    if (!geminiApiKey) {
      return NextResponse.json(
        { error: "Gemini API key not configured on server" },
        { status: 500 }
      );
    }

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${geminiApiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: finalPrompt,
                },
              ],
            },
          ],
          generationConfig: {
            responseModalities: ["Text", "Image"],
          },
        }),
      }
    );

    if (!geminiResponse.ok) {
      throw new Error("Failed to generate image with Gemini");
    }

    const geminiData = await geminiResponse.json();

    // Extract image from Gemini response
    if (geminiData.candidates && geminiData.candidates[0]?.content?.parts) {
      for (const part of geminiData.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.mimeType?.startsWith("image/")) {
          return NextResponse.json({
            imageUrl: `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`,
          });
        }
      }
    }

    return NextResponse.json(
      { error: "No image generated in response" },
      { status: 500 }
    );
  } catch (error) {
    console.error("Image generation error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to generate image" },
      { status: 500 }
    );
  }
}
