function signOut() {
    firebase.auth().signOut().then(function() {}).catch(function(error) {
        console.log(error);
    });
}
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        document.getElementById("activeUser").style.display = "block";
        document.getElementById("inActiveUser").style.display = "none";
        document.getElementById("postad").style.display = "block";
        document.getElementById("userProfile").innerHTML = firebase.auth().currentUser.displayName;
        document.getElementById(`suh`).innerHTML = `Anunturile favorite ale lui ${firebase.auth().currentUser.displayName}`
        document.getElementById("userProfile").style.display = "block";
        fetchFavourites();
    } else {

    }
});

function signOut() {
    firebase.auth().signOut().then(function() {}).catch(function(error) {
        console.log(error);
    });
}
var database = firebase.database();

function adCard(data, key) {
    return `
     <div class="cardstyling col-lg-4 col-sm-6 portfolio-item" id="adcard">
       <div class="card h-100" id="adcard">
         <img id="adimg" class="validate card-img-top" src=${data.url} />
         <div class="card-body">
           <h3 id="adtitle" class="card-title">${data.title}</h3>
           <p id="addes" class="card-text">${data.description}</p>
           <h5 class="text-white" id="adPrice">RON ${data.price}</h5>
           <button id="deleteFromFav" type="button" class="btn btn-danger" onclick="deleteFavourite('${key}',this)">Sterge de la favorite</button>
         </div>
       </div>
     </div>
    `
}

function deleteFavourite(key, button) {
    document.getElementById('row').removeChild(button.parentElement.parentElement.parentElement);
    var favouritesRef = database.ref('favourites/' + firebase.auth().currentUser.uid + `/` + key).set({});

}

function searchFunction() {
    var search = document.getElementById('search');
    var filter = search.value.toUpperCase();
    var list = document.getElementsByClassName('card-title');
    for (i = 0; i < list.length; i++) {
        if (list[i].innerText.toUpperCase().indexOf(filter) > -1) {
            list[i].parentElement.parentElement.parentElement.style.display = "";
        } else {
            list[i].parentElement.parentElement.parentElement.style.display = "none";
        }
    }
}


function selectCategory() {
    var selectCategory = document.getElementById(`homePageCategorySelection`);
    selectCategory.options[selectCategory.selectedIndex].value;
    var categoryDivs = document.getElementsByClassName(`category`);

    for (i = 0; i < categoryDivs.length; i++) {
        if (selectCategory.options[selectCategory.selectedIndex].value === `Toate categoriile`) {
            categoryDivs[i].parentElement.parentElement.parentElement.style.display = "";
        } else if (selectCategory.options[selectCategory.selectedIndex].value === `${categoryDivs[i].innerHTML}`) {
            categoryDivs[i].parentElement.parentElement.parentElement.style.display = "";
        } else {
            categoryDivs[i].parentElement.parentElement.parentElement.style.display = "none";
        }
    }
}

function fetchFavourites() {

    userId = firebase.auth().currentUser.uid;
    fetch(`https://magazin-online-f81cb.firebaseio.com/favourites/${userId}.json`)
        .then(data => {
            return data.json();
        })
        .then(data2 => {
            document.getElementById(`row`).innerHTML = "";
            for (let i in data2) {
                document.getElementById(`row`).innerHTML += adCard(data2[i], i);
            }
        })
}