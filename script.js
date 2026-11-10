
// =====================================
// SAMPLE ANIMAL-CARE PROVIDERS
// These are fictional listings for the prototype.
// =====================================

const providers = [
    {
        name: "Happy Paws Veterinary Clinic",
        category: "Veterinary Clinic",
        location: "Mysuru",
        address: "Vijayanagar, Mysuru",
        rating: 4.8,
        reviews: 124,
        open: true,
        image: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=700",
        description: "General checkups and pet healthcare."
    },
    {
        name: "PetLife Animal Hospital",
        category: "Animal Hospital",
        location: "Mysuru",
        address: "Saraswathipuram, Mysuru",
        rating: 4.6,
        reviews: 98,
        open: true,
        image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=700",
        description: "Advanced veterinary care and treatment."
    },
    {
        name: "Pawsome Pet Boarding",
        category: "Pet Boarding",
        location: "Bengaluru",
        address: "Whitefield, Bengaluru",
        rating: 4.5,
        reviews: 76,
        open: true,
        image: "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=700",
        description: "Comfortable boarding and pet care."
    },
    {
        name: "Animal Diagnostics Centre",
        category: "Diagnostics",
        location: "Mysuru",
        address: "Kuvempunagar, Mysuru",
        rating: 4.7,
        reviews: 85,
        open: false,
        image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=700",
        description: "Animal testing and diagnostic services."
    },
    {
        name: "Pet Rescue Ambulance",
        category: "Animal Ambulance",
        location: "Bengaluru",
        address: "Indiranagar, Bengaluru",
        rating: 4.9,
        reviews: 112,
        open: true,
        image: "https://images.unsplash.com/photo-1551717743-49959800b1f6?w=700",
        description: "Emergency animal transportation."
    },
    {
        name: "Helping Paws Foundation",
        category: "NGO",
        location: "Mysuru",
        address: "Nazarbad, Mysuru",
        rating: 4.8,
        reviews: 64,
        open: false,
        image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=700",
        description: "Animal rescue and welfare support."
    }
];


// =====================================
// GET HTML ELEMENTS
// =====================================

const providerGrid = document.getElementById("providerGrid");
const resultCount = document.getElementById("resultCount");
const noResults = document.getElementById("noResults");

const searchForm = document.getElementById("searchForm");
const locationInput = document.getElementById("location");
const serviceSearch = document.getElementById("serviceSearch");

const categoryFilter = document.getElementById("categoryFilter");
const ratingFilter = document.getElementById("ratingFilter");
const openFilter = document.getElementById("openFilter");
const sortFilter = document.getElementById("sortFilter");


// =====================================
// DISPLAY PROVIDER CARDS
// =====================================

function displayProviders(providerList) {

    providerGrid.innerHTML = "";

    resultCount.textContent =
        `Showing ${providerList.length} provider${providerList.length !== 1 ? "s" : ""}`;

    noResults.hidden = providerList.length !== 0;

    providerList.forEach(provider => {

        const card = document.createElement("article");

        card.className = "provider-card";

        const locationQuery = encodeURIComponent(
            provider.name + " " + provider.address
        );

        card.innerHTML = `
            <img
                src="${provider.image}"
                alt="${provider.name}"
                loading="lazy"
            >

            <div class="provider-info">

                <p class="provider-type">
                    ${provider.category}
                </p>

                <h3>${provider.name}</h3>

                <p class="provider-location">
                    📍 ${provider.address}
                </p>

                <div class="provider-meta">

                    <span class="provider-rating">
                        ★ ${provider.rating}
                        <span style="color:#8a9691">
                            (${provider.reviews} reviews)
                        </span>
                    </span>

                    <span class="provider-status ${provider.open ? "" : "closed"}">
                        ${provider.open ? "Open now" : "Closed"}
                    </span>

                </div>

                <p class="provider-location">
                    ${provider.description}
                </p>

                <div class="provider-actions">

                    <a
                        href="https://www.google.com/maps/search/?api=1&query=${locationQuery}"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Directions
                    </a>

                   <a href="#" class="enquire-button"
   data-provider-index="${providers.indexOf(provider)}">
    Enquire
</a>

                </div>

            </div>
        `;

        providerGrid.appendChild(card);
    });
}


