// on récupère le paramètre id dans l'url pour pouvoir l'utiliser dans la requête
const urlProduit = window.location.href;
const url = new URL(urlProduit);
document.getElementById('renderFirstName').innerHTML = url.searchParams.get('name');
document.getElementById('renderIdOrder').innerHTML = url.searchParams.get('id');
document.getElementById('renderTotalOrder').innerHTML = url.searchParams.get('price') + ' €';


