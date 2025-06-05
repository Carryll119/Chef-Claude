// import Anthropic from "@anthropic-ai/sdk"
// import { HfInference } from '@huggingface/inference'

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`
// 🚨👉 ALERT: Read message below! You've been warned! 👈🚨
// If you're following along on your local machine instead of
// here on Scrimba, make sure you don't commit your API keys
// to any repositories and don't deploy your project anywhere
// live online. Otherwise, anyone could inspect your source
// and find your API keys/tokens. If you want to deploy
// this project, you'll need to create a backend of some kind,
// either your own or using some serverless architecture where
// your API calls can be made. Doing so will keep your
// API keys private.

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export async function getRecipeFromChefClaude(ingredientsArr) {
    try {
        console.time("Claude API call");
        const response = await fetch(`${BASE_URL}/api/claude-recipe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ingredients: ingredientsArr }),
        });
        console.timeEnd("Claude API call");

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.recipe;
    } catch (error) {
        console.error("Error fetching recipe from Chef Claude:", error);
        return "Sorry, I couldn't fetch a recipe at the moment.";
    }
}

export async function getRecipeFromMistral(ingredientsArr) {
    try {
        const response = await fetch(`${BASE_URL}/api/mistral-recipe`, { // Or your full backend URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ingredients: ingredientsArr }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.recipe;
    } catch (error) {
        console.error("Error fetching recipe from Mistral (via backend):", error);
        return "Sorry, I couldn't fetch a recipe at the moment. Please try again later.";
    }
}
