import dynamic from "next/dynamic";
import MapComponent from "@/components/MapComponent.client";
import React from 'react';

// const MapComponentWithNoSSR = dynamic(
//   () => import("../components/MapComponent.client"),
//   {
//     ssr: false,
//   }
// );

// Dynamically import the MapComponent with SSR disabled
const MapComponentWithNoSSR = dynamic(
  () => import('../components/MapComponent.client'), // Update the path to where your MapComponent is located
  { ssr: false }
);

const Page = () => {
  return (
    <div>
      <MapComponentWithNoSSR />
    </div>
  );
};

export default Page;