"use client";
import { BeakerIcon, EyeIcon } from "@heroicons/react/24/outline";
import { animate, motion } from "framer-motion"

export default function Main(){
    return(
        <div>
            <motion.div 
                className="bg-blue-200 h-24 w-24 rounded-full ml-2 mt-2 flex justify-center items-center"
                animate={{x:200,y:200}}
                initial={{x:0,y:10}}
                transition={{ ease: "easeOut", duration: 2 }}
            >
                <BeakerIcon width={30} height={30} color="blue"/>
            </motion.div>
            <motion.div 
                className="bg-blue-200 h-24 w-24 rounded-full ml-2 mt-2 flex justify-center items-center"
                animate={{x:100,y:100}}
                initial={{x:400,y:450}}
                transition={{ ease: "easeOut", duration: 2 }}
            >
                <BeakerIcon width={30} height={30} color="orange"/>
            </motion.div>
        </div>
    )
}

