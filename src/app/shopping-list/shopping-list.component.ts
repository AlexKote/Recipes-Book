import { Component, OnInit, OnDestroy } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "./shopping-list.service";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"]
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public ingredients: Ingredient[];

  constructor(
    private slservice: ShoppingListService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.ingredients = this.slservice.getIngredients();
    this.subscription = this.slservice.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  onBuy() {
    if (this.authService.isAuthenticated()) {
      console.log('Bought ' + this.ingredients.length + ' ingredients!');
    } else {
      this.router.navigate(['/signin']);
    }
  }

  onEditItem(index: number) {
    this.slservice.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
