import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../../../services/storage.service';
import { AuthService } from '../auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
	constructor(private router: Router, private authService: AuthService, private storageService: StorageService) {}

	loginForm: FormGroup = new FormGroup({
		email: new FormControl(''),
		password: new FormControl(''),
	});

	onSubmit() {
    const { email, password } = this.loginForm.value;
    this.authService.login({ email, password }).subscribe({
			complete: () => {},
			error: () => {
				alert('something was wrong');
			},
			next: (user: any) => {
        if (user && user.length) {
          this.storageService.setItem('userinfo', { email, userId: user[0].id });
					this.storageService.setItem('token', btoa(email));

					this.router.navigate(['game-page']);
				} else {
					alert('user Not Found');
				}
			},
		});
	}

  public copyCredential(field: 'email' | 'password') {
    const credential = {
      email: 'admin@gmail.com',
      password: 'admin',
    };
    navigator.clipboard.writeText(credential[field]);
  }
}
