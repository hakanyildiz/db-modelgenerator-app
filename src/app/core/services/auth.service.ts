import { Injectable } from '@angular/core';
import { User } from '@shared/models/User';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User> = new BehaviorSubject({});

  constructor() { }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  currentUserIsNull(): boolean {
    return this.currentUserValue === null;
  }

  setCurrentUser(user: User) {
    this.currentUserSubject.next(user);
  }
}
