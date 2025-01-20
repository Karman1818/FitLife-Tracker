import React from "react";
import { useForm } from "@tanstack/react-form";
import { object, string, number, boolean } from "zod";
import FieldInfo from "@/components/FieldInfo";
import Button from "@/components/averi-ui/button";
import { Meal } from "@/stores/calories";

interface AddProductFormProps {
  onAddMeal: (meal: Meal) => void;
}

export default function AddProductForm({ onAddMeal }: AddProductFormProps) {
  const form = useForm({
    defaultValues: {
      name: "",
      calories: 0,
      water: 0,
      category: "",
      favorite: false,
    },
    async onSubmit({ value }) {
      onAddMeal({ ...value, id: Date.now(), products: [] }); // Call the onAddMeal prop with the form data
    },
    validators: {
      onChange: object({
        name: string().min(3),
        calories: number(),
        water: number(),
        category: string().min(3),
        favorite: boolean(),
      }),
    },
  });

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await form.handleSubmit();
      }}
    >
      <div className="flex flex-col bg-white/10 border-2 border-white/5 shadow-lg m-1 p-1 rounded-lg space-y-1 backdrop-blur-md">
        <form.Field name="name">
          {(field) => (
            <div className="flex flex-col">
              <label htmlFor={field.name}>Name</label>
              <input
                id={field.name}
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                className="focus:outline-none bg-white/10 rounded-sm py-[1px] px-1 no-spinner"
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>
        <form.Field name="calories">
          {(field) => (
            <div className="flex flex-col">
              <label htmlFor={field.name}>Calories (kcal)</label>
              <input
                id={field.name}
                type="number"
                value={field.state.value}
                onChange={(e) => field.handleChange(Number(e.target.value))}
                onBlur={field.handleBlur}
                className="focus:outline-none bg-white/10 rounded-sm py-[1px] px-1 no-spinner"
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>
        <form.Field name="water">
          {(field) => (
            <div className="flex flex-col">
              <label htmlFor={field.name}>Water (ml)</label>
              <input
                id={field.name}
                type="number"
                value={field.state.value}
                onChange={(e) => field.handleChange(Number(e.target.value))}
                onBlur={field.handleBlur}
                className="focus:outline-none bg-white/10 rounded-sm py-[1px] px-1 no-spinner"
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>
        <form.Field name="category">
          {(field) => (
            <div className="flex flex-col">
              <label htmlFor={field.name}>Category</label>
              <input
                id={field.name}
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                className="focus:outline-none bg-white/10 rounded-sm py-[1px] px-1 no-spinner"
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>
        <form.Field name="favorite">
          {(field) => (
            <div className="flex flex-col">
              <label htmlFor={field.name} className="cursor-pointer inline-block self-start">
                Favorite
              </label>
              <input
                id={field.name}
                type="checkbox"
                checked={field.state.value}
                onChange={(e) => field.handleChange(e.target.checked)}
                className="hidden"
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>
        <div className="flex justify-center">
          <Button type="submit">Add Product</Button>
        </div>
      </div>
    </form>
  );
}