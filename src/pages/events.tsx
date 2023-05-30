import Navbar from '../component/Navbar'
import Card from '../component/Card'
import Footer from '../component/Footer'
import Button from '../component/Button'

import Image from 'next/image'
import Search from '../pages/assets/search.svg'
import Filter from '../pages/assets/filter.svg'

import { useState } from 'react'
import { useRouter } from 'next/router'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]'


function Events({ eventdata, tags }: any) {
    const [filter, setFilter] = useState(false)
    const [items, setItems] = useState(eventdata)
    const [searchTag, setSearchtag] = useState(0)

    const onSearch = async (value: string) => {
        if (value.length != 0) {
            const res = await fetch(
                'http://localhost:3000/api/search?searchString=' + value
            ) // Replace with your API endpoint URL
            const data = await res.json()
            setItems(data)
        } else {
            setItems(eventdata)
        }
    }

    const handleValue = async (value: any) => {
        console.log('Received value:', value)
        setSearchtag(value)
        const res = await fetch('http://localhost:3000/api/tags/' + value) // Replace with your API endpoint URL
        const data = await res.json()
        console.log(data[0].events)
        setItems(data[0].events)
    }

    return (
        <>
            <div className="flex min-h-screen flex-col">
                <Navbar />
                <div className="flex-grow">
                    <div className="my-12 mx-auto flex flex-col justify-center lg:max-w-7xl ">
                        <div className="mx-12 flex flex-row rounded-lg bg-gradient-to-r from-[#EF9323] to-[#5D3891] p-1 md:mx-36 xl:mx-4">
                            <input
                                onChange={(event) =>
                                    onSearch(event.target.value)
                                }
                                name="text"
                                type="text"
                                placeholder="Type event name..."
                                className="max-w input-bordered input w-full rounded-md rounded-r-none border-r-0 bg-white py-2 pl-4 outline-none"
                            />
                            <button className="bg-white">
                                <Image
                                    className="w-6"
                                    src={Search}
                                    alt={'Search'}
                                />
                            </button>
                            <button
                                className="rounded-r-md bg-white pr-2"
                                onClick={() => setFilter(!filter)}
                            >
                                <Image
                                    className="h-6"
                                    src={Filter}
                                    alt={'Filter'}
                                />
                            </button>
                        </div>
                        <div
                            className={`my-4 mx-12 rounded-sm bg-white p-8 md:mx-36 lg:max-w-7xl lg:self-end xl:mx-4 ${
                                filter ? 'block' : 'hidden'
                            }`}
                        >
                            <h4 className="mb-4 text-xl font-extrabold text-primary">
                                Catagories
                            </h4>
                            <div className="grid grid-cols-3 gap-4 lg:grid-cols-5">
                                {tags.map((tag: any) => (
                                    <Button
                                        key={tag.id}
                                        id={tag.id}
                                        data={tag.tagName}
                                        onValue={handleValue}
                                    />
                                ))}
                            </div>
                        </div>
                        <h4 className="m-8 mx-auto text-xl font-extrabold text-primary">
                            SEARCH FOR :
                        </h4>
                        <div className="mb-8 grid grid-cols-1 gap-8 place-self-center lg:max-w-7xl lg:grid-cols-2 xl:grid-cols-3">
                            {items.map((item: any) => (
                                <Card key={item.id} type="Event" data={item} />
                            ))}
                        </div>
                    </div>
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
    const res1 = await fetch('http://localhost:3000/api/events/') // Replace with your API endpoint URL
    const data1 = await res1.json()

    const res2 = await fetch('http://localhost:3000/api/tags/') // Replace with your API endpoint URL
    const data2 = await res2.json()

    return {
        props: {
            session,
            eventdata: data1,
            tags: data2,
        },
    }
}

export default Events
