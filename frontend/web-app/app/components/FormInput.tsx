import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { useController, UseControllerProps } from "react-hook-form";

type Props = {
  label: string;
  type?: string;
  showLabel?: boolean;
} & UseControllerProps;

const FormInput = (props: Props) => {
  const { fieldState, field } = useController({ ...props, defaultValue: "" });
  return (
    <div className="mb-3">
      {props.showLabel && (
        <div className="mb-2 block">
          <Label htmlFor={field.name}>{props.label}</Label>
        </div>
      )}
      <Input
        {...props}
        {...field}
        placeholder={props.label}
        type={props.type || "text"}
        className={`${
          fieldState.error
            ? "bg-red-50 border-red-200"
            : !fieldState.isDirty
              ? ""
              : "bg-green-50 border-green-200"
        }`}
      />
      <p
        className={`${fieldState.error ? "text-red-600" : !fieldState.isDirty ? "" : "text-black"}`}
      >
        {fieldState?.error?.message}
      </p>
    </div>
  );
};

export default FormInput;
