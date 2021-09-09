import React, { useState, useEffect } from 'react';
import useData from './useData';
import './style.scss';

export default function VehicleList() {
  // get screen size so correct image can be selected
  const windowWidth = window.innerWidth;
  const [currentWidth, setCurrentWidth] = useState(windowWidth);

  useEffect(() => {
    function setWidth() {
      setCurrentWidth(window.innerWidth);
    }
    window.addEventListener('resize', setWidth);
  });

  // eslint-disable-next-line no-unused-vars
  const [loading, error, vehicles] = useData();

  // assign our arrays to variables
  const vehicleList = vehicles[0];
  const vehicleDetails = vehicles[1];

  if (loading) {
    return <div data-testid="loading">Loading</div>;
  }

  if (error) {
    return <div data-testid="error">{error}</div>;
  }

  // extract relevant images from vehicle list
  const extractImages = (id) => {
    const relevantItem = vehicleList.filter((response) => response.id === id);
    const mobileImage = relevantItem[0].media[1].url;
    const largeImage = relevantItem[0].media[0].url;
    return [mobileImage, largeImage];
  };

  // vehicle detail grid item
  const vehicleGrid = vehicleDetails.map((res) => {
    // get relevant image
    const extractedImages = (extractImages(res.id));
    // match image to screen size
    const imageSource = currentWidth > 550 ? extractedImages[1] : extractedImages[0];
    return (
      <div className="vehicle-block" key={res.id}>
        <img src={imageSource} alt="" />
        <div className="vehicle-block__column">
          <h2 className="vehicle-block__header"><span>{res.id}</span></h2>
          <h3 className="vehicle-block__subheader">
            From
            <span> </span>
            {res.price}
          </h3>
          <p className="vehicle-block__text">{res.description}</p>
        </div>
      </div>
    );
  });

  return (
    <div data-testid="results" className="container">
      <div className="VehicleList">
        {vehicleGrid}
      </div>
    </div>
  );
}
