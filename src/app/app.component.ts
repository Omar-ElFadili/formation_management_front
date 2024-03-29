import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormationListComponent } from './components/formation-list/formation-list.component';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormationListComponent, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular_formation_front';
}
