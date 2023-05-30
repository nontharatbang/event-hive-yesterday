import RegisterCard from '../../component/RegisterCard'
import Organzier from '../../pages/assets/Organizer.svg'
import Navbar from '../../component/Navbar'
import Footer from '../../component/Footer'
import Link from 'next/link'
import { useState } from 'react'

export default function Organizer() {
    const [password, setPassword] = useState('')
    const [companyName, setCompanyName] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordMatch, setPasswordMatch] = useState(true)
    const [email, setEmail] = useState('')
    const [isValidEmail, setIsValidEmail] = useState(true)

    function handleCompanyNameChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        setCompanyName(event.target.value)
    }

    function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
        const newEmail = event.target.value
        setEmail(newEmail)
        setIsValidEmail(validateEmail(newEmail))
    }

    function validateEmail(email: string) {
        // Regular expression to check if the email is valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value)
        setPasswordMatch(event.target.value === confirmPassword)
    }

    function handleConfirmPasswordChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        setConfirmPassword(event.target.value)
        setPasswordMatch(event.target.value === password)
    }

    async function handleSubmit() {
        if (!passwordMatch) {
            setPasswordMatch(false)
            return
        }
        if (!companyName || !email || !isValidEmail) {
            return
        }

        const formData = {
            companyName: companyName,
            email: email,
            password: password,
        }

        // Convert form data to JSON string
        const jsonData = JSON.stringify(formData)

        // Log the JSON data
        console.log(jsonData)

        try {
            const response = await fetch(
                'http://localhost:3000/api/eventorganizers/registration',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: jsonData,
                }
            )

            if (response.ok) {
                // Successful response, handle accordingly
                console.log('Data successfully submitted!')
                window.location.href = '/login2'
            } else {
                // Error response, handle accordingly
                console.log('Failed to submit data')
            }
        } catch (error) {
            // Error occurred during the request, handle accordingly
            console.error('Error:', error)
        }
    }
    return (
        <>
            <div className="flex min-h-screen flex-col">
                <Navbar />
                <div className="flex-grow">
                    <div className="flex flex-col-reverse items-center justify-center px-3 py-12 lg:flex-row">
                        <div className="flex flex-col items-center gap-6 lg:pl-6">
                            <h3 className="bg-clip-text text-2xl font-extrabold text-[#5D3891]">
                                YOU ARE ...
                            </h3>
                            <div className="m-10 grid w-full max-w-[1080px] grid-cols-1 gap-5 lg:flex">
                                <div>
                                    <RegisterCard
                                        image={Organzier}
                                        alt="Organzier"
                                        title="Organzier"
                                    />
                                </div>
                                <div className="w-full max-w-[500px] rounded-lg bg-[#F5EAEA] p-10 drop-shadow-lg">
                                    <div className="mb-3">
                                        <h5 className="mb-3 text-sm font-extrabold text-[#A459D1] lg:text-2xl">
                                            COMPANY NAME
                                        </h5>
                                        <input
                                            className="w-full rounded-md border border-slate-300 bg-white py-2 pl-2 pr-3 shadow-sm placeholder:text-slate-400"
                                            placeholder="Company Name"
                                            type="name"
                                            name="companyname"
                                            value={companyName}
                                            onChange={handleCompanyNameChange}
                                        />
                                    </div>
                                    <div className="flex justify-end">
                                        {!companyName && (
                                            <p className="text-red-500">
                                                Please enter company name
                                            </p>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <h5 className="mb-3 mr-10 text-sm font-extrabold text-[#A459D1] lg:text-2xl">
                                            EMAIL
                                        </h5>
                                        <input
                                            className="w-full rounded-md border border-slate-300 bg-white py-2 pl-2 pr-3 shadow-sm  placeholder:text-slate-400"
                                            placeholder="Email"
                                            type="email"
                                            name="email"
                                            value={email}
                                            onChange={handleEmailChange}
                                        />
                                    </div>
                                    <div className="flex justify-end">
                                        {!isValidEmail && (
                                            <p className="text-red-500">
                                                Please enter a valid email
                                                address
                                            </p>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <h5 className="mb-3 mr-10 text-sm font-extrabold text-[#A459D1] lg:text-2xl">
                                            PASSWORD
                                        </h5>
                                        <input
                                            className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-2 pr-3 shadow-sm  placeholder:text-slate-400"
                                            placeholder="Password"
                                            type="password"
                                            name="password"
                                            value={password}
                                            onChange={handlePasswordChange}
                                        />
                                    </div>
                                    <div className="my-3">
                                        <h5 className="my-3 mr-10 text-sm font-extrabold text-[#A459D1] lg:text-2xl">
                                            CONFIRM PASSWORD
                                        </h5>
                                        <input
                                            className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-2 pr-3 shadow-sm  placeholder:text-slate-400"
                                            placeholder="Confirm Password"
                                            type="password"
                                            name="confirmPassword"
                                            value={confirmPassword}
                                            onChange={
                                                handleConfirmPasswordChange
                                            }
                                        />
                                    </div>
                                    <div className="flex justify-end">
                                        {!passwordMatch && (
                                            <p className="text-red-500">
                                                Passwords do not match.
                                            </p>
                                        )}
                                    </div>
                                    <div className="mt-3 flex justify-end">
                                        <button
                                            className="justify-end rounded-lg bg-[#FFB84C] from-[#EF9323] to-[#5D3891] px-6 py-2 font-extrabold text-white hover:bg-gradient-to-r"
                                            onClick={handleSubmit}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}
