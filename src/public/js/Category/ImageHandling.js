document.addEventListener("DOMContentLoaded", function () {
    const cateNameInput = document.querySelector('input[name="category_name"]');
    const cateImageInput = document.querySelector('input[name="cate_img"]');
    const newImageSection = document.querySelector('.new-image');
    const newImageLabel = document.querySelector('.image-label');

    cateNameInput.addEventListener("blur", function () {
        const inputValue = cateNameInput.value.trim();
        if (inputValue.length < 4 || inputValue.length > 10) {
            cateNameInput.nextElementSibling.textContent = "Brand must be between 4 and 10 characters";
        } else {
            cateNameInput.nextElementSibling.textContent = "";
        }
    });

    function ImageSection() {
        newImageSection.innerHTML = ''; // Clear existing previews
        if (cateImageInput.files && cateImageInput.files.length > 0) {
            for (let i = 0; i < cateImageInput.files.length; i++) {
                const file = cateImageInput.files[i];
                const reader = new FileReader();

                const imagePreview = document.createElement('img');
                imagePreview.style.maxWidth = '100px';

                reader.onload = function (event) {
                    imagePreview.src = event.target.result;
                    newImageLabel.style.display = 'block';
                    newImageSection.appendChild(imagePreview); // Append each image preview
                };
                reader.readAsDataURL(file);
            }
            newImageSection.style.display = 'block'; // Show the new images section
        } else {
            newImageLabel.style.display = 'none';
            newImageSection.style.display = 'none'; // Hide the new images section
        }
    }

    cateImageInput.addEventListener('change', ImageSection);

    ImageSection();
});

