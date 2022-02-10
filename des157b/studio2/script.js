(function(){
    'use strict';
    console.log('reading js');

    // ********************* Vars % DOMs *********************
    let tripContainer = document.querySelector(".trip-container");


    //Remember to update token before upload to github
    

    const mapKitJSTokenID = "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Iks2Qkg4Mlg3MlYifQ.eyJpc3MiOiJENE45NzVFNzU5IiwiaWF0IjoxNjQ0NDM0MzQ4LCJleHAiOjE2NjQ0OTYwMDAsIm9yaWdpbiI6Imh0dHA6Ly9naXRodWIuZGFzbGlhby5zdHlsZSJ9.-4PDt-wyRnEgnImxYvD9tZD0jbs1HT2P81cNksrvCeSTg87ryWrjquh_weZxUv14yJWE7__80uIsR_aOVn6VyQ";

    function EachTravel(details) {
        this.travelDetails = details;
        this.annotaion;
        this.flightRoute;
    }

    let globalData;
    let airportMarkerAnnotations = [];
    let flightKeys, numOfTravel;
    let markedAirport = [];
    let totalDistance = 0;
    

    // ********************* Initialize *********************
    mapkit.init({
        authorizationCallback: function(done) {
            //###### Remember to update token before upload to github #######
            done(mapKitJSTokenID);
            //###### Remember to update token before upload to github #######
        }
    });

    let map = new mapkit.Map("map");
    // ********************* Execusion *********************
    map.showScale = mapkit.FeatureVisibility.Visible; 
    map.tintColor = "#ff4040"; // Change the Map Controller colors
    

    // getData();
    setUpInterface();
    
    
    // console.log(flightKeys);
    // console.log(numOfTravel);
    // getAirportInfo();
    // getWeatherData("2020-12-10", "San Francisco");

    // const d = new Date('2020-12-10').toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'});;
    // console.log(d);


    // ********************* Functions *********************
    async function getAirportInfo() {
        try{
            document.getElementById('mapInitializer').innerText = 'Map Initializing...';
            document.getElementById('mapInitializer').style.color = '#353002';
            document.querySelectorAll('footer a').forEach(function(eachA){
                eachA.style.color ='#353002';
            });
            document.querySelector('footer').style.backgroundColor = '#EFDE3F';
            // console.log('Hi');
            // console.log(numOfTravel);
            for(let i = 0; i < numOfTravel; i++) {
                // console.log('HIHIHI');
                let origData = await getOrigAirportData(i);
                let destData = await getDestAirportData(i);
                // console.log('gettingInfo');
                // console.log(origData.latitude + 'Coordinates' +origData.longitude);
                globalData[flightKeys[i]].origCoordinate = new mapkit.Coordinate(origData.latitude,origData.longitude); // generate a coordinate object for map (need to store them with data)
                globalData[flightKeys[i]].destCoordinate = new mapkit.Coordinate(destData.latitude,destData.longitude);
                globalData[flightKeys[i]].originInfo = origData;
                globalData[flightKeys[i]].destinationInfo = destData;

                if(markedAirport.length === 0 ) {
                    markedAirport[0] = {
                        iata: origData.iata,
                        traveled: 1
                    };
                    let annotaion = createAnnotation(globalData[flightKeys[i]].origCoordinate, origData);
                    airportMarkerAnnotations.push(annotaion);
                    console.log('Adding Origin Annotation');
                    map.addAnnotation(annotaion);
                }

                let origMatched = false;
                let destMatched = false;

                for (let j = 0; j < markedAirport.length; j++) {
                    // console.log('Annotating');
                    // console.log(markedAirport.length);
                    // console.log(globalData[flightKeys[i]].origin + '    and     ' + globalData[flightKeys[i]].destination);

                    // console.log(globalData[flightKeys[i]].origin === markedAirport[j].iata);
                    // console.log(globalData[flightKeys[i]].destination === markedAirport[j].iata);
                    if(!origMatched){
                        if(globalData[flightKeys[i]].origin === markedAirport[j].iata ) {
                            //console.log('Matching Origin ' + `O:${globalData[flightKeys[i]].origin} D:${markedAirport[j].iata} M:${globalData[flightKeys[i]].origin === markedAirport[j].iata}`);
                            markedAirport[j].traveled++;
                            origMatched = true;
                        } 
                    }
                    if(!destMatched) {
                        if (globalData[flightKeys[i]].destination === markedAirport[j].iata ) {
                            //console.log('Matching Destination ' + `O:${globalData[flightKeys[i]].destination} D:${markedAirport[j].iata} M:${globalData[flightKeys[i]].destination === markedAirport[j].iata}`)
                            markedAirport[j].traveled++;
                            destMatched = true;
                        } 
                    }
                    if (origMatched && destMatched) {
                        break;
                    }
                }
                if (!origMatched) {
                    //console.log("pushing Origin data in");
                    markedAirport.push({
                        iata: globalData[flightKeys[i]].originInfo.iata,
                        traveled: 1
                    });
                    document.getElementById('totalCities').innerText = `${markedAirport.length}`;
                    map.center = globalData[flightKeys[i]].origCoordinate;
                    //console.log('Creating Origin Annotation');
                    let origAnnotaion = createAnnotation(globalData[flightKeys[i]].origCoordinate,origData);
                    airportMarkerAnnotations.push(origAnnotaion);
                    //console.log('Adding Origin Annotation');
                    map.addAnnotation(origAnnotaion);
                }

                if (!destMatched) {
                    //console.log("pushing Destination data in");
                    markedAirport.push({
                        iata: globalData[flightKeys[i]].destinationInfo.iata,
                        traveled: 1
                    });
                    document.getElementById('totalCities').innerText = `${markedAirport.length}`;
                    map.center = globalData[flightKeys[i]].destCoordinate;
                    //console.log('Creating Destination Annotation');
                    let destAnnotaion = createAnnotation(globalData[flightKeys[i]].destCoordinate,destData);
                    airportMarkerAnnotations.push(destAnnotaion);
                    //console.log('Adding Destination Annotation');
                    map.addAnnotation(destAnnotaion);
                }
                        
                // map.center = coordinate; // Center the map to the coordinate
                //Create the annotation object
                // map.addAnnotation(annotation); // add annotation on the Map
            }
                document.getElementById('mapInitializer').innerText = 'Map Initialized!!!';
                document.getElementById('mapInitializer').style.color = 'white';
                document.querySelectorAll('footer a').forEach(function(eachA){
                    eachA.style.color ='white';
                });
                document.querySelector('footer').style.backgroundColor = '#73CE38';
            setTimeout(function(){
                document.getElementById('mapInitializer').innerText = '';
                document.querySelector('footer').style.backgroundColor = '';
                document.querySelectorAll('footer a').forEach(function(eachA){
                    eachA.style.color ='#7296a8';
                });
            },2000)
            // console.log(globalData);
            // console.log(markedAirport);
            // console.log(airportMarkerAnnotations);
        } catch(error) {
            console.error(error);
        }
        
    }

    async function setUpInterface() {
        await getData();
        document.getElementById('totalDistance').innerText = `${totalDistance}`;
        const brief = document.querySelectorAll('.brief');
        const expand = document.querySelectorAll('.brief .fa-chevron-down');
        const trips = document.querySelectorAll('.trips');
        const details = document.querySelectorAll('.details');
        for (let i = 0; i < expand.length; i++) {
            console.log('setting up event listner');
            brief[i].addEventListener('click', function() {
                if(expand[i].className === 'fas fa-chevron-down') {
                    for (let j = 0; j< expand.length; j++) {
                        if (j !== i) {
                            expand[j].className = 'fas fa-chevron-down';
                            trips[j].className = "trips listed";
                            details[j].className = 'details hidden';
                            // map.removeOverlay();
                        }
                    }
                    expand[i].className = 'fas fa-chevron-up';
                    trips[i].className = "trips active";
                    details[i].className = 'details';

                    const style = new mapkit.Style({
                        lineWidth: 2,
                        lineJoin: "round",
                        lineDash: [8, 4],
                        strokeColor: "#F0F"
                    });
                    let coords = [globalData[flightKeys[i]].origCoordinate, globalData[flightKeys[i]].destCoordinate]

                    console.log('This is the');
                    console.log(coords);

                    let polyline = new mapkit.PolylineOverlay(coords, { style: style });
                    map.addOverlay(polyline);

                    
                } else {
                    expand[i].className = 'fas fa-chevron-down';
                    trips[i].className = "trips listed";
                    details[i].className = 'details hidden';
                }
            });
        }

    }

    async function getData() {
        // 1. get data from json file 
        // 2. creat Apple MapKit Marker Annotations, and store them inside a array
        // 3. in the condition where there is the same airport, the size of the annotation should be enlarged
        // 4. finally a for loop to add all the annotation to the map
        let response = await fetch('data/flight_data.json');
        let data = await response.json();
        // console.log(data);
        globalData = data;
        flightKeys = Object.keys(data);
        numOfTravel = flightKeys.length;
        // console.log('returning GlobalData');
        // console.log(flightKeys);
        // console.log(numOfTravel);
        
        getAirportInfo();
        listTrips(globalData, flightKeys, numOfTravel);
        
    }


    async function getOrigAirportData(idx) {
        let origResponse = await fetch(`https://airport-info.p.rapidapi.com/airport?iata=${globalData[flightKeys[idx]].origin}`, {
            "method": "GET","headers": {
                "x-rapidapi-host": "airport-info.p.rapidapi.com",
                "x-rapidapi-key": "daee9edf21mshb6d5e74c61fe7f3p117ed0jsn7fdd1eccd5ba"
            }
        });
        let origData = await origResponse.json();
        return origData;
    }

    async function getDestAirportData(idx) {
        let destResponse = await fetch(`https://airport-info.p.rapidapi.com/airport?iata=${globalData[flightKeys[idx]].destination}`, {
            "method": "GET","headers": {
                "x-rapidapi-host": "airport-info.p.rapidapi.com",
                "x-rapidapi-key": "daee9edf21mshb6d5e74c61fe7f3p117ed0jsn7fdd1eccd5ba"
            }
        });
        let destData = await destResponse.json();
        return destData;
    }

    async function getWeatherData(date, city) {
        try {
            let response = await fetch(`http://api.weatherstack.com/historical?access_key=ba5afb6053d50e0237a9365b142b285e&query=${city}&historical_date=${date}`);
            let data = await response.json();
            console.log(data);
        } catch(error) {
            console.error(error);
        }
        
    }

    function polylineForTrip(){
        for(let i = 0; i < numOfTravel; i++) {
            
        }
    }

    function createAnnotation(coordinate,data) {
        let annotation = new mapkit.MarkerAnnotation(coordinate, {
            glyphText: data.iata,
                    title: data.city,
                    subtitle: data.country,
                    color: "#53ac79",
                    glyphColor: "#2A1DD8"
        });
        return annotation;
    }

    function listTrips(data, keys, numOfRecord) {
        for (let i = 0; i < numOfRecord; i++) {
            let trip = document.createElement('div');
            let brief = document.createElement('div');
            let details = document.createElement('div');
            trip.className = 'trips listed';
            trip.id = `trip-${i+1}`;
            brief.className = 'brief';
            details.className = 'details hidden';
            brief.innerHTML = `<div class="colorbar"></div>
                                <div class="tripinfo">
                                    <div id="fromto">
                                        <h2 id="from">${data[keys[i]].origin}</h2>
                                        <h2>-</h2>
                                        <h2 id="to">${data[keys[i]].destination}</h2>
                                    </div>
                                    <div class="date">${data[keys[i]].date}</div>
                                </div>
                                <i class="fas fa-chevron-down"></i>`;
            details.innerHTML = `<div class="airlines">
                                    <i class="fas fa-plane"></i>
                                    <img class="airlinelogos" src="https://daisycon.io/images/airline/?width=100&height=50&iata=${data[keys[i]].flightNo.slice(0,2)}" alt="airline logo">
                                </div>                
                                <div class="triptimes">
                                    <div class="departure">
                                        <h3 id="departuretime">${data[keys[i]].departure}</h3>
                                        <h4 id="origin"><i class="fas fa-plane-departure"></i> Departure</h4>
                                    </div>
                                    <p class="tripdistance"><i class="fas fa-long-arrow-alt-right"></i> <span>${data[keys[i]].distance}KM</span> <i class="fas fa-long-arrow-alt-right"></i></p>
                                    <div class="arrival">
                                        <h3 id="arrivaltime">${data[keys[i]].arrival}</h3>
                                        <h4 id="destination"><i class="fas fa-plane-arrival"></i> Arrival</h4>
                                    </div>
                                </div>`
            trip.appendChild(brief);
            trip.appendChild(details);
            document.getElementById('trip-container').appendChild(trip);
            totalDistance += data[keys[i]].distance;
            // console.log(trip);
        }
    }

    // ********************* Event Listners *********************
    
})();