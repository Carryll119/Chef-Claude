import express from 'express'
import Anthropic from '@anthropic-ai/sdk'

const router = express.Router()

router.post('/', async (req, res) => {
  console.log("✅ POST /api/claude-recipe triggered")
  console.time("Total Claude API handler time")
  const { ingredients } = req.body

  if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
    return res.status(400).json({ message: "Ingredients are required." });
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  try {
    console.time("Claude API call")
    const response = await client.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 300,
      temperature: 0.9,
      system: `You are an AI chef assistant...`, // truncated
      messages: [
        {
          role: "user",
          content: `Give me a concise recipe using these ingredients: ${ingredients.join(", ")}.`,
        },
      ],
    });
    console.timeEnd("Claude API call")

    const recipeText = response?.content?.[0]?.text || "Sorry, I couldn't come up with a recipe this time.";
    res.json({ recipe: recipeText });
  } catch (error) {
    console.error("Error calling Anthropic API:", error);
    res.status(500).json({ message: "Chef Claude is having trouble in the kitchen. Please try again later." });
  } finally {
    console.timeEnd("Total Claude API handler time")
  }
});

export default router;