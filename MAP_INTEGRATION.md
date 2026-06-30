# Map Integration Guide: English Transliterated Labels

This guide outlines how to replace the keyless map tiles in `src/components/ExploreMap.tsx` with **Geoapify** or **Mapbox** to enforce full English/Romanized street labels globally.

---

## Option 1: Geoapify (Recommended, Easiest)

Geoapify offers high-performance raster maps that automatically transliterate non-Latin scripts (e.g., Greek, Arabic) into English characters.

### Step 1: Get a Free API Key
1. Sign up for a free account at [Geoapify](https://www.geoapify.com/).
2. Create a new project and copy your **API Key**.

### Step 2: Update the Code
Replace the `L.tileLayer` code in `src/components/ExploreMap.tsx` with the following snippet:

```typescript
      // Replace YOUR_API_KEY with your actual Geoapify key
      const apiKey = "YOUR_API_KEY";
      
      L.tileLayer(`https://maps.geoapify.com/v1/tile/osm-carto/{z}/{x}/{y}.png?apiKey=${apiKey}`, {
        attribution: 'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | &copy; OpenStreetMap contributors',
        maxZoom: 20,
      }).addTo(map);
```

---

## Option 2: Mapbox (Premium vector style)

Mapbox provides fully Romanized international street labels.

### Step 1: Get a Mapbox Access Token
1. Sign up at [Mapbox](https://www.mapbox.com/).
2. Retrieve your **Default public token** from your dashboard.

### Step 2: Update the Code
Replace the `L.tileLayer` code in `src/components/ExploreMap.tsx` with:

```typescript
      // Replace YOUR_MAPBOX_ACCESS_TOKEN with your actual token
      const accessToken = "YOUR_MAPBOX_ACCESS_TOKEN";
      
      L.tileLayer(`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${accessToken}`, {
        attribution: '&copy; <a href="https://www.mapbox.com/feedback/">Mapbox</a> &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        tileSize: 512,
        zoomOffset: -1,
        maxZoom: 18,
      }).addTo(map);
```
