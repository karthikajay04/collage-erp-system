import React from "react";
// Removed 'import { motion } from "framer-motion";' to eliminate external dependency

const team = [
    {
        name: "Ihsan Nasar",
        role: "UI/UX Designer",
        desc: "Handles architecture, frontend UI/UX, and feature development for Zentry.",
        img: "https://placehold.co/100x100/3B82F6/FFFFFF?text=IN"
    },
    {
        name: "Goutham Shetty",
        role: "Backend Dev",
        desc: "Manages backend services, APIs, and database integration, ensuring high performance.",
        img: "https://placehold.co/100x100/10B981/FFFFFF?text=GS"
    },
    {
        name: "Likith B",
        role: "Frontend Dev",
        desc: "Works on intelligent features, machine learning models, and process automation for Zentry.",
        img: "https://placehold.co/100x100/F59E0B/FFFFFF?text=LB"
    },
    {
        name: "Manish Yadav",
        role: "DB Designer",
        desc: "Responsible for data analysis, reporting, and deriving business intelligence insights for optimization.",
        img: "https://placehold.co/100x100/9333EA/FFFFFF?text=MY"
    }
];

// Renamed from TeamZentry to App to be the default export for the single-file environment
const App = () => {
    return (
        <div className="min-h-screen bg-gray-50 pt-16 pb-12 font-inter antialiased">
            {/* Tailwind font import */}
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
                    .font-inter { font-family: 'Inter', sans-serif; }
                `}
            </style>
            
            {/* Hero Section */}
            <div
                className="text-center px-4 transition-opacity duration-700 ease-in-out"
                // Original framer-motion replaced by standard classes
            >
                <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 mb-2 tracking-tight">
                    Meet Team Zentry
                </h1>
                <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
                    The innovative minds creating a smarter, more efficient ERP solution for modern institutions.
                </p>
            </div>

            {/* Team Section */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
                {team.map((member, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-2xl rounded-2xl p-8 text-center border-t-4 border-blue-500
                                   transform transition-all duration-500 hover:shadow-3xl hover:border-t-8 hover:scale-[1.03]"
                        // Original framer-motion replaced by standard classes and visual styling
                    >
                        <img
                            src={member.img}
                            alt={member.name}
                            // Added onerror to provide a robust fallback if the placeholder fails
                            onError={(e) => { 
                                e.target.onerror = null; 
                                e.target.src = 'https://placehold.co/100x100/94A3B8/FFFFFF?text=👤'; 
                            }}
                            className="w-28 h-28 mx-auto rounded-full object-cover border-4 border-blue-500 shadow-md transition duration-300 hover:border-blue-600"
                        />
                        <h2 className="mt-6 text-2xl font-bold text-gray-900">{member.name}</h2>
                        <h3 className="text-blue-600 font-semibold mt-1 text-lg">{member.role}</h3>
                        <p className="mt-4 text-gray-700 leading-relaxed text-base italic">"{member.desc}"</p>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="mt-20 text-center text-gray-500 text-sm">
                Built with passion by <span className="text-blue-600 font-bold">Team Zentry</span>. All rights reserved &copy; {new Date().getFullYear()}.
            </div>
        </div>
    );
};

export default App;