import RegisterCard from '../../component/RegisterCard'
import Visitor from '../../pages/assets/visitor.svg'
import Shopkeeper from '../../pages/assets/Shopkeeper.svg'
import Organzier from '../../pages/assets/Organizer.svg'
import Image from 'next/image'
import Link from 'next/link'
import EventHive from '../../pages/assets/eventHive.svg'

export default function Register() {
    return (
        <>
            <div className="h-full max-w-full p-20">
                <div className="flex flex-col items-center">
                    <h3 className="bg-clip-text text-[1rem] font-extrabold text-[#5D3891] lg:text-[2rem]">
                        YOU ARE ...
                    </h3>
                    <div className="my-5 grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-10">
                        <Link href="/register/visitor">
                            <RegisterCard
                                image={Visitor}
                                alt="Visitor"
                                title="Visitor"
                            />
                        </Link>
                        <Link href="/register/organizer">
                            <RegisterCard
                                image={Organzier}
                                alt="Event Organizer"
                                title="Organizer"
                            />
                        </Link>
                        <Link href="/register/shopkeeper">
                            <RegisterCard
                                image={Shopkeeper}
                                alt="ShopKeeper"
                                title="ShopKeeper"
                            />
                        </Link>
                    </div>
                    <div className="mt-8 flex flex-col-reverse gap-x-12 lg:flex-row items-center">
                        <Link href="/">
                            <div className="flex flex-row items-center py-8">
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
                        <div className="flex flex-row items-center ">
                            <p className="text-xl">Have an account already?</p>
                            <Link
                                href="/login2"
                                className="justify-end rounded-lg pl-4 text-2xl font-extrabold text-primary decoration-2 underline-offset-2 hover:underline"
                            >
                                Sign in
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
