$(document).ready(function(){
    $("#registration").submit(function (event) {
        $(".error").text("");
        const name = $("#name").val();
        const address = $("#address").val();
        const date = $("#date").val();
        const age = $("#age").val();
        const gender = $("input[name='gender']:checked").val();
        const term = $("input[name='terms']:checked").val();
        
        let isValidName = true;
        let isValidAddress = true;
        let isValidDate = true;
        let isValidAge = true;
        let isValidGender = true;
        let isValidTerms = true;

        if (name === ""){
            $("#name-error").text("Please enter your name");
            isValidName = false;
        } 
        if (address === ""){
            $("#address-error").text("Please enter your address");
            isValidAddress = false;
        }
        if (date === ""){
            $("#date-error").text("Please select date");
            isValidDate = false;
        }
        if (age === "0"){
            $("#age-error").text("Please select your age");
            isValidAge = false;
        }
        if (!gender){
            $("#gender-error").text("Please select your gender");
            isValidGender = false;
        }
        if (!term){
            $("#terms-error").text("Select terms");
            isValidTerms = false;
        }

        if(!isValidName || !isValidAddress || !isValidDate || !isValidAge || !isValidGender || !isValidTerms){
            event.preventDefault();
        }
    });

});


