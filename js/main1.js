const vacanciesAPI = "https://api.lmiforall.org.uk/api/v1/vacancies/search";

function fetchVacancies(title, location) {
  console.log(
    `Searching for jobs with title: ${title} and location: ${location}`
  );
  const query = new URLSearchParams({ title, location }).toString();

  fetch(`${vacanciesAPI}?${query}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to fetch vacancies.");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      displayVacancies(data.vacancies || []);
    })
    .catch((error) => {
      console.error(error);
      document.getElementById("vacancy-results").innerHTML =
        "<li class='list-group-item text-danger'>Error fetching jobs.</li>";
    });
}

function displayVacancies(vacancies) {
  const results = document.getElementById("vacancy-results");
  results.innerHTML = "";

  if (vacancies.length === 0) {
    results.innerHTML =
      "<li class='list-group-item'>No jobs found for your search.</li>";
    return;
  }

  vacancies.forEach((job) => {
    const item = document.createElement("li");
    item.className = "list-group-item";
    item.innerHTML = `
      <h5>${job.title}</h5>
      <p><strong>Location:</strong> ${job.location || "N/A"}</p>
      <p><strong>Company:</strong> ${job.company || "N/A"}</p>
      <p><strong>Summary:</strong> ${job.summary || "No summary available."}</p>
    `;
    results.appendChild(item);
  });
}

document.getElementById("search-btn").addEventListener("click", (e) => {
  e.preventDefault();
  const title = document.getElementById("job-title").value.trim();
  const location = document.getElementById("job-location").value.trim();
  fetchVacancies(title, location);
});
