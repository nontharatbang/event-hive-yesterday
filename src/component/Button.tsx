import { useState } from 'react'
import Image from 'next/image'
import Checked from '../pages/assets/checked.svg'
import Unchecked from '../pages/assets/unchecked.svg'

interface ButtonProps {
    id: any
    data: string
    onValue : any
}

export default function Button(props: ButtonProps) {
    const [toggle, setToggle] = useState(false)

    const tagAlert = () => {
        setToggle(!toggle)
        if (!toggle) {
            props.onValue(props.id);
        } 
    }
    //setToggle(!toggle)

    return (
        <>
            <div className="flex self-center">
                <button onClick={() => tagAlert()}>
                    {toggle ? (
                        <Image className="w-6" src={Checked} alt={''} />
                    ) : (
                        <Image className="w-6" src={Unchecked} alt={''} />
                    )}
                </button>
                {props.data}
            </div>
        </>
    )
}
