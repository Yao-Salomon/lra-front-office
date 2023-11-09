import { InboxIcon } from "@heroicons/react/24/solid";
import { Card,CardBody } from "@nextui-org/react";
import { useState } from "react";

export default function Alert(props:{message:string,title:string,type:"alert"|"success"|"danger"|"warning"|"atypic"}){
    let color="";
    let textClassName="";
    let titleClassName="font-bold flex"
    switch(props.type){
        case "alert":
            color="bg-blue-100";
            textClassName=""
            break;
        case "danger":
            color="bg-red-500";
            textClassName="text-white"
            textClassName="text-white";
            titleClassName+=" text-white"
            break;
        case "atypic":
            color="bg-indigo-500";
            break;
        case "success":
            color="bg-green-500";
            textClassName="text-white";
            titleClassName+=" text-white"
            break;
        case "warning":
            color="bg-orange-500";
            textClassName="text-white";
            titleClassName+=" text-white"
            break;
    }
    const className=color+" fixed top-20 right-0 p-2 flex flex-col rounded-lg border shadow"

    return(
        <div className={className}>
            <p className={titleClassName}><InboxIcon height={20} width={20}/><span className="ml-2">{props.title}</span></p>
            <p className={textClassName}>{props.message}</p>
        </div>
    )
}