import Image from 'next/image'
import EventHive from '../pages/assets/eventHive.svg'
import Twitter from '../pages/assets/twitter.svg'
import Facebook from '../pages/assets/facebook.svg'
import Instagram from '../pages/assets/instagram.svg'
import Phone from '../pages/assets/phone.svg'
import Location from '../pages/assets/location.svg'
import Email from '../pages/assets/email.svg'

function Footer() {
    return (
        <section className="grid gap-y-8 bg-[#A459D121] py-14 lg:flex">
            <div className="flex flex-row items-center justify-center lg:basis-2/3 lg:justify-end">
                <Image className="w-12" src={EventHive} alt={'Event Hive'} />
                <h3 className="ml-3 bg-gradient-to-r from-[#EF9323] to-[#5D3891] bg-clip-text text-3xl font-extrabold text-transparent">
                    EVENT HIVE
                </h3>
            </div>
            <div className="flex flex-col justify-center lg:basis-1/3">
                <div className="mb-3 flex flex-row justify-center gap-3">
                    <button>
                        <Image className="h-6" src={Facebook} alt={''} />
                    </button>
                    <button>
                        <Image className="h-6" src={Twitter} alt={''} />
                    </button>
                    <button>
                        <Image className="h-6" src={Instagram} alt={''} />
                    </button>
                </div>
                <div className="text-center">© 2023 Event hive</div>
            </div>
            <div className="lg:basis-2/3">
                <h5 className="mb-2 text-center text-xl font-extrabold text-primary lg:text-left">
                    CONTACT US
                </h5>
                <div className="flex flex-row justify-center lg:justify-start">
                    <button>
                        <Image
                            className="mr-1 h-4 lg:ml-3"
                            src={Location}
                            alt={''}
                        />
                    </button>
                    Hive101
                    <button>
                        <Image className="ml-2 mr-1 h-4" src={Phone} alt={''} />
                    </button>
                    000-111111
                    <button>
                        <Image className="ml-2 mr-1 h-4" src={Email} alt={''} />
                    </button>
                    admin@eventhive
                </div>
            </div>
        </section>
    )
}

export default Footer
