import {create} from "zustand";


type Product = {
    id:number;
    name:string;
    calories:string;
    weight:number;
    category:string;
    favourite:boolean;
}

type Meal = {
    id:number,
    name:string,
    products:Product[];
}

type Day = {
    id:number,
    name:string,
    meals:Meal[]
}

type CaloriesState = {
    days: Day[];
    addProductToMeal: (dayId:number,mealId:number,product:Product) => void;
    deleteProductFromMeal: (dayId:number,mealId:number,product:Product) => void;

}
export const useCaloriesStore = create((set) => ({
    days: [
        {
            id:1,
            name:"Monday ",
            meals: [
                {id:1, name:"Breakfast ", products: []},
                {id:2, name:"Second Breakfast ", products: []},
                {id:3, name:"Lunch ", products: []},
                {id:4, name:"Afternoon Snack ", products: []},
                {id:5, name:"Dinner ", products: []},
            ]
        },
        {
            id:2,
            name:"Tuesday ",
            meals: [
                {id:1, name:"Breakfast ", products: []},
                {id:2, name:"Second Breakfast ", products: []},
                {id:3, name:"Lunch ", products: []},
                {id:4, name:"Afternoon Snack ", products: []},
                {id:5, name:"Dinner ", products: []},
            ]
        },
        {
            id:3,
            name:"Wednesday ",
            meals: [
                {id:1, name:"Breakfast ", products: []},
                {id:2, name:"Second Breakfast ", products: []},
                {id:3, name:"Lunch ", products: []},
                {id:4, name:"Afternoon Snack ", products: []},
                {id:5, name:"Dinner ", products: []},
            ]
        },
        {
            id:4,
            name:"Thursday ",
            meals: [
                {id:1, name:"Breakfast ", products: []},
                {id:2, name:"Second Breakfast ", products: []},
                {id:3, name:"Lunch ", products: []},
                {id:4, name:"Afternoon Snack ", products: []},
                {id:5, name:"Dinner ", products: []},
            ]
        },
        {
            id:5,
            name:"Friday ",
            meals: [
                {id:1, name:"Breakfast ", products: []},
                {id:2, name:"Second Breakfast ", products: []},
                {id:3, name:"Lunch ", products: []},
                {id:4, name:"Afternoon Snack ", products: []},
                {id:5, name:"Dinner ", products: []},
            ]
        },
        {
            id:6,
            name:"Saturday ",
            meals: [
                {id:1, name:"Breakfast ", products: []},
                {id:2, name:"Second Breakfast ", products: []},
                {id:3, name:"Lunch ", products: []},
                {id:4, name:"Afternoon Snack ", products: []},
                {id:5, name:"Dinner ", products: []},
            ]
        },
        {
            id:7,
            name:"Sunday ",
            meals: [
                {id:1, name:"Breakfast ", products: []},
                {id:2, name:"Second Breakfast ", products: []},
                {id:3, name:"Lunch ", products: []},
                {id:4, name:"Afternoon Snack ", products: []},
                {id:5, name:"Dinner ", products: []},
            ]
        },
    ],
    addProductToMeal: (dayId,mealId,product) =>
        set((state) => ({
            days: state.days.map((day) => (
                day.id === dayId ? {
                    ...day,
                    meals: day.meals.map((meal) => (
                        meal.id === mealId ? {
                            ...meal,
                            products: [...meal.products,product]}
                            : meal

                    ))
                }
                : day
            ))
        })),

    deleteProductFromMeal: (dayId,mealId,productId) =>
        set((state) => ({
            days: state.days.map((day) => (
                day.id === dayId ? {
                        ...day,
                        meals: day.meals.map((meal) => (
                            meal.id === mealId ? {
                                    ...meal,
                                    products: meal.products.filter((product) => product.id !== productId)}
                                : meal

                        ))
                    }
                    : day
            ))
        })),


}))