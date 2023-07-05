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

function calculerTotal() {
    const body = $("#table-article-caisse > tbody");
    let total = 0;
    body.children().each(function(i) {
        total += parseFloat($(this).children().last().children()[0].innerHTML.split(' '[0]))
    })
    console.log(total)
    $("#prix-total-caisse")[0].innerHTML = total + " €";
}
function calculerSousTotal(el) {
    const tr = $(el).parent().parent();
    const sousTotal = tr.children().last().children().first()[0];
    const qte = tr.children().eq(2).children().eq(0)[0].value;
    const prix = tr.children().eq(3).children().eq(0)[0].value;
    if(qte !== "" && prix !== "") {
        sousTotal.innerHTML = `${parseFloat(qte) * parseFloat(prix)} €`;
    }
    else {
        sousTotal.innerHTML = `0 €`;
    }
    calculerTotal();
}

let nbLigne = 0;

function creerLigne() {
    const tr = $(`<tr id="tr-${nbLigne}"></tr>`)
        .append($(`<td><input class="input-tableau-caisse" id="code-${nbLigne}" type="text"/></td>`))
        .append($(`<td><input class="input-tableau-caisse" id="nom-${nbLigne}" type="text"/></td>`))
        .append($(`<td><input class="input-tableau-caisse" id="qte-${nbLigne}" onchange="calculerSousTotal(this)" type="number"/></td>`))
        .append($(`<td><input class="input-tableau-caisse" id="prix-${nbLigne}" onchange="calculerSousTotal(this)" type="number" step="0.01"/></td>`))
        .append($(`<td><div id="sous-total-${nbLigne}">0 €</div></td>`));
    $("#table-article-caisse > tbody").append(tr);
}

function ajouterLigne(event) {
    if(event.keyCode === 13){
        nbLigne++;
        creerLigne();
    }
}

function supprimerLigne(event) {
    if(event.keyCode === 46) {
        const body = $("#table-article-caisse > tbody");
        if(body.children().length > 1) {
            nbLigne--;
            body.children().last().remove();
        } else {
            body.children().last().remove();
            creerLigne()
        }
    }
}






