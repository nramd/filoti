document.addEventListener("DOMContentLoaded", function () {
    
    const reportType = document.getElementById("report-type");
    const itemLabel = document.getElementById("item-label");
    const itemName = document.getElementById("item-name");
    const fileUpload = document.getElementById("file-upload");
    const fileInput = document.getElementById("file-input");
    const filePreview = document.getElementById("file-preview");

    reportType.addEventListener("change", function () {
        if (this.value === "lost") {
            itemLabel.textContent = "What did you lose?";
        } else if (this.value === "found") {
            itemLabel.textContent = "What you found?";
        }
    });

    fileUpload.addEventListener("click", () => fileInput.click());
    fileUpload.addEventListener("dragover", (e) => { e.preventDefault(); fileUpload.classList.add("dragover"); });
    fileUpload.addEventListener("dragleave", (e) => { e.preventDefault(); fileUpload.classList.remove("dragover"); });
    fileUpload.addEventListener("drop", (e) => {
        e.preventDefault();
        fileUpload.classList.remove("dragover");
        handleFiles(e.dataTransfer.files);
    });
    fileInput.addEventListener("change", (e) => handleFiles(e.target.files));

    let uploadedFiles = [];
    function handleFiles(files) {
        uploadedFiles = Array.from(files);
        filePreview.innerHTML = "";
        filePreview.classList.remove("hidden");
        uploadedFiles.forEach((file, index) => {
            if (file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const div = document.createElement("div");
                    div.className = "relative group";
                    div.innerHTML = `
                        <img src="${e.target.result}" alt="Preview" class="w-full h-24 object-cover rounded-lg">
                        <button type="button" data-index="${index}" class="remove-file-btn absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600">×</button>
                    `;
                    filePreview.appendChild(div);
                };
                reader.readAsDataURL(file);
            }
        });
    }

    filePreview.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-file-btn')) {
            const indexToRemove = parseInt(e.target.dataset.index, 10);
            uploadedFiles.splice(indexToRemove, 1);
            handleFiles(uploadedFiles); 
        }
    });

    document.getElementById("report-form").addEventListener("submit", (e) => {
        e.preventDefault(); 

        const reportTypeValue = reportType.value;
        const itemNameValue = itemName.value.trim();
        const descriptionValue = document.getElementById("item-description").value.trim();
        const locationValue = document.getElementById("location").value.trim();

        if (!reportTypeValue || !itemNameValue || !descriptionValue || !locationValue) {
            alert("Please fill all required fields.");
            return;
        }

        const isLostItem = reportTypeValue === 'lost';
        const storageKey = isLostItem ? 'lostItems' : 'foundItems';
        const defaultItems = isLostItem ? (typeof lostItems !== 'undefined' ? lostItems : []) : (typeof foundItems !== 'undefined' ? foundItems : []);

        // Buat objek item baru
        const newItem = {
            id: Date.now(), // ID unik berdasarkan timestamp
            name: "User Name",
            initials: "US",
            avatarColor: isLostItem ? "bg-red-500" : "bg-green-500",
            timeAgo: "Baru saja",
            location: locationValue,
            title: itemNameValue,
            itemType: isLostItem ? "Lost Item" : "Found Item",
            miniDescription: descriptionValue.substring(0, 50) + '...',
            description: descriptionValue,
            image: uploadedFiles.length > 0 ? URL.createObjectURL(uploadedFiles[0]) : "https://placehold.co/600x400?text=No+Image",
            detailsLink: isLostItem ? "lost_item_details.html" : "find_item_details.html", 
            hasDetailsLink: true,
        };

        // Menyimpan data baru ke localStorage
        const currentItems = loadItems(storageKey, defaultItems);
        currentItems.unshift(newItem); // Menambahkan item baru di paling atas
        saveItems(storageKey, currentItems);

        // Memberikan notifikasi dan mengarahkan user
        alert("Report submitted successfully!");
        window.location.href = isLostItem ? 'lost_item.html' : 'find_item.html';
    });

    if (typeof NavbarLoader !== 'undefined') {
        const loader = new NavbarLoader({
            navbarPath: "../components/navbar.html",
            onLoad: () => {
                if (typeof FilotiNavbar !== "undefined") new FilotiNavbar();
            }
        });
        loader.loadNavbar();
    }
});