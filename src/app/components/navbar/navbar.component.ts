import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  toogled: boolean = false; // Para cambiar el sentido de la flechita en el menú hambrguesa

  constructor() { }

  ngOnInit(): void {
  }

  // Función para que se cierre el menú hamburguesa cuando esta chiquito
  toogle(button: any) {
    if (window.screen.width < 992) { button.click(); }
  }
}
