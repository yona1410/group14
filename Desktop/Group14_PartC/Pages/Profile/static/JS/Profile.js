function cancelBooking(booking_id) {
    fetch(`/cancel_now/${booking_id}`, {
        method: 'POST'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to cancel booking');
        }
        // Handle success (e.g., reload the page)
        location.reload();
    })
    .catch(error => {
        console.error('Error cancelling booking:', error);
        // Handle error (e.g., display an error message)
    });
}

function updateBooking(booking_id) {
    fetch(`/update_now/${booking_id}`, {
        method: 'POST'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to update booking');
        }
        // Handle success (e.g., reload the page)
        location.reload();
    })
    .catch(error => {
        console.error('Error updating booking:', error);
        // Handle error (e.g., display an error message)
    });
}

document.querySelectorAll('.btn-edit').forEach(function(button) {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        var booking_id = button.getAttribute('booking_id');
        updateBooking(booking_id);
    })});

document.querySelectorAll('.btn-cancel').forEach(function(button) {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        var booking_id = button.getAttribute('booking_id');
        cancelBooking(booking_id);
    })});
