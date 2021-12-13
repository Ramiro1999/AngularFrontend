import { Component, OnInit} from '@angular/core';
import {Cliente} from './cliente';
import {ClienteService} from './cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
})
export class ClientesComponent implements OnInit{


  clientes: Cliente[];

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
     this.clienteService.getClientes().subscribe(
        clientes => this.clientes = clientes
     );
  }

  public delete(cliente: Cliente): void{
    const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
})

swalWithBootstrapButtons.fire({
  title: 'Estas seguro?',
  text: `Seguro que deseas eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
  icon: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Si, eliminar!',
  cancelButtonText: 'No, cancelar!',
  reverseButtons: true
}).then((result) => {
  if (result.value) {

    this.clienteService.delete(cliente.id).subscribe(
      response =>{
      this.clientes = this.clientes.filter(cli => cli != cliente) // se filtra y se genera un nuevo array que se va a mostrar sin el cliente eliminado
      swalWithBootstrapButtons.fire(
        'Eliminado!',
        `Cliente ${cliente.nombre} eliminado satisfactoriamente.`,
        'success'
        )
      }
    )

  }
})

  }

}