// =====================================
// SEARCH AND FILTER PROVIDERS
// =====================================

function filterProviders() {

    const location = locationInput.value.trim().toLowerCase();

    const category = categoryFilter.value;

    const rating = Number(ratingFilter.value);

    const onlyOpen = openFilter.checked;

    const sortBy = sortFilter.value;

    let filteredProviders = providers.filter(provider => {

        const matchesLocation =
            !location ||
            provider.location.toLowerCase().includes(location) ||
            provider.address.toLowerCase().includes(location);

        const matchesCategory =
            !category || provider.category === category;

        const matchesRating =
            !rating || provider.rating >= rating;

        const matchesOpen =
            !onlyOpen || provider.open;

        return (
            matchesLocation &&
            matchesCategory &&
            matchesRating &&
            matchesOpen
        );
    });

    // Sort providers by rating
    if (sortBy === "rating") {

        filteredProviders.sort((a, b) => b.rating - a.rating);

    }

    displayProviders(filteredProviders);
}


// =====================================
// SEARCH FORM
// =====================================

searchForm.addEventListener("submit", function(event) {

    event.preventDefault();

    categoryFilter.value = serviceSearch.value;

    filterProviders();

    document.getElementById("providers").scrollIntoView({
        behavior: "smooth"
    });

});


// =====================================
// FILTER EVENT LISTENERS
// =====================================

categoryFilter.addEventListener("change", filterProviders);

ratingFilter.addEventListener("change", filterProviders);

openFilter.addEventListener("change", filterProviders);

sortFilter.addEventListener("change", filterProviders);


// =====================================
// SERVICE CARD CLICK
// =====================================

const serviceCards = document.querySelectorAll(".service-card");

serviceCards.forEach(card => {

    card.addEventListener("click", function() {

        const selectedService = this.dataset.service;

        categoryFilter.value = selectedService;

        serviceSearch.value = selectedService;

        filterProviders();

    });

});


// =====================================
// MOBILE NAVIGATION
// =====================================

const menuToggle = document.getElementById("menuToggle");

const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", function() {

    navLinks.classList.toggle("active");

});


// Close menu after clicking a navigation link

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", function() {

        navLinks.classList.remove("active");

    });

});


// =====================================
// LIST YOUR BUSINESS - POPUP FORM
// =====================================

const modalOverlay = document.getElementById("modalOverlay");
const modalContent = document.getElementById("modalContent");
const modalClose = document.getElementById("modalClose");

const navListBusinessBtn = document.getElementById("navListBusinessBtn");
const listBusinessBtn = document.getElementById("listBusinessBtn");

// Open the popup
function openBusinessForm() {

    modalContent.innerHTML = `
        <h2 id="modalTitle">List Your Business</h2>

        <p class="modal-description">
            Register your animal-care business and help pet owners discover your services.
        </p>

        <form class="modal-form" id="businessForm">

            <label>
                Business Name
                <input type="text" name="businessName"
                    placeholder="Enter business name" required>
            </label>

            <label>
                Business Category
                <select name="category" required>
                    <option value="">Select category</option>
                    <option>Veterinary Clinic</option>
                    <option>Animal Hospital</option>
                    <option>Pet Boarding</option>
                    <option>Diagnostics</option>
                    <option>Animal Ambulance</option>
                    <option>NGO</option>
                </select>
            </label>

            <label>
                City / Location
                <input type="text" name="location"
                    placeholder="Enter your city" required>
            </label>

            <label>
                Contact Number
                <input type="tel" name="phone"
                    placeholder="Enter contact number" required>
            </label>

            <label>
                Email Address
                <input type="email" name="email"
                    placeholder="Enter email address" required>
            </label>

            <label>
                Business Description
                <textarea name="description"
                    placeholder="Describe your services" required></textarea>
            </label>

            <button type="submit" class="modal-submit">
                Submit Business Details
            </button>

        </form>
    `;

    modalOverlay.classList.add("active");
    modalOverlay.setAttribute("aria-hidden", "false");
}

