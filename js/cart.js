// on récupère les éléments du localStorage
const items = JSON.parse(localStorage.getItem('items'));

// on ajoute au tableau le message indiquant que le panier est vide
// ce message sera masqué si un article est ajouté au panier
const root = document.getElementById('root-panier');
const table = document.getElementsByTagName('table');

const message = document.createElement('p');
message.setAttribute('class','panierVide')
root.appendChild(message);
message.innerHTML = "Il n'y a rien ici pour l'instant ... Poursuivre mes <a href='index.html'>achats</a>";

// REQUÊTE vers l'API cameras avec fetch
fetch('http://localhost:3000/api/cameras')
  .then(response => {
    // si la requête est un succès
   
        // on parse les données de la requête en utilisant json()
        return response.json();
      
  })
  // on utilise les données pour les afficher
  .then(data => {

       
        //on récupère les informations de la camera dont l'id est le même que celui en paramètre de l'url

            // on initialise un tableau, pour incrémenter le total du panier
            let arrayTotal = [];
            let arrayProducts = [];
        
            // pour chaque id de camera stocké sur le localStorage, on vérifie s'il a le même que chaque camera de l'api
            for (let property in items) {
                
                data.forEach(camera => {
                    
                    //si oui, on masque le message indiquant que le panier est vide
                    // on affiche les infos des cameras ajoutées dans le panier en appelant la fonction rankMaker()
                    if(camera._id === property) {
                        let imageSrc = camera.imageUrl;
                        let cameraName = camera.name;
                        let cameraPrice = camera.price;
                        let quantite = items[property];
                        message.style.display = "none";
                        rankMaker(imageSrc, cameraName, quantite, cameraPrice, arrayTotal);
                        arrayProducts.push(property);
                        

                      
                    }
                
                }
            )};
            

            // on calcule le prix total du panier avec les données du tableau arrayTotal
            //console.log(array);
            let sum = (a, b) => a + b;
            let sumTotal = arrayTotal.reduce(sum);
            //console.log(sumTotal);

            // on affiche le prix dans une nouvelle rangée qu'on ajoute au tableau 
            const rangeeTotal = document.createElement('tr');
            table[0].appendChild(rangeeTotal);
            rangeeTotal.innerHTML =`<td class="hidden"></td><td class="hidden"></td><td class="panierPrix">Total</td><td class="panierPrix">${sumTotal}€</td>`;
   
            // on affiche le formulaire de commande (que si le panier est plein)
            document.querySelector('.commande').style.display = "block";

            const form = document.forms["contactForm"];
            
            // on envoie les données au serveur à la soumission du formulaire
            form.addEventListener('submit', function(e){
                    e.preventDefault();
                    // on exécute la fonction AJAX
                    sendDataForm(arrayProducts, sumTotal);
                    localStorage.clear();
                    
                    }       
            );
        })          
    .catch( error => {
    console.log(error);
    });
    // Fin de la requête

// on déclare la fonction qui va permettre de créer et afficher les informations du panier
const rankMaker = (imgSrc, nomPdt, qtPdt, price, array) => {
    
    // on crée la rangée qui va afficher l'image, le nom, la quantité et le sous-total
    const rangee = document.createElement('tr');
    table[0].appendChild(rangee);
   
    // cellule pour afficher l'image
    const tdImg = document.createElement('td');
    rangee.appendChild(tdImg);

    // on crée  l'image et on l'affiche
    const img = document.createElement('img');
    tdImg.appendChild(img);
    img.src = imgSrc;
    img.style.width = '220px';

    // on crée la cellule pour afficher le nom
    const tdNom = document.createElement('td')
    rangee.appendChild(tdNom);
    tdNom.innerHTML = nomPdt; 

    // on crée la cellule pour afficher la quantité 
    const tdQt = document.createElement('td')
    rangee.appendChild(tdQt);
    tdQt.innerHTML = qtPdt; 

    // on créer la cellule pour afficher le sous-total
    const tdTotal = document.createElement('td');
    rangee.appendChild(tdTotal);
    
    // on stocke le sous-total 
    const prixPdts = (price/100) * qtPdt ;
    
    // on récupère dans un tableau le sous-total 
    // cela va nous permettre de calculer le total plus tard
    array.push(prixPdts);
    
    // on affiche le sous-total dans la cellule
    tdTotal.innerHTML = prixPdts + ' €';
}

const headingMaker = () => {
    // on crée le heading du tableau
    const headingTable = document.createElement('tr');
    table[0].appendChild(headingTable);

    const imgHeading = document.createElement('th');
    headingTable.appendChild(imgHeading);

    const pdtHeading = document.createElement('th');
    pdtHeading.innerHTML = "Produit";
    headingTable.appendChild(pdtHeading);

    const qtHeading = document.createElement('th');
    qtHeading.innerHTML = "Quantité";
    headingTable.appendChild(qtHeading);

    const totalHeading = document.createElement('th');
    totalHeading.innerHTML = "Sous-total";
    headingTable.appendChild(totalHeading);
    
}

 // on affiche le header du tableau du panier que si le localStorage est plein    
 if(items){
    // la fonction crée les titres des colonnes du récapitulatif du panier
    headingMaker();
}


// ENVOI DU FORMULAIRE

//AJAX FONCTION
// on déclare la fonction qui va permettre d'envoyer les données de saisie du formulaire
// un tableau des id des produits commandés et le prix total vers le serveur
const sendDataForm = (produits, total) => {

    const prenom = document.getElementById('prenom').value;
    const nom = document.getElementById('nom').value;
    const adresse = document.getElementById('adresse').value;
    const ville = document.getElementById('ville').value;
    const email = document.getElementById('email').value;
    const complement = document.getElementById('complement').value;

    const data = {
    
    contact : {
        firstName : prenom,
        lastName : nom,
        address : adresse,
        city : ville,
        email : email,

    },

    products : produits,

    price: total
    
    }

    const dataToSend = JSON.stringify(data);

    fetch('http://localhost:3000/api/cameras/order', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json', 
        },
        body: dataToSend,
    })
    .then( response => {
        
        return response.json();
    })
    .then(jsonResponse => {
        // on exécute la fonction qui restitue les l'id de commande et les autres données
        // déclarée plus bas
        renderResponse(jsonResponse)
    })
    .catch( error => {
        console.log(error);
    });

};


// on récupère les données de la réponse pour les placer en paramètre de l'url
// pour les afficher sur la page de confirmation
const renderResponse = order => {
   const firstName = order.contact.firstName;
   const price = order.total;
   const idOrder = order.orderId;

   const urlParams = `confirmation.html?id=${idOrder}&name=${firstName}&price=${price}`;
   window.open(urlParams, "_self");
}

