import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipes.model';

@Injectable()
export class DataStorageService {
    constructor(private http: HttpClient, 
                private recipeService: RecipeService) {}

    storeRecipes() {
        return this.http.put('https://ng-recipe-book-c5b66.firebaseio.com/recipes.json', this.recipeService.getRecipes());
    }

    getRecipes() {
        this.http.get('https://ng-recipe-book-c5b66.firebaseio.com/recipes.json').subscribe(
            (recipes: Recipe[]) => {
                this.recipeService.setRecipes(recipes);
            }
        );
    }
}