// Connect both List Your Business buttons
if (navListBusinessBtn) {
    navListBusinessBtn.addEventListener("click", openBusinessForm);
}

if (listBusinessBtn) {
    listBusinessBtn.addEventListener("click", openBusinessForm);
}

// Close popup
function closeModal() {
    modalOverlay.classList.remove("active");
    modalOverlay.setAttribute("aria-hidden", "true");
}

if (modalClose) {
    modalClose.addEventListener("click", closeModal);
}

// Close when clicking outside the popup
if (modalOverlay) {
    modalOverlay.addEventListener("click", function(event) {
        if (event.target === modalOverlay) {
            closeModal();
        }
    });
}

// Close popup using Escape key
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape" && modalOverlay.classList.contains("active")) {
        closeModal();
    }
});

// Handle business form submission
if (modalContent) {
    modalContent.addEventListener("submit", function(event) {

        if (event.target.id !== "businessForm") return;

        event.preventDefault();

        const formData = new FormData(event.target);

        const businessDetails = Object.fromEntries(formData.entries());

        // Save details in browser storage
        let savedBusinesses = [];

        try {
            savedBusinesses = JSON.parse(
                localStorage.getItem("animalBusinessSubmissions") || "[]"
            );
        } catch (error) {
            savedBusinesses = [];
        }

        savedBusinesses.push({
            ...businessDetails,
            submittedAt: new Date().toISOString()
        });

        try {
            localStorage.setItem(
                "animalBusinessSubmissions",
                JSON.stringify(savedBusinesses)
            );

            modalContent.innerHTML = `
                <h2 id="modalTitle">Thank You!</h2>

                <div class="modal-success">
                    Your business details have been saved successfully.
                    Thank you for registering with Practo for Animals!
                </div>

                <button type="button"
                    class="modal-submit"
                    id="successClose"
                    style="width:100%; margin-top:20px;">
                    Close
                </button>
            `;

            document.getElementById("successClose")
                .addEventListener("click", closeModal);

        } catch (error) {
            alert("Unable to save your details. Please try again.");
        }

    });
}

// =====================================
// SUBMIT A CORRECTION - POPUP FORM
// =====================================

const correctionBtn = document.getElementById("correctionBtn");

function openCorrectionForm() {

    modalContent.innerHTML = `
        <h2 id="modalTitle">Submit a Correction</h2>

        <p class="modal-description">
            Help us keep our animal-care provider information accurate.
            Tell us what needs to be corrected.
        </p>

        <form class="modal-form" id="correctionForm">

            <label>
                Provider Name
                <input
                    type="text"
                    name="providerName"
                    placeholder="Enter provider name"
                    required
                >
            </label>

            <label>
                City / Location
                <input
                    type="text"
                    name="location"
                    placeholder="Enter city or area"
                    required
                >
            </label>

            <label>
                What needs to be corrected?
                <select name="correctionType" required>
                    <option value="">Select an issue</option>
                    <option>Incorrect business name</option>
                    <option>Incorrect address</option>
                    <option>Incorrect contact information</option>
                    <option>Incorrect business category</option>
                    <option>Business is permanently closed</option>
                    <option>Other</option>
                </select>
            </label>

            <label>
                Correction Details
                <textarea
                    name="details"
                    placeholder="Describe the correct information..."
                    required
                ></textarea>
            </label>

            <label>
                Your Email Address
                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                >
            </label>

            <button type="submit" class="modal-submit">
                Submit Correction
            </button>

        </form>
    `;

    modalOverlay.classList.add("active");
    modalOverlay.setAttribute("aria-hidden", "false");
}

// Open correction popup
if (correctionBtn) {
    correctionBtn.addEventListener("click", openCorrectionForm);
}

