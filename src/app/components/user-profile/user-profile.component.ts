import { AuthService } from './../../services/firebase/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

    loading: boolean = true;

    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    // Si no hay un usuario activo, no deberia de estar en esta página
    ngOnInit(): void {
        this.authService.getUsuarioConectado().subscribe((user: any) => {
            if (!user) { this.authService.navigate('home'); }
            this.loading = false;
        });
    }

    navigate(link: string) { this.router.navigate([link]); }

}
