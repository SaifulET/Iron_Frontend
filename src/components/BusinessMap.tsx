"use client";

import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";

interface BusinessMapProps {
  lat: number;
  lng: number;
  onChange: (lat: number, lng: number) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function BusinessMap({
  lat,
  lng,
  onChange,
  searchQuery,
  onSearchChange,
}: BusinessMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const [searching, setSearching] = useState(false);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const initialCenter: L.LatLngExpression = [lat || 32.7767, lng || -96.7970];

    const map = L.map(mapContainerRef.current, {
      center: initialCenter,
      zoom: 13,
      zoomControl: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    // Custom Icon matching user SS spec
    const customIcon = L.divIcon({
      className: "custom-gps-marker",
      html: `
        <div class="relative flex flex-col items-center select-none" style="width: 44px; height: 65px;">
          <!-- Ellipse 124 -->
          <div class="w-11 h-11 rounded-full bg-[#8EBAC5] bg-opacity-70 border-2 border-white flex items-center justify-center shadow-md">
            <!-- Ellipse 127 -->
            <div class="w-3 h-3 rounded-full bg-[#111111]"></div>
          </div>
          <!-- Rectangle 12 -->
          <div class="w-1 h-5 bg-[#8EBAC5] -mt-0.5 shadow-sm"></div>
          <!-- Shadow -->
          <div class="w-2.5 h-0.5 bg-black bg-opacity-40 rounded-full blur-[1px] mt-0.5"></div>
        </div>
      `,
      iconSize: [44, 65],
      iconAnchor: [22, 63],
    });

    const marker = L.marker(initialCenter, {
      icon: customIcon,
      draggable: true,
    }).addTo(map);

    // Update coordinates on dragend
    marker.on("dragend", () => {
      const position = marker.getLatLng();
      onChange(position.lat, position.lng);
    });

    // Update coordinates on map click
    map.on("click", (e) => {
      marker.setLatLng(e.latlng);
      onChange(e.latlng.lat, e.latlng.lng);
    });

    mapRef.current = map;
    markerRef.current = marker;

    return () => {
      map.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
  }, []);

  // Update marker position if lat/lng props change from outside
  useEffect(() => {
    if (mapRef.current && markerRef.current) {
      const currentPos = markerRef.current.getLatLng();
      if (currentPos.lat !== lat || currentPos.lng !== lng) {
        const newPos = L.latLng(lat, lng);
        markerRef.current.setLatLng(newPos);
        mapRef.current.setView(newPos, mapRef.current.getZoom());
      }
    }
  }, [lat, lng]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery
        )}`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        const firstResult = data[0];
        const newLat = parseFloat(firstResult.lat);
        const newLng = parseFloat(firstResult.lon);
        onChange(newLat, newLng);
      } else {
        alert("Location not found. Please try a different search.");
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setSearching(false);
    }
  };

  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        onChange(userLat, userLng);
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Unable to retrieve your location. Make sure location permissions are enabled.");
      }
    );
  };

  return (
    <div className="relative w-full h-[485px] rounded-2xl overflow-hidden shadow-inner border border-[#E8E8E4]">
      {/* Map Element */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Floating Search Bar */}
      <form
        onSubmit={handleSearch}
        className="absolute top-4 left-4 z-10 flex items-center bg-white border border-[#D3D1C7] rounded-lg px-3 py-1.5 shadow-md w-full max-w-[280px] gap-2 transition-all duration-200 focus-within:border-[#8EBAC5] focus-within:ring-2 focus-within:ring-[#8EBAC5]/20"
      >
        <svg
          className="w-5 h-5 text-[#4E5F78]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Location"
          className="w-full bg-transparent text-sm text-[#1A1A1A] placeholder-[#1A1A1A]/50 focus:outline-none"
        />
        <button
          type="submit"
          className="hidden"
          disabled={searching}
        />
      </form>

      {/* Floating GPS Button */}
      <button
        type="button"
        onClick={handleGeolocation}
        className="absolute bottom-6 right-6 z-10 w-11 h-11 rounded-xl bg-gradient-to-t from-[#8EBAC5] to-[#8EBAC5]/80 flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-150 cursor-pointer text-white border border-white/20 active:scale-95"
        title="Find my location"
      >
        <svg
          className="w-6 h-6 text-[#111111]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8a4 4 0 100 8 4 4 0 000-8z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 2v2M12 20v2M4 12H2M22 12h-2"
          />
        </svg>
      </button>
    </div>
  );
}
