import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipes.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Rating } from 'src/app/shared/rating.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  private id: number;
  private helper = new JwtHelperService();
  public recipe: Recipe;
  public readOnlyRating: boolean;
  public rating: number;
  public ratingAmount: number;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = Number(params['id']);
      this.readOnlyRating = !this.authService.isAuthenticated();
      this.recipe = this.recipeService.getRecipe(this.id);
      this.rating = this.recipeService.getRating(this.recipe);
      this.ratingAmount = this.recipeService.getRatingAmount(this.recipe);
      // console.log(this.rating + ' ' + this.ratingAmount);
      // this.recipe.ratingMas.forEach(element => {
      //   console.log(element.user + ': ' + element.rating);
      // });
    });
  }

  private onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  private onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  private onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

  private changeRating(event: any) {
    const mail = this.helper.decodeToken(this.authService.token)['email'];
    const check = this.recipe.ratingMas.findIndex(({ user }) => user === mail);
    this.rating = event['rating'];
    if (check === -1) {
      this.recipe.ratingMas.push(new Rating(mail, this.rating));
    } else {
      this.recipe.ratingMas[check].rating = this.rating;
      // console.log(this.recipe.ratingMas[check].user + ' = ' + this.recipe.ratingMas[check].rating);
    }
  }
}
