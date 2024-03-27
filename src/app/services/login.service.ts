import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStoreService } from './local-store.service';

interface LoginPayload{
  email: string,
  password: string
}

interface SignupPayload{
  name: string,
  email: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private isLogin: boolean = false;

  constructor(private http: HttpClient, private localService: LocalStoreService) {
    this.isLogin = !!localService.getData('todo-list-auth');
  }

  isAuthenticated(): boolean {
    return this.isLogin;
  }

  setLogin(data: boolean){
    this.isLogin = data;
  }

  getAuthToken(): string | null {
    return this.localService.getData('todo-list-auth');
  }

  loginApi(payload: LoginPayload){
    return this.http.post(`${this.localService.baseUrl}/api/auth/login`, payload);
  }

  signupApi(payload: SignupPayload){
    return this.http.post(`${this.localService.baseUrl}/api/auth/createuser`, payload);
  }

  getUser(token:string){
    return this.http.get(`${this.localService.baseUrl}/api/auth/getuser`, {headers: {'auth-token': token}});
  }
}
