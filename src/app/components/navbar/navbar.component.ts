import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../../pages/login/login.component';
import { LocalStoreService } from '../../services/local-store.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ButtonComponent, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  login: boolean = false;
  constructor(public router: Router, private localService: LocalStoreService, private loginService: LoginService){
  }
  ngOnInit(): void {
    this.login = this.loginService.isAuthenticated();
  }

  logOut(){
    this.localService.clearData();
    this.loginService.setLogin(false);
    this.router.navigate(['/login']);
  }
}
