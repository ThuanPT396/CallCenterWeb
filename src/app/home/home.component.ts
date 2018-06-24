import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  role=0;
  constructor(private userService: UserService) { }

  ngOnInit() {
    var result = this.userService.getUserClaims();
    this.role = parseInt(result.role);
  }

}
