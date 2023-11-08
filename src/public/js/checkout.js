$(document).ready(function () {

    $("#button-order").click(function () {

        const firstName = $('input[name="firstName"]').val().trim();
        const lastName = $('input[name="lastName"]').val().trim();
        const phoneNumber = $('input[name="phoneNumber"]').val().trim();
        const address = $('input[name="address"]').val().trim();
        const ward = $('input[name="ward"]').val().trim();
        const district = $('input[name="district"]').val().trim();
        const city = $('input[name="city"]').val().trim();

        const fullName = `${firstName} ${lastName}`;
        const addressCheckout = `${address} - ${ward} - ${district} - ${city}`;

        // const dataToSend = { cartIds, actions: "checkout" };
        $.ajax({
            type: 'POST',
            url: '/order',
            contentType: 'application/json',
            // data: JSON.stringify(dataToSend),
            success: function (status) {
                console.log(status);
            },
            error: function (error) {
                console.error('Error:', error);
            }
        });

    })

});