 $(function() {
  $("#startDatePicker").datepicker({
    dateFormat: "dd/mm/yy", // Adjust date format as needed
    minDate: 0, // Set minimum date to today
    onSelect: function(selectedDate) {
      $("#startDate").val(selectedDate); // Update hidden input value with selected date
      $("#endDatePicker").datepicker("option", "minDate", selectedDate); // Set minimum date for end date selection based on start date
    }
  });

  $("#endDatePicker").datepicker({
    dateFormat: "dd/mm/yy", // Adjust date format as needed
    minDate: 0, // Set minimum date to today
    onSelect: function(selectedDate) {
      $("#endDate").val(selectedDate); // Update hidden input value with selected date
    }
  });
});

const searchingform = document.querySelector('#searchingform')
const placeInput = document.querySelector('#place')
const KosherInput = document.querySelector('#Kosher')
const animalInput = document.querySelector('#animal')
const ElevatorInput = document.querySelector('#Elevator')
const ParkingInput = document.querySelector('#Parking')
const GuestsInput = document.querySelector('#Guests')
const startDateInput = document.querySelector('#startDate')
const endDateInput = document.querySelector('#endDate')
const searchingbutton = document.getElementById('searchingbutton');


function containsOnlyLetters(value) {
    // Regular expression to match only letters and spaces
    const regex = /^[A-Za-z\u0590-\u05FF\s]+$/;

    // Test the value against the regular expression
    return regex.test(value);
}

const inputFields = [
    { input: placeInput, fieldName: 'place' },
    { input: KosherInput, fieldName: 'Kosher' },
    { input: animalInput, fieldName: 'animal' },
    { input: ElevatorInput, fieldName: 'Elevator' },
    { input: ParkingInput, fieldName: 'Parking' },
    { input: GuestsInput, fieldName: 'Guests' },
    { input: startDateInput, fieldName: 'startDate' },
    { input: endDateInput, fieldName: 'endDate' },
];
function isplaceField(field) {
    return field.fieldName === 'place';
}
function isparkingField(field) {
    return field.fieldName === 'Parking';
}
function isguestsnameField(field) {
    return field.fieldName === 'Guests';
}
function isstartdateField(field) {
    return field.fieldName === 'startDate';
}
function isenddateField(field) {
    return field.fieldName === 'endDate';
}
function validateplace(field) {
    const value = field.input.value.trim();

    // Check if the value matches the pattern
    if (!containsOnlyLetters(value)) {
        // Add error class to the input field
        field.input.classList.add('error');
        // Set error message

        alert('City Must Contain Only Letters');
        return true;
    } else {
        // Remove error class from the input field
        field.input.classList.remove('error');
        // Clear error message

        // Return false indicating no errors
        return false;
    }
}
// Add a click event listener to the button
searchingform.addEventListener('submit', function() {
     event.preventDefault();
    let hasErrors = false;

    inputFields.forEach(field => {
        if (field.input.value === "") {
            if(isenddateField(field)||
            isstartdateField(field)||
            isplaceField(field)||
            isparkingField(field)||
            isguestsnameField(field)){
                field.input.classList.add('error');
                hasErrors = true;
                console.log(`${field.fieldName} is required.`);
                if(isenddateField(field)||isstartdateField(field)){
                    alert("Must insert dates before submit");
                }
                else if(isplaceField(field)){
                    alert("Must insert location before submit");
                }
                else if(isparkingField(field)){
                    alert("Please insert needed park places");
                }
                else{
                    alert("Please insert number of guests")
                }
            }
        }
        else if (isplaceField(field)) {
            if (validateplace(field)) {
                hasErrors = true;
            }
        }
        else {
            field.input.classList.remove('error');
        }
    });
    if (hasErrors) {
        console.log(' errors');
    }

    else {
        console.log(KosherInput.value);
        console.log(animalInput.value);
        console.log(ElevatorInput.value);
        fetch('/search', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                place: placeInput.value,
                Kosher: KosherInput.checked ? 'on' : 'off', // Explicitly set value based on checkbox state
                animal: animalInput.checked ? 'on' : 'off', // Explicitly set value based on checkbox state
                Elevator: ElevatorInput.checked ? 'on' : 'off', // Explicitly set value based on checkbox state
                Parking: ParkingInput.value,
                Guests: GuestsInput.value,
                startdate: startDateInput.value,
                enddate: endDateInput.value
            })
        })
        .then(response => {
            if (response.redirected) {
                window.location.href = response.url;
            }
            // Handle other responses as needed
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle error as needed
        });
        console.log('Button clicked!');
        searchingform.reset();
    }

});