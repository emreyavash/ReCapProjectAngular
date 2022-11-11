import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/AuthService/auth.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  isAuthenticated = false;
  user = JSON.parse(localStorage.getItem("User"))
  constructor(
    private authService:AuthService
  ) { }

  ngOnInit(): void {
    this.isAuthenticatedFunction()
  }
  isAuthenticatedFunction(){
    return this.isAuthenticated = this.authService.isAuthenticated()
  }
}
