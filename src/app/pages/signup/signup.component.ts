import { Component } from '@angular/core';
import { InputComponent } from '../../components/input/input.component';
import { ButtonComponent } from '../../components/button/button.component';
import { TextComponent } from '../../components/text/text.component';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { LocalStoreService } from '../../services/local-store.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [InputComponent, ButtonComponent, TextComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private loginService: LoginService, private router: Router, private localStore: LocalStoreService){}

  onChangeName(value: string){
    this.name = value;
  }

  onChangeEmail(value: string){
    this.email = value;
  }

  onChangePassword(value: string){
    this.password = value;
  }

  signup(){
    const payload = {
      name: this.name,
      email: this.email,
      password: this.password
    }
    this.loginService.signupApi(payload).subscribe((data: any)=>{
      if (data.success) {
        this.loginService.setLogin(true);
        this.localStore.saveData('todo-list-auth', data.authToken);
        this.router.navigate(['/']);
      }
    })
  }
}
