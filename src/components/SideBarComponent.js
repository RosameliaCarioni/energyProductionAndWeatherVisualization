"use client";
import Link from "next/link";

export default function SideBarComponent() {
  return (
    <div className="absolute h-full z-50" style={{ width: 50 }}>
      <Link href="/">
        <div className="p-3">
          <img
            id="home"
            className="w-full mb-2"
            src="/assets/icons/home-w.svg"
            alt="Home"
          />
        </div>
      </Link>

      <Link href="/map">
        <div className="p-3">
          <img
            id="map"
            className="w-full mb-2"
            src="/assets/icons/map-w.svg"
            alt="Map"
          />
        </div>
      </Link>

      <Link href="/listFarmsInformation">
        <div className="p-3">
          <img
            id="list"
            className="w-full mb-2"
            src="/assets/icons/list-w.svg"
            alt="List"
          />
        </div>
      </Link>

      <Link href="/information">
        <div className="p-3">
          <img
            id="information"
            className="w-full mb-2"
            src="/assets/icons/about-w.svg"
            alt="information"
          />
        </div>
      </Link>

      <Link href="/about">
        <div className="p-3">
          <img
            id="about"
            className="w-full mb-2"
            src="/assets/icons/team-w.svg"
            alt="About"
          />
        </div>
      </Link>
    </div>
  );
}
