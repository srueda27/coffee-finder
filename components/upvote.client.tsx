"use client";

import { upvoteAction } from "@/actions";
import Image from "next/image";
import { useActionState } from "react";

export default function Upvote({
  votes,
  coffee_store_id,
}: {
  votes: number;
  coffee_store_id: string;
}) {
  const initialState = {
    votes,
    coffee_store_id
  }

  const [state, dispatch] = useActionState(upvoteAction, initialState);

  return (
    <form action={dispatch}>
      <div className="my-6 flex">
        <Image
          src="/static/icons/star.svg"
          width="24"
          height="24"
          alt="places icon"
        />
        <p className="pl-2">{state.votes}</p>
      </div>
      <button type="submit">Up Vote!</button>
    </form>
  );
}
