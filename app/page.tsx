import PatientForms from "@/components/forms/PatientForms";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen max-h-screen">
        <section className="remove-scrollbar container my-auto">
            <div className="sub-container max-w-[496px]">
              <PatientForms/>
              <div className="mt-20 text-14-regular flex justify-between">
                <p className="justify-items-end text-dark-600 xl:text-left">© {(new Date()).getFullYear()} PocketDoc</p>
                <Link href={"/?admin=true"} className="text-pocketDoc">Admin</Link>
              </div>
            </div>
        </section>
    </div>
  )
    
}
