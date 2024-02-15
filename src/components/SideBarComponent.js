"use client";
import Link from "next/link"; 

export default function SideBarComponent(){
    return (
        <div>
            <Link href = "/"> WelcomePage</Link>
            <Link href = "/map"> Map</Link>
            <Link href = "/about"> About</Link>
            <Link href = "/listFarmsInformation"> ListFarmsInformation</Link>
            <Link href = "/graphs"> Graphs</Link>

        </div>
    );
}

