const loadIssues = () => {
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  fetch(url)
    .then(res => res.json())
    .then(data => {
      displayCards(data.data);
    });
};


// for card down symbol
const createElements = (arr) => {
  const htmlElements = arr.map((el, index) => {
    if (el === "bug") {
      return `<span class="btn btn-soft rounded-full text-[#EF4444] bg-[#FECACA]"><i class="fa-solid fa-bug"></i> ${el}</span>`;
    } else if (el === "help wanted") {
      return `<span class="btn btn-soft rounded-full bg-[#FDE68A] text-[#D97706]"><i class="fa-solid fa-life-ring"></i> ${el}</span>`;
    } else if (el === "enhancement") {
      return `<span class="btn btn-soft rounded-full text-[#00A96E] bg-[#BBF7D0]"><i class="fa-solid fa-wand-magic-sparkles"></i> ${el}</span>`;
    } else {
      return `<span class="btn btn-soft rounded-full bg-[#FDE68A] text-[#D97706]">${el}</span>`;
    }
  });

  return htmlElements.join("");
};

// for card up symbol

const createSymbols = (sym) => {
  let symbol = " ";
  if (sym === "open") {
    symbol = `<span><img src="assets/Open-Status.png" alt="Open"></span>`
    
  }
  else {
    symbol = ` <span><img src="./assets/Closed-Status.png" alt="Closed"></span>`
  }
  return symbol;
};
 
// high, low, medium
const statusHlm = (el) => {
  if (el === "high") {
      return `<span class="btn btn-soft rounded-full bg-[#FDE68A] text-[#D97706]">${el}</span>`;
    }
    else if (el === "medium") {
      return `<span class="btn btn-soft rounded-full text-[#EF4444] bg-[#FECACA]">${el}</span>`;
    }
    else {
      return `<span class="btn btn-soft rounded-full">${el}</span>`;
    }
  };
 
// card display
const displayCards = (cards) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  // card html
  cards.forEach(card => {
    console.log(card);
    const issueCard = document.createElement("div");
    issueCard.innerHTML = `
    <div class="bg-white rounded-xl shadow-sm py-10 px-10 space-y-4 h-100">
    <div class="flex justify-between gap-3">
    <span>${createSymbols(card.status)}</span>
    <div>${statusHlm(card.priority)}</div>
  </div>
       <h2 class="font-bold text-xl">${card.title}</h2>
     <p style="color:#64748B;">${card.description}</p>
     <div class="flex justify-between gap-2 pr-10 text-wrap">
      ${createElements(card.labels)}
     </div>
      <footer>
    <p style="color:#64748B;">#${card.author}</p>
<span class="text-[#64748B]">${card.updatedAt}</span>
  </footer>
      </div>
    `;
    cardContainer.appendChild(issueCard);
    
  });
    
};

// {
//   "id": 1,
//     "title": "Fix navigation menu on mobile devices",
//       "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
//         "status": "open",
//           "labels": [
//             "bug",
//             "help wanted"
//           ],
//             "priority": "high",
//               "author": "john_doe",
//                 "assignee": "jane_smith",
//                   "createdAt": "2024-01-15T10:30:00Z",
//                     "updatedAt": "2024-01-15T10:30:00Z"
// },




loadIssues();
