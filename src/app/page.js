import dynamic from "next/dynamic";
import MapComponent from "@/components/MapComponent.client";

// const MapComponentWithNoSSR = dynamic(
//   () => import("../components/MapComponent.client"),
//   {
//     ssr: false,
//   }
// );

export default function Page() {
  return (
    <div>
      <MapComponent />
    </div>
  );
}
