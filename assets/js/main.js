const extensionsGrid = document.querySelector(".extensions-grid");
const filterButtons = document.querySelectorAll(".filter-btn");
let allExtensions = [];
let currentFilter = "all";

async function fetchExtensions() {
  try {
    const response = await fetch("./data.json");
    allExtensions = await response.json();
    // assigning id to every object
    allExtensions.forEach((extension, index) => (extension.id = index));

    renderExtensions();
  } catch (e) {
    extensionsGrid.innerHTML = `<p>An error has occured: ${e.message}`;
  }
}

// single card creation
function createExtension(extensionObj) {
  return `
    <div class="extension" data-id="${extensionObj.id}">
    <div class=extension__content>
    <img class="extension__logo" src="${extensionObj.logo}" alt="${
    extensionObj.name
  } logo">
    <h2 class="extension__title">${extensionObj.name}</h2>
    <p class="extension__description">${extensionObj.description}</p>
    </div>
    <div class="extension__actions">
    <button class="remove-btn">Remove</button>
    <label class="switch-state">
    <input class="state-checkbox" type="checkbox" ${
      extensionObj.isActive ? "checked" : ""
    }>
    <span class="round-slider"></span>
    </label>
    </div>
    </div>
    `;
}
function renderExtensions() {
  //filter
  let filteredExtensions = [];
  if (currentFilter == "all") {
    filteredExtensions = allExtensions;
  } else if (currentFilter == "active") {
    filteredExtensions = allExtensions.filter(
      (extension) => extension.isActive
    );
  } else if (currentFilter == "inactive") {
    filteredExtensions = allExtensions.filter(
      (extension) => !extension.isActive
    );
  }
  extensionsGrid.innerHTML = filteredExtensions
    .map((extension) => createExtension(extension))
    .join("");
}

filterButtons.forEach((filterButton) => {
  filterButton.addEventListener("click", (e) => {
    const clickedButton = e.target;
    if (clickedButton.classList.contains("selected-filter")) {
      return;
    } else if (clickedButton.classList.contains("filter-all")) {
      currentFilter = "all";
    } else if (clickedButton.classList.contains("filter-active")) {
      currentFilter = "active";
    } else if (clickedButton.classList.contains("filter-inactive")) {
      currentFilter = "inactive";
    }

    filterButtons.forEach((filterButton) => {
      if (filterButton != clickedButton)
        filterButton.classList.remove("selected-filter");
      else filterButton.classList.add("selected-filter");
    });

    renderExtensions();
  });
});

extensionsGrid.addEventListener("click", (e) => {
  const target = e.target;
  const currentExtension = e.target.closest(".extension");

  if (!currentExtension) return;

  if (target.classList.contains("remove-btn")) {
    removeExtension(currentExtension);
  }
  if (target.classList.contains("state-checkbox")) {
    allExtensions.forEach((extension) => {
      if (extension.id == parseInt(currentExtension.dataset.id)) {
        extension.isActive = !extension.isActive;
      }
    });
    renderExtensions();
  }
});

function removeExtension(extension) {
  allExtensions = allExtensions.filter(
    (currentExtension) => currentExtension.id != parseInt(extension.dataset.id)
  );
  renderExtensions();
}

fetchExtensions();
