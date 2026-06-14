"use client";

import React from "react";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";

interface PropsTypes  {
subject: string[] | string;
  topic: string[] | string;
}


const SearchError = ({
  subject,
  topic,
}: PropsTypes) => {
  function handleClick() {
    redirect("/companions/new");
  }
  return (
    <div className="flex flex-col items-center gap-2 bg-chart-5 text-gray-100 px-2 py-3 rounded-lg border-gray-500 border-3">
      {!subject && !topic ? (
        <p>Try searching for companion</p>
      ) : (
        <p>No result matches the query. Please try again!</p>
      )}

      <p className="font-bold text-2xl text-red-500">OR</p>

      <Button onClick={handleClick} className="cursor-pointer border-gray-300 border-2 hover:shadow-md hover:shadow-gray-400 rounded-md">
        Create new Companion
      </Button>
    </div>
  );
};

export default SearchError;
