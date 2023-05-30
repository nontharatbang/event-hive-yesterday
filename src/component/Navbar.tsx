import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession, signIn, signOut } from 'next-auth/react'

import Account from '../pages/assets/account.svg'
import Menu from '../pages/assets/menu.svg'
import EventHive from '../pages/assets/eventHive.svg'

const Navbar = () => {
    const { data: session } = useSession()
    const [navbar, setNavbar] = useState(false)

    const router = useRouter()
    const currentRoute = router.pathname

    const valueToSend = session?.user?.name

    const sendAccValue = () => {
        if (session?.user?.image == 'shopOwner') {
            router.push(`/shopowneracc?id=${valueToSend}`)
        } else if (session?.user?.image == 'eventOrganizer') {
            router.push(`/eventorganizeracc?id=${valueToSend}`)
        }
    }

    return (
        <nav className="sticky top-0 z-10 w-full bg-white shadow">
            <div className="justify-stretch mx-auto px-8 md:flex md:items-center lg:max-w-7xl">
                <div className="md:basis-1/3">
                    <div className="flex py-5 md:block">
                        <Link href="/" className="w-48 grow">
                            <div className="flex flex-row">
                                <Image
                                    className="mr-3 w-6"
                                    src={EventHive}
                                    alt={'Event Hive'}
                                />
                                <span className="bg-gradient-to-r from-[#EF9323] to-[#5D3891] bg-clip-text text-2xl font-extrabold text-transparent">
                                    EVENT HIVE
                                </span>
                            </div>
                        </Link>
                        <div className="flex items-center space-x-3 md:hidden">
                            {session?.user ? (
                                <button onClick={sendAccValue}>
                                    <Image
                                        className="w-6"
                                        src={Account}
                                        alt={'account'}
                                    />
                                </button>
                            ) : (
                                ''
                            )}

                            <button onClick={() => setNavbar(!navbar)}>
                                <Image
                                    className="w-6"
                                    src={Menu}
                                    alt={'menu'}
                                />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="md:basis-1/2 ">
                    <div
                        className={`pb-8 pt-4 md:flex md:justify-center md:pt-0 md:pb-0 ${
                            navbar ? 'block' : 'hidden'
                        }`}
                    >
                        <ul className="justify-center space-y-8 text-center md:flex md:space-x-12 md:space-y-0 ">
                            <li className="text-xl font-extrabold">
                                <Link
                                    href="/shops"
                                    className={`hover:text-secondary ${
                                        currentRoute === '/shops'
                                            ? 'text-secondary'
                                            : 'text-black'
                                    }`}
                                >
                                    Stores
                                </Link>
                            </li>

                            <li className="text-xl font-extrabold">
                                <Link
                                    href="/events"
                                    className={`hover:text-secondary ${
                                        currentRoute === '/events'
                                            ? 'text-secondary'
                                            : 'text-black'
                                    }`}
                                >
                                    Events
                                </Link>
                            </li>
                            {session?.user ? (
                                <li className="text-xl font-extrabold">
                                    <Link
                                        href="/favourites"
                                        className={`hover:text-secondary ${
                                            currentRoute === '/favourites'
                                                ? 'text-secondary'
                                                : 'text-black'
                                        }`}
                                    >
                                        Favourites
                                    </Link>
                                </li>
                            ) : (
                                ''
                            )}
                            <li className="text-xl font-extrabold">
                                {session?.user ? (
                                    <Link
                                        href="/"
                                        onClick={() => signOut()}
                                        className={`rounded-lg decoration-2 underline-offset-2 hover:underline md:hidden ${
                                            session?.user
                                                ? 'text-[#F16767]'
                                                : 'text-primary'
                                        }`}
                                    >
                                        Sign out
                                    </Link>
                                ) : (
                                    <Link
                                        href="/"
                                        onClick={() => signIn()}
                                        className={`rounded-lg decoration-2 underline-offset-2 hover:underline md:hidden ${
                                            session?.user
                                                ? 'text-[#F16767]'
                                                : 'text-primary'
                                        }`}
                                    >
                                        Sign in
                                    </Link>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="hidden basis-1/3 justify-end space-x-3 md:flex">
                    {session?.user ? (
                        <>
                            {session.user.image === 'shopOwner' ||
                            session.user.image === 'eventOrganizer' ? (
                                <button onClick={sendAccValue}>
                                    <Image
                                        className="w-6"
                                        src={Account}
                                        alt={'account'}
                                    />
                                </button>
                            ) : (
                                <Image
                                    className="w-6"
                                    src={Account}
                                    alt={'account'}
                                />
                            )}
                            <div className="flex items-center gap-6">
                                {/* <div className="justify-end rounded-lg font-extrabold">
                                    Signed in as {session.user.name}
                                </div> */}
                                <div
                                    className="text-md justify-end rounded-lg font-extrabold hover:text-primary"
                                    onClick={() =>
                                        signOut({
                                            callbackUrl: `${window.location.origin}`,
                                        })
                                    }
                                >
                                    Sign Out
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center gap-6">
                                <div
                                    className="text-md justify-end rounded-lg font-extrabold hover:text-primary"
                                    onClick={() => signIn()}
                                >
                                    Sign in
                                </div>
                                <Link href="/register">
                                    <div className="rounded-md bg-[#FFB84C] from-[#EF9323] to-[#5D3891] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gradient-to-r focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                                        Register
                                    </div>
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
