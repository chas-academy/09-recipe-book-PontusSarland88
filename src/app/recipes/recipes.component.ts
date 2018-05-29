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
  filteredRecipes: Recipe[] = [];
  displayFilteredRecipes = false;
  constructor(private recipeService: RecipeService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getRecipes();
  }

  getRecipes(): void {
    this.recipeService.recipe$.subscribe((res: Recipe[]) => {
      return this.recipes = res;
    });
  }
  filter(type: string) {
    if (type === 'All') {
      this.displayFilteredRecipes = false;
      this.filteredRecipes = [];
      this.filteredRecipes = this.recipes;
    } else {
      this.filteredRecipes = [];
      this.recipes.forEach(recipe => {
        if (recipe.course !== undefined) {
          recipe.course.forEach(courseType => {
            if (courseType === type) {
              this.filteredRecipes.push(recipe);
              this.displayFilteredRecipes = true;
            }
          });
        }
      });
    }
  }
}
