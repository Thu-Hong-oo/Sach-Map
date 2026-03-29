'use client';

import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

const DEFAULT_CENTER = { lat: 10.7769, lng: 106.7009 };

export function MapView() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div className="w-full h-56 rounded-xl border border-dashed border-emerald-300 bg-emerald-50 p-4 text-emerald-800">
        <p className="text-sm font-semibold">Map preview is not configured yet.</p>
        <p className="mt-1 text-xs">
          Add <code>NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> in your .env.local to enable Google Maps.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-56 overflow-hidden rounded-xl border border-gray-200">
      <APIProvider apiKey={apiKey}>
        <Map
          defaultCenter={DEFAULT_CENTER}
          defaultZoom={13}
          gestureHandling="greedy"
          disableDefaultUI
        >
          <Marker position={DEFAULT_CENTER} title="Safe Food Map Center" />
        </Map>
      </APIProvider>
    </div>
  );
}
