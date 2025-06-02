
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

export async function getRecipeFromChefClaude(ingredientsArr) {
    try {
        const response = await fetch('/api/claude-recipe', { // Or your full backend URL
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
        console.error("Error fetching recipe from Chef Claude (via backend):", error);
        return "Sorry, I couldn't fetch a recipe at the moment. Please try again later.";
    }
}

export async function getRecipeFromMistral(ingredientsArr) {
    try {
        const response = await fetch('/api/mistral-recipe', { // Or your full backend URL
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
