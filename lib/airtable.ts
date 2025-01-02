import { coffee_store } from "@/types";
import Airtable, { FieldSet } from "airtable";
import { Records } from "airtable/lib/records";

const base = new Airtable({ apiKey: process.env.AIRTABLE_ACCESS_KEY }).base('appbnD739pJ7TbO9E');
const table = base('coffee-stores')

const getFields = (records: Records<FieldSet>) => {
  return records.map((record) => {
    return {
      recordId: record.id,
      fields: { ...record.fields } as coffee_store
    }
  })
}
const findRecordByFilter = async (id: string) => {
  try {
    const findRecords = await table.select({
      filterByFormula: `id="${id}"`
    }).firstPage();

    return getFields(findRecords)
  } catch (error) {
    console.error(error)
  }
}

export const createCoffeeStore = async (coffee_store: coffee_store, id: string) => {
  const record = await findRecordByFilter(id)

  if (record?.length) {
    console.log('Coffee Store already exists')
    return record
  }

  try {
    // create Coffee Store in AirTable
    const createdCoffeeStore = await table.create([{
      fields: {
        id: `${coffee_store.id}`,
        name: coffee_store.name,
        address: coffee_store.address,
        voting: coffee_store.voting,
        imgUrl: coffee_store.imgUrl,
        imgId: coffee_store.imgId,
      }
    }])
    console.log('Coffee Store created')

    return getFields(createdCoffeeStore)
  } catch (error) {
    console.error(error)
  }
}