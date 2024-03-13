const myForm = document.querySelector('#myform')
const id = document.querySelector('#id')
const password = document.querySelector('#password')
const msg = document.querySelector('.msg')



// Helper function to display messages
function displayMessage(message, className) {
    msg.innerHTML = message;
    msg.classList.add(className);
    setTimeout(() => {
        msg.innerHTML = "";
        msg.classList.remove(className);
    }, 1000);
}

// Helper function to validate ID
function isValidId(id) {
    // Regular expression to match exactly 9 numbers
    const regex = /^[0-9]{9}$/;
    return regex.test(id);
}

// Helper function to validate Password
function isValidPassword(password) {
    // Check if password length is between 8 to 12 chars
    return password.length >= 8 && password.length <= 12;
}

const onSubmit = (e) => {
    e.preventDefault();
    // Check if registration button is clicked
    if (e.submitter.id === 'register-button') {
        // Redirect to the registration page
        window.location.href = '/Registration';
    }
    // Check if any field is empty
    else if (id.value === "" || password.value === "") {
        displayMessage('נא הזן את כל השדות!', 'Error');
    }
    // Check if ID is valid (only numbers and exactly 9 chars)
    else if (!isValidId(id.value)) {
        displayMessage('מספר תעודת זהות חייב להיות 9 ספרות!', 'Error');
    }
    // Check if password is valid (between 8 to 12 chars)
    else if (!isValidPassword(password.value)) {
        displayMessage('סיסמא חייבת להיות בין 8 ל-12 תווים!', 'Error');
    }

    else {
        // Proceed with form submission
        fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: id.value,
                password: password.value
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
    }

}

myForm.addEventListener('submit', onSubmit)