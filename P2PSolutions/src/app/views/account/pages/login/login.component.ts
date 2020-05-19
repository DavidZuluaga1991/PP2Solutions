import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from './../../../../core/https/http.service';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public formLogin: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private api: HttpService, private localstorage: LocalStorageService) {
    this.formLogin = this.fb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  public login() {
    this.api.get('login.json').then((result) => {
      console.log(result);
      if (result.token) {
        this.localstorage.setItem('token', result.token);
        this.router.navigate(['/dashboard/home']);
      }
    });
  }

}
