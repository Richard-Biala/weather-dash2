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
                const image = `https://openweathermap.org/img/w/${response.weather[0].icon}.png`;

                console.log(name, wind, humidity, temperature, image);


                //create card title
                const title = $("<h3>").addClass("card-title").text(`${name} (${new Date().toLocaleDateString()})`);


                $("#today").append(title);

                //create the card
                const card = $("<div>").addClass("card");

                //create card body
                const cardBody = $("<div>").addClass("card-body");

                //data to insert into card

        })
    }

})