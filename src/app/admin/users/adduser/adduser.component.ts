import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { User } from '../../../model/User';
import { HttpClientService } from '../../../service/http-client.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
//passer l'objet mta3 new user mel parent lel child
  @Input()
  user: User
//naba3thou notification lel parent users component illi fama user jdid donc reload mta3 lista
  @Output()
  userAddedEvent = new EventEmitter();

  message: string;
  password: string;

  constructor(private httpClientService: HttpClientService,
    private router: Router) { }

  ngOnInit() {
  }

  addUser() {
    this.httpClientService.addUser(this.user).subscribe(
      (user) => {
        this.userAddedEvent.emit();
        this.router.navigate(['admin', 'users']);
      }
    );
  }
}
