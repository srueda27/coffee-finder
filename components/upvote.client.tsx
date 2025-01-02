"use client";

import Image from "next/image";

export default function Upvote({ votes }: { votes: number }) {
  const handleOnClick = () => {};

  return (
    <>
      <div className="my-6 flex">
        <Image
          src="/static/icons/star.svg"
          width="24"
          height="24"
          alt="places icon"
        />
        <p className="pl-2">{votes}</p>
      </div>
      <button onClick={handleOnClick}>Up Vote!</button>
    </>
  );
}
