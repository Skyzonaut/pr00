// document.addEventListener("keydown", function(event){
//     if(document.getElementById("calculettePartial").classList.contains("show")) {
//         const affichage = document.getElementById("caisse-ecran");
//         const key = event.key;
//         console.log(key)
//         switch (key) {
//             case "Enter":
//                 affichage.value = eval(affichage.value.replace(",","."));
//                 break;
//             case "Backspace":
//                 affichage.value = affichage.value.substring(0, affichage.value.length-1);
//                 break;
//             case "Delete":
//                 affichage.value = "";
//                 break;
//             default:
//                 console.log("test")
//                 if(key.match(/[0-9\/*\-+.,]/)){
//                     affichage.value += key;
//                 }
//                 break;
//         }
//     }
// });
//
// function updateCalcul(event) {
//     if(document.getElementById("calculettePartial").classList.contains("show")) {
//         const affichage = document.getElementById("caisse-ecran");
//         const target = event.target.id.replace("caisse-", "");
//         switch (target) {
//             case "CE":
//                 affichage.value = "";
//                 break;
//             case "DEL":
//                 affichage.value = affichage.value.substring(0, affichage.value.length - 1);
//                 break;
//             case "entrer":
//                 try {
//                     affichage.value = eval(affichage.value.replace(",", "."));
//                 } catch (error) {
//                     alert("Erreur de calcul")
//                 }
//                 break;
//             case "ecran":
//                 break;
//             default:
//                 affichage.value += target;
//                 break;
//         }
//     }
// }

function ajouterLigne(event) {
    if(event.keyCode === 13){
        const tr = $('<tr></tr>')
        for(let i = 0; i < 5; i++) {
            const td = $('<td><input class="input-tableau-caisse" type="text"/></td>');
            tr.append(td);
        }
        $("#table-article-caisse > tbody").append(tr);
    }
}

function supprimerLigne(event) {
    if(event.keyCode === 46) {
        if($("#table-article-caisse > tbody").children().length > 1) {
            $("#table-article-caisse > tbody").children().last().remove();
        } else {
            $("#table-article-caisse > tbody").children().last().remove();
            const tr = $('<tr></tr>')
            for(let i = 0; i < 5; i++) {git
                const td = $('<td><input class="input-tableau-caisse" type="text"/></td>');
                tr.append(td);
            }
            $("#table-article-caisse > tbody").append(tr);
        }
    }
}






