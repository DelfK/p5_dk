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
        // PAGE PRODUIT
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

        // créer la div contenant le choix des d'objectifs
        const selectObj = document.createElement('form');
        artContent.appendChild(selectObj);

        // créer la div contenent le prix et l'ajout au panier
        const details = document.createElement('div');
        details.setAttribute('class','card__details');
        artContent.appendChild(details);

        // créer le bouton et prix
        const lienPanier = document.createElement('div');
        lienPanier.setAttribute('class','voir-panier');

        const prixProduit = document.createElement('div');
        prixProduit.setAttribute('class','prix-produit');

        details.appendChild(lienPanier);
        details.appendChild(prixProduit);

        // créer le bouton et le rattacher
        const btnPanier = document.createElement('a');
        btnPanier.setAttribute('class', 'button');
        btnPanier.innerHTML = 'Ajouter au panier';

        lienPanier.appendChild(btnPanier);

        // créer le contenant du prix et le rattacher
        const prix = document.createElement('p');

        prixProduit.appendChild(prix);

        // destination du bouton
        // btnPanier.href =

        

        // récupérer le paramètre id dans l'url pour pouvoir l'utiliser
        const urlProduit = window.location.href;
        const url = new URL(urlProduit);
        const idProduit = url.searchParams.get('id'); 
        console.log(idProduit);

    
        // afficher les différents choix d'objectifs
        data.forEach(camera => {
            if (camera._id == idProduit){
                const urlImage = camera.imageUrl;
                // mettre l'image en background de la div
                artImage.style.backgroundImage = `url("${urlImage}")`;

                // afficher le nom de la camera
                artTitre.textContent = camera.name;

                // ajouter la personnalisation du produit avec des boutons radio
                const objectifs = camera.lenses;
                console.log(objectifs);
 
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

                // afficherle prix 
                prix.textContent = camera.price/100 + '€';
        
            };// fin de la condition pour afficher les informations du produit sélectionné

        });// fin de la boucle dans cameras

        

        

        
        

        

        

    });// Fin de la requête
    



  



