import StatCard from "@/components/StatCard"
import {columns, Payment} from "@/components/table/Columns";
import {DataTable} from "@/components/table/DataTable";
import { getRecentAppointmentList } from "@/lib/actions/appointment.action"


async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
      patient: "krish"
    },
    // ...
  ]
}

const Admin = async() => {
  const appointments = await getRecentAppointmentList();
  const data = await getData()
  return (
    <div className="admin-page">
    <main className="admin-main">
        <section className="w-full space-y-4">
            <h1 className="header">Welcome, Admin👋</h1>
            <p className="text-dark-700">Start the day with managing new appointments</p>
        </section>

        <section className="admin-stat">
        <StatCard
            type="appointments"
            count={appointments.scheduledCount}
            label="Scheduled appointments"
            icon={"/assets/icons/appointments.svg"}
          />
          <StatCard
            type="pending"
            count={appointments.pendingCount}
            label="Pending appointments"
            icon={"/assets/icons/pending.svg"}
          />
          <StatCard
            type="cancelled"
            count={appointments.cancelledCount}
            label="Cancelled appointments"
            icon={"/assets/icons/cancelled.svg"}
          />
        </section>
        {/* <DataTable columns={columns} data={appointments.documents}/> */}
        <DataTable columns={columns} data={data}/>
    </main>
    </div>
  )
}

export default Admin