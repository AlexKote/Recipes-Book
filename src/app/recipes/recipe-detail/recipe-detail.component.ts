import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipes.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Rating } from 'src/app/shared/rating.model';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  readOnlyRating: boolean;
  rating: number = null;
  ratingAmount: number;
  helper = new JwtHelperService();
  mail: string;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
        this.ratingAmount = this.recipeService.getRatingAmount(this.recipe);
        if (!this.authService.isAuthenticated()) {
          this.readOnlyRating = true;
          this.rating = this.recipeService.getRating(this.recipe);
        } else {
          this.readOnlyRating = false;
          this.mail = this.helper.decodeToken(this.authService.token)['email'];
          // console.log(this.mail);
          if (this.recipe.ratingMas.length > 0) {
            for (let i = 0; i < this.recipe.ratingMas.length; i++) {
              if (this.recipe.ratingMas[i].user === this.mail) {
                this.rating = this.recipe.ratingMas[i].rating;
                break;
              } else {
                this.rating = 0;
              }
            }
          } else {
            this.rating = 0;
          }
        }
        // console.log(this.rating + ' ' + this.ratingAmount);
        // this.recipe.ratingMas.forEach(element => {
        //   console.log(element.user + ': ' + element.rating);
        // });
      }
    );
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../']);
  }

  changeRating(event: any) {
    let check: boolean;
    this.rating = event['rating'];
    if (this.recipe.ratingMas.length > 0) {
      for (let i = 0; i < this.recipe.ratingMas.length; i++) {
        if (this.recipe.ratingMas[i].user === this.mail) {
          this.recipe.ratingMas[i].rating = this.rating;
          console.log(this.recipe.ratingMas[i].user + ' = ' + this.recipe.ratingMas[i].rating);
          check = true;
          break;
        }
      }
    }
    if (!check) {
      this.recipe.ratingMas.push(new Rating(this.mail, this.rating));
    }
  }
}
