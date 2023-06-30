document.addEventListener("keydown", function(event){
    if(document.getElementById("calculettePartial").classList.contains("show")) {
        const affichage = document.getElementById("caisse-ecran");
        const key = event.key;
        console.log(key)
        switch (key) {
            case "Enter":
                affichage.value = eval(affichage.value.replace(",","."));
                break;
            case "Backspace":
                affichage.value = affichage.value.substring(0, affichage.value.length-1);
                break;
            case "Delete":
                affichage.value = "";
                break;
            default:
                console.log("test")
                if(key.match(/[0-9\/*\-+.,]/)){
                    affichage.value += key;
                }
                break;
        }
    }
});
function updateCalcul(event) {
    if(document.getElementById("calculettePartial").classList.contains("show")) {
        const affichage = document.getElementById("caisse-ecran");
        const target = event.target.id.replace("caisse-", "");
        switch (target) {
            case "CE":
                affichage.value = "";
                break;
            case "DEL":
                affichage.value = affichage.value.substring(0, affichage.value.length - 1);
                break;
            case "entrer":
                try {
                    affichage.value = eval(affichage.value.replace(",", "."));
                } catch (error) {
                    alert("Erreur de calcul")
                }
                break;
            case "ecran":
                break;
            default:
                affichage.value += target;
                break;
        }
    }
}
