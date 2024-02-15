import { token ,baseUrl} from "@/actions/baseUrl";
import { DashBoardLayout } from "@/components/customui/dashboard/dashboardLayout";
import {IntroSection} from "@/components/customui/dashboard/introSection"
import Spinner from "@/components/customui/global/spinner";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { Suspense } from "react";

async function getTotalTransactionCount(storedItem:RequestCookie | undefined) {
  try {
      if(storedItem?.value){
        const response = await fetch(`${baseUrl}totalcounttransaction`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer Bearer ${JSON.parse(storedItem?.value)?.access_token}`
          }
        });
        if(!response.ok){
          throw new Error(`An error occured: ${response.statusText} (status code: ${response.status}`)
        }
        const result = await response.json();
        return result
      }
    }catch (error) {
      return{
        status :500
      }
  }
}

async function getTotalTransactionSum(storedItem:RequestCookie | undefined) {
  try {
    if(storedItem?.value){
      const response = await fetch(`${baseUrl}totalsumtransaction`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "Authorization":`Bearer Bearer ${JSON.parse(storedItem?.value)?.access_token}`
          }
        });
        if(!response.ok){
          throw new Error(`An error occured: ${response.statusText} (status code: ${response.status}`)
        }
        const result =await response.json();
        return result
    }
     }catch (error) {
      return{
        status :500
      }
  }
}


export default async function Home() {
  const cookieStore = cookies();
  const storedItem = cookieStore.get("datahubToken");
  const count = await getTotalTransactionCount(storedItem)
  const sum = await getTotalTransactionSum(storedItem)
  // const [sum, count] = await Promise.all([trans_sum, trans_count])
  return (
    <main>
      <DashBoardLayout
        firstname={storedItem?.value && JSON.parse(storedItem?.value)?.user?.firstname}
      >
        <Suspense fallback={<Spinner/>}>
          <IntroSection
            trans_count={count?.total_count_transaction}
            trans_sum={sum?.total_sum_transaction}
            userDetails={storedItem?.value && JSON.parse(storedItem?.value)?.user}
          />
        </Suspense>
      </DashBoardLayout>
    </main>
  )
}
