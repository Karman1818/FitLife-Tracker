import {create} from "zustand";

type User = {
    id:number;
    name:string;
    dailyCalorieGoal:number;
    currentCalories:number;
    weight:number;
    height:number;
}

type Product = {
    id:number;
    name:string;
    calories:string;
    weight:number;
    category:string;
}

export const useStore = create((set) => {

})