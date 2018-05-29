import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { Recipe } from './recipe';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class RecipeService {

  private recipes = new BehaviorSubject<Recipe[]>([]);
  recipe$ = this.recipes.asObservable();
  filterRecipe$ = this.recipes.asObservable();
  recipesUrl;

  constructor() { }

  getRecipes() {
    const RECIPES = [];
    const recipe = null;
    this.recipesUrl = 'http://api.yummly.com/v1/api/recipes?_app_id=' + environment.apiId + '&_app_key=' + environment.apiKey + '&q=random';

    const promise = new Promise((resolve, reject) => {
      fetch(this.recipesUrl)
      .then(res => res.json())
      .then(res => {
          res.matches.forEach(item => {
            RECIPES.push(new Recipe(
            encodeURIComponent(item.id),
            item.url,
            item.recipeName,
            item.smallImageUrls[0].replace('=s90', '=s560'),
            item.ingredients,
            item.totalTimeInSeconds,
            item.attributes.course,
            item.rating
        ));
        });
        resolve(RECIPES);
        this.recipes.next(RECIPES);
      });
    });
    return promise;
  }


  getRecipe(id: string) {

    let recipe: Recipe;
    this.recipesUrl = 'http://api.yummly.com/v1/api/recipe/' + id + '?_app_id=' + environment.apiId + '&_app_key=' + environment.apiKey;

    const promise = new Promise((resolve, reject) => {
      fetch(this.recipesUrl)
      .then(res => res.json())
      .then( res => { console.log(res);
        recipe = new Recipe(
            res.id,
            res.attribution.url,
            res.name,
            res.images[0].hostedLargeUrl,
            res.ingredientLines,
            res.totalTimeInSeconds,
            res.attributes.course,
            res.rating
          );
            resolve(recipe);
      });
    });
    return promise;
  }
}
