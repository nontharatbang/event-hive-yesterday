import Navbar from '../component/Navbar'
import Card from '../component/Card'
import Footer from '../component/Footer'
import Add from '@/pages/assets/add.svg'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'

function Eventorganizeracc({ data, id }: any) {
    const router = useRouter()

    const handleCreateClick = () => {
        router.push(`/createPage`)
    }

    return (
        <>
            <div className="flex min-h-screen flex-col">
                <Navbar />
                <div className="flex-grow">
                    <div className="flex flex-col items-center justify-center gap-8 p-8 md:px-24">
                        <div className="flex flex-row justify-center gap-4">
                            <h3 className="text-center text-2xl font-extrabold text-primary">
                                EVENT LIST
                            </h3>
                            <button onClick={handleCreateClick}>
                                <Image className="w-6" src={Add} alt={''} />
                            </button>
                        </div>
                        <div className="mb-8 grid grid-cols-1 gap-8 place-self-center lg:max-w-7xl lg:grid-cols-2 xl:grid-cols-3">
                            {data.map((item: any) => (
                                <Card type="Event" data={item} key={item.id} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export async function getServerSideProps(context: { req: any; query: any }) {
    const { req, query } = context
    const valueFromRouter = query.id
    console.log(valueFromRouter)
    const data = await fetch(
        `http://localhost:3000/api/eventorganizers/${valueFromRouter}`
    )
    const jsonData = await data.json()
    console.log(jsonData[0].events)
    return {
        props: {
            data: jsonData[0].events,
            id: jsonData[0].id,
        },
    }
}

export default Eventorganizeracc
