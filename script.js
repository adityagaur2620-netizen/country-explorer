
let countries = [];
let filteredCountries = [];
const itemsPerPage = 6; 
let currentPage = 1;
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
//Pagination
function setupPagination() {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";
   let totalPages = Math.ceil(filteredCountries.length / itemsPerPage);

  const prevBtn = document.createElement("button");
  prevBtn.className = "prev";
  prevBtn.innerText = "Prev";
  prevBtn.disabled = currentPage === 1;
  prevBtn.onclick = () => {
    if (currentPage > 1) {
      currentPage--;
      showCountries();
      setupPagination();
    }
  };


  pagination.appendChild(prevBtn);
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
  const nextBtn = document.createElement("button");
  nextBtn.className = "next";
  nextBtn.innerText = "Next";
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.onclick = () => {
    if (currentPage < totalPages) {
      currentPage++;
      showCountries();
      setupPagination();
    }
    };
  pagination.appendChild(nextBtn);
}
function showDetails(country) {
  const card= document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <div class="card-content">
      <h3 style="color:white;">${country.name}</h3>
      <img src="${country.flags.png}" style="width:150px;">
      <p><b>Capital:</b>${country.capital}</p>
      <p><b>Population:</b> ${country.population.toLocaleString()}</p>
      <p><b>Region:</b> ${country.region}</p>
      <p><b>Timezones:</b> ${country.timezones}</p>
      <p><b>Currency:</b> ${country.currencies.map(c => c.name).join(", ")}</p>
      <p><b>Borders:</b> ${country.borders}</p>
      <p><b>Languages:</b> ${country.languages.map(l => l.name).join(", ")}</p>
      <button id="closecard">Close</button>
    </div>
  `;

  document.body.appendChild(card);
  document.getElementById("closecard").onclick = () => card.remove();
  card.addEventListener("click", e => {
    if (e.target === card) card.remove();
  });
}

document.getElementById("search").addEventListener("input", e => {
  const q = e.target.value.toLowerCase();
  filteredCountries = countries.filter(c =>
    c.name.toLowerCase().includes(q)
  );
  currentPage =1;
  showCountries();
  setupPagination();
});

document.getElementById("refresh").addEventListener("click", () => {
  document.getElementById("search").value = "";
  filteredCountries = [...countries];
  showCountries();
  setupPagination();
});

fetchCountries()

