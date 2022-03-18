//CLASE CONSTRUCTORA DEL PRODUCTO
class producto {
    constructor (idNombre, variableBtn,nombre, precio,imgSrc,idBorrado){
        this.idNombre = idNombre;
        this.variableBtn = variableBtn;
        this.nombreProducto = nombre ;
        this.precio = parseFloat(precio);
        this.imgSrc = imgSrc;
        this.idBorrado = idBorrado;
        this.talle = ""
        this.cantidad = 1;
    }
}


//PRODUCTOS
const conTitular = new producto ("conTitular","btnConTitular","conjunto titular", 2000, "../images/conjuntoTitular.jpeg","borrarConTitular");
const conSuplente = new producto("conSuplente","btnConSuplente","conjunto suplente", 1800, "../images/conjuntoSuplente.jpeg","borrarConSuplente");
const conArquero = new producto ("conArquero","btnConArquero","conjunto de arquero", 1600, "../images/conjuntoArquero.jpeg","borrarConArquero");
const conArqueroAlternativo = new producto("conArqueroAlternativo","btnConArqueroAlt","conjunto de arquero alternativo", 1500, "../images/conjuntoArqueroAlt.jpeg","borrarConArqueroAlt");
const conAlternativo = new producto("conAlternativo","btnConAlt","conjunto alternativo", 1500, "../images/conjuntoAlternativo.jpeg","borrarConAlt");
const conVeranoNegro = new producto("conVeranoNegro","btnConVerano","conjunto de verano negro", 1600, "../images/conjuntoVerano.jpeg","borrarConVerano");
const conVeranoBlanco = new producto ("conVeranoBlanco","btnConVeranoAlt","conjunto de verano blanco", 1400, "../images/conjuntoVeranoAlt.jpeg","borrarConVeranoAlt");
const conInvierno = new producto("conInvierno","btnConInvierno","conjunto de invierno", 2000, "../images/conjuntoInvierno.jpeg","borrarConInvierno");
const buzo = new producto ("buzo","btnBuzo","Buzo", 700, "../images/buzo.jpeg","borrarBuzo");
const conAlternativoBlanco = new producto ("conAlternativoBlanco","btnConAlternativoBlanco","conjunto alternativo blanco", 1400, "../images/conjuntoVarianteBlanco.jpeg","borrarConAlternativoBlanco");
const conAlternativoNegro = new producto ("conAlternativoNegro","btnConAlternativoNegro","conjunto alternativo negro", 1400, "../images/conjuntoVarianteNegro.jpeg","borrarConAlternativoNegro");
const conVarianteNegro = new producto ("conVarianteNegro","btnConVarianteN2","conjunto variante negro", 1400, "../images/conjuntoVarianteNegro2.jpeg","borrarConVarianteN2");

const productosTodos = [conTitular, conSuplente, conArquero, conArqueroAlternativo, conAlternativo, conVeranoNegro, conVeranoBlanco, conInvierno, buzo, conAlternativoBlanco, conAlternativoNegro, conVarianteNegro];



