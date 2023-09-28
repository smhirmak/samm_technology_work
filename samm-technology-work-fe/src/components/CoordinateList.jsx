import React, { useState } from 'react';
import getData from '../utils/getData';

const CoordinateList = ({
  selectedItem,
  coordinates,
  setCoordinates,
  setSelectedCoordinate,
  selectedCoordinate
}) => {
  const [isSending, setIsSending] = useState(false);
  const clickHandle = (item) => {
    selectedItem(item);
  };
  const deleteItem = async (id) => {
    try {
      setIsSending(true);
      await fetch('http://localhost:8080/delete', {
        method: 'DELETE',
        body: JSON.stringify({ deletedId: id }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      selectedCoordinate?.id === id && setSelectedCoordinate(undefined);
      setIsSending(false);
      getData(setCoordinates);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {coordinates?.length > 0 ? (
        <ol className="list">
          <h2 className="span">Kaydedilen Koordinatlar:</h2>
          {coordinates
            ?.sort((a, b) => {
              const dateA = new Date(a.datetime);
              const dateB = new Date(b.datetime);
              return dateA - dateB;
            })
            .map((item) => (
              <li className="listWrapper" key={item.id}>
                <div
                  className="coordinateList"
                  style={{ display: 'flex', flexDirection: 'column' }}
                  onClick={() => clickHandle(item)}>
                  <div>
                    <span className="span">Lat:</span> {item.lat}
                  </div>
                  <div>
                    <span className="span">Lng:</span> {item.lng}
                  </div>
                  <div>
                    <span className="span">Date Time: </span>
                    {new Date(item.datetime).toLocaleDateString('tr-TR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
                <div>
                  <button disabled={isSending} className="btn" onClick={() => deleteItem(item.id)}>
                    Sil
                  </button>
                </div>
              </li>
            ))}
          <a href="http://localhost:8080/list.json" target="_blank" rel="noreferrer">
            <button className="btn">Listeyi İndir</button>
          </a>
        </ol>
      ) : (
        <div className="warning">
          <p className="span">Seçili Öge Yok</p>
        </div>
      )}
    </>
  );
};

export default CoordinateList;
