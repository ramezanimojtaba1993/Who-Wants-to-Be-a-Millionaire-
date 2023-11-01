import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
	constructor(private router: Router, private authService: AuthService) {}

	registerForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
		email: new FormControl(''),
		password: new FormControl(''),
	});

	onSubmit() {
		this.authService.register(this.registerForm.value).subscribe({
			complete: () => {},
			error: () => {
				alert('something was wrong');
			},
			next: (res) => {
				this.router.navigate(['login']);
			},
		});
	}
}
