
"use client"
import {
    TableCell,
    TableRow,
  } from "@/components/ui/table"
import { useEffect, useState } from "react"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { UserDetailsPropType } from "../transactionModule/users/active/activeUsers"
import Spinner from "../global/spinner"
import { ViewLayout } from "../global/viewLayout"
import { TableLayout } from "../global/tableLayout"
import { SearchUsers } from "@/actions/userModule/action"
import { SuspendUserComponent } from "./suspendUser"
import { ModifyUserComponent } from "./modifyUers"

interface MyApiInterResponse {
  data: UserDetailsPropType[];
}

export const All_Users=({
    data
}:MyApiInterResponse)=>{
    const{toast} = useToast();
    const[
        dataSetter,
        setData
    ]=useState<UserDetailsPropType[]>([]);
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
        setFilterIsLoading(true)
        SearchUsers(itemToSearch).then((response)=>{
            const{
                search_result
            }=response;
            setData(search_result)
            setFilterIsLoading(false)
        }).catch((error)=>{
            setFilterIsLoading(false)
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description:`${error}`
            })
            return{
                errorMessage:error,
            }
        })
    }

        
    let naira = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'NGN',
    });
    
    
    if(!isMounted){
        return <Spinner/>
    }
    return(
        <ViewLayout 
            navs={[
                "All users"
            ]}
        >
          
            {
                filterIsLoading?
                    <Spinner/>:
                    <TableLayout
                        tableHeadRow={[
                            "S/N",
                            "Firstname",
                            "Lastname",
                            "Wallet Balance",
                            "Address",
                            "Phone",
                            "Gender",
                            "Date of Birth",
                            "Email",
                            "Email verified at",
                            "Status",
                            "Status Reason",
                            "package",
                            "Pin",
                            "Role Id",
                            "Bvn",
                            "Bank code",
                            "Account Name",
                            "Account Number",
                            "Created At",
                            "Suspend",
                            "Modify"
                        ]}
                        caption={"A List of all users"}
                        handleChange={handleChange}
                        handleSearch={handleSearch}
                    >
                        {
                        dataSetter?.map((info,index)=>{
                                const{
                                    id,
                                    firstname,
                                    lastname,
                                    wallet_balance,
                                    address,
                                    phone,
                                    gender,
                                    dob,
                                    email,
                                    email_verified_at,
                                    status,
                                    status_reason,
                                    pin,
                                    role_id,
                                    bvn,
                                    bank_code,
                                    account_name,
                                    account_number,
                                    created_at
                                }=info;
                                if(info?.id){
                                return(

                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{index +1}</TableCell>
                                        {
                                            [
                                              firstname,
                                              lastname,
                                              `${naira.format(wallet_balance?.balance)}`,
                                              address,
                                              phone,
                                              gender,
                                              dob,
                                              email,
                                              email_verified_at,
                                              status,
                                              status_reason,
                                              info?.package,
                                              pin,
                                              role_id,
                                              bvn,
                                              bank_code,
                                              account_name,
                                              account_number
                                            ].map((bodyInfo,index)=><TableCell key={index}>{bodyInfo}</TableCell>)
                                        }
                                        <TableCell>{new Date(created_at).toLocaleString()}</TableCell>
                                        <TableCell><SuspendUserComponent id={id}/></TableCell>
                                        <TableCell><ModifyUserComponent id={id} data={info}/></TableCell>
                                    </TableRow>
                                )
                                }
                            })
                        }
                    </TableLayout>
                }
        </ViewLayout>
    )
}
