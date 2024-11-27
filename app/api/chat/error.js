"use client";

import React from "react";
import Link from "next/link";

export default function RouteError({ error, reset }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Route Error</h1>
      <p className="text-lg text-gray-700 mb-6">
        {error.message || "An error occurred in this route."}
      </p>
      <div className="flex space-x-4">
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
        <Link
          href="/"
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
