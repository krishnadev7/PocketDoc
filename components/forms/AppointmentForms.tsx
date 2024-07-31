"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import CustomFormField from "../customFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { getAppointmentSchema, UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { Doctors } from "@/constants"
import { SelectItem } from "../ui/select"
import Image from "next/image"
import { createAppointment } from "@/lib/actions/appointment.action"

export enum FormFieldTypes {
    INPUT = 'input',
    TEXTAREA = 'textarea',
    PHONE_INPUT = 'phoneInput',
    CHECKBOX = 'checkbox',
    DATE_PICKER = 'datePicker',
    SELECT = 'select',
    SKELETON = 'skeleton'
}


const AppointmentForms = ({ type, userId, patientId }: { type: "create" | "cancel" | "schedule", userId: string, patientId: string }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const AppointmentFormValidation = getAppointmentSchema(type);
    const form = useForm<z.infer<typeof AppointmentFormValidation>>({
        resolver: zodResolver(AppointmentFormValidation),
        defaultValues: {
            primaryPhysician: "",
            schedule: new Date(),
            reason: "",
            note: "",
            cancellationReason: ""
        },
    })

    async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {

        setIsLoading(true);

        let status;
        switch (type) {
            case "schedule":
                status = "scheduled";
                break;
            case "cancel":
                status = "cancelled";
                break;
            default:
                status = "pending";
                break;
        }

        try {
            if (type == "create" && patientId) {
                const appointmentData = {
                    userId,
                    patient: patientId,
                    primaryPhysician: values.primaryPhysician,
                    schedule: new Date(values.schedule),
                    reason: values.reason!,
                    note: values.note,
                    status: status as Status
                }
                const appointment = await createAppointment(appointmentData)
                if(appointment){
                    form.reset();
                    router.push(`/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`)
                }

            }
        } catch (error: any) {
            console.log(error);

        }
        setIsLoading(false);

    }

    let buttonlabel;

    switch (type) {
        case 'cancel':
            buttonlabel = "Cancel Appointment"
            break;
        case 'create':
            buttonlabel = "Create Appointment"
            break;
        case 'schedule':
            buttonlabel = "Schedule Appointment"
            break;
        default:
            break;
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
                <section className="mb-12 space-y-4">
                    <h1 className="header">New Appointment</h1>
                    <p className="text-dark-700">Request a new appointment in 10 seconds</p>
                </section>


                {type !== 'cancel' && (
                    <>
                        <CustomFormField
                            control={form.control}
                            fieldType={FormFieldTypes.SELECT}
                            name="primaryPhysician"
                            label="Doctor"
                            placeholder="Select a Doctor"
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

                        <CustomFormField
                            fieldType={FormFieldTypes.DATE_PICKER}
                            control={form.control}
                            name="schedule"
                            label="Expected appointment date"
                            showTimeSelect
                            dateFormat="MM/dd/yyyy -h:mm aa"
                        />

                        <div className="flex flex-col gap-6 xl:flex-row">
                            <CustomFormField
                                fieldType={FormFieldTypes.TEXTAREA}
                                control={form.control}
                                name="reason"
                                label="Reason for appointment"
                                placeholder="Enter reason for appointment"
                            />
                            <CustomFormField
                                fieldType={FormFieldTypes.TEXTAREA}
                                control={form.control}
                                name="note"
                                label="Notes"
                                placeholder="Enter notes"
                            />
                        </div>

                    </>

                )}

                {type == 'cancel' && (
                    <CustomFormField
                        fieldType={FormFieldTypes.TEXTAREA}
                        control={form.control}
                        name="cancellationReason"
                        label="Reason for cancellation"
                        placeholder="Enter reason for cancellation"
                    />
                )}

                <SubmitButton isLoading={isLoading} className={`${type === 'cancel' ? 'shad-danger-btn' : 'shad-primary-btn'} w-full`}>
                    {buttonlabel}
                </SubmitButton>
            </form>
        </Form>
    )

}

export default AppointmentForms;