const URL = 'http://localhost:3000'

export const createProduct = async (product) => {
    try {
        const response = await fetch(`${URL}/productos`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(product)
        });
        const createdProduct = await response.json();
        return createdProduct;
    } catch(e){
        console.log("Error: ", e)
    }
}

export const updateProduct = async(product) => {
    try {
            const response = await fetch(`${URL}/productos/${product.id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(product)
        });
        const updatedProduct = await response.json();
        return updatedProduct;
    } catch(e){
        console.log("Error: ", e)
    }
}

export const listProducts = async () => {
    try {
        const response = await fetch('http://localhost:3000/productos');
        const productsData = await response.json();
        return productsData;
    } catch(e) {
        console.log("Error: ", e)
    }
}


export const deleteProduct = async(id) => {
    try {
        const response = await fetch(`${URL}/productos/${id}`, {
        method: 'DELETE',
    });
    return await response.json();
    
    } catch(e){
        console.log("Error: ", e)
    }
    
}