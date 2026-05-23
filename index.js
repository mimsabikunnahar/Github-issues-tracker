const loadIssues = () => {
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  fetch(url)
    .then(res => res.json())
    .then(data => {
      displayCards(data.data);
    });
};
// all tab select
let currentTab = 'all'
const tabActive = ['bg-blue-700', 'text-white']
const tabInactive = ['bg-white', 'text-[#64748B]', 'border-[#64748B]']

// container call
const all = document.getElementById("card-container");
const open = document.getElementById("open-container");
const closed = document.getElementById("closed-container");

// tab switch
 
const switchTab = (btn) => {
  const tabs = ['all', 'open', 'closed'];
  currentTab = btn;
  for (const tab of tabs) {
    const tabName = document.getElementById(`tab-${tab}`)
    if (tab === btn) {
      tabName.classList.remove(...tabInactive)
      tabName.classList.add(...tabActive)
    }
    else {
      tabName.classList.remove(...tabActive)
      tabName.classList.add(...tabInactive)
    }
  }

  // page hidden remove > page show
  const pages = [allPage, interviewPage, rejectedPage];
  for (const section of pages) {
    section.classList.add("hidden");
  }
  // empty slate hidden
  emptySlate.classList.add("hidden");

  if (btn === "all") {
    allPage.classList.remove("hidden");
    if (allPage.children.length < 1) {
      emptySlate.classList.remove("hidden");
    }

  }
  else if (btn === "interview") {
    interviewPage.classList.remove("hidden");
    if (interviewPage.children.length < 1) {
      emptySlate.classList.remove("hidden");
    }
  } else {
    rejectedPage.classList.remove("hidden");
    if (rejectedPage.children.length < 1) {
      emptySlate.classList.remove("hidden");
    }
  }

};
switchTab("all");



// for card down symbol
const createElements = (arr) => {
  const htmlElements = arr.map((el, index) => {
    if (el === "bug") {
      return `<span class="btn btn-soft rounded-full text-[#EF4444] bg-[#FECACA] mb-3"><i class="fa-solid fa-bug"></i> ${el}</span>`;
    } else if (el === "help wanted") {
      return `<span class="btn btn-soft rounded-full bg-[#FDE68A] text-[#D97706] mb-3"><i class="fa-solid fa-life-ring"></i> ${el}</span>`;
    } else if (el === "enhancement") {
      return `<span class="btn btn-soft rounded-full text-[#00A96E] bg-[#BBF7D0] mb-3"><i class="fa-solid fa-wand-magic-sparkles"></i> ${el}</span>`;
    } else {
      return `<span class="btn btn-soft rounded-full text-[#A855F7] bg-[#F0E2FF] mb-3">${el}</span>`;
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
    symbol = ` <span><img src="./assets/closed.png" alt="Closed"></span>`
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
    <div class="bg-white rounded-xl shadow-sm py-10 px-10 space-y-4 h-100" onclick='createModal(${JSON.stringify(card)})'>
    <div class="flex justify-between gap-3">
    <span>${createSymbols(card.status)}</span>
    <div>${statusHlm(card.priority)}</div>
  </div>
       <h2 class="font-bold text-xl">${card.title}</h2>
     <p style="color:#64748B;">${card.description}</p>
     <div class="flex justify-between gap-2 pr-10 text-wrap border-b-2 border-gray-200 mb-3">
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

// show modal
const createModal = (card) => {
  console.log(card);

  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `
    <h3 class="text-lg font-bold">${card.title}</h3>
    <div class="flex flex-row gap-1">
    <div class="btn btn-soft rounded-full bg-[#00A96E] text-[#BBF7D0]">${card.status}</div>
    
    <p style="color:#64748B;" class="text-xs"><i class="fa-solid fa-circle"></i>opened by ${card.author}</p>
    <p  style="color:#64748B;" class="text-xs"><i class="fa-solid fa-circle"></i>${card.createdAt}</p>
    </div>
    <div class="flex flex-auto gap-2 pr-10 text-wrap mt-3 mb-3">
      ${createElements(card.labels)}
     </div>
      <p class="py-4" style="color:#64748B;">${card.description}</p>
    <p style="color:#64748B;">Author: ${card.author}</p>
    <p style="color:#64748B;">Updated: ${card.updatedAt}</p>
  `;

  document.getElementById("my_modal_8").showModal();
};


loadIssues();
