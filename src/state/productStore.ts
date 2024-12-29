import {create} from "zustand";


type Product = {
    id:number;
    name:string;
    calories:string;
    weight:number;
    category:string;
    favourite:boolean;
}

type ProductState = {
    products:Product[];
    addProduct: (product:Product) => void;

}
export const useProductStore = create((set) => ({
    products:[
        { id: 1, name: "Apple", calories: "52", weight: 150, category: "Snack", favourite: true },
        { id: 2, name: "Banana", calories: "89", weight: 120, category: "Snack", favourite: false },
        { id: 3, name: "Grilled Chicken", calories: "165", weight: 200, category: "Dinner", favourite: true },
        { id: 4, name: "Brown Rice", calories: "111", weight: 180, category: "Dinner", favourite: false },
        { id: 5, name: "Boiled Egg", calories: "68", weight: 50, category: "Breakfast", favourite: true },
    ],
    addProduct: (product) =>
        set((state) => ({
            products: [...state.products, product],
        })),

    deleteProduct: (id) =>
        set((state) => ({
            products: state.products.filter((product) => product.id !== id)
        }))


}))