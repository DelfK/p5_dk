// ON CREE LA STRUCTURE HTML qui va contenir les données de l'appareil sélectionné
// récupérer la div qui va afficher le produit
const rootProduit = document.getElementById('root-produit');

// créer la div article et lui attribuer une class article
const article = document.createElement('div');
article.setAttribute('class', 'article');

rootProduit.appendChild(article)

// créer la div article__img 
const artImage = document.createElement('div');
artImage.setAttribute('class', 'article__img');
article.appendChild(artImage);

// créer la div article__content 
const artContent = document.createElement('div');
artContent.setAttribute('class', 'article__content');
article.appendChild(artContent);

// créer le titre de article__content
const artTitre = document.createElement('h2');
artContent.appendChild(artTitre);

// créer le sous-titre de article__content
const artPerso = document.createElement('h3');
artContent.appendChild(artPerso);
artPerso.textContent = "Choix de l'objectif";

// créer le form contenant le choix des d'objectifs
const selectObj = document.createElement('form');
artContent.appendChild(selectObj);

// créer la div card__details contenant le bouton et le prix
const details = document.createElement('div');
details.setAttribute('class','card__details');
artContent.appendChild(details);

// créer les 2 sous-div de card__details
// 1 > voir-panier
const lienPanier = document.createElement('div');
lienPanier.setAttribute('class','voir-panier');
details.appendChild(lienPanier);

// 2 > prix-produit
const prixProduit = document.createElement('div');
prixProduit.setAttribute('class','prix-produit');
details.appendChild(prixProduit);

    // créer le contenant du prix et le rattacher
    const prix = document.createElement('p');
    prixProduit.appendChild(prix);


// créer le sous-bloc contenu dans voir-panier 
const blocValidation = document.createElement('div');
blocValidation.setAttribute('class', 'bloc-validation');
lienPanier.appendChild(blocValidation);

    // créer le bouton Ajouter au panier et le rattacher
    const btnPanier = document.createElement('button');
    btnPanier.setAttribute('class', 'button');
    btnPanier.innerHTML = 'Ajouter au panier';
    blocValidation.appendChild(btnPanier);

    // créer le message vert qui appara^tra au clic sur le bouton Ajouter au panier
    const animBtn = document.createElement('div');
    blocValidation.appendChild(animBtn);
    animBtn.setAttribute('class','btn-anim');

    animBtn.innerHTML = "Ajouté au <a href='panier.html'>panier</a><span id='fermer'>x</span>";

    const fermer = document.getElementById('fermer');
    fermer.addEventListener('click', function(){
        animBtn.style.transform = "translateY(0)";
    });


// on récupère le paramètre id dans l'url pour pouvoir l'utiliser dans la requête
const urlProduit = window.location.href;
const url = new URL(urlProduit);
const idProduit = url.searchParams.get('id');
 

// REQUÊTE vers l'API cameras avec fetch
fetch(`http://localhost:3000/api/cameras/${idProduit}`)
  .then(response => {
    
        // on parse les données de la requête en utilisant json()
        return response.json();
    
  })
  // on utilise les données pour les afficher
  .then(data => {
 
        // MISE EN PLACE DU LOCALSTORAGE
        // on remplit le local storage avec un objet itemsCart qu'on initialise
        
        // pour éviter que le localStorage se vide à chaque rechargement de page, on vérifie s'il est paramétré
        // si oui on récupère les données du storage avec getItem sinon l'objet reste vide
        let itemsCart = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : {};
        
        // au clic sur le bouton Ajouter au panier, on ajoute une paire clé, valeur à l'objet vide itemsCart
        // où la clé stocke l'id de l'appareil ajouté et la valeur stocke la quantité incrémentée à chaque clic
        btnPanier.addEventListener('click', function(){
            
            // on affiche le message de validation d'ajout au panier
            animBtn.style.transform = "translateY(-100%)";
            
            // on incrémente la quantité par id - on vérifie avant que l'appareil n'a pas été ajouté une première fois
            if(itemsCart[idProduit] === undefined){

                itemsCart[idProduit] = 1;

            }else{

                itemsCart[idProduit] += 1; 
                
            }
            console.log(itemsCart);
            localStorage.setItem('items', JSON.stringify(itemsCart));
        });
        // fin de l'event sur le bouton
        
            // on affiche les données sur l'appareil en appelant renderDetails définie plus bas
                renderDetails(data);

    })
    .catch( error => {
    console.log(error);
    });
// FIN DE LA REQUÊTE
    

// FONCTION renderDetails()
// affiche l'image, le nom de l'appareil , ses options de personnalisation (choix de l'objectif)
// son prix et un lien pour l'ajouter au panier
const renderDetails = camera =>{
    const urlImage = camera.imageUrl;
    // mettre l'image en background de la div
    artImage.style.backgroundImage = `url("${urlImage}")`;

    // afficher le nom de la camera
    artTitre.textContent = camera.name;

    // ajouter la personnalisation du produit avec des boutons radio
    const objectifs = camera.lenses;
    console.log(objectifs);

    // pour chaque lense on créer un bouton radio et son label avec tous les attributs nécessaires
    objectifs.forEach(choix => {
        // créer les inputs radio et les labels
        const radio = document.createElement('input');
        radio.setAttribute('type', 'radio');
        const label = document.createElement('label');

        // rattacher les boutons et labels au form
        selectObj.appendChild(radio);
        selectObj.appendChild(label);

        // afficher l'intitulé du label et la valeur de l'input
        label.textContent = choix;
        radio.value = choix;

        // retirer les espaces du nom de l'objectif photo pour l'utiliser comme id et valeur de l'attribut for
        const inputId = choix.replace(' ', '');

        radio.setAttribute('id', inputId);
        label.setAttribute('for', inputId);

        // déterminer le name des boutons radios
        radio.setAttribute('name', 'objectif');
    }); // fin de la boucle dans les objectifs

    // afficher le prix 
    prix.textContent = camera.price/100 + '€';
} 
// FIN DE LA FONCTION renderDetails
  