//COMIENZA LA FUNCION READY().
$(()=>{

    // ARMANDO EL HTML EN BASE A LOS PRODUCTOS
    for (let i = 0; i < productosTodos.length; i++) {
        const element = productosTodos[i];
        const divProducto = `
        <div class= "producto">
            <div class="productoImagen">
                <img src=${element.imgSrc} class="imgProducto" alt=${element.nombreProducto}>
            </div>
            <div class="productoDatos">
                <div class="productoTitulo"><h2>${element.nombreProducto}</h2></div>
                <div class="productoPrecio">Precio: $${element.precio}</div>
                <button class="productoBoton" id=${productosTodos[i].variableBtn}>Agregar al carrito <i class="fas fa-cart-plus"></i></button>
            </div>
        </div>`
        $(".gridGaleria").append(divProducto)
    }


    // BOTONES EN HTML
    const btnConTitular = $("#btnConTitular");
    const btnConSuplente = $("#btnConSuplente");
    const btnConArquero = $("#btnConArquero");
    const btnConArqueroAlt = $("#btnConArqueroAlt");
    const btnConAlt = $("#btnConAlt");
    const btnConVerano = $("#btnConVerano");
    const btnConVeranoAlt = $("#btnConVeranoAlt");
    const btnConInvierno = $("#btnConInvierno");
    const btnBuzo = $("#btnBuzo");
    const btnConAlternativoBlanco = $("#btnConAlternativoBlanco");
    const btnConAlternativoNegro = $("#btnConAlternativoNegro");
    const btnConVarianteN = $("#btnConVarianteN2");

    const carritoBotones = [btnConTitular,btnConSuplente,btnConArquero,btnConArqueroAlt,btnConAlt,btnConVerano,btnConVeranoAlt,btnConInvierno,btnBuzo,btnConAlternativoBlanco,btnConAlternativoNegro,btnConVarianteN];
    

    // VARIABLES PARA EL CARRITO
    var carrito = [];
    let listaProductos = [];

    const btnVaciarCarrito = $("#botonVaciarCarrito");
    btnVaciarCarrito.on("click",() =>vaciarCarrito());

    const btnComprar = $("#botonComprar");
    btnComprar.on("click", () => comprar());

    // VARIABLE PARA EL PRECIO
    let total= 0;
    let monedaActual = "ARS"
    let monedaAConvertir = "EUR"

    //LA API CAMBIO DE DIVISAS
    const apiKey = "2bfa0fe62b98d3ebd40e6d96";
    let urlApi = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${monedaActual}`;



    //ACTUALIZA EL CARRITO Y EL DOM EN BASE AL LOCAL STORAGE
    recuperarStorage();


    // BOTONES "AGREGAR AL CARRITO"
    for (let i = 0; i < carritoBotones.length; i++) {
        const boton = carritoBotones[i];
        const producto = productosTodos[i];
        boton.on("click", () => agregarAlCarrito(producto))
    }


    //FUNCION DEL EVENTO EN BOTONES "AGREGAR AL CARRITO"
    function agregarAlCarrito(producto){
        $(".antesDeCompra").show();
        $(".despuesDeCompra").hide();
        //COMPRUEBA SI EL PRODUCTO YA ESTÁ EN EL CARRITO LE SUMA AL VALOR "CANTIDAD" DE DICHO PRODUCTO
        comprobarProducto(producto);
        // SI NO ESTÁ, LO AGREGA AL CARRITO
        if (esProductoIgual == false) {
            carrito.push(producto);
        }
        esProductoIgual = false;
        MostrarCarrito();
        agregarAlStorage();
        crearBotonesBorrar();
    }


    // VERIFICA SI EL PRODUCTO INGRESADO YA ESTABA EN EL CARRITO
    let esProductoIgual = false;
    function comprobarProducto (productoIngresado) {
        for (const producto of carrito) {
            if (productoIngresado.nombreProducto == producto.nombreProducto) {
                producto.cantidad ++;
                esProductoIgual = true;
                break;
            }
            else{
                esProductoIgual = false;
            }
        }
    }


    //CREA LA LISTA DE PRODUCTOS EN BASE AL ARRAY CARRITO
    function crearListaProductos() {
        listaProductos = [];
        for (const producto of carrito) {
            let li= `
            <div class="row flex-row liCarrito">
                <div class="col-6">
                    <div class="d-flex align-items-center h-100 border-bottom pb-4 pt-4">
                        <img src="${producto.imgSrc}" class="imgCarrito ms-3" alt="${producto.nombreProducto}">    
                        <p class="ms-3">${producto.nombreProducto}</p>
                    </div>
                </div>
                <div class="col-2">
                    <div class="d-flex align-items-center h-100 border-bottom pb-4 pt-4">
                        <p>${producto.precio}</p>
                    </div>
                </div>
                <div class="col-4" >
                    <div
                        class="d-flex justify-content-between align-items-center h-100 border-bottom pb-4 pt-4 me-4">
                        <input class="cambiarCantidad" type="number" value="${producto.cantidad}" id="${producto.idNombre}">
                        <button class="btn btn-danger" id="${producto.idBorrado}" type="button">X</button>
                    </div>
                </div>
            </div>`
            listaProductos.push(li);
        }
    } 


    //Mostrar el carrito en el HTML
    function MostrarCarrito() {
        crearListaProductos();
        $("#lineasCarrito").html(listaProductos.join(" "));
        precioFinal();
        selectorCantidad();
    }


    //CREA LOS BOTONES PARA BORRAR EL PRODUCTO
    crearBotonesBorrar();
    function crearBotonesBorrar(){
        for (let i = 0; i < carrito.length; i++) {
            const idBorrado = carrito[i].idBorrado;
            const boton = $(`#${idBorrado}`);
            boton.on("click",() => borrarProducto(i))
        }
    }


    //BORRA EL PRODUCTO
    function borrarProducto (indexProducto){
        carrito.splice(indexProducto,1)
        MostrarCarrito();
        crearBotonesBorrar();
        agregarAlStorage();
        restaurarProductos();
    }


    //VACÍA EL CARRITO Y MUESTRA MENSAJE
    function comprar(){
        if (total == 0){
            alert ("Para comprar tienes que agregar algun producto al carrito")
        }
        else{
            carrito =[];
        MostrarCarrito();
        total = 0;
        restaurarProductos();
        localStorage.removeItem("carrito");
        
        // ANIMACIÓN PARA LA COMPRA
        $(".antesDeCompra").hide();
        $(".despuesDeCompra").fadeIn("slow");
        }
    }


    // VACIAR CARRITO
    function vaciarCarrito (){
        $(".liCarrito").fadeOut(800, () =>{
            carrito =[];
            MostrarCarrito();
            total = 0;
            restaurarProductos();
            localStorage.removeItem("carrito");
        })
        
    }


    //CÁLCULO DEL PRECIO FINAL
    function precioFinal () {
        monedaActual = "ARS"
        $("#precioEuros").html(`Ver precio €`)
        total = 0
        for (const producto of carrito) {
            total += (producto.precio * producto.cantidad);
        }
        precioHTML = `$${total}`;
        $("#total").html(precioHTML);
    }


    //BOTON VER PRECIO EN EUROS
    $("#precioEuros").on("click", convertir);

    function convertir() {
        $.ajax({
            type: "GET",
            url:urlApi,
            success: (response) => {
                let precioAConvertir = (total * response.conversion_rates[`${monedaAConvertir}`]);
                var totalConvertido = precioAConvertir.toFixed(2);
                cambioDeMoneda();
                convertirTotal(totalConvertido);
            },
            error: () =>{
                console.log("sucedió un error en el cambio de divisas, por favor inténtalo nuevamente.");
            }
        })
    }


    // MUESTRA EN EL HTML EL TOTAL DEPENDIENDO EL TIPO DE MONEDA AL QUE SE CAMBIÓ E INVIERTE EL BOTON DE CAMBIO DE MONEDA
    function convertirTotal(totalConvertido) {
        if (monedaActual == "ARS") {
            precioHTML = `$${totalConvertido}`;
            $("#total").html(precioHTML);
            $("#precioEuros").html(`Ver precio €`)
            
        }
        else{
            precioHTML = `${totalConvertido}€`
            $("#total").html(precioHTML);
            $("#precioEuros").html(`Ver precio ARS`)
        }
    }


    //CAMBIA DE MONEDA
    function cambioDeMoneda() {
        if (monedaActual == "ARS") {
            monedaActual = "EUR"
        monedaAConvertir = "ARS"
        }
        else{
            monedaActual = "ARS"
        monedaAConvertir = "EUR"
        }        
    }


    // BORRAR LAS CANTIDADES AGREGADAS A LOS PRODUCTOS
    function restaurarProductos() {
        for (const producto of productosTodos) {
            producto.cantidad = 1;
        }
    }


    function agregarAlStorage() {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }


    function recuperarStorage() {
        let carritoRecuperado = JSON.parse(localStorage.getItem("carrito"));
        if (carritoRecuperado != null) {
            carrito = carritoRecuperado;
            crearListaProductos();
            MostrarCarrito();
        }
    }


    //SE AGREGA ONCHANGE A LOS SELECTORES DE CANTIDAD
    function selectorCantidad() {
            const selectorCantidad = $(".cambiarCantidad");
            selectorCantidad.on("change", actualizarCantidad);
        
    }


    //ACTUALIZA LA CANTIDAD DEL PRODUCTO SELECCIONADO
    function actualizarCantidad(e) {
        var selector= e.target;
        selector.value <= 0 ? (selector.value=1) : null;
        for (const producto of carrito) {
            if (producto.idNombre == selector.id){
                producto.cantidad = selector.value;
                precioFinal();
            }
        }
    }

})