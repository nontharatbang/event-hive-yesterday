import React, { useState, useEffect } from 'react'

// export type Tag =
//     | 'Art'
//     | 'Beauty'
//     | 'Book'
//     | 'Business'
//     | 'Charity'
//     | 'Comedy'
//     | 'Concert'
//     | 'Drink'
//     | 'Education'
//     | 'E-sport'
//     | 'Fashion'
//     | 'Food'
//     | 'Game'
//     | 'Health'
//     | 'Furniture'
//     | 'Movies'
//     | 'Music'
//     | 'Marketing'
//     | 'Sport'
//     | 'Techonology'
//     | 'Vehicle'

export type Tag = {
    id: number
    tagName: string
}

type Props = {
    onClose: () => void
    selectTags: Tag[]
    setSelectTags: React.Dispatch<React.SetStateAction<Tag[]>>
}

const TagSelector: React.FC<Props> = ({ onClose, setSelectTags }) => {
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])
    const [tags, setTags] = useState<Tag[]>([])

    useEffect(() => {
        fetchTags()
    }, [])

    const fetchTags = async () => {
        try {
            const response = await fetch('/api/tags')
            if (response.ok) {
                const data = await response.json()
                setTags(data)
            } else {
                console.error('Error fetching tags:', response.status)
            }
        } catch (error) {
            console.error('Error fetching tags:', error)
        }
    }

    const handleTagClick = (tag: Tag) => {
        const isTagSelected = selectedTags.find(
            (selectedTag) => selectedTag.id === tag.id
        )

        if (isTagSelected) {
            setSelectedTags(
                selectedTags.filter((selectedTag) => selectedTag.id !== tag.id)
            )
        } else if (selectedTags.length < 10) {
            setSelectedTags([...selectedTags, tag])
        }
    }

    const handleSubmit = () => {
        setSelectTags(selectedTags)
        onClose()
    }

    return (
        <div className="fixed top-10 left-10 z-20 flex h-full w-full items-center justify-center">
            <div className="rounded-lg bg-[#EADCDC] p-8 shadow-lg">
                <h2 className="mb-4 text-lg font-semibold">
                    Select up to 10 tags
                </h2>
                <div className="mb-4 grid grid-cols-4">
                    {tags.map((tag) => (
                        <button
                            key={tag.id} // Add the key prop here
                            className={`mr-2 mb-2 rounded-full py-1 px-3 ${
                                selectedTags.find(
                                    (selectedTag) => selectedTag.id === tag.id
                                )
                                    ? 'bg-[#F16767] text-white'
                                    : 'bg-[#FFFFFF] text-[#F16767]'
                            }`}
                            onClick={() => handleTagClick(tag)}
                        >
                            {tag.tagName}
                        </button>
                    ))}
                </div>
                <button
                    className="mr-5 rounded-lg bg-[#FFB84C] px-6 py-2 font-extrabold text-white"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
                <button
                    className="rounded-lg border-2 border-red-600 bg-[#FFFFFF] px-6 py-2 font-extrabold text-red-600"
                    onClick={onClose}
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default TagSelector
