import { Component,inject,OnInit,ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmpleadosService } from '../../../services/empleados';  

@Component({
  selector: 'app-empleados',
  imports: [CommonModule, FormsModule],
  templateUrl: './empleados.html',
  styleUrl: './empleados.css',
})
export class Empleados {
  empleados: any[] = [];
  departamentos: any[] = [];

  selectedDepartamento: any = null;

  newEmp: any = {
    codigo: 0,
    nombre: '',
    apellido1: '',
    apellido2: '',
    codigo_departmento: 0,

  };
  editing = false;
  editingId: number | null = null;

  loading = false;
  constructor(
    private empService: EmpleadosService,
    private cdr: ChangeDetectorRef,
  ) {}

  loadEmployees() {
    this.loading = true;

    this.empService.getAll().subscribe({
      next: (resp) => {
        this.empleados = [...(resp.data || resp)];
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
    });
  }
  // Cargar por departamento
  loadByDepartment(dept: any) {
    this.selectedDepartamento = dept;
    this.loading = true;
    this.empleados = [];

    this.empService.getByDepartamento(dept.codeDepartamento).subscribe({
      next: (resp) => {
        this.empleados = [...resp.data];
        this.cdr.detectChanges();
        // this.employees = [...(resp.data || [])];
        this.loading = false;
        // this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
      },
    });
  }
save() {
    const data = {
      codigo: Number(this.newEmp.code), // 🔥 unificado
      nombre: this.newEmp.nombre,
      apellido1: this.newEmp.apellido1,
      apellido2: this.newEmp.apellido2,
      codigo_departamento: Number(this.newEmp.codigo_departamento), // 🔥 unificado
    };

    // 🔴 VALIDACIONES
    if (!data.codigo) {
      alert('El código del empleado es obligatorio');
      return;
    }

    if (!data.nombre || !data.apellido1 || !data.apellido2) {
      alert('Faltan datos obligatorios');
      return;
    }

    // ======================================================
    // 🔥 MODO UPDATE
    // ======================================================
    if (this.editing && this.editingId !== null) {
      this.empService.update(this.editingId, data).subscribe({
        next: () => {
          this.resetForm();
          this.loadEmployees();
        },
        error: (err) => console.error('ERROR UPDATE:', err),
      });
    }

    // ======================================================
    // 🔥 MODO CREATE
    // ======================================================
    else {
      this.empService.create(data).subscribe({
        next: () => {
          this.resetForm();
          this.loadEmployees();
        },
        error: (err) => console.error('ERROR CREATE:', err),
      });
    }
  }
 

// 🔥 Editar
  edit(emp: any) {
    this.newEmp = { ...emp };
    this.editing = true;
    this.editingId = emp.codigo;
  }
// 🔥 Eliminar
  delete(id: number) {
    this.empService.delete(id).subscribe(() => {
      this.refresh();
    });
  }

  // 🔥 Refrescar vista
  refresh() {
    if (this.selectedDepartamento) {
      this.loadByDepartment(this.selectedDepartamento);
    }
  }

  resetForm() {
    this.newEmp = {
    codigo: 0,
    nombre: '',
    apellido1: '',
    apellido2: '',
    codigo_departmento: 0,

    };

    this.editing = false;
    this.editingId = null;
  }


}

