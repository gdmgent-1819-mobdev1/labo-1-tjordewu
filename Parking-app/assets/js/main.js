// local storage doesn't work in safari => run in webserver
(function() {
    
        function ParkingApp()
        {
            getJsonByPromise('https://datatank.stad.gent/4/mobiliteit/bezettingparkingsrealtime.json').then(
                function(resolve) {
                    console.log(resolve);
                    var parkingElement = document.querySelector('.parking-spot');
                    var tempStr = "";
    
    
                    resolve.forEach(function(e) {
    
                        var parkingLocal = new ParkingLocal(
                            e.id,
                            e.parkingStatus.availableCapacity
                            );
    
                        var parking = new Parking(
                            e.id,
                            e.name,
                            e.description,
                            e.address,
    
                            e.parkingStatus.availableCapacity,
                            e.parkingStatus.totalCapacity,
                            e.parkingStatus.open,
                            Math.round((e.parkingStatus.availableCapacity/e.parkingStatus.totalCapacity)*100)
                        );
    
                        var localStorageGet = localStorage.getItem('parking-Monitor');
    
                        if (localStorageGet != null) {
                        parkingLocal = JSON.parse(localStorageGet);
                        } else {
                            localStorage.setItem('parking-Monitor', JSON.stringify(parkingLocal));
                        }
    
                        //if (parking.availableCapacity > localStorageGet)
    
                        var localStorageGetParsed = JSON.parse(localStorageGet);
                        var percentage = parking.percentage;
                        var open = parking.open;
    
                        var parkingOpenElement;
                        var parkingPercentageElement;
                        var monitorSpace;
    
                        if (open == true) {
                            parkingOpenElement = "parking-available";
    
                            if (percentage >= 20 && percentage <= 50)
                            {
                                parkingPercentageElement = 'parking-orange';
                            }
                            else if (percentage > 50)
                            {
                                parkingPercentageElement = 'parking-green';
                            }
                            else
                            {
                                parkingPercentageElement = 'parking-red';
                            }
    
                        } else {
                            parkingOpenElement = "parking-unavailable";
                        }
    
                        if (parking.availableCapacity > localStorageGetParsed) {
                            monitorSpace = "⇡";
                        } else {
                            monitorSpace = "⇣";
                        }
    
                        tempStr += `
                            <div class="parkingSlot">
                                <p class="parkingName">${ e.address }</p>
                                <p class="parkingSpace">${ e.parkingStatus.availableCapacity } / ${ e.parkingStatus.totalCapacity } ${ monitorSpace }</p>
                                <p class="${ parkingPercentageElement }">${ parking.percentage }%</p>
                                <p class="${ parkingOpenElement }">${ e.parkingStatus.open }</p>
                            </div>
                        `
                    });
                    parkingElement.innerHTML = tempStr;
                },
    
                function(reject) {
                    console.log(reject);
                }
            );
    
        }
    
        function ParkingLocalStorage()
        {
            
        }
    
        function ApplicationInit()
        {
            ParkingApp();
        }
    
        ApplicationInit();
        setInterval(ApplicationInit, 1000);
    })();