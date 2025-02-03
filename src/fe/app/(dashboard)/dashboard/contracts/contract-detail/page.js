'use client'

import {useRouter} from "next/navigation";
import {ViewContractDetail} from "@/modules/dashboard/contracts/index"

export default function Page(){
    const payload = localStorage.getItem("curContract") ?? null;
    const router = useRouter()
    if(!payload){
        return router.push("/dashboard/dashboard/")
    } 
    console.log("Payload", JSON.parse(payload))
    return <ViewContractDetail contract={JSON.parse(payload)} />
}