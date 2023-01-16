import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/features/users/user.service';
import { FirebaseService } from 'src/app/services/project-loader/firebase.service';
import { IUserData } from 'src/app/features/users/user.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  email: any = '';
  password: any = '';
  user: IUserData | null = null;
  form!: FormGroup;

  constructor(
    private firebaseService: FirebaseService,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.setupForm();
  }

  ngOnInit(): void {
    this.user = this.userService.user;
    this.userService.getUser$()
    .subscribe(res => {
      console.log(res)
      this.user = res;
    });
  }

  setupForm() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login(email: string, password: string) {
    this.firebaseService.signInWithEmailAndPassword(email, password);
    this.userService.setProfileOpen(false);
  }

  onLoginClick() {
    this.login(this.form.get('email')?.value, this.form.get('password')?.value);
  }

  logout() {
    this.firebaseService.logout();
  }

  createUser(email: string, password: string) {
    this.firebaseService.createUserWithEmailAndPassword(email, password);
  }

  close() {
    this.userService.setProfileOpen(false);
  }

}
