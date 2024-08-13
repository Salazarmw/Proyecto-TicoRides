/**
 * Saves a specific key in the local storage database
 * @param {*} key the key to store
 * @param {*} value the value associated with the key to be stored
 */
function saveToLocalStorage(key, value) {
  let list = JSON.parse(localStorage.getItem(key));
  if (!list) {
    list = [];
  }
  list.push(value);

  localStorage.setItem(key, JSON.stringify(list));
  return true;
}

/**
 * Retrieves a value from local storage by key
 * @param {*} key
 */
function getFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// Function to add a new ride
function addRide(departure, arrival, seats, car, fee) {
  const rides = JSON.parse(localStorage.getItem("rides")) || [];
  const newRide = {
    id: Date.now(), // Unique ID using timestamp
    departure,
    arrival,
    seats,
    car,
    fee,
  };
  rides.push(newRide);
  localStorage.setItem("rides", JSON.stringify(rides));
}
