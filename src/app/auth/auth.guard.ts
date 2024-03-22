import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
 let role=localStorage.getItem('userRole');
 if(role=='1'){
    return true
 }else{
  return false
 }
// return true;
};
