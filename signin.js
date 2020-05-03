firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        document.getElementById("activeUser").style.display = "block";
        document.getElementById("inActiveUser").style.display = "none";
        document.getElementById("postad").style.display = "block";
        document.getElementById("userProfile").innerHTML = firebase.auth().currentUser.displayName;
    } else {

    }
});

function signIn() {
    signInSuccessfull = true;
    var form = document.getElementById("signInForm");
    var email = form.email.value;
    var password = form.password.value;
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        document.getElementById("wrongInfo").style.display = "block";
        document.getElementById("wrongInfo").innerHTML = errorMessage;
        signInSuccessfull = false;
    }).then(
        () => {
            if (signInSuccessfull === true) {
                document.getElementById("signInSuccessfull").style.display = "block";
                document.getElementById("signInSuccessfull").innerHTML = "Conectare cu succes";
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

function goToSignUp() {
    window.location.href = "signup.html";
}