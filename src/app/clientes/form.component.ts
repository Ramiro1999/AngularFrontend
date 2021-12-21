import { Component, OnInit } from '@angular/core';
import {Cliente} from './cliente'
import {ClienteService} from './cliente.service';
import {Router, ActivatedRoute} from '@angular/router';
import swal from 'sweetalert2';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

   cliente: Cliente = new Cliente()
   titulo: string = "Crear cliente"
   errores : string[];

  constructor(private clienteService: ClienteService, private router: Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarCliente() //este metodo va aca para que se muestren los datos del cliente en el formulario
  }


  public cargarCliente(): void{                    //se carga el cliente en el formulario para editarlo
    this.activatedRoute.params.subscribe(
      params => {
        let id = params['id']
        if(id){  //pregunta si el id existe
          this.clienteService.getCliente(id).subscribe(  //si existe se llama al metodo getcliente
            cliente => this.cliente = cliente
          )
        }
      })
  }

  public create(): void{
    this.clienteService.create(this.cliente).subscribe(

      cliente =>{
        this.router.navigate(['/clientes']) //una vez creado el cliente, se va a redirigir a el listado de clientes
        swal.fire('Nuevo cliente',`Cliente ${cliente.nombre} creado con exito`,'success')
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Codigo de error desde el backend: ' + err.status);
        console.error(err.error.errors);
      })
  }

  public update(): void{
    this.clienteService.update(this.cliente).subscribe(
      cliente =>{
        this.router.navigate(['/clientes']) //una vez actualizado el cliente, se va a redirigir a el listado de clientes
        swal.fire('Cliente actualizado',`Cliente ${cliente.nombre} actualizado con exito`,'success')
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Codigo de error desde el backend: ' + err.status);
        console.error(err.error.errors);
      })

  }

}
