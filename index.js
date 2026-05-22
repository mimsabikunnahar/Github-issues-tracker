const loadIssues = () => {
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  fetch(url)
    .then(res => res.json())
    .then(data => console.log(data));
};

// card display
const displayCard = () => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = " ";
  
}

loadIssues();
