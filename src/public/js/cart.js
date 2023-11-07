$(document).ready(function () {
    // add to cart
    $('#addToCart').click(function () {
        const id = $(this).data('id');
        $.ajax({
            url: `/cart/${id}`,
            method: "POST"
        }).done(function (status) {
            if (status == "success") {
                Swal.fire({
                    icon: 'success',
                    title: 'Add To Cart Success',
                    timer: 2000,
                    showConfirmButton: false
                });
            }

        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus + ': ' + errorThrown);
        })
    })
})