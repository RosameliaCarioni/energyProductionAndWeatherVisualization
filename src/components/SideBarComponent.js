"use client";
import { Tesselator } from "@deck.gl/core/typed";
import Link from "next/link"; 

export default function SideBarComponent(){
    return (
        <div className="sidebar-container">
            
            <Link href = "/">
                <img
                    id="home"
                    className="nav-icon"
                    src="/assets/icons/home-w.svg" 
                    alt="Home"/>
            </Link>

            <Link href = "/map">
                <img 
                    id="map"
                    className="nav-icon"
                    src="/assets/icons/map-w.svg" 
                    alt="Map"/>
            </Link>

            <Link href = "/listFarmsInformation">
                <img 
                    id="list"
                    className="nav-icon"
                    src="/assets/icons/list-w.svg" 
                    alt="List"/>
            </Link>

            <Link href = "/about">
                <img 
                    id="about"
                    className="nav-icon"
                    src="/assets/icons/about-w.svg" 
                    alt="About"/>
            </Link>
        </div>
    );
}

