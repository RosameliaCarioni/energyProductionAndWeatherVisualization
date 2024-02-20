"use client";
import Link from "next/link"; 

export default function SideBarComponent(){
    return (
        <div className="absolute h-full ">
            
            <Link href = "/">
                <img
                    id="home"
                    className="p-3 w-full mb-2"
                    src="/assets/icons/home-w.svg" 
                    alt="Home"/>
            </Link>

            <Link href = "/map">
                <img 
                    id="map"
                    className="p-3 mb-2"
                    src="/assets/icons/map-w.svg" 
                    alt="Map"/>
            </Link>

            <Link href = "/listFarmsInformation">
                <img 
                    id="list"
                    className="p-3 mb-2"
                    src="/assets/icons/list-w.svg" 
                    alt="List"/>
            </Link>

            <Link href = "/about">
                <img 
                    id="about"
                    className="p-3 mb-2"
                    src="/assets/icons/about-w.svg" 
                    alt="About"/>
            </Link>
        </div>
    );
}

