import AppointmentForms from "@/components/forms/AppointmentForms"
import { getPatient } from "@/lib/actions/patient.action"


const NewAppointment = async ({params:{userId}}:SearchParamProps) => {
    const patient = await getPatient (userId)
  return (
    <div className="h-screen max-h-screen">
        <section className="remove-scrollbar container my-auto">
            <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
              <AppointmentForms type="create" userId={userId} patientId={patient.$id}/>
              <div className="mt-20 text-14-regular flex justify-between">
                <p className="justify-items-end text-dark-600 xl:text-left">© {(new Date()).getFullYear()} PocketDoc</p>
              </div>
            </div>
        </section>
    </div>
  )
}

export default NewAppointment