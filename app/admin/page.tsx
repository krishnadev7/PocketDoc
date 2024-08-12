import StatCard from "@/components/StatCard"
import {columns} from "@/components/table/Columns";
import {DataTable} from "@/components/table/DataTable";
import { getRecentAppointmentList } from "@/lib/actions/appointment.action"


const Admin = async() => {
  const appointments = await getRecentAppointmentList();
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
        <DataTable columns={columns} data={appointments.documents}/>
    </main>
    </div>
  )
}

export default Admin