import React, { useState } from 'react';
import * as toGeoJSON from 'togeojson';

const FileUpload = ({ onFileParse }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const kmlData = reader.result;
        const kml = new DOMParser().parseFromString(kmlData, 'text/xml');
        const geojson = toGeoJSON.kml(kml);
        onFileParse(geojson);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className='file-upload'>
      <input type="file" accept=".kml" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload KML</button>
    </div>
  );
};

export default FileUpload;




