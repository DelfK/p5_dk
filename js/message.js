// on récupère les paramètres name, id et price de l'url pour les afficher dans le message de confirmation
const urlProduit = window.location.href;
const url = new URL(urlProduit);

document.getElementById('renderFirstName').innerHTML = url.searchParams.get('name');
document.getElementById('renderIdOrder').innerHTML = url.searchParams.get('id');
document.getElementById('renderTotalOrder').innerHTML = url.searchParams.get('price') + ' €';


