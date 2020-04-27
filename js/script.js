// REQUÊTE vers l'API cameras avec l'API fetch
fetch('http://localhost:3000/api/cameras')
  .then(response => {

        // on parse les données de la requête en utilisant json()
        return response.json();
      
  })
  // on utilise les données pour les afficher
  .then(data => {
    data.forEach( camera => {

      // appeler la fonction qui permet de créer un card et définie plus bas
       renderCard(camera);

    })
  }
)
.catch( error => {

  console.log(error);

});



// La fonction renderCard() crée un card pour chaque appareil
// chaque card contient une image, le nom de l'appareil, sa description son prix et un lien vers ses détails
const renderCard = camera => {
    
      // récupérer la div qui va afficher les appareils
      const root = document.getElementById('root_list');

      // créer la div card et lui attribuer une class card
      const card = document.createElement('div');

      card.setAttribute('class', 'card');
      root.appendChild(card);

      // créer la div contenant l'image de la camera et lui attribuer une class
      const cardImg = document.createElement('div');

      cardImg.setAttribute('class', 'card__img');
      card.appendChild(cardImg);

      //créer la div contenant le texte décrivant la camera et lui attribuer une class
      const cardTxt = document.createElement('div');

      cardTxt.setAttribute('class', 'card__content');
      card.appendChild(cardTxt);

      // créer le titre et la description du produit et les rattacher au card__content
      const nomProduit = document.createElement('h2');
      cardTxt.appendChild(nomProduit);

      const descriptionProduit = document.createElement('p');
      cardTxt.appendChild(descriptionProduit);

      // créer les details (lien vers la fiche du produit et prix)
      const cardDetails = document.createElement('div');

      cardDetails.setAttribute('class', 'card__details');
      cardTxt.appendChild(cardDetails);

      // créer le bouton et prix
      const lienProduit = document.createElement('div');
      lienProduit.setAttribute('class','voir-produit');

      const prixProduit = document.createElement('div');
      prixProduit.setAttribute('class','prix-produit');

      cardDetails.appendChild(lienProduit);
      cardDetails.appendChild(prixProduit);

      // créer le lien du bouton et le rattacher
      const btnProduit = document.createElement('a');
      btnProduit.setAttribute('class', 'button');
      btnProduit.innerHTML = 'Voir les détails';

      lienProduit.appendChild(btnProduit);

      // créer le contenant du prix et le rattacher
      const prix = document.createElement('p');

      prixProduit.appendChild(prix);

      // afficher les informations des cameras issues de la requête avec leur paramètres

      // l'image
      const urlImage = camera.imageUrl;
      cardImg.style.backgroundImage = `url("${urlImage}")`;

      // le titre
      nomProduit.textContent = camera.name;

      // la description
      descriptionProduit.textContent = camera.description;

      // le prix
      prix.textContent = camera.price/100 + '€';

      // destination du bouton
      //récupérer l'id du produit et le mettre en paramètre dans l'url des destination
      // cela permettra de récupérer les informations liées à l'id pour les afficher sur la page produit
      const idCamera = camera._id;
      const urlBtn = `produit.html?id=${idCamera}`;
      btnProduit.href = urlBtn;

};








