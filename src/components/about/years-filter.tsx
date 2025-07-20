import { useState } from 'react'

export default function YearsFilter() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative inline-block">
      <div
        className="inline-block rounded-full p-[1px]"
        style={{
          background:
            'linear-gradient(123.96deg, #0F3F8B 16.37%, #081B3B 119.05%)'
        }}
      >
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full bg-[#1F2937] px-4 py-2 text-sm font-semibold text-white"
        >
          <span className="font-display bg-gradient-to-r from-[#5A7EB9] to-[#2B3E5C] bg-clip-text text-[0.8rem] text-transparent">
            2024 - 2025
          </span>{' '}
          <span className="ml-1 bg-gradient-to-r from-[#5A7EB9] to-[#2B3E5C] bg-clip-text text-transparent">
            ▾
          </span>
        </button>
      </div>

      {isOpen && (
        <div className="ring-opacity-5 absolute mt-2 w-40 rounded-md bg-white shadow-lg ring-1 ring-black">
          <div className="py-1">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Option 1
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Option 2
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Option 3
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
