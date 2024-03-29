import { Component } from '@angular/core';
import { Formation } from '../../models/formation.model';
import { FormationService } from '../../services/formation.service';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import moment from 'moment';


@Component({
  selector: 'app-edit-formation',
  standalone: true,
  imports: [RouterModule, InputTextModule, ButtonModule, CardModule, FormsModule],
  templateUrl: './edit-formation.component.html',
  styleUrl: './edit-formation.component.css'
})
export class EditFormationComponent {
  newFormation: Formation = {
    id: 0,
    title: '',
    description: '',
    startDate: new Date(),
    endDate: new Date()
  };

  constructor(
    private formationService: FormationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.getFormationById(id);
    });
  }

  getFormationById(id: number): void {
    this.formationService.getFormationById(id).subscribe(
      (response) => {
        response.startDate = moment(response.startDate).toDate();
        response.endDate = moment(response.endDate).toDate();
        this.newFormation = response;
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails de la formation :', error);
      }
    );
  }

  resetForm(): void {
    this.newFormation = {
      id: 0,
      title: '',
      description: '',
      startDate: new Date(),
      endDate: new Date()
    };
  }

  updateFormation(): void {
    if (this.isFormValid()) {
      this.formationService.updateFormation(this.newFormation.id, this.newFormation).subscribe(
        (response) => {
          console.log('Formation mise à jour avec succès !', response);
          this.navigateToDetailsFormation();
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de la formation :', error);
          this.navigateToDetailsFormation();
          if (error.error && error.error.message) {
            console.error('Message d\'erreur du serveur :', error.error.message);
          }
        }
      );
    } else {
      console.error('Formulaire invalide ! Veuillez remplir tous les champs.');
    }
  }

  private isFormValid(): boolean {
    return (
      this.newFormation.title.trim() !== '' &&
      this.newFormation.description.trim() !== '' &&
      this.newFormation.startDate != null &&
      this.newFormation.endDate != null
    );
  }

  navigateToDetailsFormation(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.router.navigate(['/formations', id]);
    });
    
  }

}
