// GestorDeTareas.js
const Tarea = require('./Tarea.js'); 

function GestorDeTareas() {
        this.listaTareas = [];
    }

    GestorDeTareas.prototype.agregar = function(titulo, descripcion, estado, dificultad, vencimiento) {
        const nuevaTarea = new Tarea(titulo, descripcion, estado, dificultad, vencimiento);
        this.listaTareas.push(nuevaTarea);
        console.log('\nTarea agregada correctamente');
    }

  GestorDeTareas.prototype.obtenerTodas = function() {
    return this.listaTareas;
  }
  GestorDeTareas.prototype.obtenerPorEstado = function(estadoBuscado) {
    return this.listaTareas.filter(tarea => tarea.estado === estadoBuscado);
};
GestorDeTareas.prototype.buscarPorTitulo = function(tituloBuscado) {
    return this.listaTareas.filter(tarea => tarea.titulo === tituloBuscado);
};
GestorDeTareas.prototype.obtenerTareaOriginal = function(tareaFiltrada) {
    return this.listaTareas.indexOf(tareaFiltrada);
};

// Exportamos el Gestor
module.exports = GestorDeTareas;