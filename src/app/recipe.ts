export class Recipe {
  id: string;
  url: string;
  recipeName: string;
  smallImageUrls: string;
  ingredients: Array<string>;
  totalTimeInSeconds: number;
  course: Array<string>;
  rating: number;

  constructor(
    id: string,
    url: string,
    recipeName: string,
    smallImageUrls: string,
    ingredients: Array<string>,
    totalTimeInSeconds: number,
    course: Array<string>,
    rating: number
  ) {
    this.id = id;
    this.url = url;
    this.recipeName = recipeName;
    this.smallImageUrls = smallImageUrls;
    this.ingredients = ingredients;
    this.totalTimeInSeconds = totalTimeInSeconds;
    this.course = course;
    this.rating = rating;
  }
}
