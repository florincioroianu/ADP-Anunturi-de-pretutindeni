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
        document.getElementById(`suh`).innerHTML = `Anunturile plasate de ${firebase.auth().currentUser.displayName}`
        fetchUserAds();
    } else {

    }
});

function signOut() {
    firebase.auth().signOut().then(function() {}).catch(function(error) {
        console.log(error);
    });
}

var database = firebase.database();
var userAds = database.ref("ads/");

function fetchUserAds() {
    userAds.on('child_added', function(data) {
        var a = data.val()

        var uid = a.uid;

        if (uid === firebase.auth().currentUser.uid) {
            adCard(data.val(), data.key);
            document.getElementById("row").innerHTML += adCard(data.val(), data.key);
        }
    });
}


function adCard(data, key) {
    return `
    <div class="cardstyling col-lg-4 col-sm-6 portfolio-item" id="adcard">
      <div class="card h-100" id="adcard">
        <img id="adimg" class="validate card-img-top" src=${data.url} />
        <div class="card-body text-center">
            <h3 id="adtitle" class="card-title">${data.title}</h3>
            <p id="addes" class="card-text">${data.description}</p>
            <h5 id="adPrice">RON ${data.price}</h5>
            <button type="button" class="btn btn-danger" onclick="deleteAd('${key}',this)">Sterge</button>
        </div>
      </div>
    </div>
  `
}


function deleteAd(key, button) {

    document.getElementById('row').removeChild(button.parentElement.parentElement.parentElement);
    database.ref('ads/' + `/` + key).set({});

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