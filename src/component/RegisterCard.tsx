import Image from 'next/image'
import React from 'react'

interface CardProps {
    image: string
    alt: string
    title: string
}

function RegisterCard(props: CardProps) {
    return (
        <div className="mx-auto flex flex-col items-center rounded-lg bg-[#F5EAEA] p-10 drop-shadow-lg">
            <Image src={props.image} alt={props.alt} />
            <h5 className="text-center text-xl font-extrabold uppercase text-[#A459D1] lg:text-2xl">
                {props.title}
            </h5>
        </div>
    )
}

export default RegisterCard
