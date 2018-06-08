import jwtDecode from 'jwt-decode';

export default class Auth {
  isAuthenticated() {
    const expiresAt = localStorage.getItem('expires_at');
    return Math.floor(Date.now() / 1000) < expiresAt;
  }

  // authorize by getting user information, set roles, set localStorage
  login(token) {
    if (this.isAuthenticated()) {
      console.log('already logged in');
    } else {
      this.setSession(token);
    }
    window.location.pathname = this.getRole() === 'customer' ? '/scheduler' : '/dashboard';
  }

  getRole() {
    const token = window.localStorage.getItem('token');
    return jwtDecode(token).role;
  }

  getUser() {
    const token = window.localStorage.getItem('token');
    return jwtDecode(token).email;
  }

  // checks if user role matches/is above requiredRole
  isAuthorized(requiredRole) {
    const userRole = this.getRole();

    if (userRole === 'admin') return true;

    return userRole === requiredRole;
  }

  setSession(token) {
    const expiresAt = jwtDecode(token).exp;
    window.localStorage.setItem('token', token);
    window.localStorage.setItem('expires_at', expiresAt);
  }

  logout() {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('expires_at');
    window.location.pathname = '/login';
  }
}
