import { MapContainer, TileLayer } from 'react-leaflet';
import Map from './components/Map';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import CoordinateList from './components/CoordinateList';
import getData from './utils/getData';

function App() {
  const [coordinates, setCoordinates] = useState();
  const [selectedCoordinate, setSelectedCoordinate] = useState();

  useEffect(() => {
    getData(setCoordinates);
  }, []);

  const handleCoordinate = (data) => {
    setSelectedCoordinate(data);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <MapContainer
        center={{ lat: 39.9, lng: 37 }}
        zoom={6}
        scrollWheelZoom={true}
        className="mapContainer">
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        <Map selectedCoordinate={selectedCoordinate} setCoordinates={setCoordinates} />
      </MapContainer>
      {coordinates && (
        <CoordinateList
          selectedItem={handleCoordinate}
          coordinates={coordinates}
          setCoordinates={setCoordinates}
          selectedCoordinate={selectedCoordinate}
          setSelectedCoordinate={setSelectedCoordinate}
        />
      )}
    </div>
  );
}

export default App;
