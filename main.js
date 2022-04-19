const search = document.querySelector('#search');
const address = document.querySelector('#address');
const Apikey = document.querySelector('#api-key');
const norad = document.querySelector('#norad');
const timewhen = document.querySelector('.when');

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
        console.log(data.features[0]); 
            let dataLat = data.features[0].center[1];
            let dataLong = data.features[0].center[0];// to get latitude and longitude
        const satelliteUrl = `https://satellites.fly.dev/passes/${norad.value}?lat=${lati}&lon=${long}&limit=1&days=15&visible_only=true`;
        
        const coded = encodeURI(satelliteUrl);

        fetch(coded)

        .then((res) => res.json())

        .then((json) => {
            console.log('satelliteJson', json);
            const rise = json[0].rise.utc_datetime;
            const culm = json[0].culmination.utc_datetime;
            const set = json[0].set.utc_datetime;
            console.log('rise:',rise);
            console.log('cul:',culm);
            console.log('set:', set)

    let newHtml = 
        `<div class = "satellite-address">
        <h2>Info/Reading</h2>
            <h3>Rise<h3>
            <p>${rise}</p>
            <h3>Culminate<h3>
            <p>${culm}</p>
            <h3>Set<h3>
            <p>${set}</p>
        <div>`  
    whenInfo.innerHTML +=newHtml;
        })

    })

})
