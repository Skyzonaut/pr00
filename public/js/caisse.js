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

/*const listArticles = fetch("/caisse/articles/")
    .then(response => {
        console.log(response)
    })
    .catch(err => {
        console.log(err)
    })*/

function calculerTotal() {
    const body = $("#table-article-caisse > tbody");
    let total = 0;
    body.children().each(function(i) {
        total += parseFloat($(this).children().last().children()[0].innerHTML.split(' '[0]))
    })
    $("#prix-total-caisse")[0].innerHTML = total.toFixed(2);
    if(total != 0) {
        $("#modalMontant").text(total.toFixed(2));
    }
    else {
        $("#modalMontant").text("0");
    }

}
function calculerSousTotal(el) {
    const tr = $(el).parent().parent();
    const sousTotal = tr.children().last().children().first()[0];
    const qte = tr.children().eq(2).children().eq(0)[0].value;
    const prix = tr.children().eq(3).children().eq(0)[0].value;
    if(qte !== "" && prix !== "") {
        sousTotal.innerHTML = `${(parseFloat(qte) * parseFloat(prix)).toFixed(2)}`;
    }
    else {
        sousTotal.innerHTML = `0`;
    }
    calculerTotal();
}

let nbLigne = 0;

function creerLigne() {
    const table = $("#table-article-caisse > tbody");
    const tr = $(`<tr id="tr-${nbLigne}"></tr>`)
        .append($(`<td><input class="input-tableau-caisse" id="code-${nbLigne}" type="text"/></td>`))
        .append($(`<td><input class="input-tableau-caisse" id="nom-${nbLigne}" type="text"/></td>`))
        .append($(`<td><input class="input-tableau-caisse" id="qte-${nbLigne}" onchange="calculerSousTotal(this)" type="number"/></td>`))
        .append($(`<td><input class="input-tableau-caisse" id="prix-${nbLigne}" onchange="calculerSousTotal(this)" type="number" step="0.01"/></td>`))
        .append($(`<td><span id="sous-total-${nbLigne}">0</span><span> €</span></td>`));
    table.append(tr);
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

function payerEC(el, type) {
    let body = {
        article: $(el).children().eq(0).find("input").val(),
        quantite: $(el).children().eq(2).find("input").val(),
        client: "",
        prix: $(el).children().eq(4).find("span[id^='sous-total-']").text(),
        moyenPairement: type,
        permanencier: 1,
    }
    body.moyenPairement === "Espèce"
        ? body.client = $("#emetteurE").val()
        : body.client = $("#emetteurC").val()

    if(body.client === undefined) body.client = "Anonyme";

    fetch("/caisse/vente", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(body)
    }).then((response) => console.log(response))
        .catch((err) => console.log(err));
}

function journalVentes(offset) {
    fetch("/caisse/journal/"+offset, {
        headers: {
            'Accept': 'text/html',
            'Content-Type': 'text/html'
        },
        method: "GET"
    }).then((res) => {return res}).catch((err) => {return null});
}






