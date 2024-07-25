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
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";

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
  const { iconSrc, fieldType, iconAlt, placeholder, dateFormat, showTimeSelect, renderSkeleton } = props;

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
    case FormFieldTypes.DATE_PICKER:
      return (
        <div className="flex rounded-md bg-dark-400 border-dark-500">
          <Image
            src={'/assets/icons/calendar.svg'}
            alt="calendar icon"
            width={24}
            height={24}
            className="ml-2"
          />
          <FormControl>
            <DatePicker selected={field.value} onChange={(date) => field.onChange(date)} showTimeSelect={showTimeSelect ?? false}
              dateFormat={dateFormat ?? 'MM/dd/yyyy'} timeInputLabel="Time:" wrapperClassName="date-picker" />
          </FormControl>
        </div>
      )
      case FormFieldTypes.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="shad-select-trigger">
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="shad-select-content">
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      );
    case FormFieldTypes.SKELETON:
      return (
        renderSkeleton ? renderSkeleton(field) : null
      )
    case FormFieldTypes.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={placeholder}
            {...field}
            className="shad-textArea"
            disabled={props.disabled}
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
