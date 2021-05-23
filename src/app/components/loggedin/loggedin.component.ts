import { AuthService } from './../../services/firebase/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

const cards = [
    {
        color: 'background-color: #918513',
        src: '../../../assets/img/ico_rayo.png',
        titulo: 'Electricista',
        contenido: 'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.'
    },
    {
        color: 'background-color: #5F1134',
        src: '../../../assets/img/ico_paint.png',
        titulo: 'Pintor',
        contenido: 'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.'
    },
    {
        color: 'background-color: #283866',
        src: '../../../assets/img/ico_plumb.png',
        titulo: 'Plomero',
        contenido: 'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.'
    }
];

@Component({
    selector: 'app-loggedin',
    templateUrl: './loggedin.component.html',
    styleUrls: ['./loggedin.component.css']
})
export class LoggedinComponent implements OnInit {

    cards: any[] = cards;
    loading: boolean = true;
    user: any;

    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    // Si no hay un usuario activo, no deberia de estar en esta página
    ngOnInit(): void {
        this.authService.getUsuarioConectado().subscribe((user: any) => {
            if (!user) { this.authService.navigate('home'); }
            this.user = user;
            this.loading = false;
        });
    }

    navigate(link: string) { this.router.navigate([link]); }

}
