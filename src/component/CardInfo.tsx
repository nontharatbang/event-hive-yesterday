import Image from 'next/image'
import TagSelector, { Tag } from '../component/TagSelector'
import GroupButton from './GroupButton'
import Shop from '../pages/assets/shop.svg'
import Event from '../pages/assets/event.svg'
import Like from '../pages/assets/like.svg'
import Unlike from '../pages/assets/unlike.svg'
import Edit from '../pages/assets/edit.svg'
import Instagram from '../pages/assets/instagram.svg'
import Twitter from '../pages/assets/twitter.svg'
import Facebook from '../pages/assets/facebook.svg'
import Tiktok from '../pages/assets/tiktok.svg'
import Phone from '../pages/assets/phone.svg'
import Email from '../pages/assets/email.svg'
import Add from '@/pages/assets/add.svg'
import Location from '../pages/assets/location.svg'
import Calendar from '../pages/assets/calendar.svg'
import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import supabase from 'lib/supabase'
import ImageUploader from './ImageUploader'
import { DatePicker } from 'antd'
const { RangePicker } = DatePicker
import { useSession } from 'next-auth/react'

interface CardInfoProps {
    type: string
    edit: boolean
    data?: any
}

export default function CardInfo(props: CardInfoProps) {
    const { data: session } = useSession()
    const [storeName, setStoreName] = useState(props.data?.shopName || '')
    const [eventName, setEventName] = useState(props.data?.eventName || '')
    const [description, setDescription] = useState(props.data?.about || '')
    const [address, setAddress] = useState(
        props.data?.address || props.data?.location || ''
    )
    const [phone, setPhone] = useState(props.data?.telephone || '')
    const [email] = useState(props.data?.shopOwner?.email || '')
    const [startDate, setStartDate] = useState(props.data?.startDate || '')
    const [endDate, setEndDate] = useState(props.data?.endDate || '')
    const [instagram, setInstagram] = useState(props.data?.instagram || '')
    const [facebook, setFacebook] = useState(props.data?.facebook || '')
    const [line, setLine] = useState(props.data?.line || '')
    const [tiktok, setTiktok] = useState(props.data?.tiktok || '')
    const [editMode, setEditMode] = useState(false)
    const [like, setLike] = useState(false)
    const [showTagSelector, setShowTagSelector] = useState(false)
    const [selectedTags, setSelectedTags] = useState<Tag[]>(
        props.data?.tags || []
    )
    const [picture, setPicture] = useState(props.data?.picture || '')
    const [pictureFile, setPictureFile] = useState<File | null>(null)

    function onChange(dates: any, dateString: [string, string]) {
        const [start, end] = dates
        const sdate = new Date(start)
        const edate = new Date(end)
        const formattedsDate = sdate.toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });
        const formattedeDate = edate.toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });
        setStartDate(formattedsDate)
        setEndDate(formattedeDate)
     
    }

    const handleTagSelectorClose = () => {
        setShowTagSelector(false)
    }

    const handleShowTagSelector = () => {
        setShowTagSelector(true)
    }

    const tagId = selectedTags.map((tag) => {
        return tag.id
    })

    const handleImageChange = (file: File | null) => {
        setPictureFile(file) // Store the selected image file
    }

    const handleSave = async () => {
        let storageName
        if (props.type === 'Shop') {
            storageName = 'ShopImage'
        } else if (props.type === 'Event') {
            storageName = 'EventImage'
        } else {
            console.error('Invalid type')
            return
        }

        if (pictureFile) {
            const fileName = uuid()
            const { data, error } = await supabase.storage
                .from(storageName)
                .upload(fileName, pictureFile)
            if (error) {
                console.error('Error uploading image:', error.message)
                return
            }

            const imageUrl = supabase.storage
                .from(storageName)
                .getPublicUrl(fileName)
            console.log('Image URL:', imageUrl.data.publicUrl)
            setPicture(imageUrl.data.publicUrl)
        }
        if (props.type === 'Shop') {
            const formData = {
                shopName: storeName,
                about: description,
                address: address,
                email: email,
                telephone: phone,
                instagram: instagram,
                facebook: facebook,
                tiktok: tiktok,
                tags: tagId,
                picture: picture,
            }

            const jsonData = JSON.stringify(formData)
            console.log(jsonData)

            try {
                const response = await fetch(
                    `http://localhost:3000/api/shops/${props.data.id}`,
                    {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: jsonData,
                    }
                )

                if (response.ok) {
                    // Successful response, handle accordingly
                    console.log('Data successfully submitted!')
                    window.location.reload()
                } else {
                    // Error response, handle accordingly
                    console.log('Failed to submit data')
                }
            } catch (error) {
                // Error occurred during the request, handle accordingly
                console.error('Error:', error)
            }
        } else {
            const formData = {
                eventName: eventName,
                about: description,
                address: address,
                email: email,
                telephone: phone,
                startDate: startDate,
                endDate: endDate,
                line: line,
                instagram: instagram,
                facebook: facebook,
                tiktok: tiktok,
                tags: tagId,
                picture: picture,
            }

            const jsonData = JSON.stringify(formData)
            console.log(jsonData)

            try {
                const response = await fetch(
                    `http://localhost:3000/api/events/${props.data.id}`,
                    {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: jsonData,
                    }
                )

                if (response.ok) {
                    // Successful response, handle accordingly
                    console.log('Data successfully submitted!')
                    window.location.reload()
                } else {
                    // Error response, handle accordingly
                    console.log('Failed to submit data')
                }
            } catch (error) {
                // Error occurred during the request, handle accordingly
                console.error('Error:', error)
            }
        }
        // logic to save changes made by the user
        setEditMode(false) // switch back to view mode
    }

    function isAvailble() {
        if (
            props.data?.line == '' &&
            props.data?.facebook == '' &&
            props.data?.instagram == ''&&
            props.data.tiktok == ''
        )
            return false
        return true
    }

    const defaultPic = props.type === 'Shop' ? Shop : Event

    if (editMode) {
        return (
            <div className="relative flex flex-row rounded-lg bg-white py-12 px-12 sm:px-20 lg:max-w-7xl xl:px-28">
                <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-16">
                    <div className="h-full">
                        <ImageUploader
                            onImageChange={handleImageChange}
                            type={props.type}
                            data={props.data}
                        />
                    </div>
                    <div className="col-span-2 flex basis-2/3 flex-col items-center gap-4 sm:items-start">
                        {props.type === 'Shop' ? (
                            <input
                                className="block rounded-md border border-slate-300 bg-white py-2 pl-2 pr-3 text-2xl font-extrabold shadow-sm placeholder:text-slate-400 sm:text-4xl"
                                value={storeName}
                                onChange={(e) => setStoreName(e.target.value)}
                            />
                        ) : (
                            <input
                                className="block rounded-md border border-slate-300 bg-white py-2 pl-2 pr-3 text-2xl font-extrabold shadow-sm placeholder:text-slate-400 sm:text-4xl"
                                value={eventName}
                                onChange={(e) => setEventName(e.target.value)}
                            />
                        )}
                        <div className="flex flex-col gap-2 md:flex-row">
                            <div className="flex flex-row gap-2">
                                <button>
                                    <Image
                                        className="h-8"
                                        src={Phone}
                                        alt={''}
                                    />
                                </button>
                                <input
                                    className="block rounded-md border border-slate-300 bg-white py-2 pl-2 pr-3 shadow-sm placeholder:text-slate-400"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <button>
                                <Image
                                    className="h-8"
                                    src={Location}
                                    alt={''}
                                />
                            </button>
                            <input
                                className="block rounded-md border border-slate-300 bg-white py-2 pl-2 pr-3 shadow-sm placeholder:text-slate-400"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        {props.type == 'Event' && (
                            <div className="flex flex-row items-center gap-2">
                                <Image
                                    className="h-8"
                                    src={Calendar}
                                    alt={''}
                                />
                                <RangePicker onChange={onChange} />
                            </div>
                        )}

                        <div className="flex w-full flex-row items-center gap-2">
                            <button>
                                <Image
                                    className="h-8"
                                    src={Instagram}
                                    alt={''}
                                />
                            </button>
                            <input
                                className="rounded-md border border-slate-300 bg-white py-2 pl-2 pr-3 shadow-sm placeholder:text-slate-400"
                                placeholder="Instagram"
                                type="url"
                                name="Instagram"
                                value={instagram}
                                onChange={(e) => setInstagram(e.target.value)}
                            />
                        </div>
                        <div className="flex w-full flex-row items-center gap-2">
                            <button>
                                <Image
                                    className="h-8"
                                    src={Facebook}
                                    alt={''}
                                />
                            </button>
                            <input
                                className="rounded-md border border-slate-300 bg-white py-2 pl-2 pr-3 shadow-sm placeholder:text-slate-400"
                                placeholder="Facebook"
                                type="url"
                                name="Facebook"
                                value={facebook}
                                onChange={(e) => setFacebook(e.target.value)}
                            />
                        </div>
                        <div className="flex w-full flex-row items-center gap-2">
                            <button>
                                <Image className="h-8" src={Twitter} alt={''} />
                            </button>
                            <input
                                className="rounded-md border border-slate-300 bg-white py-2 pl-2 pr-3 shadow-sm placeholder:text-slate-400"
                                placeholder="Line"
                                type="url"
                                name="Line"
                                value={line}
                                onChange={(e) => setLine(e.target.value)}
                            />
                        </div>
                        <div className="flex w-full flex-row items-center gap-2">
                            <button>
                                <Image className="h-8" src={Tiktok} alt={''} />
                            </button>
                            <input
                                className="rounded-md border border-slate-300 bg-white py-2 pl-2 pr-3 shadow-sm placeholder:text-slate-400"
                                placeholder="TikTok"
                                type="url"
                                name="TikTok"
                                value={tiktok}
                                onChange={(e) => setTiktok(e.target.value)}
                            />
                        </div>
                        {showTagSelector && (
                            <TagSelector
                                onClose={handleTagSelectorClose}
                                selectTags={selectedTags}
                                setSelectTags={setSelectedTags}
                            />
                        )}
                        <div className="ml-5 flex flex-wrap">
                            {selectedTags.length > 0 ? (
                                selectedTags.map((tag) => (
                                    <div className="mx-1 flex" key={tag.id}>
                                        <button
                                            className="flex items-center rounded-xl bg-[#F5EAEA] px-3 text-[#F16767]"
                                            key={tag.id}
                                        >
                                            {tag.tagName}
                                        </button>
                                        <button
                                            className="ml-[-0.5rem] h-4 w-4 items-center justify-center rounded-full bg-[#F16767] align-middle text-[10px] font-bold text-white"
                                            onClick={() =>
                                                setSelectedTags(
                                                    selectedTags.filter(
                                                        (t) => t !== tag
                                                    )
                                                )
                                            }
                                        >
                                            X
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <button
                                    className="items-center rounded-xl bg-[#F5EAEA] px-3 text-[#F16767] sm:self-start"
                                    onClick={handleShowTagSelector}
                                >
                                    catagories
                                </button>
                            )}
                            <button
                                className="ml-2"
                                onClick={handleShowTagSelector}
                            >
                                <Image width={25} src={Add} alt={'add'} />
                            </button>
                        </div>

                        <textarea
                            className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-2 pr-3 shadow-sm placeholder:text-slate-400"
                            rows={5}
                            cols={100}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <button
                            onClick={handleSave}
                            className="mx-3 justify-end self-end rounded-lg bg-[#FFB84C] from-[#EF9323] to-[#5D3891] px-6 py-2 font-extrabold text-white hover:bg-gradient-to-r"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="relative flex flex-col rounded-lg bg-white py-12 px-12 sm:px-20 xl:w-[72rem]">
            <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-16">
                {props.data?.picture === '' ? (
                    <Image
                        className="w-52 basis-1/3 self-center sm:self-start"
                        src={defaultPic}
                        alt={''}
                    />
                ) : (
                    <img
                        src={props.data?.picture}
                        className="h-52 w-52 self-center rounded-full bg-slate-400 sm:self-start"
                        alt={''}
                    />
                )}
                <div className="absolute top-8 right-8 flex items-center">
                    <button
                        onClick={() => setEditMode(!editMode)}
                        className={`mx-3 w-7 md:w-9 ${
                            props.edit ? '' : 'hidden'
                        }`}
                    >
                        <Image src={Edit} alt={''} />
                    </button>
                    {session?.user ? (
                        <button
                            onClick={() => setLike(!like)}
                            className="w-6 md:w-8"
                        >
                            {like ? (
                                <Image src={Like} alt={''} />
                            ) : (
                                <Image src={Unlike} alt={''} />
                            )}
                        </button>
                    ) : (
                        ''
                    )}
                </div>

                <div className="col-span-2 flex basis-2/3 flex-col items-center gap-4 sm:items-start xl:w-[52rem]">
                    <h2 className="pr-4 text-center text-2xl font-extrabold sm:text-start sm:text-4xl">
                        {props.type === 'Event' ? (
                            <>{props.data?.eventName}</>
                        ) : (
                            <>{props.data?.shopName}</>
                        )}
                    </h2>
                    <div className="flex flex-col items-center gap-2 sm:flex-row">
                        <div className="flex flex-row items-center gap-2">
                            <Image className="h-8" src={Phone} alt={''} />
                            {props.data?.telephone}
                        </div>

                        <div className="flex flex-row items-center gap-2">
                            <Image className="ml-2 h-8" src={Email} alt={''} />

                            {props.type === 'Shop' ? (
                                <>{props.data?.shopOwner.email}</>
                            ) : (
                                <>{props.data?.eventOrganizer.email}</>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                        <Image className="h-8" src={Location} alt={''} />
                        {props.type === 'Shop' ? (
                            <>{props.data?.address}</>
                        ) : (
                            <>{props.data?.location}</>
                        )}
                    </div>
                    {props.type === 'Event' && (
                        <div className="flex flex-col items-center gap-2 sm:flex-row">
                            <div className="flex flex-row items-center gap-2">
                                <Image
                                    className="h-8"
                                    src={Calendar}
                                    alt={''}
                                />
                                {props.data?.startDate} - {props.data?.endDate}
                            </div>
                        </div>
                    )}
                    <div
                        className={`flex flex-col flex-wrap items-center sm:flex-row ${
                            isAvailble() ? 'gap-4' : ''
                        }`}
                    >
                        <GroupButton
                            line={props.data?.line}
                            facebook={props.data?.facebook}
                            instagram={props.data?.instagram}
                            tiktok={props.data?.tiktok}
                        />
                        <div className="flex flex-wrap gap-2 py-1 ">
                            {props.data?.tags.map((tag: any) => (
                                <div
                                    key={tag.id}
                                    className="rounded-xl bg-[#F5EAEA] px-3 text-[#F16767]"
                                >
                                    {tag.tagName}
                                </div>
                            ))}
                        </div>
                    </div>
                    <p className="text-center sm:text-start">
                        {props.data?.about}
                    </p>
                </div>
            </div>
            {/* {props.role == "shopOwner" ? (
                <button
                    onClick={() => setRequest(!request)}
                    className="mx-3 mt-4 w-32 justify-end self-center rounded-lg bg-[#FFB84C] from-[#EF9323] to-[#5D3891] px-6 py-2 font-extrabold text-white hover:bg-gradient-to-r lg:self-end"
                >
                    {request ? 'Requested' : 'Join'}
                </button>
            ) : (
                ''
            )} */}
        </div>
    )
}
