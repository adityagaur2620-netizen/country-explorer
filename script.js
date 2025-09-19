
let countries = [];
let filteredCountries = [];
const itemsPerPage = 6; 
let currentPage = 1;
let totalPages = 6;
async function fetchCountries() {
  try {
    const response = await fetch("https://api.allorigins.win/raw?url=https://www.apicountries.com/countries");
    const data = await response.json();
    countries = data;
    filteredCountries = [...countries];
    showCountries();
    setupPagination();
  } catch (err) {
    console.error("Error fetching countries:", err);
    document.getElementById("app").innerHTML =
      "<p style='color:white; text-align:center; font-size:28px;'>Failed to load .</p>";
  }
}
function showCountries() {
  const container = document.getElementById("countries");
  container.innerHTML = "";

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageItems = filteredCountries.slice(start, end);

  pageItems.forEach(country => {
    const card = document.createElement("div");
    card.className = "country-card";

    const flag = document.createElement("img");
    flag.src = country.flags.png;
    flag.alt = country.name;

    const name = document.createElement("h3");
    name.innerText = country.name;

    card.appendChild(flag);
    card.appendChild(name);

    card.addEventListener("click", () => showDetails(country));

    container.appendChild(card);
  });
}
function setupPagination() {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";


  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;
    btn.className = i === currentPage ? "active" : "";
    btn.onclick = () => {
      currentPage = i;
      showCountries();
      setupPagination();
    };
    pagination.appendChild(btn);
  }
}

