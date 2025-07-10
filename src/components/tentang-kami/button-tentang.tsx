import { useState } from "react";

export default function GradientDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
    <div
    className="inline-block rounded-full p-[1px]"
    style={{
        background: "linear-gradient(123.96deg, #0F3F8B 16.37%, #081B3B 119.05%)",
    }}
    >
    <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 rounded-full text-sm font-semibold bg-[#1F2937] text-white"
    >
    <span className="font-display text-[0.8rem] bg-gradient-to-r from-[#5A7EB9] to-[#2B3E5C] bg-clip-text text-transparent">2024 - 2025</span> <span className="ml-1 bg-gradient-to-r from-[#5A7EB9] to-[#2B3E5C] bg-clip-text text-transparent">▾</span>
    </button>
    </div>


      {isOpen && (
        <div className="absolute mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
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
  );
}
