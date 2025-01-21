import React from 'react';

const PotholeDetectionTable = ({ data }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Location</th>
            <th>Severity</th>
            <th>Pothole Count</th> {/* New Column */}
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.location}</td>
              <td>
                <span
                  className={`severity-badge ${
                    item.severity === 'High'
                      ? 'severity-high'
                      : item.severity === 'Medium'
                      ? 'severity-medium'
                      : 'severity-low'
                  }`}
                >
                  {item.severity}
                </span>
              </td>
              <td>{item.potholeCount}</td> {/* Displaying Pothole Count */}
              <td>{item.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PotholeDetectionTable;
