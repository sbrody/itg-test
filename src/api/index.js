// eslint-disable-next-line no-unused-vars
import { request } from './helpers';

/**
 * Pull vehicles information
 *
 * @return {Promise<Array.<vehicleSummaryPayload>>}
 */
// TODO: All API related logic should be made inside this function.
export default async function getData() {
  // api endpoints
  const mainEndpoint = '/api/vehicles.json';
  // const detailEndpoint = '/api/vehicle_fpace.json';
  // const nopriceEndpoint = '/api/vehicle_xf.json';

  // get data from main endpoint
  const response = await fetch(mainEndpoint);
  const data = await response.json();
  console.log(data);

  // map the endpoint array and return the ID of each vehicle
  const vehicleIDs = data.map((vehicle) => {
    return vehicle.id;
  });
  console.log(vehicleIDs);

  // got to filter it first
  // map the ID array and for each make a call to the vehicle detail api
  const vehicleDetails = await Promise.all(vehicleIDs.map(async (id) => {
    const detailsArray = await fetch(`/api/vehicle_${id}.json`)
      .then((res) => res.json())
      .catch(() => null);
    return detailsArray;
  }));
  console.log(vehicleDetails);

  // // filter vehicle details and remove responses returning error and those without a price
  const filteredDetails = vehicleDetails.filter((res) => {
    return res !== null && res.price !== '' && res.price;
  });
  console.log(filteredDetails);

  return [data, filteredDetails];
}
