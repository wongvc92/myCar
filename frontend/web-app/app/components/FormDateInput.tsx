import React from "react";
import { useController, UseControllerProps } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import { Label } from "@/components/ui/label";
import DatePicker, { DatePickerProps } from "react-datepicker";

type Props = {
  label: string;
  type?: string;
  showLabel?: boolean;
} & UseControllerProps &
  DatePickerProps;

const FormDateInput = (props: Props) => {
  const { fieldState, field } = useController({ ...props, defaultValue: "" });
  return (
    <div className="mb-3">
      {props.showLabel && (
        <div className="mb-2 block">
          <Label htmlFor={field.name}>{props.label}</Label>
        </div>
      )}
      <DatePicker
        {...props}
        {...field}
        placeholderText={props.label}
        selected={field.value}
        className={`border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive ${
          fieldState.error
            ? "bg-red-50 border-red-200"
            : !fieldState.invalid && fieldState.isDirty
              ? "bg-green-50 border-green-200"
              : ""
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

export default FormDateInput;
