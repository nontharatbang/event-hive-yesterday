import Link from 'next/link'
import Image from 'next/image'

import HeroPic from '../pages/assets/hero_pic.svg'

const Hero = () => {
    return (
        <div>
            <section className="flex flex-col-reverse items-center justify-center px-3 py-12 lg:flex-row">
                <div className="flex flex-col items-center gap-6 text-center lg:items-end lg:pl-6 lg:text-end">
                    <h1 className="text-4xl font-extrabold text-primary">
                        EVENT HIVE
                    </h1>

                    <p className="text-lg">
                        Web-based event marketplace system
                    </p>
                    <Link href="/register">
                        <div className="rounded-md bg-[#FFB84C] from-[#EF9323] to-[#5D3891] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gradient-to-r focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                            Get started
                        </div>
                    </Link>
                </div>
                <div className="max-w-xs lg:max-w-md">
                    <Image src={HeroPic} alt={'Hero Pic'} />
                </div>
            </section>
        </div>
    )
}

export default Hero
