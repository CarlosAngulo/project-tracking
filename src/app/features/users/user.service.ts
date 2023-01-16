import { Injectable } from '@angular/core';
import { User } from 'firebase/auth';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { FirebaseService } from 'src/app/services/project-loader/firebase.service';
import { IUserData } from './user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _profileOpen: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private profileOpen$: Observable<boolean> = this._profileOpen.asObservable();

  private currentUser: IUserData | null = null;
  private _hasSession: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private _user: Subject<IUserData | null> = new Subject();
  private user$: Observable<IUserData | null> = this._user.asObservable();
  
  constructor(
    private firebaseService: FirebaseService
  ) {
    this.firebaseService.onUserChanged((user: User | null) => {
      const loggedUser = user ? {
        displayName: user.displayName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL,
        providerId: user.providerId,
        uid: user.uid,
      } : null;
      this._user.next(loggedUser);
      this._hasSession.next( loggedUser !== null);
      this.currentUser = loggedUser;
    });
  }

  get user() {
    return this.currentUser;
  }

  get hasSession() {
    return this.currentUser ? true : false;
  }

  getUser$(): Observable<IUserData | null> {
    return this.user$;
  }

  hasSession$(): Observable<boolean> {
    return this._hasSession.asObservable();
  }

  isProfileOpen(): Observable<boolean> {
    return this.profileOpen$;
  }

  setProfileOpen(val: boolean) {
    this._profileOpen.next(val);
  }

}

//https://firebase.google.com/docs/auth/web/manage-users?authuser=0 
