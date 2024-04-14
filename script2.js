// Get elements
const recipeList = document.getElementById('recipe-list');
const addRecipeBtn = document.getElementById('add-recipe-btn');

// Initialize recipes array
let recipes = [];

// Check if recipes exist in local storage
if(localStorage.getItem('recipes')) {
    recipes = JSON.parse(localStorage.getItem('recipes'));
    displayRecipes();
}

// Display recipes on page load
function displayRecipes() {
    recipeList.innerHTML = '';
    recipes.forEach((recipe, index) => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');
        recipeCard.innerHTML = `
            <h2 class="recipe-title">${recipe.title}</h2>
            <div class="recipe-info">
                <p><strong>Description:</strong> ${recipe.description}</p>
                <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
                <p><strong>Instructions:</strong> ${recipe.instructions}</p>
            </div>
            <button onclick="editRecipe(${index})">Edit</button>
            <button onclick="deleteRecipe(${index})">Delete</button>
        `;
        recipeList.appendChild(recipeCard);
    });
}

// Add recipe
addRecipeBtn.addEventListener('click', () => {
    const title = prompt('Enter recipe title:');
    if(title) {
        const description = prompt('Enter recipe description:');
        const ingredients = prompt('Enter recipe ingredients:');
        const instructions = prompt('Enter recipe instructions:');
        const newRecipe = {
            title,
            description,
            ingredients,
            instructions
        };
        recipes.push(newRecipe);
        displayRecipes();
        saveRecipes();
    }
});

// Edit recipe
function editRecipe(index) {
    const recipe = recipes[index];
    const newTitle = prompt('Enter new title:', recipe.title);
    if(newTitle) {
        recipe.title = newTitle;
        recipe.description = prompt('Enter new description:', recipe.description);
        recipe.ingredients = prompt('Enter new ingredients:', recipe.ingredients);
        recipe.instructions = prompt('Enter new instructions:', recipe.instructions);
        displayRecipes();
        saveRecipes();
    }
}

// Delete recipe
function deleteRecipe(index) {
    if(confirm('Are you sure you want to delete this recipe?')) {
        recipes.splice(index, 1);
        displayRecipes();
        saveRecipes();
    }
}

// Save recipes to local storage
function saveRecipes() {
    localStorage.setItem('recipes', JSON.stringify(recipes));
}
