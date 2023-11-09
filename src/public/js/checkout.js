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
        const totalPrice = $(this).data('total');

        const dataToSend = {
            status: 'pending',
            total_price: totalPrice,
            fullName: fullName,
            ship_address: addressCheckout,
            ship_phone: phoneNumber
        };

        $.ajax({
            url: '/order',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(dataToSend),
            success: function (status) {
                if (status === 'success') {
                    Swal.fire({
                        title: "Buy the product successfully. Please wait for confirmation!",
                        icon: "success",
                        confirmButtonText: "OK",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = "/"; // Thay đổi liên kết này bằng liên kết bạn muốn chuyển hướng đến.
                        }
                    });
                }
            },
            error: function (error) {
                console.error('Error:', error);
            }
        });

    })

});