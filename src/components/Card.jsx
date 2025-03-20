"use client";
import Link from "next/link";

export default function Card({ title, description, link }) {
    return (
        <div className="p-4 rounded bg-white shadow flex flex-col gap-2 border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
            <div className="mt-auto">
                <Link
                    href={link}
                    className="inline-block px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                >
                    Learn More
                </Link>
            </div>
        </div>
    );
}
