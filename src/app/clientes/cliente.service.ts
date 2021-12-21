import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Observable, of, throwError} from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { catchError,map } from 'rxjs/operators';
import swal from 'sweetalert2';
import {Router} from '@angular/router'
import { formatDate } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint : string = 'http://localhost:8080/api/clientes';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient,private router: Router) { }

  getClientes() : Observable<Cliente[]> { //retorna todos los clientes
    //return of(CLIENTES);  //convertimos/creamos nuestro flujo Observable a partir de los objetos clientes
    return this.http.get<Cliente[]>(this.urlEndPoint).pipe(
      map(response =>{
        let clientes = response as Cliente[];
        return clientes.map(cliente => {
          cliente.createAt = formatDate(cliente.createAt,'dd/MM/yyyy','en-US');
          return cliente;
        })
      })
    ); //se castea a Cliente ya que lo devolveria en tipo json sino.
  }

  create(cliente: Cliente) : Observable<Cliente>{  //crea al cliente
    return this.http.post<Cliente>(this.urlEndPoint, cliente,{headers: this.httpHeaders}).pipe(//va a crear el cliente, y luego lo retorna
      map((response:any) => response.cliente as Cliente), // convertimos el json a el objeto Cliente y lo retornamos
      catchError(e => {

        if(e.status==400){
          return throwError(e);
        }

        console.error(e.error.mensaje);
        swal.fire('Error al crear el cliente',e.error.mensaje,'error');
        return throwError(e);
      })
    )
  }



  getCliente(id: number): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => { //se captura el error y se maneja
        this.router.navigate(['/clientes']) //redirigimos a clientes
        console.error(e.error.mensaje);
        swal.fire('Error al editar',e.error.mensaje,'error');
        return throwError(e);
      })
    )

  }

  update(cliente: Cliente): Observable<Cliente>{
    return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`,cliente,{headers: this.httpHeaders}).pipe(
      map((response:any) => response.cliente as Cliente), // convertimos el json a el objeto Cliente y lo retornamos
      catchError(e => {

        if(e.status==400){
          return throwError(e)
        }

        console.error(e.error.mensaje);
        swal.fire('Error al editar el cliente',e.error.mensaje,'error');
        return throwError(e);
      })
    )

  }

  delete(id : number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`,{headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal.fire('Error al eliminar el cliente',e.error.mensaje,'error');
        return throwError(e);
      })
    )
  }
}
