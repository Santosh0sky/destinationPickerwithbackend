export async function fetchAvailablePlaces() {
    const respons = await fetch('http://localhost:3000/places');
    const resData = await respons.json(); 
    
    if(!respons.ok){
        throw new Error('Something went wrong!');
    }

    return resData.places;
}

export async function fetchUserlaces() {
    const respons = await fetch('http://localhost:3000/user-places');
    const resData = await respons.json(); 
    
    if(!respons.ok){
        throw new Error('could not fetch user places!');
    }

    return resData.places;
}

export async function updatUserPlaces(places) {
    const response = await fetch('http://localhost:3000/user-places', {
        method: 'PUT',
        body: JSON.stringify({places}),
        headers: {
            'Content-Type': 'application/json',
        }
    });
    console.log(response);

    const resData = await response.json();

    if(!response.ok){
        throw new Error('Failed updating user data!');

    }
    
    return resData.message;
}