// Handle correction form submission
modalContent.addEventListener("submit", function(event) {

    if (event.target.id !== "correctionForm") return;

    event.preventDefault();

    const formData = new FormData(event.target);

    const correctionDetails = Object.fromEntries(formData.entries());

    let savedCorrections = [];

    try {
        savedCorrections = JSON.parse(
            localStorage.getItem("animalCorrectionSubmissions") || "[]"
        );
    } catch (error) {
        savedCorrections = [];
    }

    savedCorrections.push({
        ...correctionDetails,
        submittedAt: new Date().toISOString()
    });

    try {

        localStorage.setItem(
            "animalCorrectionSubmissions",
            JSON.stringify(savedCorrections)
        );

        modalContent.innerHTML = `
            <h2 id="modalTitle">Thank You!</h2>

            <div class="modal-success">
                Your correction has been saved successfully.
                Thank you for helping us improve our information!
            </div>

            <button
                type="button"
                class="modal-submit"
                id="correctionSuccessClose"
                style="width:100%; margin-top:20px;"
            >
                Close
            </button>
        `;

        document.getElementById("correctionSuccessClose")
            .addEventListener("click", closeModal);

    } catch (error) {
        alert("Unable to save your correction. Please try again.");
    }

});




// =====================================
// PROVIDER ENQUIRY FORM
// =====================================

// Open enquiry popup
providerGrid.addEventListener("click", function(event) {

    const enquireButton = event.target.closest(".enquire-button");

    if (!enquireButton) return;

    event.preventDefault();

    const providerIndex = Number(enquireButton.dataset.providerIndex);
    const provider = providers[providerIndex];

    if (!provider) return;

    modalContent.innerHTML = `
        <h2 id="modalTitle">Enquire Now</h2>

        <p class="modal-description">
            Send an enquiry to ${provider.name}.
            Fill in your details below.
        </p>

        <form class="modal-form" id="enquiryForm">

            <input type="hidden" name="providerName"
                value="${provider.name}">

            <label>
                Your Name
                <input type="text" name="name"
                    placeholder="Enter your name" required>
            </label>

            <label>
                Email Address
                <input type="email" name="email"
                    placeholder="Enter your email" required>
            </label>

            <label>
                Contact Number
                <input type="tel" name="phone"
                    placeholder="Enter your phone number" required>
            </label>

            <label>
                Your Message
                <textarea name="message"
                    placeholder="Write your enquiry here..."
                    required></textarea>
            </label>

            <button type="submit" class="modal-submit">
                Send Enquiry
            </button>

        </form>
    `;

    modalOverlay.classList.add("active");
    modalOverlay.setAttribute("aria-hidden", "false");

});


// Save enquiry form details
modalContent.addEventListener("submit", function(event) {

    if (event.target.id !== "enquiryForm") return;

    event.preventDefault();

    const formData = new FormData(event.target);
    const enquiryDetails = Object.fromEntries(formData.entries());

    let savedEnquiries = [];

    try {
        savedEnquiries = JSON.parse(
            localStorage.getItem("animalEnquiries") || "[]"
        );
    } catch (error) {
        savedEnquiries = [];
    }

    savedEnquiries.push({
        ...enquiryDetails,
        submittedAt: new Date().toISOString()
    });

    try {

        localStorage.setItem(
            "animalEnquiries",
            JSON.stringify(savedEnquiries)
        );

        modalContent.innerHTML = `
            <h2 id="modalTitle">Enquiry Submitted!</h2>

            <div class="modal-success">
                Thank you for your enquiry!
                Your details have been saved successfully.
            </div>

            <button type="button"
                class="modal-submit"
                id="enquirySuccessClose"
                style="width:100%; margin-top:20px;">
                Close
            </button>
        `;

        document.getElementById("enquirySuccessClose")
            .addEventListener("click", closeModal);

    } catch (error) {
        alert("Unable to save your enquiry. Please try again.");
    }

});


// =====================================
// INITIAL DISPLAY
// =====================================

displayProviders(providers);
