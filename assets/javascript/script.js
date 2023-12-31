$(document).ready(function(){

    //create an array of cities
    const cities = ["Sacramento", "New York"];

    //listen for on click for the search button
    $("#search-btn").on("click", function(){
        
        //get search value
        const searchValue = $("#search-value").val().trim();

        //push new button to array
        cities.push(searchValue);

        // call search weather function
        searchWeather(searchValue);

        //render new button
        renderButtons();
    })



    //function that searches for today's weather
    function searchWeather (cityName){

        //clear out the today div
        $("#today").empty();

        //quesry the API
        $.ajax({
            type: "GET",
            url: `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=53d2378036e10278637205320c39dd84`
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
                const humidityEl = $("<p>").addClass("card-text").text(`Humidity: ${humidity}`);
                const tempEl = $("<p>").addClass("card-text").text(`Tempertaure: ${temperature}`);
                const imgEl = $("<img>").attr("src", img);

                //combine data into card
                titleEl.append(imgEl);

                // append all data into card body section
                cardBodyEl.append(titleEl, tempEl, humidityEl, windEl);

                //append card body onti the actual card element
                cardEl.append(cardBodyEl);

                // append onti the actual html page so we can see
                $("#today").append(cardEl);
                
                //get lat
                const latitude = response.coord.lat;

                // get lon
                const longitude = response.coord.lon;

                getUVIndex(latitude, longitude);
                getForecast(name);
        })
    }

    function getUVIndex(lat, lon){

        //call api to get UV index
        $.ajax({
            type: "GET",
            url: `https://api.openweathermap.org/data/2.5/uvi?appid=53d2378036e10278637205320c39dd84&lat=${lat}&lon=${lon}`
        }).then(function(response){

            const uvValue = response.value;

            const uvEl = $("<p>").text(`UV Index: `);
            const btnEl = $("<span>").addClass("btn btn-sm").text(uvValue);

            // change color based off value of UV
            if(uvValue < 3){
                btnEl.addClass("btn-success");
            }

            else if(uvValue < 7){
                btnEl.addClass("btn-warning");
            }
            else{
                btnEl.addClass("btn-danger");
            }


            // append the btnEl to card
            uvEl.append(btnEl);


            // append to card body
            $("#today .card-body").append(uvEl);


        })
    }

    function getForecast(cityName){
        $.ajax({
            type: "GET",
            url: `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=53d2378036e10278637205320c39dd84`
        }).then(function(response){

                console.log(response);
            $("#forecast").html("<h4 class=\"mt-3\">5-Day Forecast: </h4>").append("<div class=\"row\">");

            //loop over all forecast
            for(var i = 0; i < response.list.length; i+=8){
                
                 // create colomn
                 const colEl = $("<div>").addClass("col-md-2");

                 // create card
                 const cardEl = $("<div>").addClass("card bg-primary text-white");

                 //create card body
                 const cardBodyEl = $("<div>").addClass("card-body p-2");

                 //exrtact data from current element that we are on
                 const titleEl = $("<h5>").addClass("card-title").text(new Date(response.list[i].dt_txt).toLocaleDateString());

                 const imgEl = $("<img>").attr("src", `https://openweathermap.org/img/w/${response.list[i].weather[0].icon}.png`);

                 const tempEl = $("<p>").addClass("card-text").text(`Temp: ${response.list[i].main.temp_max}`);

                 const humidityEl = $("<p>").addClass("card-text").text(`Humidity: ${response.list[i].main.humidity}`);



                 // append all data to card element
                 cardBodyEl.append(titleEl, imgEl, tempEl, humidityEl)
                 cardEl.append(cardBodyEl);

                 // once card if completed, append to our colomn
                 colEl.append(cardEl);

                 // append colomn to row
                 $("#forecast .row").append(colEl);

            }
        })
    }

    function renderButtons (){

        $(".cities").empty();
        for(let i = 0; i < cities.length; i++){
            //create list item
            const listItem = $("<li>").addClass("current-city list-group-item list-group-item-action").attr("data-city", cities[i]).text(cities[i]);
            $(".cities").append(listItem);
        }
    }

    $(document).on("click", ".current-city", function(){

        //get city name from the one we click
        const cityName = $(this).attr("data-city");

        searchWeather(cityName);
    });

    //render on pageload
    renderButtons();

})