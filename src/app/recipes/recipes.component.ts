import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  recipes: Recipe[];

  constructor(private recipeService: RecipeService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getRecipes();
    // this.recipeService.getRecipes();
  }

  getRecipes(): void {
    this.recipeService.recipe$.subscribe((res: Recipe[]) => {
      return this.recipes = res;
    });
  }

}
/*
 selectedRecipe: Recipe;
  recipes: Recipe[];
  query: string;

  constructor(private service: RecipeService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getRecipes();
    this.query = 'tofu';
    this.service.getRecipes(this.query);

  }

  getRecipes(): void {
    this.service.recipe$.subscribe((res: Recipe[]) => {
        return this.recipes = res;

    });


  }

  onRecipeSelected(recipe: Recipe) {
    this.selectedRecipe = recipe;
  }
}
*/
