import RegisterForm from "@/components/forms/RegisterForms";
import { getUser } from "@/lib/actions/patient.action";
import Link from "next/link";

const Register = async({params:{userId}}:SearchParamProps) => {
    const user = await getUser(userId);
  return (
    <div className="h-screen max-h-screen">
        <section className="remove-scrollbar container my-auto">
            <div className="sub-container max-w-[596px]">
                <RegisterForm user={user} />
              <div className="mt-20 text-14-regular flex justify-between">
                <p className="justify-items-end text-dark-600 xl:text-left">© {(new Date()).getFullYear()} PocketDoc</p>
                <Link href={"/?admin=true"} className="text-pocketDoc">Admin</Link>
              </div>
            </div>
        </section>
    </div>
  )
}

export default Register;