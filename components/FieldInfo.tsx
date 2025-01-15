import { FieldApi } from "@tanstack/react-form";

interface Props {
  field: FieldApi<any, any, any, any>;
}

export default function({ field }: Props) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em>{field.state.meta.errors.join(", ")}</em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}