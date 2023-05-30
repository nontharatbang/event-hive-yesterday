import { useRef } from 'react'
import { signIn } from 'next-auth/react'

import Image from 'next/image'
import Link from 'next/link'
import EventHive from '../pages/assets/eventHive.svg'

export default function Login() {
    const email = useRef("")
    const password = useRef("")

    const onSubmit = async () => {
        const result = await signIn("credentials", {
            email: email.current,
            password: password.current,
            redirect: true,
            callbackUrl: "/",
        })
    }
    return (
        <>
            <div className="mx-auto my-24 flex flex-col items-center gap-8 rounded-lg bg-[#F5EAEA] p-12 drop-shadow-xl max-w-md lg:max-w-lg">
            <Link href="/">
                <div className="flex flex-row items-center py-4">
                    <Image
                        className="mr-3 w-8"
                        src={EventHive}
                        alt={'Event Hive'}
                    />
                    <span className="bg-gradient-to-r from-[#EF9323] to-[#5D3891] bg-clip-text text-3xl font-extrabold text-transparent">
                        EVENT HIVE
                    </span>
                </div>
                </Link>
                <div className="flex w-full flex-row items-center">
                    <h5 className="mr-8 text-xl font-extrabold text-[#A459D1] md:text-2xl">
                        EMAIL
                    </h5>
                    <input
                        className="w-full rounded-md border border-slate-300 bg-white p-2  text-sm shadow-sm placeholder:text-slate-400"
                        placeholder="Email"
                        type="email"
                        name="email"
                        onChange={(e) => {email.current = e.target.value}}
                    />
                </div>
                <div className="flex w-full flex-row items-center">
                    <h5 className="mr-8 text-xl font-extrabold text-[#A459D1] md:text-2xl">
                        PASSWORD
                    </h5>
                    <input
                        className="w-full rounded-md border border-slate-300 bg-white p-2  text-sm shadow-sm placeholder:text-slate-400"
                        placeholder="Password"
                        type="password"
                        name="password"
                        onChange={(e) => {password.current = e.target.value}}
                    />
                </div>
                <div
                    className="w-full rounded-lg bg-[#FFB84C] from-[#EF9323] to-[#5D3891] p-2 text-center font-extrabold text-white hover:bg-gradient-to-r"
                    onClick={onSubmit}
                >
                    Sign in
                </div>
                <hr className="w-full my-4 bg-[#989898] h-0.5" />
                <div className="flex flex-row items-center">
                    <p>
                    Don&rsquo;t have an account?</p>
                    <Link
                        href="/register"
                        className="justify-end rounded-lg hover:underline decoration-2 underline-offset-2 font-extrabold text-primary pl-4 text-xl"
                    >
                        Register
                    </Link>
                </div>
            </div>

        </>
    )
}
