"use client";
import Link from "next/link";

export default function Card({ title, description, link }) {
  return (
    <div className="gym-card p-6 h-full flex flex-col">
      <h3 className="text-xl font-semibold mb-3 text-gray-800">{title}</h3>
      <p className="text-gray-600 mb-6 flex-grow">{description}</p>
      <div className="mt-auto">
        <Link
          href={link}
          className="gym-button-primary inline-flex items-center">
          <span>Learn More</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
