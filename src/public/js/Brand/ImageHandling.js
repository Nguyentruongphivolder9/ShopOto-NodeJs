 document.addEventListener("DOMContentLoaded", function () {
        const brandNameInput = document.querySelector('input[name="brand_name"]');
        const brandImageInput = document.querySelector('input[name="brand_img"]');
        const newImageSection = document.querySelector('.new-image');
        const newImageLabel = document.querySelector('.image-label');

        brandNameInput.addEventListener("blur", function () {
            const inputValue = brandNameInput.value.trim();
            if (inputValue.length < 4 || inputValue.length > 10) {
                brandNameInput.nextElementSibling.textContent = "Brand must be between 4 and 10 characters";
            } else {
                brandNameInput.nextElementSibling.textContent = "";
            }
        });

        function ImageSection() {
            newImageSection.innerHTML = ''; // Clear existing previews
            if (brandImageInput.files && brandImageInput.files.length > 0) {
                for (let i = 0; i < brandImageInput.files.length; i++) {
                    const file = brandImageInput.files[i];
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

        brandImageInput.addEventListener('change', ImageSection);

        ImageSection();
    });

