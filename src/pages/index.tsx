import Navbar from '../component/Navbar'
import Hero from '../component/Hero'
import Image from 'next/image'
import Upcoming from '../pages/assets/upcoming.svg'
import GroupButton from '../component/GroupButton'
import Card from '../component/Card'
import Footer from '../component/Footer'
import { useState, useEffect } from 'react'

import Calendar from '../pages/assets/calendar.svg'
import Right from '../pages/assets/right.svg'
import Left from '../pages/assets/left.svg'
import { useRouter } from 'next/router'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]'

function Home({ eventdata, shopdata }: any) {
    const slides = eventdata
    const [curr, setCurr] = useState(0)
    const prev = () =>
        setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1))
    const next = () =>
        setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1))

    function handleClick(i: number) {
        setCurr(i)
    }

    const router = useRouter()

    const sendEventValue = (id: string) => {
        router.push(`/eventInfo?id=${id}`)
    }

    useEffect(() => {
        const slideInterval = setInterval(next, 5000)
        return () => clearInterval(slideInterval)
    }, [])

    function isAvailble(item: any) {
        if (item.line == '' && item.facebook == '' && item.instagram == '' && item.tiktok == '')
            return false
        return true
    }

    return (
        <>
            <div className="flex min-h-screen flex-col">
                <Navbar />
                <div className="flex-grow">
                    <Hero />
                    <section className="grid justify-center bg-white py-8 px-4 md:px-24">
                        <h3 className="py-4 text-center text-2xl font-extrabold text-primary ">
                            UPCOMING EVENTS
                        </h3>

                        <div className="relative overflow-hidden lg:max-w-5xl">
                            <div
                                className="flex transition-transform duration-500 ease-out"
                                style={{
                                    transform: `translateX(-${curr * 100}%)`,
                                }}
                            >
                                {slides.map((item: any) => (
                                    <div
                                        key={item.id}
                                        className="flex w-full flex-none justify-center"
                                    >
                                        <div className="grid grid-cols-1 content-center justify-items-center gap-4 lg:grid-cols-2 lg:justify-items-end lg:gap-12">
                                            <button
                                                onClick={() =>
                                                    sendEventValue(item.id)
                                                }
                                            >
                                                {item.picture === '' ? (
                                                    <Image
                                                        src={Upcoming}
                                                        className="w-48 md:w-64"
                                                        alt={''}
                                                    />
                                                ) : (
                                                    <img
                                                        className="h-48 w-48 rounded-full md:h-60 md:w-60"
                                                        src={item.picture}
                                                        alt={''}
                                                    />
                                                )}
                                            </button>
                                            <div
                                                key={item.id}
                                                className="flex flex-col items-center gap-2 pb-2 lg:items-start lg:pt-8 lg:pr-24 xl:pr-36"
                                            >
                                                <button
                                                    onClick={() =>
                                                        sendEventValue(item.id)
                                                    }
                                                >
                                                    <h4 className="text-center text-xl font-extrabold">
                                                        {item.eventName}
                                                    </h4>
                                                </button>
                                                <div className="flex flex-col items-center gap-2 sm:flex-row">
                                                    <div className="flex flex-row items-center gap-2">
                                                        <Image
                                                            className="w-6"
                                                            src={Calendar}
                                                            alt={''}
                                                        />
                                                        {item.startDate} -{' '}
                                                        {item.endDate}
                                                    </div>
                                                </div>
                                                <p className="text-center text-[#989898] lg:text-start ">
                                                    {item.about.length > 130
                                                        ? item.about.slice(
                                                              0,
                                                              130
                                                          ) + '...'
                                                        : item.about}
                                                </p>

                                                <div
                                                    className={`flex flex-col flex-wrap items-center lg:flex-row ${
                                                        isAvailble(item)
                                                            ? 'gap-3'
                                                            : ''
                                                    }`}
                                                >
                                                    <GroupButton
                                                        line={item.line}
                                                        facebook={item.facebook}
                                                        instagram={
                                                            item.instagram
                                                        }
                                                        tiktok={item.tiktok}
                                                    />
                                                    <div className="flex flex-wrap gap-2 py-1 ">
                                                        {item.tags.map(
                                                            (tag: any) => (
                                                                <div
                                                                    key={tag.id}
                                                                    className="rounded-xl bg-[#F5EAEA] px-3 text-[#F16767]"
                                                                >
                                                                    {
                                                                        tag.tagName
                                                                    }
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div
                                className={`absolute left-5 top-1/3 hidden md:flex ${
                                    slides.length <= 1 ? 'invisible' : ''
                                }`}
                            >
                                <button onClick={prev}>
                                    <Image src={Left} alt={''} />
                                </button>
                            </div>
                            <div
                                className={`absolute right-5 top-1/3 hidden md:flex ${
                                    slides.length <= 1 ? 'invisible' : ''
                                }`}
                            >
                                <button onClick={next}>
                                    <Image src={Right} alt={''} />
                                </button>
                            </div>
                        </div>
                        <div
                            className={`flex items-center justify-center gap-2 py-4 ${
                                slides.length <= 1 ? 'invisible' : ''
                            }`}
                        >
                            {slides.map((_: any, i: number) => (
                                <button
                                    key={i}
                                    onClick={() => handleClick(i)}
                                    className={`
              h-3 w-3 rounded-full bg-secondary transition-all
              ${curr === i ? 'p-2' : 'bg-opacity-50'}
            `}
                                />
                            ))}
                        </div>
                    </section>

                    <section className="my-12 grid justify-center gap-8">
                        <h3 className="text-center text-2xl font-extrabold text-primary">
                            TOP STORES
                        </h3>
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-x-16 xl:max-w-7xl xl:grid-cols-6 xl:gap-12">
                            {shopdata.length > 0 ? (
                                <>
                                    {shopdata[1] && (
                                        <div className="hidden xl:col-span-2 xl:col-start-1 xl:mt-12 xl:grid">
                                            <Card
                                                type="Shop"
                                                data={shopdata[1]}
                                            />
                                        </div>
                                    )}
                                    {shopdata[0] && (
                                        <div className="lg:col-span-2 lg:col-start-2 lg:justify-self-center xl:col-start-3">
                                            <Card
                                                type="Shop"
                                                data={shopdata[0]}
                                            />
                                        </div>
                                    )}
                                    {shopdata[1] && (
                                        <div className="lg:col-span-2 xl:hidden ">
                                            <Card
                                                type="Shop"
                                                data={shopdata[1]}
                                            />
                                        </div>
                                    )}
                                    {shopdata[2] && (
                                        <div className="lg:col-span-2 xl:mt-12">
                                            <Card
                                                type={'Shop'}
                                                data={shopdata[2]}
                                            />
                                        </div>
                                    )}
                                </>
                            ) : (
                                <p>No data available</p>
                            )}
                        </div>
                    </section>
                </div>
                <Footer />
            </div>
        </>
    )
}

export async function getServerSideProps(context: any) {
    const session = await getServerSession(
        context.req,
        context.res,
        authOptions
    )
    const res1 = await fetch(
        'http://localhost:3000/api/events/sortedbyfollowers'
    ) // Replace with your API endpoint URL
    const data1 = await res1.json()
    const res2 = await fetch(
        'http://localhost:3000/api/shops/sortedbyfollowers'
    ) // Replace with your API endpoint URL
    const data2 = await res2.json()

    return {
        props: {
            session,
            eventdata: data1,
            shopdata: data2,
        },
    }
}

export default Home
