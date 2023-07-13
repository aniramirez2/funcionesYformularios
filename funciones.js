import {listProducts, createProduct, updateProduct, deleteProduct} from './services/api.js';

let arrProductos = [];
const formulario = document.querySelector("form");
const updateProd = document.querySelector("#updateProduct")
let editButton = null;
let idSelectedProduct = null;

updateProd.addEventListener('click', async()=>{
    const formdata = new FormData(formulario);

    const jsonData = {};

    for (let [key, value] of formdata.entries()) {
        jsonData[key] = value;
    }
    jsonData['id'] = idSelectedProduct
    await updateProduct(jsonData)
})

document.addEventListener('click', (event) =>  {
    if(event.target.classList.contains('editProduct')) {
        idSelectedProduct = event.target.attributes['data-id'].value;
        const product = arrProductos.find(item => item.id == idSelectedProduct)
        
        document.getElementById("nombre").value = product.nombre;
        document.getElementById("precio").value = product.precio;
        document.getElementById("cantidad").value = product.cantidad;
        document.getElementById("categoria").value = product.categoria;
    }

    if(event.target.classList.contains('deleteProduct')) {
        idSelectedProduct = event.target.attributes['data-id'].value;
        deleteProduct(idSelectedProduct)
    }
})


const printProductos = async() => {
    arrProductos = await listProducts();
    let html = ``;
    arrProductos.forEach(item => {
        const li = `<li>
                        ${item.nombre} 
                        <button type="button" class="editProduct" data-id="${item.id}">
                            Editar
                        </button>
                        <button type="button" class="deleteProduct" data-id="${item.id}">
                            Eliminar
                        </button>
                    </li>`
        html += li
    });
    const ul = document.getElementById('listaProductos')
    ul.innerHTML = html;
    editButton = document.querySelector(".editProduct");

}



formulario.addEventListener('submit', async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const formdata = new FormData(formulario);

    const jsonData = {};

    for (let [key, value] of formdata.entries()) {
        jsonData[key] = value;
    }

    await createProduct(jsonData);
    printProductos();
});

printProductos();