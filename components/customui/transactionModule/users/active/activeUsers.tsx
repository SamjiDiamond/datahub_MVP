"use client"
import Spinner from "@/components/customui/global/spinner"
import { TableLayout } from "@/components/customui/global/tableLayout"
import { ViewLayout } from "@/components/customui/global/viewLayout"
import {
    TableCell,
    TableRow,
  } from "@/components/ui/table"
import { useEffect, useState } from "react"

export interface UserDetailsPropType {
    id:number,
    firstname:string,
    lastname:string,
    address:string,
    phone:string,
    gender:string,
    dob:string,
    email:string,
    email_verified_at:string|null,
    status:number,
    status_reason:string,
    package:string,
    pin:string,
    role_id:number,
    bvn:string,
    bank_code:string,
    account_name:string,
    account_number:string,
    created_at:string,
    updated_at:string
}

interface activeUsersResponseType{
    user_details: UserDetailsPropType |null
}
interface MyApiInterResponse {
    data: activeUsersResponseType[]
}

export const Active_Users_Transactions=({
    data
}:MyApiInterResponse)=>{
    const[
        isMounted,
        setIsMounted
    ] = useState(false);
    useEffect(()=>{
        setIsMounted(true)
    },[])
    
    if(!isMounted){
        return <Spinner/>
    }
    return(
        <ViewLayout 
            navs={[
                "All Trasactions",
                "Users",
                "Active"
            ]}
        >
            <TableLayout
                tableHeadRow={[
                    "S/N",
                    "Firstname",
                    "Lastname",
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
                    "Created At"
                ]}
                caption={"A List of all active users"}
                hideAction={true}
            >
                {
                    data?.map((info,index)=>{
                        if(info?.user_details){
                        const{
                            firstname,
                            lastname,
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
                            created_at,
                            updated_at
                        }=info?.user_details;
                        return(
                            <TableRow key={index}>
                                <TableCell className="font-medium">{index +1}</TableCell>
                                {
                                    [
                                        firstname,
                                        lastname,
                                        address,
                                        phone,
                                        gender,
                                        dob,
                                        email,
                                        email_verified_at,
                                        status,
                                        status_reason,
                                        info?.user_details?.package,
                                        pin,
                                        role_id,
                                        bvn,
                                        bank_code,
                                        account_name,
                                        account_number
                                    ].map((bodyInfo,index)=><TableCell key={index}>{bodyInfo}</TableCell>)
                                }
                                <TableCell>{new Date(created_at).toLocaleString()}</TableCell>
                            </TableRow>
                        )
                        }
                    })
                }
            </TableLayout>
        </ViewLayout>
    )
}