import { Recipe } from './recipes.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe(
            'Tasty Schnitzel', 
            'A super-tasty Schnitzel - just awesome!',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn0slbudWCkszlxfK-aSsq9oW1g-TnoFy0FX0dxWdcNi1nlaC1',
            [
                new Ingredient('Meat',1),
                new Ingredient('French Fries', 20)
            ]),
        new Recipe(
            'Big Fat Burger', 
            'What else you need to say?',
            'https://greal-service.ru/wp-content/uploads/2018/07/big_tasty.png',
            [
                new Ingredient('Buns', 2),
                new Ingredient('Meat', 1)
            ])
    ];

    constructor(private slService: ShoppingListService) {}

    getRecipes() {
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }
}