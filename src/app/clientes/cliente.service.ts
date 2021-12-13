import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Observable, of } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint : string = 'http://localhost:8080/api/clientes';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

  getClientes() : Observable<Cliente[]> { //retorna todos los clientes
    //return of(CLIENTES);  //convertimos/creamos nuestro flujo Observable a partir de los objetos clientes
    return this.http.get<Cliente[]>(this.urlEndPoint); //se castea a Cliente ya que lo devolveria en tipo json sino.
  }

  create(cliente: Cliente) : Observable<Cliente>{  //crea al cliente
    return this.http.post<Cliente>(this.urlEndPoint, cliente,{headers: this.httpHeaders})  //va a crear el cliente, y luego lo retorna
  }


  getCliente(id: number): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`)

  }

  update(cliente: Cliente): Observable<Cliente>{
    return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`,cliente,{headers: this.httpHeaders})

  }

  delete(id : number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`,{headers: this.httpHeaders})
  }
}
