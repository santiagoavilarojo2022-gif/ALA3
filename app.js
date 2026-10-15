// app.js
const prompt = require('prompt-sync')();
const GestorDeTareas = require('./GestorDeTareas'); // Importamos solo el Gestor

function iniciarApp() {
    const gestor = new GestorDeTareas();
    let op;

    const manejarEdicion = (tarea) => {
        let opEditar = prompt("¿Deseas editar esta tarea? (S/N): ");
        if (opEditar.toLowerCase() === 's') {
            console.log('\nSi queres mantener los datos como están, déjalo en blanco (Enter).');
            console.log('Si qeures dejar en blanco un atributo, espacio y Enter.');
            
            let titulo = prompt(`1. Ingresa el título (Actual: ${tarea.titulo}): `);
            if (titulo === " ") {
                console.log("El título no puede quedar vacío. Se mantendrá el anterior.");
                titulo = "";
            }
            let desc = prompt(`2. Ingresa la descripción (Actual: ${tarea.descripcion}): `);
            let estado = prompt(`3. Estado (Actual: ${tarea.estado}): `);
            let dif = prompt(`4. Dificultad (Actual: ${tarea.dificultad}): `);
            let venc = prompt(`5. Vencimiento (Actual: ${tarea.vencimiento}): `);
            
            tarea.editar(titulo, desc, estado, dif, venc);
            prompt("Presiona enter para continuar");
        }
    };

    const mostrarYSeleccionar = (lista, tituloLista) => {
        if (lista.length === 0) {
            console.log(`No hay tareas en la categoría: ${tituloLista}`);
            return;
        }
        console.log(`\n--- ${tituloLista} ---`);
        for (let i = 0; i < lista.length; i++) {
            console.log(`[${i + 1}] ${lista[i].titulo}`);
        }
        
        let seleccion = parseInt(prompt("Introduce el número para ver detalles o 0 para volver.\n> "));
        if (seleccion > 0 && seleccion <= lista.length) {
            let tareaSeleccionada = lista[seleccion - 1];
            tareaSeleccionada.mostrarDetalles();
            manejarEdicion(tareaSeleccionada);
        }
    };

    console.log("Hola, ¿qué deseas?");
    do {
        console.log("\n----MENU-----");
        console.log("[1] Ver tareas");
        console.log("[2] Buscar Tarea");
        console.log("[3] Agregar tarea");
        console.log("[0] Salir");
        op = parseInt(prompt("> "));

        switch (op) {
            case 1:
                let opVer;
                do {
                    console.log("\n¿Qué tareas deseas ver?");
                    console.log("[1] Todas\n[2] Pendientes\n[3] En curso\n[4] Terminadas\n[0] Volver");
                    opVer = parseInt(prompt("> "));
                    
                    switch (opVer) {
                        case 1: mostrarYSeleccionar(gestor.obtenerTodas(), "TODAS LAS TAREAS"); break;
                        case 2: mostrarYSeleccionar(gestor.obtenerPorEstado("pendiente"), "TAREAS PENDIENTES"); break;
                        case 3: mostrarYSeleccionar(gestor.obtenerPorEstado("en curso"), "TAREAS EN CURSO"); break;
                        case 4: mostrarYSeleccionar(gestor.obtenerPorEstado("terminada"), "TAREAS TERMINADAS"); break;
                    }
                } while (opVer !== 0);
                break;

            case 2:
                let nombreBuscar = prompt('Ingrese el nombre de la tarea que desea buscar: ');
                let resultados = gestor.buscarPorTitulo(nombreBuscar);
                mostrarYSeleccionar(resultados, "RESULTADOS DE BÚSQUEDA");
                break;

            case 3:
                console.log("\n--- NUEVA TAREA ---");
                let titulo;
                do {
                    titulo = prompt('Ingrese el título de la tarea (Obligatorio): ');
                    if (titulo === "") console.log("Error: El título no puede estar vacío.");
                } while (titulo === "");

                let descripcion = prompt('Ingrese la descripción (opcional): ');
                
                let estado = prompt('Ingrese el estado (Pendiente, En curso, Terminada): ');
                if (estado === "") estado = "pendiente";
                
                let dificultad = prompt('Ingrese la dificultad (Fácil, Medio, Difícil): ');
                if (dificultad === "") dificultad = "Fácil";
                
                let vencimiento = prompt('Ingrese la fecha de vencimiento (opcional): ');

                gestor.agregar(titulo, descripcion, estado, dificultad, vencimiento);
                console.log('\nTarea agregada correctamente');
                break;

            case 0:
                console.log('Adios...');
                break;
            default:
                console.log('Opción inválida..');
                break;
        }
    } while (op !== 0);
}

iniciarApp();