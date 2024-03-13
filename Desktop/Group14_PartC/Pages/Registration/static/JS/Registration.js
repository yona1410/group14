class UserConstructor {
    constructor(gender,id, firstname, surname, city, email, phone, password) {
        this.gender = gender
        this.id = id;
        this.firstname = firstname;
        this.surname = surname;
        this.city = city;
        this.email = email;
        this.phone = phone;
        this.password = password;
    }

}

const RegForm = document.querySelector('#RegForm')
const genderInput = document.querySelector('#gender')
const idInput = document.querySelector('#idz')
const firstnameInput = document.querySelector('#firstname')
const surnnameInput = document.querySelector('#surnname')
const cityInput = document.querySelector('#city')
const emailInput = document.querySelector('#email')
const phoneInput = document.querySelector('#phone')
const passwordInput = document.querySelector('#password')
const registrationButton = document.getElementById('registrationButton');

const inputFields = [
    { input: genderInput, fieldName: 'Gender' },
    { input: firstnameInput, fieldName: 'First Name' },
    { input: surnnameInput, fieldName: 'Surname' },
    { input: passwordInput, fieldName: 'Password' },
    { input: cityInput, fieldName: 'City' },
    { input: emailInput, fieldName: 'Email' },
    { input: phoneInput, fieldName: 'Phone' },
    { input: idInput, fieldName: 'ID' }
];
function containsOnlyLetters(value) {
    // Regular expression to match only letters and spaces
    const regex = /^[A-Za-z\u0590-\u05FF\s]+$/;

    // Test the value against the regular expression
    return regex.test(value);
}
function isValidiEmail(email) {
    // Regular expression to match a valid email address
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Test the email against the regular expression
    return regex.test(email);
}

function validateid(field) {
    const value = field.input.value.trim();

    // Check if the value matches the pattern
    if (!/^\d{9}$/.test(value)) {
        // Add error class to the input field
        field.input.classList.add('error');
        // Set error message

        alert('ID Must Be 9 DIGITS');
        return true;
    } else {
        // Remove error class from the input field
        field.input.classList.remove('error');
        // Clear error message

        // Return false indicating no errors
        return false;
    }
}
function validatename(field) {
    const value = field.input.value.trim();

    // Check if the value matches the pattern
    if (!containsOnlyLetters(value)) {
        // Add error class to the input field
        field.input.classList.add('error');
        // Set error message

        alert('First/Last Names/City Must Contain Only Letters');
        return true;
    } else {
        // Remove error class from the input field
        field.input.classList.remove('error');
        // Clear error message

        // Return false indicating no errors
        return false;
    }
}

function validateemail(field) {
    const value = field.input.value.trim();

    // Check if the value matches the pattern
    if (!isValidiEmail(value)) {
        // Add error class to the input field
        field.input.classList.add('error');
        // Set error message
        alert('Email Must Contain Only Letters and @');
        return true;
    } else {
        // Remove error class from the input field
        field.input.classList.remove('error');
        // Clear error message

        // Return false indicating no errors
        return false;
    }
}
function validatephone(field) {
    const value = field.input.value.trim();
    const numStr = value.toString();
    // Check if the value matches the pattern
    if (!/^\d{10}$/.test(value)) {
        // Add error class to the input field
        field.input.classList.add('error');
        // Set error message

        alert('Phone Must Be Only 10 DIGITS');
        return true;
    }
    else if(!(numStr.charAt(0) === '0')){
        // Add error class to the input field
        field.input.classList.add('error');
        // Set error message

        alert('The first digit in Phone number must be 0');
        return true;
    }
    else {
        // Remove error class from the input field
        field.input.classList.remove('error');
        // Clear error message

        // Return false indicating no errors
        return false;
    }
}

function validatePassword(field) {
    const value = field.input.value.trim();

    // Regular expression to match passwords containing only English letters and at least one digit
    const regex = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;

    // Check if the value matches the pattern
    if (!regex.test(value)) {
        // Add error class to the input field
        field.input.classList.add('error');
        // Set error message
        alert('Password must contain at least 8 characters, including at least one letter and one digit');
        return true;
    } else {
        // Remove error class from the input field
        field.input.classList.remove('error');
        // Clear error message
        // Return false indicating no errors
        return false;
    }
}
function isIdField(field) {
    return field.fieldName === 'ID';
}
function isfirstnameField(field) {
    return field.fieldName === 'First Name';
}
function islastnameField(field) {
    return field.fieldName === 'Surname';
}
function isemailField(field) {
    return field.fieldName === 'Email';
}
function iscityField(field) {
    return field.fieldName === 'City';
}
function isphoneField(field) {
    return field.fieldName === 'Phone';
}
function ispasswordField(field) {
    return field.fieldName === 'Password';
}

// Add a click event listener to the button
RegForm.addEventListener('submit', function() {
     event.preventDefault();
    const idField = inputFields.find(field => field.fieldName === 'ID');

    // Get the value of the "ID" field
    const idValue = idField.input.value.trim();
    let hasErrors = false;

    inputFields.forEach(field => {
        if (field.input.value === "") {
            field.input.classList.add('error');
            hasErrors = true;
            console.log(`${field.fieldName} is required.`);
        }
        else if (isIdField(field)){ //checks valid ID
            if(validateid(field)){
                hasErrors=true;
            }
        }
        else if (isfirstnameField(field)){ //checks valid firs name
            if(validatename(field)){
                hasErrors=true;
            }
        }
        else if (islastnameField(field)){ //checks valid last name
            if(validatename(field)){
                hasErrors=true;
            }
        }
        else if (isemailField(field)){ //checks valid email
            if(validateemail(field)){
                hasErrors=true;
            }
        }
        else if (iscityField(field)){ //checks valid email
            if(validatename(field)){
                hasErrors=true;
            }
        }
        else if (isphoneField(field)){ //checks valid email
            if(validatephone(field)){
                hasErrors=true;
            }
        }
        else if (ispasswordField(field)){ //checks valid email
            if(validatePassword(field)){
                hasErrors=true;
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
         console.log('Button clicked!');

         const newUserConstructor = new UserConstructor(
             genderInput.value,
             idInput.value,
             firstnameInput.value,
             surnnameInput.value,
             cityInput.value,
             emailInput.value,
             phoneInput.value,
             passwordInput.value
         );
         console.log('Button clicked!');
         console.log(newUserConstructor);
         
        // Send the newUser object to the Flask server
        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUserConstructor),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if(data.success) {
                console.log('Registration successful:', data);
                window.location.href = data.redirect; // Use the redirect URL from the server response
            } else {
                    console.error('Registration failed:', data);
                    // Show error message to the user
                    alert('ID or Email already exists!')
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });

         RegForm.reset();
     }

});