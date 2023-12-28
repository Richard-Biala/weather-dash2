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

        //quesry the API
        $.ajax({
            type: "GET",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=53d2378036e10278637205320c39dd84`
        }).then(function(response){
            console.log(response);
        })
    }

})