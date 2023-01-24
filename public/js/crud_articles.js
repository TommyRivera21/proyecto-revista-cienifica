$(document).ready(function () {
    $("#table").DataTable({
      pageLength: 5,
      lengthMenu: [
        [5, 10, 20, -1],
        [5, 10, 20, "Todos"],
      ],
      language: {
        lengthMenu: "Mostrar _MENU_ productos",
        zeroRecords: "No se encontraron resultados",
        info: "Mostrando articulos del _START_ al _END_ de un total de _TOTAL_ articulos",
        infoEmpty: "Mostrando articulos del 0 al 0 de un total de 0 articulos",
        infoFiltered: "(filtrado de un total de _MAX_ articulos)",
        sSearch: "Buscar:",
        oPaginate: {
          sFirst: "Primero",
          sLast: "Último",
          sNext: "Siguiente",
          sPrevious: "Anterior",
        },
        sProcessing: "Procesando...",
      },
    });
  });
  
  function confirmar(id) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-danger mx-2",
        cancelButton: "btn btn-info mx-2",
      },
      buttonsStyling: false,
    });
  
    swalWithBootstrapButtons
      .fire({
        title: "Esta seguro de eliminar este articulo " + id + " ?",
        text: "No podras revertir esta operación!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, Eliminar!",
        cancelButtonText: "Cancelar",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            "Eliminado!",
            "El registro ha sido eliminado de la base de datos",
            "success"
          );
  
          const myCallback = () => (window.location = "/delete/" + id);
          setTimeout(myCallback, 1500);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Cancelado",
            "La operación ha sido cancelada",
            "info"
        );
      }
    });
}
