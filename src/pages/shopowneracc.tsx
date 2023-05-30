import Navbar from '../component/Navbar'
import CardInfo from '../component/CardInfo'
import Footer from '../component/Footer'
import Create from '../component/CreatePage'

import { useState } from 'react'

import Image from 'next/image'
import Product from '../pages/assets/product.svg'
import Right from '../pages/assets/right.svg'
import Left from '../pages/assets/left.svg'
import Add from '../pages/assets/add.svg'

import supabase from 'lib/supabase'
import ImageUploader from '../component/ImageUploader'

import { v4 as uuid } from 'uuid'

function Shopowneracc({ data }: any) {
    const [curr, setCurr] = useState(0)

    const [edit, setEdit] = useState(false)

    const [index, setIndex] = useState(data.id)
    const [picture, setPicture] = useState(String)
    const [pictureFile, setPictureFile] = useState<File | null>(null)
    const [productName, setProductName] = useState(String)
    const [description, setDescription] = useState(String)
    const [price, setPrice] = useState<number>()

    const [slides, setSlides] = useState(data?.products)

    const prev = () =>
        setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1))
    const next = () =>
        setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1))

    function handleClick(i: number) {
        setCurr(i)
    }



    const handleSave = async () => {
        // Upload the image to Supabase storage
        if (pictureFile) {
            const fileName = uuid()
            const { data, error } = await supabase.storage
                .from('ShopImage')
                .upload(fileName, pictureFile)

            if (error) {
                console.error('Error uploading image:', error.message)
                return
            }

            const imageUrl = supabase.storage
                .from('ShopImage')
                .getPublicUrl(fileName)
            console.log('Image URL:', imageUrl.data.publicUrl)
            setPicture(imageUrl.data.publicUrl)

            const formData = {
                productName: productName,
                description: description,
                price: price,
                shop: index,
            }

            const jsonData = JSON.stringify(formData)
            console.log(jsonData)
            try {
                const response = await fetch(
                    'http://localhost:3000/api/products/registration',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: jsonData,
                    }
                )

                if (response.ok) {
                    console.log('Data successfully submitted!')
                    
                    window.location.reload()
                } else {
                    console.log('Failed to submit data')
                }
            } catch (error) {
                console.error('Error:', error)
            }
        }
    }

    // const deleteSlide = (id: any) => {
    //     if (curr === slides.length - 1) {
    //         prev()
    //     }
    //     const delslides = slides.filter(
    //         (x: any) => x.id.toString() !== id.toString()
    //     )
    //     setSlides(delslides)
    // }

    const handleDelete = async (id:any) => {

            const formData = {
                id: id
            }

            const jsonData = JSON.stringify(formData)
            console.log(jsonData)
            try {
                const response = await fetch(
                    'http://localhost:3000/api/products/delete',
                    {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: jsonData,
                    }
                )

                if (response.ok) {
                    console.log('Data successfully submitted!')
                    
                    window.location.reload()
                } else {
                    console.log('Failed to submit data')
                }
            } catch (error) {
                console.error('Error:', error)
            }
        }
    

    const handleImageChange = (file: File | null) => {
        setPictureFile(file) // Store the selected image file
    }
    if (data == null) {
        return <Create />
    }
    return (
        <>
            <div className="flex min-h-screen flex-col">
                <Navbar />
                <div className="flex-grow">
                    <div className="mt-12 grid justify-center px-8 md:py-8 md:px-20">
                        <CardInfo type={'Shop'} edit={true} data={data} />
                    </div>
                    <div className="flex flex-col items-center justify-center gap-8 p-8 md:px-24">
                        {edit ? (
                            <>
                                <h3 className="text-center text-2xl font-extrabold text-primary ">
                                    ADD HIGHLIGHT PRODUCT
                                </h3>

                                <div className="flex w-full flex-col items-center gap-4 rounded-lg bg-[#F5EAEA] p-12 drop-shadow-xl lg:max-w-5xl lg:gap-8">
                                    <div className="h-full">
                                        <ImageUploader
                                            onImageChange={handleImageChange}
                                            type={'Shop'}
                                            data={data}
                                        />
                                    </div>
                                    <div className="flex w-full flex-row items-center">
                                        <h5 className="mr-8 text-xl font-extrabold text-[#A459D1] md:text-2xl">
                                            Name
                                        </h5>
                                        <input
                                            className="w-full rounded-md border border-slate-300 bg-white py-2 pl-2 pr-3 shadow-sm placeholder:text-slate-400"
                                            value={productName}
                                            placeholder="Product Name"
                                            onChange={(e) =>
                                                setProductName(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="flex w-full flex-col items-start gap-4">
                                        <h5 className="mr-8 text-xl font-extrabold text-[#A459D1] md:text-2xl">
                                            Description
                                        </h5>
                                        <textarea
                                            className="h-32 w-full rounded-md border border-slate-300 bg-white py-2 pl-2 pr-3 shadow-sm placeholder:text-slate-400"
                                            value={description}
                                            placeholder="description"
                                            onChange={(e) =>
                                                setDescription(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="flex w-full flex-row items-center">
                                        <h5 className="mr-8 text-xl font-extrabold text-[#A459D1] md:text-2xl">
                                            Price
                                        </h5>
                                        <input
                                            className="w-full rounded-md border border-slate-300 bg-white py-2 pl-2 pr-3 shadow-sm placeholder:text-slate-400"
                                            placeholder="price"
                                            value={price}
                                            onChange={(e) =>
                                                setPrice(parseInt(e.target.value))
                                            }
                                     />
                                    </div>
                                </div>
                                <div className="flex w-full justify-center gap-4 px-12 lg:max-w-5xl lg:justify-end">
                                    <button
                                        onClick={() => handleSave()}
                                        className="rounded-lg bg-[#FFB84C] from-[#EF9323] to-[#5D3891] px-8 py-2 text-center font-extrabold text-white hover:bg-gradient-to-r"
                                    >
                                        Add
                                    </button>
                                    <button
                                        onClick={() => setEdit(false)}
                                        className="rounded-lg bg-[#FFB84C] from-[#EF9323] to-[#5D3891] px-8 py-2 text-center font-extrabold text-white hover:bg-gradient-to-r"
                                    >
                                        Back
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex flex-row justify-center gap-4">
                                    <h3 className="text-center text-2xl font-extrabold text-primary ">
                                        PRODUCT HIGHLIGHTS
                                    </h3>
                                    <button>
                                        <Image
                                            className="w-6"
                                            src={Add}
                                            alt={''}
                                            onClick={() => setEdit(true)}
                                        />
                                    </button>
                                </div>
                                <div className="relative overflow-hidden lg:max-w-5xl">
                                    <div
                                        className="flex transition-transform duration-500 ease-out"
                                        style={{
                                            transform: `translateX(-${
                                                curr * 100
                                            }%)`,
                                        }}
                                    >
                                        {slides == undefined
                                            ? ''
                                            : slides.map((items: any) => (
                                                  <div key={items.id} className="flex w-full flex-none justify-center">
                                                      <div className="grid grid-cols-1 content-center justify-items-center gap-4 lg:grid-cols-2 lg:justify-items-end lg:gap-12">
                                                          {items.image != '' ? (
                                                              <img
                                                                  src={
                                                                      items.image
                                                                  }
                                                                  className="w-40 rounded-full md:w-52"
                                                                  alt={''}
                                                              />
                                                          ) : (
                                                              <Image
                                                                  src={Product}
                                                                  className="w-40 md:w-52"
                                                                  alt={''}
                                                              />
                                                          )}

                                                          <div key={items.id} className="flex flex-col gap-2 pb-2 lg:items-start lg:pt-8 lg:pr-24 xl:pr-36">
                                                              <h4 className="text-center text-xl font-extrabold">
                                                                  {
                                                                      items.productName
                                                                  }
                                                              </h4>
                                                              <p className="text-center text-[#989898] lg:text-start ">
                                                                  {items
                                                                      .description
                                                                      .length >
                                                                  130
                                                                      ? items.description.slice(
                                                                            0,
                                                                            130
                                                                        ) +
                                                                        '...'
                                                                      : items.description}
                                                              </p>
                                                              <p className="text-center font-extrabold">
                                                                  {items.price}{' '}
                                                                  ฿
                                                              </p>
                                                              <button
                                                            className="rounded-lg bg-[#FFB84C] from-[#EF9323] to-[#5D3891] px-8 py-2 text-center font-extrabold text-white hover:bg-gradient-to-r"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    items.id
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </button>
                                                          </div>
                                                      </div>
                                                  </div>
                                              ))}
                                    </div>
                                    <div
                                        className={`absolute left-5 top-1/3 hidden md:flex ${
                                            slides == undefined ||
                                            slides.length <= 1
                                                ? 'invisible'
                                                : ''
                                        }`}
                                    >
                                        <button onClick={prev}>
                                            <Image src={Left} alt={''} />
                                        </button>
                                    </div>
                                    <div
                                        className={`absolute right-5 top-1/3 hidden md:flex ${
                                            slides == undefined ||
                                            slides.length <= 1
                                                ? 'invisible'
                                                : ''
                                        }`}
                                    >
                                        <button onClick={next}>
                                            <Image src={Right} alt={''} />
                                        </button>
                                    </div>
                                </div>
                                <div
                                    className={`flex items-center justify-center gap-2 py-4 ${
                                        slides == undefined ||
                                        slides.length <= 1
                                            ? 'invisible'
                                            : ''
                                    }`}
                                >
                                    {slides == undefined
                                        ? ''
                                        : slides.map((_: any, i: number) => (
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
                            </>
                        )}
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export async function getServerSideProps(context: { req: any; query: any }) {
    const { req, query } = context
    const valueFromRouter = query.id

    const data = await fetch(
        `http://localhost:3000/api/shopowners/${valueFromRouter}`
    )
    const jsonData = await data.json()
    console.log(jsonData[0].shop)
    return {
        props: {
            data: jsonData[0].shop,
        },
    }
}

export default Shopowneracc
