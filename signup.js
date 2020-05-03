firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        document.getElementById("activeUser").style.display = "block";
        document.getElementById("inActiveUser").style.display = "none";
        document.getElementById("postad").style.display = "block";
        document.getElementById("userProfile").innerHTML = firebase.auth().currentUser.displayName;
    } else {

    }
});

var database = firebase.database();

function signUp() {
    var successful = true;
    var form = document.getElementById("signUpForm");
    var userName = form.userName.value;
    var email = form.email.value;
    var password = form.password.value;
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        successful = false;
        document.getElementById("alreadyAccount").style.display = "block";
        document.getElementById("alreadyAccount").innerHTML = errorMessage;


    }).then(() => {
        var uid = firebase.auth().currentUser.uid
        var newUserRef = database.ref(`users/${uid}`).push();
        newUserRef.set({
            userName: userName,
            email: email,
            password: password,
            uid: uid
        })
    }).then(
        () => {
            var user = firebase.auth().currentUser;
            user.updateProfile({
                displayName: userName,
            }).then(function() {}).catch(function(error) {

            });
        }
    ).then(
        () => {
            if (successful === true) {
                document.getElementById("accountRegistered").style.display = "block";
                document.getElementById("accountRegistered").innerHTML = "Inregistrare cu succes";
            }
        }
    ).then(
        () => {

            setTimeout(function() {
                var user = firebase.auth().currentUser;
                if (user !== null) {
                    window.location.href = "index.html";
                }
            }, 3000);

        }
    )
}

function goToSignIn() {
    window.location.href = "signin.html";
}