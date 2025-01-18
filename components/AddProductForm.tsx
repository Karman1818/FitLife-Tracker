import React from "react";
import { useForm } from "@tanstack/react-form";
import { object, string, number, boolean } from "zod";
import FieldInfo from "@/components/FieldInfo";

export default function AddProductForm() {
  const form = useForm({
    defaultValues: {
      name: "",
      calories: 0,
      water: 0,
      category: "",
      favorite: false,
    },
    async onSubmit({ value }) {
      console.log(value);
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
      onSubmit={async(e) => {
        e.preventDefault();
        e.stopPropagation();
        await form.handleSubmit();
      }}
    >
      <div
        className="flex flex-col bg-white/10 border-2 border-white/5 shadow-lg m-1 p-1 rounded-lg space-y-1 backdrop-blur-md">
        <form.Field name="name">
          {(field) => (
            <div className="flex flex-col">
              <label htmlFor={field.name}>Name</label>
              <input
                id={field.name}
                type="text"
                value={field.state.value}
                onChange={e => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                className="focus:outline-none bg-white/10 rounded-sm py-[1px] px-1 no-spinner"
              />
              <FieldInfo field={field}/>
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
                onChange={e => field.handleChange(Number(e.target.value))}
                onBlur={field.handleBlur}
                className="focus:outline-none bg-white/10 rounded-sm py-[1px] px-1 no-spinner"
              />
              <FieldInfo field={field}/>
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
                onChange={e => field.handleChange(Number(e.target.value))}
                onBlur={field.handleBlur}
                className="focus:outline-none bg-white/10 rounded-sm py-[1px] px-1 no-spinner"
              />
              <FieldInfo field={field}/>
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
                onChange={e => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                className="focus:outline-none bg-white/10 rounded-sm py-[1px] px-1 no-spinner"
              />
              <FieldInfo field={field}/>
            </div>
          )}
        </form.Field>
        <form.Field name="favorite">
          {(field) => (
            <div className="flex flex-col">
              <label htmlFor={field.name} className="cursor-pointer inline-block self-start">Favorite</label>
              <input
                id={field.name}
                type="checkbox"
                checked={field.state.value}
                onChange={e => field.handleChange(e.target.checked)}
                className="hidden"
              />
              <FieldInfo field={field}/>
            </div>
          )}
        </form.Field>
        <div className="flex justify-center">
          <button
            type="submit"
            className="self-start relative z-10 inline-flex min-h-[36px] cursor-pointer items-center justify-center border-0 bg-transparent px-3 pb-[0.3rem] text-base text-white before:absolute before:inset-0 before:-z-10 before:block before:rounded before:border before:border-white/20 before:bg-white/10 before:shadow-[0_4px_3px_0_rgba(0,0,0,0.2),inset_0_-5px_0_0_rgba(255,255,255,0.1)] before:content-[''] hover:before:border-white/30 hover:before:bg-white/20 hover:before:shadow-[0_4px_3px_0_rgba(0,0,0,0.2),inset_0_-5px_0_0_rgba(255,255,255,0.15)] focus:outline-none focus-visible:before:outline focus-visible:before:outline-4 focus-visible:before:outline-white/50 active:border-t-4 active:border-transparent active:py-1 active:before:shadow-none"
          >
            Add Product
          </button>
        </div>
      </div>
    </form>
  );
};