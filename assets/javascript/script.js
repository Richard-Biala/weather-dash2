$(document).ready(function(){

    //listen for on click for the search button
    $("#search-btn").on("click", function(){
        
        //get search value
        const searchValue = $("#search-value").val().trim();

        // call search weather function
        searchWeather(searchValue);
    })



    //function that searches for today's weather
    function searchWeather (cityName){

        //clear out the today div
        $("#today").empty();

        //quesry the API
        $.ajax({
            type: "GET",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=53d2378036e10278637205320c39dd84`
        }).then(function(response){
                console.log(response);

                //extract data from response
                const name = response.name;
                const wind = response.wind.speed;
                const humidity = response.main.humidity;
                const temperature = response.main.temp;
                const img = `https://openweathermap.org/img/w/${response.weather[0].icon}.png`;

                console.log(name, wind, humidity, temperature, img);


                //create card title
                const titleEl = $("<h3>").addClass("card-title").text(`${name} (${new Date().toLocaleDateString()})`);

                //create the card
                const cardEl = $("<div>").addClass("card");

                //create card body
                const cardBodyEl = $("<div>").addClass("card-body");

                //data to insert into card
                const windEl = $("<p>").addClass("card-text").text(`Wind Speed: ${wind} MPH`);
                const humidEl = $("<p>").addClass("card-text").text(`Humidity: ${humidity}`);
                const tempEl = $("<p>").addClass("card-text").text(`Tempertaure: ${temperature}`);
                const imgEl = $("<img>").attr("src", img);

                //combine data into card
                titleEl.append(imgEl);

                // append all data into card body section
                cardBodyEl.append(titleEl, tempEl, humidEl, windEl);

                //append card body onti the actual card element
                cardEl.append(cardBodyEl);

                // append onti the actual html page so we can see
                $("#today").append(cardEl);
                
                //get lat
                const latitude = response.coord.lat;

                // get lon
                const longitude = response.coord.lon;

                getUVIndex(latitude, longitude);
        })
    }

    function getUVIndex(lat, lon){

        console.log(lat, lon);
    }

})