import { useState, useEffect } from 'react';

import Places from './Places.jsx';
import Error from './Error.jsx';
import {sortPlacesByDistance} from '../loc.js';
import { fetchAvailablePlaces } from '../http.js';

export default function AvailablePlaces({ onSelectPlace }) {

const [loadingPlaces, setLoadingPlaces] = useState(false);
const [availablePlaces, setAvailablePlaces] = useState([]);
const [error, setError] = useState();

useEffect(() => {

  async function featchPlaces(){
    setLoadingPlaces(true);
    try{
     const places = await fetchAvailablePlaces();

      navigator.geolocation.getCurrentPosition((position) => {
        const sortedPlaces = sortPlacesByDistance(places, position.coords.latitude, position.coords.longitude);
        setAvailablePlaces(sortedPlaces);
        setLoadingPlaces(false);
      })
      
      
    }
    catch (error) {
      setError({message: error.message || 'Could not featch places, please try again later.'});
      setLoadingPlaces(false);
       }
   

  }

  // fetch('http://localhost:3000/places')
  // .then((response) => {
  //    return response.json();
  //    console.log(response);
  // })
  // .then((resData) => {
  //   setAvailablePlaces(resData.places);
  // });
 featchPlaces(); 
},[]);

  if(error){
    return(<Error title={'An Error occured.'}  message={error.message}/>);
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={loadingPlaces}
      loadingText="Fetaching places data.."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
