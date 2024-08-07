"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { Cross1Icon } from '@radix-ui/react-icons'
import { decryptKey, encryptKey } from "@/lib/utils";

const PasskeyModal = () => {
  const router = useRouter();
  const path = usePathname();
  const [open, setOpen] = useState(true);
  const [passkey, setPasskey] = useState('');
  const [error, setError] = useState('');

  const encryptedKey = typeof window !== 'undefined' ? window.localStorage.getItem('accesskey') : null;

  console.log(path);
  

  useEffect(() => {
    if (path) {
      const accessKey = encryptedKey && decryptKey(encryptedKey);
      console.log('inside useEffect');
      console.log('accesskeh:', accessKey);
      console.log('Expected Passkey:', process.env.NEXT_PUBLIC_ADMIN_PASS_KEY);
  
      
      if (accessKey === process.env.NEXT_PUBLIC_ADMIN_PASS_KEY) {
        console.log('Redirecting to /admin');
        setOpen(false);
        router.push('/admin');
      } else {
        setOpen(true)
      }
    }
  }, [encryptedKey,path])

  const closeModal = () => {
    setOpen(false);
    router.push('/');
  }

  const validatePasskey = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASS_KEY) {
      const encryptedKey = encryptKey(passkey);
      localStorage.setItem('acessKey', encryptedKey);
      setOpen(false)
    } else {
      setError("Invalid passkey. Please try again.")
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-start justify-between">Admin Access Code!
            <Cross1Icon className="cursor-pointer"
              onClick={() => closeModal()} />
          </AlertDialogTitle>
          <AlertDialogDescription>
            To access the admin page, please enter passkey!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <InputOTP maxLength={6} value={passkey} onChange={(value) => setPasskey(value)}>
            <InputOTPGroup className="shad-otp">
              <InputOTPSlot className="shad-otp-slot" index={0} />
              <InputOTPSlot className="shad-otp-slot" index={1} />
              <InputOTPSlot className="shad-otp-slot" index={2} />
              <InputOTPSlot className="shad-otp-slot" index={3} />
              <InputOTPSlot className="shad-otp-slot" index={4} />
              <InputOTPSlot className="shad-otp-slot" index={5} />
            </InputOTPGroup>
          </InputOTP>
          {error && <p className="flex justify-center shad-error text-14-regular mt-4 flex justify-center">
            {error}
          </p>}
        </div>
        <AlertDialogFooter>
          <AlertDialogAction onClick={(e) => validatePasskey(e)} className="shad-primary-btn w-full">Enter Admin Passkey</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

  )
}

export default PasskeyModal