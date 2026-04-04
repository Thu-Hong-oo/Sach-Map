'use client';

import { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const DEFAULT_CENTER: [number, number] = [106.7009, 10.7769]; // [lng, lat] for Ho Chi Minh City
const DEFAULT_ZOOM = 12;

export function MapboxView() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    if (map.current) return; // Initialize map only once

    mapboxgl.accessToken = accessToken;

    if (mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl());

      // Add marker at center
      new mapboxgl.Marker({ color: '#6B8E23' })
        .setLngLat(DEFAULT_CENTER)
        .setPopup(new mapboxgl.Popup().setText('Safe Food Map Center'))
        .addTo(map.current);
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [accessToken]);

  if (!accessToken) {
    return (
      <div className="w-full h-96 rounded-xl border border-dashed border-emerald-300 bg-emerald-50 p-4 text-emerald-800">
        <p className="text-sm font-semibold">Map preview is not configured yet.</p>
        <p className="mt-1 text-xs">
          Add <code>NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN</code> in your .env.local to enable Mapbox.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-96 rounded-xl border border-gray-200 overflow-hidden" ref={mapContainer} />
  );
}
