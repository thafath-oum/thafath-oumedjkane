js/script.js
window.addEventListener('load',() =>{
    if(window.location.hash==='#contact'){
      setTimeout(()=>{
        history.replaceState(null,'', window.location.pathname);
      },100);
    }
});

function forceLineBreaks(){
    const items=document.querySelectorAll('.it-name');
    items.forEach(item =>{
        item.style.whiteSpace="normal";
        item.style.wordWrap="break-word";
    });
}


window.addEventListener('DOMContentLoaded', forceLineBreaks);
window.addEventListener('resize', forceLineBreaks);

const suggestions = ['robes', 'talons,heels', 'sacs', 'accessoires','heels','dress'];

const input = document.getElementById('search-input');
const suggestionsBox = document.getElementById('suggestions');

input.addEventListener('input', () => {
  const query = input.value.toLowerCase().trim();
  suggestionsBox.innerHTML = '';

  if (query === '') return;

  const matches = suggestions.filter(item => item.startsWith(query));

  matches.forEach(match => {
    const div = document.createElement('div');
    div.textContent = match;

    div.addEventListener('click', () => {
      input.value = match;
      suggestionsBox.innerHTML = '';
    });

    suggestionsBox.appendChild(div);
  });
});

document.getElementById('search').addEventListener('submit', function (e) {
  e.preventDefault();

  const query = document.getElementById('search-input').value.toLowerCase().trim();

  const correspondances = {
    'robes.html': ['robe', 'robes', 'dress', 'dresses'],
    'talons.html': ['talon', 'talons', 'heel', 'heels','shoes'],
    'sac.html': ['sac', 'sacs', 'bag', 'bags'],
    'accessoire.html': ['accessoire', 'accessoires', 'accessory', 'accessories']
  };

  let pageTrouvée = null;
  for (const [page, mots] of Object.entries(correspondances)) {
    if (mots.includes(query)) {
      pageTrouvée = page;
      break;
    }
  }
  if (pageTrouvée) {
    window.location.href = pageTrouvée;
  } else {
    alert("Aucun article correspondant trouvé");
  }
});



function validerEtAller() {
  const url = window.location.pathname;

  // Vérifie si c'est une robe
  if (url.includes("robe")) {
    const taille = document.querySelector('input[name="taille"]:checked');
    if (!taille) {
      alert("Veuillez choisir une taille !");
      return;
    }
    alert("Taille choisie : " + taille.value);
  }

  // Vérifie si c'est un talon
  else if (url.includes("talon")) {
    const pointure = document.querySelector('input[name="pointure"]:checked');
    if (!pointure) {
      alert("Veuillez choisir une pointure !");
      return;
    }
    alert("Pointure choisie : " + pointure.value);
  }

  // Pour tous les autres articles//
  
  window.location.href = "paiment.html";
}




function ajouteAuPanier() {
  const article = event.target.closest('.article');
  if (!article) return;

  const prixText = article.querySelector('.prix-article')?.textContent || "0";
  const prix = parseInt(prixText.replace(/\D/g, "")) || 0;

  const image = article.querySelector('img')?.getAttribute('src') || "image/default.jpg";

  const inputTaille = article.querySelector('input[name="taille"]:checked');
  const inputPointure = article.querySelector('input[name="pointure"]:checked');

  let taille = "";

  if (article.querySelector('input[name="taille"]') && !inputTaille) {
    alert("Veuillez choisir une taille pour cet article.");
    return;
  }

  if (article.querySelector('input[name="pointure"]') && !inputPointure) {
    alert("Veuillez choisir une pointure pour cet article.");
    return;
  }

  if (inputTaille) {
    taille = inputTaille.value;
  } else if (inputPointure) {
    taille = inputPointure.value;
  }

  const articlePanier = {
    prix: prix,
    taille: taille,
    image: image
  };

  let panier = JSON.parse(localStorage.getItem("panier")) || [];
  panier.push(articlePanier);
  localStorage.setItem("panier", JSON.stringify(panier));
  alert("Article ajouté au panier !");
}
