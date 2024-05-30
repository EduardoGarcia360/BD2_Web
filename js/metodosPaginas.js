// metodo que se comunica con la base de datos
async function consultarBD(spName, spParams) {
    try {
        const response = await fetch('http://localhost:3000/executeSP', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ spName, spParams })
        });

        if (!response.ok) {
        throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

/***** SECCION PARA MARCAS *****/
async function guardarMarca(event) {
    // Prevenir el comportamiento predeterminado del formulario
    event.preventDefault();

    // Obtener los valores de los campos de entrada
    const codigo = document.getElementsByName('codigoMarca');
    const nombre = document.getElementsByName('descripcionMarca');
    console.log('CODIGO', codigo[0].value)
    console.log('NOMBRE', nombre[0].value)
    const response = await consultarBD('SP_MARCA_I', [codigo[0].value, nombre[0].value]);
	console.log('resultado', response);
}

async function listarMarca(event) {
    // Prevenir el comportamiento predeterminado del formulario
    event.preventDefault();
    setTimeout(async () => {
        const response = await consultarBD('SP_MARCA_S', []);
        console.log('resultado', response);
        var contenedorTabla  = document.getElementById("contenedorTablaMarca");
        contenedorTabla.innerHTML = '';
        console.log('contenedorTabla ', contenedorTabla )
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');

        thead.innerHTML = `
            <tr>
                <th>ID</th>
                <th>Descripción</th>
            </tr>
        `;
        response.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.mar_codmarca}</td>
                <td>${item.mar_nombre}</td>
            `;
            tbody.appendChild(row);
        });

        table.appendChild(thead);
        table.appendChild(tbody);
        contenedorTabla.appendChild(table);
    }, 1000);
}

/***** SECCION PARA CATEGORIAS *****/

/***** SECCION PARA PRODUCTO *****/

/***** SECCION PARA DETALLE INVENTARIO *****/

/***** SECCION PARA INVENTARIO *****/
