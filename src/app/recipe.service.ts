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
  recipesUrl;

  constructor(
    // private messageService: MessageService,
    // private http: HttpClient
  ) { }

  // private log(message: string) {
  //   this.messageService.add('RecipeService: ' + message);
  // }

  // getRecipes(): Observable<Recipe[]> {
  //   // this.messageService.add('RecipeService: fetched recipes');
  //   return this.http.get<Recipe[]>(this.recipesUrl)
  //   .pipe(
  //     tap(recipe => this.log(`fetched recipes`)),
  //     catchError(this.handleError('getRecipes', []))
  //   );
  //   // return of(RECIPES);
  // }
  // getRecipe(id: string): Observable<Recipe> {
  //   const url = 'http://api.yummly.com/v1/api/recipe/' + id + '_app_id=' + environment.apiId + '&_app_key=' + environment.apiKey;
  //   this.messageService.add(`RecipeService: fetched recipe id=${id}`);
  //   return of(RECIPES.find(recipe => recipe.id === id));
  // }

  // private handleError<T> (operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
  //     console.error(error);
  //     this.log(`${operation} failed: ${error.message}`);

  //     return of(result as T);
  //   };
  // }

  getRecipes() {
    const RECIPES = [];
    const recipe = null;
    this.recipesUrl = 'http://api.yummly.com/v1/api/recipes?_app_id=' + environment.apiId + '&_app_key=' + environment.apiKey + '&q=pasta';

    const promise = new Promise((resolve, reject) => {
      fetch(this.recipesUrl)
      .then(res => res.json())
      .then(res => {
          res.matches.forEach(item => {
            RECIPES.push(new Recipe(
            encodeURIComponent(item.id),
            item.url,
            item.matchesName,
            item.smallImageUrls,
            item.ingredients,
            item.totalTimeInSeconds,
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
      .then( res => {
        recipe = new Recipe(
            res.id,
            res.attribution.url,
            res.name,
            res.images[0].hostedLargeUrl,
            res.ingredientLines,
            res.totalTimeInSeconds,
            res.rating
          );
            resolve(recipe);
      });
    });
    return promise;
  }
}
