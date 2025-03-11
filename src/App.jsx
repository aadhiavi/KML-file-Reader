import React, { useState } from 'react';
import KMLSummary from './Components/Summary';
import FileUpload from './Components/FileUpload';
import KMLDetails from './Components/Details';
import MapDisplay from './Components/MapView';
import MapView from './Components/Map2';

const App = () => {
  const [kmlData, setKmlData] = useState(null);

  const handleFileParse = (data) => {
    setKmlData(data);
  };

  return (
    <div className='app'>
      <h1>KML File Viewer</h1>
      <FileUpload onFileParse={handleFileParse} />
      {kmlData && (
        <>
          <KMLSummary data={kmlData} />
          <KMLDetails data={kmlData} />
          <div className='map-container'>
            <MapDisplay geoJsonData={kmlData} />
            <MapView geoJsonData={kmlData} />
          </div>
        </>
      )}

    </div>
  );
};

export default App;
