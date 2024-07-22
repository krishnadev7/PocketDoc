"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl } from "@/components/ui/form"
import CustomFormField from "../customFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { createUser } from "@/lib/actions/patient.action"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { FormFieldTypes } from "./PatientForms"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { GenderOptions } from "@/constants"
import { Label } from "../ui/label"

const RegisterForm = ({ user }: { user: User }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm<z.infer<typeof UserFormValidation>>({
        resolver: zodResolver(UserFormValidation),
        defaultValues: {
            name: "",
            email: "",
            phone: ""
        },
    })

    async function onSubmit(values: z.infer<typeof UserFormValidation>) {
        console.log("form submitted", values);


        setIsLoading(true);

        try {
            const user = {
                name: values.name,
                email: values.email,
                phone: values.phone
            }


            const newUser = await createUser(user);

            if (newUser) {
                router.push(`/patients/${newUser.$id}/register`);
            }

        } catch (error: any) {
            console.log(error);

        }
        setIsLoading(false);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
                <section className="mb-12 space-y-4">
                    <h1 className="header">Welcome 🙏</h1>
                    <p className="text-dark-700">Let us know more about yourself</p>
                </section>

                <section className="space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">Personal Information</h2>
                    </div>
                </section>


                <CustomFormField
                    control={form.control}
                    fieldType={FormFieldTypes.INPUT}
                    name="name"
                    label="Full Name"
                    placeholder="John Doe"
                    iconSrc="/assets/icons/user.svg"
                    iconAlt="user icon  "
                />

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldTypes.INPUT}
                        name="email"
                        label="E-mail"
                        placeholder="user@gmail.com"
                        iconSrc="/assets/icons/email.svg"
                        iconAlt="email icon  "
                    />

                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldTypes.PHONE_INPUT}
                        name="phone"
                        label="Phone number"
                        placeholder="+91 9325232542"
                    />
                </div>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldTypes.DATE_PICKER}
                        name="birthDate"
                        label="Date of Birth"
                    />

                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldTypes.SKELETON}
                        name="gender"
                        label="Gender"
                        renderSkeleton={(field) => (
                            <FormControl>
                                <RadioGroup className="flex h-11 gap-6 xl:justify-between"
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    {GenderOptions.map((option) => (
                                        <div key={option} className="radio-group">
                                            <RadioGroupItem value={option} id={option} />
                                            <Label htmlFor={option} className="cursor-pointer">{option}</Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        )}
                    />
                </div>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldTypes.INPUT}
                        name="address"
                        label="Address"
                        placeholder="Amit Singh
                                     42, Green Park
                                     New Delhi - 110016
                                     India"
                    />
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldTypes.INPUT}
                        name="occupation"
                        label="Occupation"
                        placeholder="Software engineer"
                    />
                </div>

                <div className="flex flex-col gap-6 xl:flex-row">
                <CustomFormField
                        control={form.control}
                        fieldType={FormFieldTypes.INPUT}
                        name="emergencyContactName"
                        label="Emergency contact name"
                        placeholder="Guardian's name"
                    />

                <CustomFormField
                        control={form.control}
                        fieldType={FormFieldTypes.PHONE_INPUT}
                        name="phone"
                        label="Phone number"
                        placeholder="+91 9325232542"
                    />
                </div>

                <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>

            </form>
        </Form>
    )

}

export default RegisterForm;