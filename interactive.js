"use strict";

/*setting the cursor to focus on the first field*/
$(document).ready( function() {
  $("input:text:visible:first").focus();
 });

/*adding text field to the other selection*/
var jobRoleSelect = document.getElementById('title');

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

/*matching the design with the color*/
var jobRoleSelect = document.getElementById('title');

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

    // Payment Info section of the form. Display payment sections based on chosen payment option
  document.getElementById("payment options").addEventListener("change", function(){
  	var paymentOption = document.getElementById('payment');
  	var paymentSelection = paymentOption.value;
  	var container = document.getElementById('payment-container');

  	// "Credit Card" payment option isselected by default so display of the #credit-card div...
  	// hide the "Paypal" and "Bitcoin information.
  	if(paymentSelection === "credit card") {
  		container.innerHTML = '<div id="credit-card" class="credit-card"><div class="col-6 col"><label for="cc-num" id="cc-numLbl">Card Number:</label><input id="cc-num" name="user_cc-num" type="text"></div><div class="col-3 col"><label for="zip" id="zipLbl">Zip Code:</label><input id="zip" name="user_zip" type="text"></div><div class="col-3 col"><label for="cvv" id="cvvLbl">CVV:</label><input id="cvv" name="user_cvv" type="text"></div><label>Expiration Date:</label><select id="exp-month" name="user_exp-month"><option value="1">1 - January</option><option value="2">2 - February</option><option value="3">3 - March</option><option value="4">4 - April</option><option value="5">5 - May</option><option value="6">6 - June</option><option value="7">7 - July</option><option value="8">8 - August</option><option value="9">9 - September</option><option value="10">10 - October</option><option value="11">11 - November</option><option value="12">12 - December</option></select><select id="exp-year" name="user_exp-year"><option value="2016">2016</option><option value="2017">2017</option><option value="2018">2018</option><option value="2019">2019</option><option value="2020">2020</option></select></div>';

  	} else if(paymentSelection === "paypal") {
  		// If user selects the "PayPal" payment option, display the Paypal information, and hide the credit card + Bitcoin
  		container.innerHTML =  "<div><p>If you selected the PayPal option we'll take you to Paypal's site to set up your billing information, when you click 'Register' below.</p></div>";

  	} else if(paymentSelection === "bitcoin") {
  		/// If user selects the "Bitcoin" payment option, display the Bitcoin information, and hide the credit card + paypal.
  		container.innerHTML = "<div><p>If you selected the Bitcoin option we'll take you to the Coinbase site to set up your billing information. Due to the nature of exchanging Bitcoin, all Bitcoin transactions will be final.</p></div>";
  	}
  });

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
	var ccNum = document.getElementById("cc-num");
    var ccNumLbl = document.getElementById("cc-numLbl");


// takes the form field value and returns true on valid number
function valid_credit_card(value) {
  // accept only digits, dashes or spaces
	if (/[^0-9-\s]+/.test(value)) return false;

	// The Luhn Algorithm. It's so pretty.
	var nCheck = 0, nDigit = 0, bEven = false;
	value = value.replace(/\D/g, "");

	for (var n = value.length - 1; n >= 0; n--) {
		var cDigit = value.charAt(n),
			  nDigit = parseInt(cDigit, 10);

		if (bEven) {
			if ((nDigit *= 2) > 9) nDigit -= 9;
		}

		nCheck += nDigit;
		bEven = !bEven;
	}

	return (nCheck % 10) == 0;
}


	if(!valid_credit_card(ccNum.input)) {
        ccNumLbl.style.color = "red";
        e.preventDefault();
    } else {
        ccNumLbl.style.color = "black";
    }

    //check there's a zip code
	var zip = document.getElementById("zip");
    var zipLbl = document.getElementById("zipLbl");
	if(zip.value.length == 0) {
		e.preventDefault();
        zipLbl.style.color = "red";
    } else {
        zipLbl.style.color = "black";
    }

    //check there's a cvv
	var cvv = document.getElementById("cvv");
    var cvvLbl = document.getElementById("cvvLbl");
	if(cvv.value.length == 0) {
        cvvLbl.style.color = "red";
        e.preventDefault();
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

	if(tSelection === "selectTheme"){
    	tshirtReminder.innerHTML = "Don't forget to choose a tshirt";
    	tshirtReminder.style.color = "red";
    	e.preventDefault();
    } else if (tSelection === "js puns" || tSelection === "heart js") {
    	tshirtReminder.innerHTML = "";
    }
});
