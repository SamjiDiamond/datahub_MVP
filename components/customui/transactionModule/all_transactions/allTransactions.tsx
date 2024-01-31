
"use client"
import { TableLayout } from "../../global/tableLayout"
import { ViewLayout } from "../../global/viewLayout"
import {
    TableCell,
    TableRow,
  } from "@/components/ui/table"
import { useEffect, useState } from "react"
import Spinner from "../../global/spinner"
import { ToastAction } from "@/components/ui/toast"
import { SearchTransaction } from "@/actions/transactionModule/all_transactions/server/action"
import { useToast } from "@/components/ui/use-toast"

interface ApiResponse {
  id: number;
  user_id: number;
  title: string;
  amount: number;
  charges: number;
  commission: number;
  reference: string;
  recipient: string;
  status: number;
  type: string | null;
  remark: string;
  token: string | null;
  prev_balance: string;
  new_balance: string;
  server: number;
  server_response: string;
  created_at: string;
  updated_at: string;
}

interface MyApiInterResponse {
  data: ApiResponse[];
}

export const All_Transactions=({
    data
}:MyApiInterResponse)=>{
    const{toast} = useToast();
    const[
        dataSetter,
        setData
    ]=useState<ApiResponse[]>([]);
    const[
        filterIsLoading,
        setFilterIsLoading
    ]=useState(false);
    const[
        itemToSearch,
        setItemToSearch
    ]=useState<string>("")
    const[
        isMounted,
        setIsMounted
    ] = useState(false);

    useEffect(()=>{
        setData(data)
    },[data])

    useEffect(()=>{
        setIsMounted(true)
    },[])

    const handleChange=(e:any)=>{
        setItemToSearch(e);
    }

    const handleSearch =()=>{
        SearchTransaction(itemToSearch).then((response)=>{
            const{
                search_result
            }=response;
            setData(search_result)
            setFilterIsLoading(false)
        }).catch((error)=>{
            setFilterIsLoading(false)
            console.log("error:",error)
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description:error,
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
        })
    }
    
    if(!isMounted){
        return <Spinner/>
    }
    return(
        <ViewLayout 
            navs={[
                "All Trasactions"
            ]}
        >
            {
                filterIsLoading?
                    <Spinner/>:
                    <TableLayout
                        tableHeadRow={[
                            "S/N",
                            "Id",
                            "User Id",
                            "Title",
                            "Amount",
                            "Charges",
                            "Commision",
                            "Reference",
                            "Recepient",
                            "Status",
                            "Type",
                            "Remark",
                            "Token",
                            "Previous Balance",
                            "New Balance",
                            "Server",
                            "Server Response",
                            "Creation Date",
                            "Updated At",
                        ]}
                        caption={"A List of all your transactions"}
                        handleChange={handleChange}
                        handleSearch={handleSearch}
                    >
                        {
                        dataSetter?.map((info,index)=>{
                                const{
                                    id,
                                    user_id,
                                    title,
                                    amount,
                                    charges,
                                    commission,
                                    reference,
                                    recipient,
                                    status,
                                    type,
                                    remark,
                                    token,
                                    prev_balance,
                                    new_balance,
                                    server,
                                    server_response,
                                    created_at,
                                    updated_at
                                }=info;
                                return(
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{index +1}</TableCell>
                                        {
                                            [
                                                id,
                                                user_id,
                                                title,
                                                amount,
                                                charges,
                                                commission,
                                                reference,
                                                recipient,
                                                status,
                                                type,
                                                remark,
                                                token,
                                                prev_balance,
                                                new_balance,
                                                server,
                                            //    (JSON.parse(server_response))?.status,
                                            ].map((bodyInfo,index)=><TableCell key={index}>{bodyInfo}</TableCell>)
                                        }
                                        <TableCell>{new Date(created_at).toLocaleString()}</TableCell>
                                        <TableCell>{new Date(updated_at).toLocaleString()}</TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableLayout>
                }
        </ViewLayout>
    )
}
