import { Component } from '@angular/core';
import { InputComponent } from '../../components/input/input.component';
import { ButtonComponent } from '../../components/button/button.component';
import { TextComponent } from '../../components/text/text.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { LocalStoreService } from '../../services/local-store.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputComponent, ButtonComponent, TextComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  static loginFlag: {
    login: boolean;
    token: string;
  };

  constructor(public router: Router, private loginService: LoginService, private localStore: LocalStoreService){}
  onChangeEmail(value: string){
    this.email = value;
  }

  onChangePassword(value: string){
    this.password = value;
  }

  login(){
    this.loginService.loginApi({email: this.email, password: this.password}).subscribe((data:any)=>{
      if (data.success) {
        this.loginService.setLogin(true);
        this.localStore.saveData('todo-list-auth', data.authToken);
        this.router.navigate(['/']);
      }
    })
  }
}
