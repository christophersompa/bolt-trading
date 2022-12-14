menuToggler.addEventListener('click', (ev) => {
  menu.classList.toggle('open');
  menuToggler.textContent = menuToggler.textContent === 'X' ? '≡' : 'X';
});

const search = document.querySelector('input');
const form = document.querySelector('form');
const searchResult = document.querySelector('.results');
const errorMsg = document.querySelector('.alert');
// const line = document.querySelector("hr");
const apiURL =
  'https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=';

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let searchValue = search.value;
  if (searchValue === '') {
    errorMessage('Search cannot be empty. Please enter your search.');
  } else {
    getResult(searchValue);
  }
});

async function getResult(searchVal) {
  const response = await fetch(apiURL + searchVal);
  const results = await response.json();

  console.log(results);
  if (results.query.search.length == 0) {
    return errorMessage('Invalid search, please enter another search');
  } else {
    displayData(results);
  }
}

function errorMessage(msg) {
  errorMsg.style.display = 'block';
  // line.style.display = "block";

  errorMsg.textContent = msg;
}

function displayData(results) {
  // line.style.display = "block";
  let output = '';
  results.query.search.forEach((result) => {
    let resultURL = `https://en.wikipedia.org/?curid=${result.pageid}`;
    output += `   <div class="result">
          <a href="${resultURL}">${result.title}</a>
          <br/>
          <p>${result.snippet}</p>
        </div>
        `;
    searchResult.innerHTML = output;
  });
}
