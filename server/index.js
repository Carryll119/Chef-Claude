import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import claudeRoute from './claude-recipe.js'
import mistralRoute from './mistral-recipe.js'

dotenv.config()
const app = express()
app.use(express.json())

app.use(cors())
app.use('/api/claude-recipe', claudeRoute)
app.use('/api/mistral-recipe', mistralRoute)

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000')
})
