var product = {};
var commentArray = [];
var currentProductsArray = [];

function showImagesGallery(array) {

    for (let i = 0; i < array.length; i++) {
        let htmlContentToAppend = "";

        htmlContentToAppend += `
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
            </ol>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="` + array[0] + `" class="d-block w-100">
                </div>
                <div class="carousel-item">
                    <img src="` + array[1] + `" class="d-block w-100">
                </div>
                <div class="carousel-item">
                    <img src="` + array[2] + `" class="d-block w-100">
                </div>
                <div class="carousel-item">
                    <img src="` + array[3] + `" class="d-block w-100">
                </div>
                <div class="carousel-item">
                    <img src="` + array[4] + `" class="d-block w-100">
                </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Anterior</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Siguiente</span>
            </a>
        </div>
        `
        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

function showRelatedProductsList() {

    let htmlContentToAppend = "";
    for (let i = 0; i < currentProductsArray.length; i++) {
        let product = currentProductsArray[i];

        if (i == 1 || i == 3) {

            htmlContentToAppend += `
            <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block h-100 list-group-item list-group-item-action">
              <img src="` + product.imgSrc + `" alt="` + `" class="img-thumbnail">
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ product.name + " - " + product.currency + " " + product.cost + `</h4>
                        </div>
                    </div>
            </div>
            </div>
            `
        }
        document.getElementById("relatedProducts").innerHTML = htmlContentToAppend;
    }
};

function showCommentsList() {

    let htmlContentToAppend = "";
    for (let i = 0; i < commentArray.length; i++) {
        let comment = commentArray[i];
        var stars = `<span class="fa fa-star checked"></span>`
        {
            htmlContentToAppend += `
            <div class="">
                <div class="d-flex">                 
                    <div class="starsRating">` + stars.repeat(comment.score) + `</p>
                    </div>
                </div>
                <span class=""><strong>`+ comment.user + `</strong></span>
                <p class="mb-1"><em>` + comment.description + ` </em></p>
                <p class="mb-1">` + comment.dateTime + `</p>
                <hr>
            </div>
            `
        }
        document.getElementById("comentarios").innerHTML = htmlContentToAppend;
    }
};

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;

            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productSoldCountHTML = document.getElementById("productSoldCount");
            let productCriteriaHTML = document.getElementById("productCategory");
            let productCostHTML = document.getElementById("productCost");

            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productSoldCountHTML.innerHTML = product.soldCount;
            productCriteriaHTML.innerHTML = product.category;
            productCostHTML.innerHTML = product.currency + " " + product.cost

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
        };
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            commentArray = resultObj.data;

            showCommentsList();
        }
    });

    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentProductsArray = resultObj.data;
            showRelatedProductsList();
        }
    });
});