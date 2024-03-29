import { Component } from '@angular/core';
import { Formation } from '../../models/formation.model';
import { FormationService } from '../../services/formation.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-formation',
  standalone: true,
  imports: [NgFor, NgIf, DatePipe, RouterModule, CardModule, ButtonModule],
  templateUrl: './formation.component.html',
  styleUrl: './formation.component.css'
})
export class FormationComponent {
  formation: Formation | undefined;
  errorMessage: string | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formationService: FormationService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.getFormationDetails();
  }

  getFormationDetails(): void {
    try {
      const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
      this.formationService.getFormationById(id)
        .subscribe(
          formation => this.formation = formation,
          error => this.errorMessage = 'Une erreur s\'est produite lors de la récupération des détails de la formation.'
        );
    } catch (error) {
      this.errorMessage = 'Une erreur inattendue s\'est produite.';
    }
  }
  deleteFormation(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = +params['id'];
      this.formationService.deleteFormation(id).subscribe(
        () => {
          console.log('Formation supprimée avec succès !');
          this.router.navigate(['/formations']);
        },
        (error) => {
          console.error('Erreur lors de la suppression de la formation :', error);
          this.router.navigate(['/formations']);
        }
      );
    });
  }
  navigateToAllFormations(): void {
    this.router.navigate(['/formations']);
  }
  navigateToAllAdherents(formationId: number) : void{
    this.router.navigate(['/formations', formationId,'/adherent']);
  }
  navigateToEditFormationDetail(formationId: number): void {
    this.router.navigate(['/formations', formationId,'/edit']);
  }
}
