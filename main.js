const search = document.querySelector('#search');
const address = document.querySelector('#address');
const Apikey = document.querySelector('#api-key');
const norad = document.querySelector('#norad');
const ourContent = document.querySelector(".content");
const satelliteDataSection = document.createElement("div");

search.addEventListener('click', function(){
    // console.log('clicked');
    // console.log(address.value);
    // console.log(Apikey.value);
    // console.log(norad.value);

    const URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address.value}.json?access_token=${Apikey.value}`;

    const encoded = encodeURI(URL);

    // console.log('encoded')
    // console.log('URL');
    fetch(encoded)

    .then((res) => res.json())

    .then((json) => {
        const long = json.features[0].center[0];
        const lati = json.features[0].center[1];
        // console.log(json)
        console.log(json.features[0]); 
            let dataLat = json.features[0].center[1];
            let dataLong = json.features[0].center[0];// to get latitude and longitude
        const satelliteUrl = `https://satellites.fly.dev/passes/${norad.value}?lat=${lati}&lon=${long}&limit=1&days=15&visible_only=true`;
        
        const coded = encodeURI(satelliteUrl);

        fetch(coded)

        .then((res) => res.json())

        .then((json) => {
            if (json.length === 0) {
                window.alert(
                  "This satellite won't be passing this location anytime soon. Try a different satellite/location combination!"
                );
              }
              if (json.length !== 0) {
                satelliteDataSection.innerHTML =
                  '<div class="section"><div class="row"><h2 id="our-satellite-data-words">Our Satellite Data</h2></div><div class="row"><span>It Rises---></span><span id="rise"></span></div><div class="row"><span>It Culminates---></span><span id="culminate"></span></div><div class="row"><span>It Sets---></span><span id="set"></span></div></div>';
                ourContent.appendChild(satelliteDataSection);
  
                //query select the rise div
                const riseSpan = document.querySelector("#rise");
                //set the innertext of the rise div to the data from api
                riseSpan.innerText = json[0].rise.utc_datetime;
                //query select the set div
                const setSpan = document.querySelector("#set");
                //set the innertext of the set div to the data from api
                setSpan.innerText = json[0].set.utc_datetime;
                // query select the culminate div
                const culminateSpan = document.querySelector("#culminate");
                //set the innertext of the culminate div to the data from api
                culminateSpan.innerText = json[0].culmination.utc_datetime;
              }
        });

    });

})
