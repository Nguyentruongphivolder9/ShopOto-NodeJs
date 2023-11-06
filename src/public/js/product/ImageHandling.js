    document.addEventListener("DOMContentLoaded",function(){
        const productNameInput = document.querySelector('input[name="product_name"]');
        const productPriceInput = document.querySelector('input[name="price"]');
        const productImageInput = document.querySelector('input[name="image"]');
        const newImageSection = document.querySelector('.new-image');
        const newImageLabel = document.querySelector('.image-label');

        productNameInput.addEventListener("blur",function(){
            const inputValue = productNameInput.value.trim();
            if(inputValue.length < 4 || inputValue.length > 29 ){
                productNameInput.nextElementSibling.textContent = "Name must be between 4 and 29 characters";
            } else {
                productNameInput.nextElementSibling.textContent = "";
            }
        });

        productPriceInput.addEventListener("blur",function(){
            const inputValue = productPriceInput.value;
            if(inputValue < 1000 || inputValue > 1000000){
                productPriceInput.nextElementSibling.textContent = "Price must be higher than 1000$ and lower than 1 millions";
            }else{
                productPriceInput.nextElementSibling.textContent = "";
            }
        });

        function ImageSection() {
            newImageSection.innerHTML = ''; // Clear existing previews
            if (productImageInput.files && productImageInput.files.length > 0) {
                for (let i = 0; i < productImageInput.files.length; i++) {
                    const file = productImageInput.files[i];
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
    
        productImageInput.addEventListener('change', ImageSection);
    
        ImageSection();
    });