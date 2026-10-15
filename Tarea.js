function Tarea  (titulo, descripcion = "", estado = "Pendiente", dificultad = "Fácil", vencimiento = "") {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.estado = estado;
        this.dificultad = dificultad;
        this.vencimiento = vencimiento;
        this.fecha = new Date().toLocaleDateString();
        this.ultimaEdicion = this.fecha;
    }

   Tarea.prototype.mostrarDetalles = function(){
        console.log(`\n--- Detalles ---`);
        console.log(`Título: ${this.titulo}`);
        console.log(`Descripción: ${this.descripcion}`);
        console.log(`Estado: ${this.estado}`);
        console.log(`Última Edición: ${this.ultimaEdicion}`);
        console.log(`----------------`);
    };

    Tarea.prototype.editar = function(nuevoTitulo, nuevaDesc, nuevoEstado) {
      const procesarcambio = (nuevovalor, valorantiguo) => {
          if (nuevoTitulo && nuevoTitulo !== " ") this.titulo = nuevoTitulo;
        if (nuevaDesc) this.descripcion = nuevaDesc === " " ? "" : nuevaDesc;
        if (nuevoEstado) this.estado = nuevoEstado === " " ? "" : nuevoEstado;
      };
this.titulo = procesarCambio(nuevoTitulo, this.titulo);
    this.descripcion = procesarCambio(nuevaDesc, this.descripcion);
    this.estado = procesarCambio(nuevoEstado, this.estado);
    this.dificultad = procesarCambio(nuevaDif, this.dificultad);
    this.vencimiento = procesarCambio(nuevoVenc, this.vencimiento);

        this.ultimaEdicion = new Date().toLocaleDateString();
        console.log("\nDatos guardados");
    }


// para que otros archivos puedan usarla
module.exports = Tarea;