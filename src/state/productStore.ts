import {create} from "zustand";


type Product = {
    id:number;
    name:string;
    calories:string;
    weight:number;
    category:string;
}

type ProductState = {
    produts:[];

}
export const useProductStore = create((set) => {

})