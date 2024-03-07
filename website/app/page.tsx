import { getItem } from './utils'

//export const revalidate = 3600 // revalidate the data at most every hour
 
export default async function Page() {
  const item = await getItem()

  return (
    <main>
      <div>
        { item }
      </div>
    </main>
    )
}



