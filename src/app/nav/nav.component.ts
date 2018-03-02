import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_service/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {}
  login() {
    console.log('asdf');
    this.authService.login().subscribe(x => {
      console.log(x);
    });
  }
}
