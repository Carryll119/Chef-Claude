import React from "react"
import IngredientsList from "./components/IngredientsList";
import ClaudeRecipe from "./components/ClaudeRecipe";
import { getRecipeFromChefClaude, getRecipeFromMistral } from "./api/ai.js";


export default function Main() {
    const [ingredients, setIngredients] = React.useState(
        ["chicken", "all the main spices", "corn", "heavy cream", "pasta"]
    );
    const [recipe, setRecipe] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [apiError, setApiError] = React.useState(null);

    async function getRecipe() {
        console.log("getRecipe called. Setting isLoading to true.");
        setIsLoading(true);
        setApiError(null); // Clear previous errors
        setRecipe(""); // Clear previous recipe

        // Ensure UI updates with isLoading=true before proceeding
        // This can help if the subsequent async operation resolves/rejects very quickly
        // or if React batches state updates in a way that hides the loading state.
        await new Promise(resolve => setTimeout(resolve, 0));

        try {
            console.log("Calling API. isLoading should be true. Current ingredients:", ingredients);
            console.time("Front-end total API request time")
            const recipeMarkdown = await getRecipeFromChefClaude(ingredients);
            console.timeEnd("Front-end total API request time")
            setRecipe(recipeMarkdown);
        } catch (error) {
            console.error("Failed to get recipe:", error);
            setApiError(error.message || "Oops! Chef Claude couldn't cook up a recipe. Please try again.");
        } finally {
            console.log("API call finished or failed. Setting isLoading to false.");
            setIsLoading(false);
        }
    }

    function handleAddIngredient(event) {
        event.preventDefault(); // Prevent default form submission
        const formData = new FormData(event.target);
        const newIngredient = formData.get("ingredient");
        if (newIngredient && newIngredient.trim() !== "") { // Ensure not empty
            setIngredients(prevIngredients => [...prevIngredients, newIngredient.trim()]);
            event.target.reset(); // Clear the input field after submission
        }
    }

    function deleteIngredient(ingredientToDelete) {
        setIngredients(prevIngredients =>
            prevIngredients.filter(ingredient => ingredient !== ingredientToDelete)
        );
    }
    return (
        <main>
            <form onSubmit={handleAddIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="Type an ingredient, like orange or chicken..."
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>

            {isLoading && <p className="loading-message">Chef Claude is cooking...</p>}
            
            {apiError && <p className="error-message">{apiError}</p>}

            {ingredients.length > 0 &&
                <IngredientsList
                    ingredients={ingredients}
                    getRecipe={getRecipe}
                    deleteIngredient={deleteIngredient}
                />
            }

            {!isLoading && recipe && <ClaudeRecipe recipe={recipe} />}
        </main>
    )
}