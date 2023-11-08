$(document).ready(function (e) {
    var checkboxAll = $('#checkbox-all');
    var courseItemCheckbox = $('input[name="cartIds[]"]');
    var btnCheckedDelete = $('.btn-checked-delete');
    var btnCheckout = $('#proceedToCheckout');
    var addToCart = $('.addToCart');
    var deleteCart = $('.deleteCart');

    // add to cart
    addToCart.click(function () {
        const id = $(this).data('id');
        $.ajax({
            url: `/cart/add`,
            method: "POST",
            data: { id: id, quantity: 1 }
        }).done(function (status) {
            messages(status);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus + ': ' + errorThrown);
        })
    })

    function messages(messages) {
        switch (messages) {
            case "success":
                Swal.fire({
                    icon: 'success',
                    title: 'Add To Cart Success',
                    timer: 2000,
                    showConfirmButton: false
                });
                break;
            case "error":
                Swal.fire({
                    icon: 'error',
                    title: 'Add To Cart Success',
                    timer: 2000,
                    showConfirmButton: false
                });
                break;
            default:
                break;
        }
    }

    checkboxAll.change(function () {
        var isCheckedAll = $(this).prop('checked');
        courseItemCheckbox.prop('checked', isCheckedAll);
        renderCheckAllSubmitBtn();
    });

    courseItemCheckbox.change(function () {
        var isCheckedAll = courseItemCheckbox.length === $('input[name="cartIds[]"]:checked').length;
        checkboxAll.prop('checked', isCheckedAll);
        renderCheckAllSubmitBtn();
    })

    function renderCheckAllSubmitBtn() {
        var checkedCount = $('input[name="cartIds[]"]:checked').length;
        if (checkedCount > 0) {
            btnCheckedAll.attr('disabled', false);
            btnCheckout.attr('disabled', false);
        } else {
            btnCheckedAll.attr('disabled', true);
            btnCheckout.attr('disabled', true);
        }
    }

    btnCheckedAll.on('click', function () {
        if (!$(this).prop('disabled')) {
            const inputElements = $('input[name="cartIds[]"]:checked');
            const cartIds = [];

            inputElements.each(function () {
                cartIds.push($(this).val());
            });

            const dataToSend = { cartIds, actions: "delete" };

            $.ajax({
                type: 'POST',
                url: '/cart/handle-form-action',
                contentType: 'application/json',
                data: JSON.stringify(dataToSend),
                success: function (status) {
                    messages(status);
                },
                error: function (error) {
                    console.error('Error:', error);
                }
            });
        }
    });

    btnCheckout.on('click', function () {
        if (!$(this).prop('disabled')) {
            const inputElements = $('input[name="cartIds[]"]:checked');
            const cartIds = [];

            inputElements.each(function () {
                cartIds.push($(this).val());
            });

            const dataToSend = { cartIds, actions: "checkout" };
            $.ajax({
                type: 'POST',
                url: '/cart/handle-form-action',
                contentType: 'application/json',
                data: JSON.stringify(dataToSend),
                success: function (status) {
                    console.log(status);
                    if (status === "oke") {

                        window.location.href = "/checkout";
                    }
                },
                error: function (error) {
                    console.error('Error:', error);
                }
            });



        }
    });


})