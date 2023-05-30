import { ChangeEvent, useState } from 'react'
import Image from 'next/image'
import Shop from '../pages/assets/shop.svg'
import Event from '../pages/assets/event.svg'

interface ImageUploaderProps {
    onImageChange: (file: File | null) => void
    type: string
    data?: any
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
    onImageChange,
    type,
    data,
}) => {
    const [previewImage, setPreviewImage] = useState<string | null>(null)
    const defaultPic = type === 'Shop' ? Shop : Event

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null
        onImageChange(file)

        if (file) {
            const reader = new FileReader()
            reader.onload = () => {
                setPreviewImage(reader.result as string)
            }
            reader.readAsDataURL(file)
        } else {
            setPreviewImage(null)
        }
    }

    return (
        <div className="flex flex-col gap-5">
            {previewImage ? (
                <img
                    src={previewImage}
                    className="h-52 w-52 self-center rounded-full bg-slate-400 sm:self-start"
                    alt=""
                />
            ) : (
                <div>
                    {data?.picture == null ? (
                        <Image
                            className="w-52 basis-1/3 self-center sm:self-start"
                            src={defaultPic}
                            alt=""
                        />
                    ) : (
                        <img
                            className="h-52 w-52 self-center rounded-full bg-slate-400 sm:self-start"
                            src={data?.picture}
                            alt=""
                        />
                    )}
                </div>
            )}
            <input
                className="w-52"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
            />
        </div>
    )
}

export default ImageUploader
