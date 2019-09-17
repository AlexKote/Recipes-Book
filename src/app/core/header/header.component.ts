import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../shared/ingredient.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public ingredientCount = this.slservice.getIngredients().length;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private slservice: ShoppingListService,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscription = this.slservice.ingredientsChanged.subscribe((ingredients: Ingredient[]) => {
      this.ingredientCount = ingredients.length;
    });
  }

  private onSaveData() {
    this.dataStorageService.storeRecipes().subscribe((response: Response) => {
      console.log(response);
    });
  }

  private onFetchData() {
    this.dataStorageService.getRecipes();
  }

  private onLogout() {
    this.authService.logout();
    this.router.navigate(['../']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
