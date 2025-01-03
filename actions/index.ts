'use server'

import { updateCoffeeStore } from "@/lib/airtable"

type State = {
  coffee_store_id: string,
  votes: number
}

export const upvoteAction = async (state: State) => {
  const { coffee_store_id, votes } = state

  const coffee_store_record = await updateCoffeeStore(coffee_store_id)

  return {
    votes: coffee_store_record && coffee_store_record.fields.voting || votes,
    coffee_store_id
  }
}