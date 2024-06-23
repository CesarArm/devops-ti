import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLinkWithHref } from '@angular/router';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  mensaje: string = 'Sin información';
  homeForm: FormGroup;
  private homeService = inject(HomeService);

	constructor(
		private fb: FormBuilder
	) {
		this.homeForm = this.fb.group({
			document: ['', Validators.required],
      names: [''],
      lastName: [''],
      gender: [''],
      birthDate: ['']
		});
	}

	controlHasError(control: string, error: string) {
		return this.homeForm.controls[control].hasError(error);
	}

  onSubmit = () => {
		console.log(this.homeForm.value);
		if (this.homeForm.invalid) {
			return;
		}
		const formValue = this.homeForm.value;

    const document = formValue.document;

		this.homeService.searchDocument(document).subscribe({
        next: (response) => {
          if (response.mensaje === "Encontrado") {
            this.mensaje = "Usuario encontrado";
            this.homeForm.patchValue({
              names: response.resultado.nombres,
              lastName: response.resultado.apellido_paterno + ' ' + response.resultado.apellido_materno,
              gender: response.resultado.genero=='M'?'Masculino':'Femenino',
              birthDate: response.resultado.fecha_nacimiento
            });
          } else {
            this.mensaje = "Usuario no encontrado";
          }
        },
        error: (error) => {
            console.log(error);
        }
    })
	};
}
