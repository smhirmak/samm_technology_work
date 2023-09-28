import React, { useEffect, useState } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import getData from '../utils/getData';

function GetIcon(_iconSize) {
  return L.icon({
    iconUrl: require('../icons/32px-Map_marker_font_awesome.svg.png'),
    iconSize: [_iconSize]
  });
}

const Map = ({ selectedCoordinate, setCoordinates }) => {
  const map = useMapEvents({});
  const [isSending, setIsSending] = useState(false);

  const sendData = async () => {
    try {
      setIsSending(true);
      await fetch('http://localhost:8080/add', {
        method: 'POST',
        body: JSON.stringify({
          lat: map.getBounds().getCenter().lat,
          lng: map.getBounds().getCenter().lng,
          datetime: new Date().toISOString()
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      getData(setCoordinates);
      setIsSending(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    selectedCoordinate && map.flyTo(selectedCoordinate, 8);
  }, [selectedCoordinate]);

  return (
    <>
      {selectedCoordinate && (
        <Marker
          position={{
            lat: selectedCoordinate?.lat,
            lng: selectedCoordinate?.lng
          }}
          interactive={false}
          icon={GetIcon()}/>
      )}

      <div>
        <button
          type="submit"
          className="btn"
          disabled={isSending}
          onClick={(e) => {
            sendData();
          }}
          style={{
            position: 'fixed',
            bottom: '5%',
            zIndex: 999,
            padding: '10px 20px',
            width: '140px'
          }}>
          {isSending ? 'Gönderiliyor...' : 'Noktayı Kaydet'}
        </button>
      </div>
    </>
  );
};

export default Map;
