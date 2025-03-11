import React, { useState } from 'react';
import '../App.css';

const KMLDetails = ({ data }) => {
  const [isVisible, setIsVisible] = useState(false);

  const getElementDetails = (data) => {
    const details = [];
    if (data?.features) {
      data.features.forEach((feature) => {
        const lineString = feature.geometry.type === 'LineString';
        if (lineString) {
          const length = feature.geometry.coordinates.length;
          details.push({ type: 'LineString', length });
        }
      });
    }
    return details;
  };

  const details = getElementDetails(data);
  const toggleTableVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <button className="details-toggle-btn" onClick={toggleTableVisibility}>
        {isVisible ? 'Hide Details' : 'Show Details'}
      </button>

      {isVisible && (
        <table>
          <thead>
            <tr>
              <th>Element Type</th>
              <th>Total Length</th>
            </tr>
          </thead>
          <tbody>
            {details.map((detail, index) => (
              <tr key={index}>
                <td>{detail.type}</td>
                <td>{detail.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default KMLDetails;



