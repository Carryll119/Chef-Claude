import express from 'express'
import { HfInference } from '@huggingface/inference'

const router = express.Router()
const hf = new HfInference(process.env.HF_API_TOKEN)

router.post('/', async (req, res) => {
  const { ingredients } = req.body
  const inputText = `Give me a recipe using: ${ingredients.join(", ")}`

  const result = await hf.textGeneration({
    model: 'mistralai/Mistral-7B-Instruct-v0.1',
    inputs: inputText,
    parameters: {
      max_new_tokens: 200,
    },
  })

  res.json({ recipe: result.generated_text })
})

export default router
