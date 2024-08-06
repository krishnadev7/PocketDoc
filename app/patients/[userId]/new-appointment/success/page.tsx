import { Button } from "@/components/ui/button";
import { Doctors } from "@/constants";
import { getAppointment } from "@/lib/actions/appointment.action";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image"
import Link from "next/link";

const Success = async({params: {userId},searchParams}:SearchParamProps) => {
  const appointmentId = (searchParams?.appointmentId as string)|| '';
  const appointment = await getAppointment(appointmentId);

  const doctor = Doctors.find((doc) => doc.name === appointment.primaryPhysician);

  return (
    <>
    <section className="flex flex-col items-center mt-5">
      <Image
        src="/assets/gifs/success.gif"
        height={300}
        width={300}
        alt="gif image"
      />
      <h2 className="header mb-6 max-w-[600px] text-center">
        Your <span className="text-pocketDoc">appointment request</span> has been successfully submitted!
      </h2>
      <p>We will be in touch with you shortly to confirm.</p>

      <div className="request-details mt-10">
      <p>Requested appointment details:</p>
      <div className="flex items-center gap-3">
        <Image
          src={doctor?.image!}
          height={100}
          width={100}
          alt='doctor'
          className="size-6"
        />
        <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
      </div>
      <div className="flex gap-2">
        <Image
          src={'/assets/icons/calendar.svg'}
          height={24}
          width={24}
          alt='calendar'
        />
        <p>{formatDateTime(appointment.schedule).dateTime}</p>
      </div>
    </div>
    <Button variant={"outline"} className="shad-primary-btn mt-5" asChild>
      <Link href={`/patients/${userId}/new-appointment`}>
        New Appointment
      </Link>
    </Button>
    </section>
    </>
  )
}

export default Success