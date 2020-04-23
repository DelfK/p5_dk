// Requête vers l'API cameras avec fetch
fetch('http://localhost:3000/api/cameras')
  .then(response => {
    // si la requête est un succès
    if(response.ok){
        // on parse les données de la requête en utilisant json()
        return response.json();
    }
    // sinon on lance une erreur
    throw new Error('Request failed!');
    
  })
  // on utilise les données pour les afficher
  .then(data => {
    data.forEach( camera => {
        // LISTE DE CAMERAS
        // récupérer la div qui va afficher les cameras
        const root = document.getElementById('root_list');

        // créer la div card et lui attribuer une class card
        const card = document.createElement('div');
        card.setAttribute('class', 'card');

        // rattacher card à son parent
        root.appendChild(card);

        // créer la div contenant l'image de la camera et lui attribuer une class
        const cardImg = document.createElement('div');
        cardImg.setAttribute('class', 'card__img');
        
        // rattacher l'image au card
        card.appendChild(cardImg);

        //créer la div contenant le texte décrivant la camera et lui attribuer une class
        const cardTxt = document.createElement('div');
        cardTxt.setAttribute('class', 'card__content');

        // rattacher le content au card
        card.appendChild(cardTxt);


        // créer le titre et la description du produit et les rattacher au card__content
        const nomProduit = document.createElement('h2');
        cardTxt.appendChild(nomProduit);

        const descriptionProduit = document.createElement('p');
        cardTxt.appendChild(descriptionProduit);

        // créer les details (lien vers la fiche du produit et prix)
        const cardDetails = document.createElement('div');
        cardDetails.setAttribute('class', 'card__details');

        // rattacher les détails au card__content
        cardTxt.appendChild(cardDetails);

        // créer le bouton et prix
        const lienProduit = document.createElement('div');
        lienProduit.setAttribute('class','voir-produit');

        const prixProduit = document.createElement('div');
        prixProduit.setAttribute('class','prix-produit');

        cardDetails.appendChild(lienProduit);
        cardDetails.appendChild(prixProduit);

        // créer le bouton et le rattacher
        const btnProduit = document.createElement('a');
        btnProduit.setAttribute('class', 'button');
        btnProduit.innerHTML = 'Voir les détails';

        lienProduit.appendChild(btnProduit);

        // créer le contenant du prix et le rattacher

        const prix = document.createElement('p');

        prixProduit.appendChild(prix);

        // afficher les élements

        // l'image
        const urlImage = camera.imageUrl;
        cardImg.style.backgroundImage = `url("${urlImage}")`;

        // le titre
        nomProduit.textContent = camera.name;
        descriptionProduit.textContent = camera.description;

        // la description

        // le prix
        prix.textContent = camera.price/100 + '€';

        // destination du bouton
        const idCamera = camera._id;
        const urlBtn = `produit.html?id=${idCamera}`;
        btnProduit.href = urlBtn;

        

    })
    



  }
);


