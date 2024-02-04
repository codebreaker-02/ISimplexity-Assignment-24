import React from 'react';

const Bar = ({ data }) => {
    
    const categories = {
    1: data.filter(item => item.data >= 600),
    2: data.filter(item => item.data >= 400 && item.data < 600),
    3: data.filter(item => item.data >= 300 && item.data < 400),
    4: data.filter(item => item.data < 300),
    };

    const calculatePercentage = (segmentData) => {
    let totalData = segmentData.reduce((total, item) => total + item.data, 0);
    return (totalData / data.reduce((total, item) => total + item.data, 0)) * 100;
    };

    const renderSegments = (row) => {
    const segments = [];

    for (const [segment, segmentData] of Object.entries(categories)) {
        const percentage = calculatePercentage(segmentData);

        if(row === 1){
        segments.push(
            <div key={segment} className={`bar-segment segment-${segment}`} style={{ width: `${percentage}%` }}>
                <div></div>
            </div>
        );
        }
        else if(row === 2){
        segments.push(
            <div key={segment} className={`bar-segment ${segment}`} style={{ width: `${percentage}%` }}>
                {percentage.toFixed(2)}%
            </div>
        );
        }
    }

    return segments;
  };

  return (
    <div className='bar-section'>
      <div className='section'>
        <div style={{ textAlign: 'center', marginRight: '40px' , whiteSpace:'nowrap'}}>$ Usage</div>
        <div className="data-bar">
            {renderSegments(1)}
        </div>
      </div>
      <div className='section'>
        <div style={{ textAlign: 'center', marginRight: '40px', color: 'white', whiteSpace:'nowrap'}}>$ Usage</div>
        <div className="data-bar">
          {renderSegments(2)}
        </div>
      </div>
    </div>
  );
};

export default Bar;
