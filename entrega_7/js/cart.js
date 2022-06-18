let porcentaje = 0;

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

function calcularEnvio() {
    for (let i = 0; i < articulo.length; i++) {
        let article = articulo[i];

        let costoEnvioHTML = document.getElementById("envio");
        let totalCostHTML = document.getElementById("costoTotal");
        let cantidad = document.getElementById("countInput").value;

        let unitCostToShow = Math.round(article.unitCost * cantidad);
        let costoEnvio = Math.round(unitCostToShow * porcentaje);

        costoEnvioHTML.innerHTML = article.currency + " " + costoEnvio;
        totalCostHTML.innerHTML = article.currency + " " + Math.round(unitCostToShow + costoEnvio);
    }
}

function validar() {
    var cant = document.getElementById("countInput").value;
    var cred = document.getElementById("credito").checked;
    var transf = document.getElementById("banco").checked;
    var pre = document.getElementById("premium").checked;
    var exp = document.getElementById("express").checked;
    var stan = document.getElementById("estandar").checked;
    
    if (cant >= 1 && (cred || transf) && (pre || exp || stan)) {
        alert("¡Su compra ha sido procesada con éxito!")
    }
    else {
        alert("¡Ha ocurrido un error! Verificar que todos los campos están completos");
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
        }

        document.getElementById("countInput").addEventListener("change", function () {
            actualizoSubtotal();
            subtotalFinal();
        })
    })

    document.getElementById("premium").addEventListener("change", function () {
        porcentaje = 0.15;
        calcularEnvio();
    })

    document.getElementById("express").addEventListener("change", function () {
        porcentaje = 0.07;
        calcularEnvio();
    })

    document.getElementById("estandar").addEventListener("change", function () {
        porcentaje = 0.05;
        calcularEnvio();
    })

    document.getElementById("finalizarCompra").addEventListener("click", function () {
        validar();
    })
})