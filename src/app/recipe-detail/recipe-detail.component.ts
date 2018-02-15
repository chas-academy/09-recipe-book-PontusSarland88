import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe';
import { Location } from '@angular/common';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { debug } from 'util';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getRecipe();
  }

  getRecipe(): void {
    const recipeId = this.route.snapshot.paramMap.get('id');
    this.recipeService.getRecipe(recipeId)
     .then((res) => {
       return this.recipe = res;
      });
  }

  goBack(): void {
    this.location.back();
  }

}
