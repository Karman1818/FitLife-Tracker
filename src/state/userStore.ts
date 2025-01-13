import {create} from "zustand";

type User = {
    id:number;
    name:string;
    dailyCalorieGoal:number;
    currentCalories:number;
    weight:number;
    height:number;
}

export const useUserStore = create((set) => {
    [

    ]
})