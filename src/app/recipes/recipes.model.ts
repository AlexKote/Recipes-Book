import { Ingredient } from '../shared/ingredient.model';
import { Rating } from '../shared/rating.model';

export class Recipe {
    public name: string;
    public ratingMas: Rating[];
    public description: string;
    public imagePath: string;
    public ingredients: Ingredient[];

    constructor(name: string, ratingMas: Rating[], desc: string, imagePath: string, ingredients: Ingredient[]){
        this.name = name;
        this.ratingMas = ratingMas;
        this.description = desc;
        this.imagePath = imagePath;
        this.ingredients = ingredients;
    }
}