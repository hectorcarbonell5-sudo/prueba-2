import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  private apiUrl = 'http://localhost:3000/empleados';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any>(this.apiUrl);
  }

  getByDepartamento(codeDepartamento: number) {
    return this.http.get<any>(
     `${this.apiUrl}/departamento/${codeDepartamento}`
    );
  }

  create(emp: any) {
    return this.http.post(this.apiUrl, emp);
  }

  update(id: number, emp: any) {
  return this.http.put(`${this.apiUrl}/${id}`, emp);
}

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}