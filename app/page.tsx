import PatientForms from "@/components/forms/PatientForms";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen max-h-screen">
        <section className="remove-scrollbar container my-auto">
            <div className="sub-container max-w-[496px]">

              {/* <div className="flex items-center gap-2">
                <Image
                  src={"/assets/images/pocketdoc-logo.png"}
                  height={1000}
                  width={1000}
                  alt="logo"
                  className="mb-12 h-16 w-fit"
                />
                <p>PocketDoc</p>
              </div> */}

              <PatientForms/>


              <div className="mt-20 text-14-regular flex justify-between">
                <p className="justify-items-end text-dark-600 xl:text-left">© {(new Date()).getFullYear()} PocketDoc</p>
                <Link href={"/?admin=true"} className="text-yellow-500">Admin</Link>
              </div>
            </div>
        </section>
    </div>
  )
    
}
