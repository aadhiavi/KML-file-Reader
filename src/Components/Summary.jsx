import React, { useState } from 'react';

const KMLSummary = ({ data }) => {
  const [isVisible, setIsVisible] = useState(false);

  const countElements = (data) => {
    const elementCount = {};
    if (data?.features) {
      data.features.forEach((feature) => {
        const type = feature.geometry.type;
        elementCount[type] = (elementCount[type] || 0) + 1;
      });
    }
    return elementCount;
  };

  const elementCount = countElements(data);

  const toggleTableVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <button className="details-toggle-btn" onClick={toggleTableVisibility}>
        {isVisible ? 'Hide Summary' : 'Show Summary'}
      </button>

      {isVisible && (
        <table>
          <thead>
            <tr>
              <th>Element Type</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(elementCount).map(([type, count]) => (
              <tr key={type}>
                <td>{type}</td>
                <td>{count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default KMLSummary;



