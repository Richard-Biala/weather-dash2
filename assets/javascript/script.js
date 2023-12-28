$(document).ready(function(){

    //listen for on click for the search button
    $("#search-btn").on("click", function(){
        
        //get search value
        const searchValue = $("#search-value").val().trim();

        console.log(searchValue);
    })
})