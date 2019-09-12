import { Recipe } from "./recipes.model";
import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";
import { Rating } from "../shared/rating.model";

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      "Tasty Schnitzel",
      [new Rating("test@test.com", 1)],
      "A super-tasty Schnitzel - just awesome!",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn0slbudWCkszlxfK-aSsq9oW1g-TnoFy0FX0dxWdcNi1nlaC1",
      [
        // new Ingredient('Meat',1),
        // new Ingredient('French Fries', 20)
      ]
    ),
    new Recipe(
      "Big Fat Burger",
      [new Rating("test@test.com", 5), new Rating("qwerty@test.com", 2)],
      "What else you need to say?",
      "https://greal-service.ru/wp-content/uploads/2018/07/big_tasty.png",
      [new Ingredient("Buns", 2), new Ingredient("Meat", 1)]
    )
  ];

  constructor(private slService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  getRatingAmount(recipe: Recipe) {
    return recipe.ratingMas.length;
  }

  getRating(recipe: Recipe) {
    if (recipe.ratingMas.length > 0) {
      let sum = 0;
      recipe.ratingMas.forEach(element => {
        sum += element.rating;
      });
      return Math.floor(sum / recipe.ratingMas.length * 10) / 10;
    } else {
      return 0;
    }
  }
}
