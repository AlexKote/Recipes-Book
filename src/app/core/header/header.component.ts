import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{
    private subscription: Subscription;    
    ingredientCount = this.slservice.getIngredients().length;

    constructor(private dataStorageService: DataStorageService,
                private authService: AuthService,
                private slservice: ShoppingListService) {}

    ngOnInit() {
        this.subscription = this.slservice.ingredientsChanged.subscribe(
          (ingredients: Ingredient[]) => {
            this.ingredientCount = ingredients.length;
          }
        );  
    }

    onSaveData() {
        this.dataStorageService.storeRecipes().subscribe(
            (response: Response) => {
                console.log(response);
            }
        );
    }

    onFetchData() {
        this.dataStorageService.getRecipes();
    }

    onLogout() {
        this.authService.logout();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
      }
}