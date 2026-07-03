"use client";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 border-r border-gray-700 flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold text-white">KarAI3</h1>
        <p className="text-xs text-gray-400 mt-1">AI Chat Assistant</p>
      </div>
      
      <div className="flex-1 p-4">
        <div className="text-sm text-gray-500 text-center py-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-12 h-12 mx-auto mb-3 opacity-50"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
            />
          </svg>
          <p>Chat history will appear here</p>
          <p className="text-xs mt-1">(Coming soon)</p>
        </div>
      </div>
    </aside>
  );
}
