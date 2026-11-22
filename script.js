document.addEventListener("DOMContentLoaded", function () {

    // Getting HTML elements using DOM
    const serviceSearch = document.getElementById("search");
    const categoryFilter = document.getElementById("category");
    const serviceCards = document.querySelectorAll("#serviceCatalog article");
    const noServicesMessage = document.getElementById("noServicesMessage");

    const vehicleSearch = document.getElementById("vehicleSearch");
    const vehicleSelect = document.getElementById("vehicle");
    const noVehiclesMessage = document.getElementById("noVehiclesMessage");

    const bookingForm = document.getElementById("bookingForm");
    const serviceSelect = document.getElementById("service");
    const dateInput = document.getElementById("date");
    const timeInput = document.getElementById("time");

    const formMessage = document.getElementById("formMessage");
    const reviewButton = document.getElementById("reviewButton");
    const confirmButton = document.getElementById("confirmButton");
    const popupMessage = document.getElementById("popupMessage");


    // 1. Service prices
    const prices = {

        "Engine Tuning": {
            Motorcycle: 800,
            Sedan: 2500,
            SUV: 3500,
            Pickup: 5000
        },

        "Oil Change": {
            Motorcycle: 400,
            Sedan: 1200,
            SUV: 1800,
            Pickup: 3000
        },

        "Wash & Polish": {
            Motorcycle: 200,
            Sedan: 800,
            SUV: 1200,
            Pickup: 2000
        },

        "Brake Inspection": {
            Motorcycle: 300,
            Sedan: 1500,
            SUV: 2000,
            Pickup: 2800
        },

        "Battery Repair": {
            Motorcycle: 350,
            Sedan: 1000,
            SUV: 1400,
            Pickup: 2000
        },

        "Tyre Inspection": {
            Motorcycle: 150,
            Sedan: 500,
            SUV: 700,
            Pickup: 1000
        }
    };


    // 2. Set minimum appointment date to today
    const today = new Date();

    const localToday = new Date(
        today.getTime() - today.getTimezoneOffset() * 60000
    ).toISOString().split("T")[0];

    dateInput.min = localToday;


    // 3. Search and filter services
    function filterServices() {

        const searchText = serviceSearch.value.toLowerCase().trim();

        const selectedCategory = categoryFilter.value.toLowerCase();

        let visibleCount = 0;

        serviceCards.forEach(function (card) {

            const cardText = card.textContent.toLowerCase();

            const matchesSearch = cardText.includes(searchText);

            const matchesCategory =
                selectedCategory === "" ||
                cardText.includes("category: " + selectedCategory);

            if (matchesSearch && matchesCategory) {

                card.hidden = false;
                visibleCount++;

            } else {

                card.hidden = true;

            }

        });

        noServicesMessage.hidden = visibleCount !== 0;
    }


    // Run service search when user types
    serviceSearch.addEventListener("input", filterServices);

    // Run category filter when selection changes
    categoryFilter.addEventListener("change", filterServices);


    // 4. Search registered vehicles
    vehicleSearch.addEventListener("input", function () {

        const searchText = vehicleSearch.value.toLowerCase().trim();

        let visibleCount = 0;

        Array.from(vehicleSelect.options).forEach(function (option, index) {

            // Keep the first placeholder option
            if (index === 0) {
                option.hidden = false;
                return;
            }

            const matches = option.textContent.toLowerCase().includes(searchText);

            option.hidden = !matches;

            if (matches) {
                visibleCount++;
            }

        });

        noVehiclesMessage.hidden =
            visibleCount !== 0 || searchText === "";

        // Remove selection if it does not match the search
        const selectedOption =
            vehicleSelect.options[vehicleSelect.selectedIndex];

        if (vehicleSelect.value && selectedOption.hidden) {
            vehicleSelect.value = "";
        }

    });


    // 5. Book Service buttons
    const bookButtons = document.querySelectorAll(".book-service");

    bookButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const selectedService = button.dataset.service;

            serviceSelect.value = selectedService;

            formMessage.textContent =
                selectedService + " selected. Choose your vehicle and appointment details.";

            bookingForm.scrollIntoView({
                behavior: "smooth"
            });

        });

    });


    // 6. Calculate service price
    function getSelectedPrice() {

        const selectedVehicle =
            vehicleSelect.options[vehicleSelect.selectedIndex];

        const vehicleType = selectedVehicle.dataset.type;

        const serviceName = serviceSelect.value;

        if (!vehicleType || !serviceName || !prices[serviceName]) {
            return null;
        }

        return prices[serviceName][vehicleType];
    }


    // 7. Form validation
    
function validateBooking() {

    if (!vehicleSelect.value) {

        alert("Please select your registered vehicle!");

        vehicleSelect.focus();

        return false;
    }

    if (!serviceSelect.value) {

        alert("Please select a service!");

        serviceSelect.focus();

        return false;
    }

    if (!dateInput.value) {

        alert("Please select an appointment date!");

        dateInput.focus();

        return false;
    }

    if (dateInput.value < localToday) {

        alert("Invalid date! Please select today or a future date.");

        dateInput.focus();

        return false;
    }

    if (!timeInput.value) {

        alert("Please select an appointment time!");

        timeInput.focus();

        return false;
    }

    // All fields are valid
    alert("All information is valid! You can review your booking.");

    return true;
}



    // 8. Review Booking button
    reviewButton.addEventListener("click", function () {

        // Check form before showing summary
        if (!validateBooking()) {
            return;
        }

        const selectedVehicleText =
            vehicleSelect.options[vehicleSelect.selectedIndex].textContent;

        const selectedServiceText = serviceSelect.value;

        const price = getSelectedPrice();


        // DOM manipulation: update appointment summary
        document.getElementById("summaryVehicle").textContent =
            "Registered Vehicle: " + selectedVehicleText;

        document.getElementById("summaryService").textContent =
            "Selected Service: " + selectedServiceText;

        document.getElementById("summaryDate").textContent =
            "Appointment Date: " + dateInput.value;

        document.getElementById("summaryTime").textContent =
            "Appointment Time: " + timeInput.value;

        document.getElementById("summaryPrice").textContent =
            "Total Price: ৳" + price.toLocaleString("en-BD");


        // Open popup
        window.location.hash = "bookingPopup";

    });


    // 9. Confirm Booking button
    
confirmButton.addEventListener("click", function () {
    alert("Booking details confirmed.");

    popupMessage.textContent =
        "Booking confirmed! Thank you for choosing AutoCare Services.";

    // Disable the button after confirmation
    confirmButton.disabled = true;
    confirmButton.textContent = "Booking Confirmed";
});



    // 10. Clear Form button
    bookingForm.addEventListener("reset", function () {

        setTimeout(function () {

            // Clear search fields
            vehicleSearch.value = "";
            serviceSearch.value = "";

            // Reset category
            categoryFilter.value = "";

            // Show all vehicle options
            Array.from(vehicleSelect.options).forEach(function (option) {
                option.hidden = false;
            });

            // Show all service cards
            serviceCards.forEach(function (card) {
                card.hidden = false;
            });

            // Hide search messages
            noServicesMessage.hidden = true;
            noVehiclesMessage.hidden = true;

            // Clear validation messages
            formMessage.textContent = "";
            popupMessage.textContent = "";



            confirmButton.disabled = false;
            confirmButton.textContent = "Confirm Booking";

        }, 0);

    });

});
