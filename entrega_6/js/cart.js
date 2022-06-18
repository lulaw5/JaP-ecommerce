function muestroArticulos() {
    let htmlContentToAppend = "";
    for (let i = 0; i < articulo.length; i++) {
        let article = articulo[i];

        htmlContentToAppend += `
                <div class="row">
                    <p class="col"><img src="` + article.src + `" class="img-thumbnail"></p>
                    <p class="col">`+ article.name + `</p>
                    <p class="col" id="unitCost">` + article.currency + ` ` + article.unitCost + `</p>
                    <p class="col"><input type="number" class="form-control" min= 0 name="cantidad" value="`+ article.count + `" id="countInput"></input></p>
                    <p class="col"><span id="subtotal">` + article.currency + ` ` + article.unitCost * article.count + `</span></p>
                </div>
                `;
        document.getElementById("carrito").innerHTML = htmlContentToAppend;
        document.getElementById("subtotalTotal").innerHTML += article.unitCost * article.count;
    }
}

function actualizoSubtotal() {
    for (let i = 0; i < articulo.length; i++) {
        let article = articulo[i];
        let cantidad = document.getElementById("countInput").value;
        let subtotalHTML = document.getElementById("subtotal");
        let subtotalToShow = article.unitCost * cantidad;

        subtotalHTML.innerHTML = article.currency + " " + subtotalToShow;
    }
}

function subtotalFinal() {
    for (let i = 0; i < articulo.length; i++) {
        let article = articulo[i];
        let cantidad = document.getElementById("countInput").value;
        let unitProductCostHTML = document.getElementById("subtotalTotal");
        let unitCostToShow = article.unitCost * cantidad;

        unitProductCostHTML.innerHTML = article.currency + " " + unitCostToShow;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes. 
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            cart = resultObj.data;
            articulo = cart.articles;
            muestroArticulos();
        };

        document.getElementById("countInput").addEventListener("change", function () {
            actualizoSubtotal();
            subtotalFinal();
        });
    });
});

// function mostrarArticulo() {
//     let htmlContentToAppend = "";
//     for (let i = 0; i < cart.length; i++) {
//         let article = cart[i];

//         htmlContentToAppend += `
//                 <div class="row">
//                     <p class="col"><img src="` + article.src + `" class="img-thumbnail"></p>
//                     <p class="col">`+ article.name + `</p>
//                     <p class="col" id="unitCost">` + article.currency + ` ` + article.unitCost + `</p>
//                     <p class="col"><input type="number" class="form-control" min= 0 name="cantidad" value="`+ article.count + `" id="` + i + `"></input></p>
//                     <p class="col"><span id="subtotal` + i + `">` + article.currency + ` ` + article.unitCost * article.count + `</span></p>
//                 </div>
//                 `
//     }
//     document.getElementById('carrito').innerHTML = htmlContentToAppend;
// }

// function subtotal() {
//     for (let i = 0; i < cart.length; i++) {
//         let countInput = document.getElementById(i)
//         countInput.addEventListener('input', function () {
//             let total = (cart[i].currency + ' ' + cart[i].unitCost * countInput.value);
//             document.getElementById('subtotal' + i).innerHTML = total;
//         })
//     }
// }

// function subtotalFinal() {
//     for (let i = 0; i < cart.length; i++) {
//         let unitProductCost = document.getElementById(i);
//         unitProductCost.addEventListener('input', function () {
//             let totalFinal = (cart[i].currency + ' ' + cart[i].unitCost * countInput.value);
//             document.getElementById('subtotalTotal').innerHTML = totalFinal;
//         })
//     }
// }

// //Función que se ejecuta una vez que se haya lanzado el evento de
// //que el documento se encuentra cargado, es decir, se encuentran todos los
// //elementos HTML presentes.
// document.addEventListener("DOMContentLoaded", function (e) {
//     getJSONData('https://japdevdep.github.io/ecommerce-api/cart/654.json').then(function (resultObj) {
//         if (resultObj.status === "ok") {
//             cart = resultObj.data.articles;
//             mostrarArticulo();
//             subtotal();
//             subtotalFinal();
//         }
//     })
// });