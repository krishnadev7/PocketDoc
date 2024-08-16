"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl } from "@/components/ui/form"
import CustomFormField from "../customFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { PatientFormValidation } from "@/lib/validation"
import { registerPatient } from "@/lib/actions/patient.action"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { FormFieldTypes } from "./PatientForms"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Doctors, GenderOptions, IdentificationTypes, PatientFormDefaultValues, } from "@/constants"
import { Label } from "../ui/label"
import { SelectItem } from "../ui/select"
import Image from "next/image"
import FileUploader from "../FileUploader"

const RegisterForm = ({ user }: { user: User }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm<z.infer<typeof PatientFormValidation>>({
        resolver: zodResolver(PatientFormValidation),
        defaultValues: {
            ...PatientFormDefaultValues,
            name: user.name,
            email: user.email,
            phone: user.phone
        },
    })

    const onSubmit = async (values: z.infer<typeof PatientFormValidation>) => {
        
        setIsLoading(true);

        let formData;

        if (values.identificationDocument && values.identificationDocument?.length > 0) {
            const blobFile = new Blob([values.identificationDocument[0]], {
                type: values.identificationDocument[0].type
            })
            formData = new FormData();
            formData.append('blobfile', blobFile)
            formData.append('fileName', values.identificationDocument[0].name)
        }

        try {
            const patient = {
                ...values, 
                userId: user.$id,
                birthDate: new Date(values.birthDate),
                identificationDocument: formData
            }
            //@ts-ignore
            const newPatient = await registerPatient(patient);
            if(newPatient){
                router.push(`/patients/${user.$id}/new-appointment`)
            }
        } catch (error: any) {
            console.log(error);
        }finally {
            setIsLoading(false);
        }
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
                        name="emergencyContactNumber"
                        label="Emergency contact number"
                        placeholder="+91 9325232542"
                    />
                </div>

                <section className="space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">Medical Information</h2>
                    </div>
                </section>

                <CustomFormField
                    control={form.control}
                    fieldType={FormFieldTypes.SELECT}
                    name="primaryPhysician"
                    label="Primary Physician"
                    placeholder="Select a Physician"
                >
                    {Doctors.map((doctor) => (
                        <SelectItem key={doctor.name} value={doctor.name}>
                            <div className="flex cursor-pointer items-center gap-2">
                                <Image
                                    src={doctor.image}
                                    alt="doctor image"
                                    width={32}
                                    height={32}
                                    className="rounded-full border border-dark-500"
                                />
                                <p>{doctor.name}</p>
                            </div>
                        </SelectItem>
                    ))}
                </CustomFormField>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldTypes.INPUT}
                        name="insuranceProvider"
                        label="Insurance Provider"
                        placeholder="SureGuard Insurance"
                    />

                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldTypes.INPUT}
                        name="insurancePolicyNumber"
                        label="Insurance Policy Number"
                        placeholder="PN-4782-9836-ABCD-2451"
                    />
                </div>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldTypes.TEXTAREA}
                        name="allergies"
                        label="Allergies (if any)"
                        placeholder="Eggs, Cockroach droppings"
                    />

                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldTypes.TEXTAREA}
                        name="currentMedication"
                        label="Current Medication (if any)"
                        placeholder="Ibuprofen, Amoxicillin"
                    />
                </div>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldTypes.TEXTAREA}
                        name="familyMedicalHistory"
                        label="Family Medical History"
                        placeholder="Maternal grandfather was diagnosed with type 2 diabetes at age 55, father had high blood pressure starting in his 60s"
                    />

                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldTypes.TEXTAREA}
                        name="pastMedicalHistory"
                        label="Past Medical History"
                        placeholder="Hypertension, Stroke"
                    />
                </div>

                <section className="space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">Medical Information</h2>
                    </div>
                </section>

                <CustomFormField
                    control={form.control}
                    fieldType={FormFieldTypes.SELECT}
                    name="identificationType"
                    label="Identification Type"
                    placeholder="Select an ID type"
                >
                    {IdentificationTypes.map((Id) => (
                        <SelectItem key={Id} value={Id}>
                            {Id}
                        </SelectItem>
                    ))}
                </CustomFormField>

                <CustomFormField
                    control={form.control}
                    fieldType={FormFieldTypes.INPUT}
                    name="identificationNumber"
                    label="Identification Number"
                    placeholder="EID20240567"
                />

                <CustomFormField
                    control={form.control}
                    fieldType={FormFieldTypes.SKELETON}
                    name="identificationDocument"
                    label="Scanned copy of identification document"
                    renderSkeleton={(field) => (
                        <FormControl>
                            <FileUploader files={field.value} onChange={field.onChange} />
                        </FormControl>
                    )}
                />

                <section className="space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">Consent and Privacy</h2>
                    </div>
                </section>

                <CustomFormField
                    control={form.control}
                    fieldType={FormFieldTypes.CHECKBOX}
                    name="treatmentConsent"
                    label="I consent to receive the recommended medical treatment or procedure for my health condition."
                />

                <CustomFormField
                    control={form.control}
                    fieldType={FormFieldTypes.CHECKBOX}
                    name="privacyConsent"
                    label="I acknowledge that i have recieved and agree to privacy policy."
                />

                <SubmitButton isLoading={isLoading}>Submit and Continue</SubmitButton>

            </form>
        </Form>
    )

}

export default RegisterForm;