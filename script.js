// Skapa en tom array för att lagra bucket list-aktiviteter
let bucketList = [];

// Funktion för att rendera bucket list i DOM
function renderBucketList() {
    const bucketListsDiv = document.getElementById("bucketLists");
    bucketListsDiv.innerHTML = ""; // Rensa tidigare innehåll

    // Gruppera aktiviteter efter kategori
    const categories = {};
    bucketList.forEach((activity) => {
        if (!categories[activity.category]) {
            categories[activity.category] = [];
        }
        categories[activity.category].push(activity);
    });

    // Skapa listor för varje kategori
    for (let category in categories) {
        const categoryDiv = document.createElement("div");
        categoryDiv.innerHTML = `<h3>${category}</h3>`;
        const ul = document.createElement("ul");

        categories[category].forEach((activity, index) => {
            const li = document.createElement("li");

            // Sätt upp aktivitetens namn
            li.textContent = activity.name;

            // Knapp för att markera som klar/ej klar
            const doneButton = document.createElement("button");
            doneButton.textContent = activity.done ? "✔️" : "✔️";
            doneButton.addEventListener("click", () => {
                activity.done = !activity.done; // Växla status
                renderBucketList(); // Rendera om listan
            });

            // Knapp för att ta bort aktiviteten
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "✘";
            deleteButton.addEventListener("click", () => {
                // Ta bort aktiviteten från arrayen
                const categoryActivities = categories[activity.category];
                const activityIndex = categoryActivities.indexOf(activity);
                if (activityIndex > -1) {
                    categoryActivities.splice(activityIndex, 1); // Ta bort från rätt kategori
                    bucketList = bucketList.filter(item => item !== activity); // Uppdatera huvudlistan
                }
                renderBucketList(); // Rendera om listan
            });

            // Lägg till knapparna till listobjektet
            li.appendChild(doneButton);
            li.appendChild(deleteButton);

            // Lägg till listobjektet i listan
            ul.appendChild(li);
        });

        // Lägg till listan och kategorin till DOM
        categoryDiv.appendChild(ul);
        bucketListsDiv.appendChild(categoryDiv);
    }
}

// Hämta formulärelementet och lägg till en eventlyssnare
const bucketForm = document.getElementById("bucketForm");
bucketForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Förhindra att sidan laddas om

    const activityName = document.getElementById("activityName").value.trim();
    const activityCategory = document.getElementById("activityCategory").value;

    // Kontrollera om namnet är tomt
    if (activityName === "") {
        alert("Du måste ange en aktivitet!");
        return;
    }

    // Lägg till en ny aktivitet i arrayen
    bucketList.push({
        name: activityName,
        category: activityCategory,
        done: false, // Default: ej klar
    });

    bucketForm.reset(); // Rensa formuläret
    renderBucketList(); // Uppdatera listan
});

// Rendera initialt en tom bucket list
renderBucketList();
