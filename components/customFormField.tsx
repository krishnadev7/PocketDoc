"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { E164Number } from "libphonenumber-js/core";
import 'react-phone-number-input/style.css'
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { FormFieldTypes } from "./forms/PatientForms";
import Image from "next/image";
import PhoneInput from "react-phone-number-input";

interface CustomProps {
  control: Control<any>,
  fieldType: FormFieldTypes,
  name: string,
  label?: string,
  placeholder?: string,
  iconSrc?: string,
  iconAlt?: string,
  disabled?: boolean,
  dateFormat?: string,
  showTimeSelect?: boolean,
  children?: React.ReactNode,
  renderSkeleton?: (field: any) => React.ReactNode
}

const RenderField = ({ field, props }: { field: any, props: CustomProps }) => {
  const { iconSrc, fieldType, iconAlt, placeholder } = props;

  switch (fieldType) {
    case FormFieldTypes.INPUT:
      return (
        <div className="flex rounded-md border bg-dark-400 border-dark-500">
          {iconSrc && (
            <Image
              src={iconSrc}
              height={24}
              width={24}
              alt={iconAlt || "iconAlt"}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input placeholder={placeholder} {...field} className="shad-input border-0" />
          </FormControl>
        </div>
      )
    case FormFieldTypes.PHONE_INPUT:
      return (
        <FormControl>
        <PhoneInput
          defaultCountry="IN"
          placeholder={props.placeholder}
          international
          withCountryCallingCode
          value={field.value as E164Number | undefined}
          onChange={field.onChange}
          className="input-phone"
        />
      </FormControl>
      )
  }
}

const CustomFormField = (props: CustomProps) => {
  const { name, label, placeholder, iconSrc, iconAlt, control, fieldType } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType != FormFieldTypes.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}

          <RenderField field={field} props={props} />

          <FormMessage className="shad-error" />

        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
