"use strict";

/*setting the cursor to focus on the first field*/
$(document).ready(function() {
  $("input:text:visible:first").focus();




/*adding text field to the other selection*/
const jobRoleSelect = document.getElementById('title');

jobRoleSelect.addEventListener('click', function() {
var otherSelected = jobRoleSelect.value === 'other';
var otherElements = document.querySelectorAll('.other');

for (var i = 0; i < otherElements.length; i++) {
 if (otherSelected)
   otherElements[i].classList.remove('hidden');
 else
   otherElements[i].classList.add('hidden');
  }
});


// T-Shirt Info section of the form.
// For the T-Shirt color menu, only display the options that match the design selected in the "Design" menu.
document.getElementById("design").addEventListener("change", function(){
	var tShirtMenu = document.getElementById('design');
	var tSelection = tShirtMenu.value;
	var colorSelector = document.getElementById('colors-js-puns');

	if(tSelection) {
		colorSelector.innerHTML = "";

	}
	if(tSelection === "js puns") {
		// If the user selects "Theme - JS Puns" then the color menu should only display "Cornflower Blue," "Dark Slate Grey," and "Gold."
		colorSelector.innerHTML = '<label for="color">Color:</label><select id="color"><option value="cornflowerblue">Cornflower Blue</option><option value="darkslategrey">Dark Slate Grey</option><option value="gold">Gold</option></select>';
		//tColor.innerHTML = "<option value='cornflowerblue'>Cornflower Blue</option><option value='darkslategrey'>Dark Slate Grey</option><option value='gold'>Gold</option>";

	}
	if(tSelection === "heart js") {
		// If the user selects "Theme - I ♥ JS" then the color menu should only display "Tomato," "Steel Blue," and "Dim Grey."
		colorSelector.innerHTML = '<label for="color">Color:</label><select id="color"><option value="tomato">Tomato</option><option value="steelblue">Steel Blue</option><option value="dimgrey">Dim Grey</option></select>';

	}
});



/*Register for Activities section of the form.*/
var eventsSection = document.querySelector('.activities');
    var events = document.querySelectorAll('input[type="checkbox"]');
    var totalCost = 0;
    var activitiesSelected = 0;
    var selectedDate;

    function getEventCost() {

      var stringContent = this.parentNode.childNodes[1].textContent;
      var priceStart = stringContent.indexOf("$");
      var price = stringContent.substring(priceStart + 1) * 1;
      var dateStart = stringContent.indexOf("—");
      var dateEnd = stringContent.indexOf(",");
      var checkedInput = this.checked;

      if(checkedInput) {
        totalCost = totalCost + price;
        activitiesSelected += 1;
      } else {
        totalCost = totalCost - price;
        if (activitiesSelected > 0) {
          activitiesSelected -= 1;
        }
      }

      selectedDate = stringContent.substring(dateStart + 2, dateEnd);
      document.querySelector('.current-price').textContent = totalCost;

      if(this.checked) {
        conflictingDates('disabled');
      } else {
        conflictingDates('enabled');
      }
    }

    function conflictingDates(checkedStatus) {
      // This function checks to see if there are conflicting dates
      for(var i = 0; i < events.length; i++) {
        var dateMatch = events[i].parentNode.childNodes[1].textContent.indexOf(selectedDate);
        if(dateMatch !== -1 && events[i].checked === false) {

          // When the user selects an item, all other items that match the date
          // and time are disabled, so conflicting events cannot be scheduled.
          if(checkedStatus === 'disabled') {
            events[i].disabled = true;
            events[i].parentNode.classList.add('disabled');
          }

          // If the user deselects an event item, all conflicting items are
          // set to be selectable again.
          if(checkedStatus == 'enabled') {
            events[i].disabled = false;
            events[i].parentNode.classList.remove('disabled');
          }
        }
      }
    }


    (function displayCost() {
      // print the display cost to the bottom of the activities section
      var priceContainer = document.createElement('footer');
      priceContainer.classList.add('price');
      priceContainer.textContent = "Total: $";
      var currentPrice = document.createElement('span');
      currentPrice.classList.add("current-price");
      currentPrice.textContent = "0";
      priceContainer.appendChild(currentPrice);
      eventsSection.appendChild(priceContainer);
    })();


    for (var j = 0; j < events.length; j++) {
      // Context of this in the getEventCost function above.
      events[j].addEventListener('change', getEventCost);
    }

    //changing the payment message
    bitcoin.style.display = 'none';
    paypal.style.display = 'block';

    //setting up the payment
    $('#paypal, #bitcoin').hide();

    //Set credit card as default method
     $('#payment').val("credit card");
    //function for changing the payment option
    $('#payment').change(function(){
    	if ($('#payment option:selected').val() === "paypal") {
    		$('#credit-card, #bitcoin').hide();
    		$('#paypal').show();

    	} else if ($('#payment option:selected').val() === "bitcoin") {
    		$('#credit-card, #paypal').hide();
    		$('#bitcoin').show();
    	} else {
    		$('#credit-card').show();
    		$('#paypal, #bitcoin').hide();
    	}
      });


//set function to switch between the payselector

  $("#submit").on('click',function(){

    var selection = $("#payment option:selected").val();



    if (selection === "Credit") {

      validation();

    };



  });



  function validation(){

    console.log("Do something");

  }

  // Form validation. Display error messages and don't let the user submit the form if any of these validation errors exist:
document.querySelector("button").addEventListener("click", function(e) {

	// Name field can't be empty
    var nameInput = document.getElementById("name");
    var nameLabel = document.getElementById("nameLabel");
	if(nameInput.value.length == 0) {
        nameLabel.innerHTML = "Name: (please provide name)";
        nameLabel.style.color = "red";
        e.preventDefault();
    } else {
    	nameLabel.innerHTML = "Name:";
        nameLabel.style.color = "black";
    }

	// Email field must be a validly formatted e-mail address
	function validateEmail(email) {
  		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  		return re.test(email);
	}

	var emailInput = document.getElementById("mail");
    var emailLabel = document.getElementById("emailLabel");

	if(!validateEmail(emailInput.value)) {
        emailLabel.innerHTML = "Email: (please provide a valid email address)";
        emailLabel.style.color = "red";
        e.preventDefault();
    } else {
    	emailLabel.innerHTML = "Email:";
        emailLabel.style.color = "black";
    }


   	//check there's a valid credit card number
  var ccNumLbl = document.getElementById("cc-numLbl");
	var ccNum = document.getElementById("cc-num");
  	if(ccNum.value.length == 0) {
          ccNumLbl.style.color = "red";

      } else {
          ccNumLbl.style.color = "black";
      }

// takes the form field value and returns true on valid number



var submitForm = function() {
if(validForm()) {
    $( "form:first" ).submit();
  }
};




    //check there's a zip code
	var zip = document.getElementById("zip");
    var zipLbl = document.getElementById("zipLbl");
	if(zip.value.length == 0) {

        zipLbl.style.color = "red";
    } else {
        zipLbl.style.color = "black";
    }

    //check there's a cvv
	var cvv = document.getElementById("cvv");
    var cvvLbl = document.getElementById("cvvLbl");
	if(cvv.value.length == 0) {
        cvvLbl.style.color = "red";

    } else {
        cvvLbl.style.color = "black";
    }

    //Check that at least 1 activity has been selected
    var activities = document.getElementsByClassName("activity");
    var counter = 0;
    var activityReminder = document.getElementById("activityReminder");
    var lineBreak = document.getElementById("lineBreak");

    for(var i = 0; i < activities.length; i++){
    	if(activities[i].checked === true) {
    		counter++;
    	}
    }

    if(counter < 1){
    	activityReminder.innerHTML = "Please select an Activity";
    	activityReminder.style.color = "red";
    	lineBreak.innerHTML = "<br>";
    	e.preventDefault();
    } if(counter >= 1){
    	activityReminder.innerHTML = "";
    	lineBreak.innerHTML = "";
    }

    //Check that a tshirt has been selected
    var tShirtMenu = document.getElementById('design');
    var tSelection = tShirtMenu.value;
    var tshirtReminder = document.getElementById("tshirtReminder");
    var lineBreak = document.getElementById("lineBreak");

	if(tSelection === "selectTheme"){
    	tshirtReminder.innerHTML = "Don't forget to choose a tshirt";
    	tshirtReminder.style.color = "red";
      lineBreak.innerHTML = "<br>";
    	e.preventDefault();
    } else {
      (counter >= 1)
        tshirtReminder.innerHTML = "";
        lineBreak.innerHTML = "";
      }



  });
 });
