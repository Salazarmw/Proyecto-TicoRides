// Array of car brands
const carBrands = [
    { code: "TOY", name: "Toyota" },
    { code: "HON", name: "Honda" },
    { code: "FOR", name: "Ford" },
    { code: "CHE", name: "Chevrolet" },
    { code: "BMW", name: "BMW" },
    { code: "MER", name: "Mercedes-Benz" },
    { code: "AUD", name: "Audi" },
    { code: "VOL", name: "Volkswagen" },
    { code: "HYU", name: "Hyundai" },
    { code: "TES", name: "Tesla" },
    { code: "NIS", name: "Nissan" },
    { code: "SUB", name: "Subaru" },
    { code: "KIA", name: "Kia" },
    { code: "MAZ", name: "Mazda" },
    { code: "JAG", name: "Jaguar" },
    { code: "LEX", name: "Lexus" },
    { code: "INFI", name: "Infiniti" },
    { code: "POR", name: "Porsche" },
    { code: "LAN", name: "Land Rover" },
    { code: "MIT", name: "Mitsubishi" }
];

// Function to fill the select with the car brands
function fillCarBrandsSelect() {
    const datalistCarBrands = document.getElementById('car-brands');
    const selectCarBrand = document.getElementById('car-brand');
    const selectEditCarBrand = document.getElementById('edit-car-brand');
    
    carBrands.forEach(brand => {
        let option = document.createElement('option');
        option.value = brand.code; // Brand code
        option.textContent = brand.name; // Brand name
        if (datalistCarBrands) {
            datalistCarBrands.appendChild(option);
        }
        if (selectCarBrand) {
            selectCarBrand.appendChild(option);
        }
        if (selectEditCarBrand) {
            selectEditCarBrand.appendChild(option);
        }
    });
}

// Call the function to populate the select when the page loads
fillCarBrandsSelect();
