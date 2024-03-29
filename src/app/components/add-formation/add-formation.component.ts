import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Router} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Formation } from '../../models/formation.model';
import { FormationService } from '../../services/formation.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-add-formation',
  standalone: true,
  imports: [InputTextModule, ButtonModule, CardModule, FormsModule],
  templateUrl: './add-formation.component.html',
  styleUrl: './add-formation.component.scss'
})
export class AddFormationComponent{
  newFormation: Formation = {
    id : 0,
    title: '',
    description: '',
    startDate: new Date(),
    endDate: new Date()
  };
  constructor(private formationService : FormationService, private router : Router, private snackBar : MatSnackBar){}
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000,
    });
  }
  resetForm(): void {
    this.newFormation = {
      id : 0,
      title: '',
      description: '',
      startDate: new Date(),
      endDate: new Date()
    };
  }

  addFormation(): void {
    if (this.isFormValid()) {
      this.formationService.addFormation(this.newFormation).subscribe(
        (response) => {
          console.log('Formation ajoutée avec succès !', response);
          this.resetForm();
          this.openSnackBar('Formation ajoutée avec succès', 'Fermer');
    
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de la formation :', error);
          this.resetForm();
          //this.router.navigate(['/formations']);
          this.openSnackBar('Formation ajoutée avec succès', 'Fermer');
          if (error.error && error.error.message) {
            console.error('Message d\'erreur du serveur :', error.error.message);
          }
        }
      );
    }
  }
  

  private isFormValid(): boolean {
    return (
      this.newFormation.title.trim() !== '' &&
      this.newFormation.description.trim() !== '' 
    );
  }
  navigateToAddFormation() {
    this.router.navigateByUrl('/formations');
  }
}
