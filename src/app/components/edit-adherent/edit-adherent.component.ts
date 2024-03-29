import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Router} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Adherent } from '../../models/adherent.model';
import { AdherentService } from '../../services/adherent-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-adherent',
  standalone: true,
  imports: [InputTextModule,CardModule, ButtonModule, FormsModule],
  templateUrl: './edit-adherent.component.html',
  styleUrl: './edit-adherent.component.css'
})
export class EditAdherentComponent implements OnInit {
  newAdherent  : Adherent = {
    id : 0,
    name : '',
    contact : ''
  }
  formationId : number = 0;
  constructor(private adherentService : AdherentService, private router: Router,
    private route: ActivatedRoute){}  
  addAdherent(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.formationId = id;
      if (this.isFormValid()) {
        this.adherentService.addAdherent(id,this.newAdherent).subscribe(
          (response) => {
            console.log('adhérent ajoutée avec succès !', response);
            this.router.navigate(['/formations',this.formationId,'adherent']);
            
          },
          (error) => {
            console.error('Erreur lors de l\'ajout de la formation :', error);
            this.router.navigate(['/formations', this.formationId,'adherent']);
            if (error.error && error.error.message) {
              console.error('Message d\'erreur du serveur :', error.error.message);
            }
          }
        );
      }
    }
    );
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id1 =+params['id1'];
      const id2 = +params['id2'];
      this.getAdherentById(id1, id2);
    });
  } 
  getAdherentById(id1: number, id2 : number): void {
    this.adherentService.getAdherentById(id1, id2).subscribe(
      (response) => {
        this.newAdherent = response;
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails de la formation :', error);
      }
    );
  }
  updateAdherent(): void {
    this.route.params.subscribe(params => {
      const id1 =+params['id1'];
      const id2 = +params['id2'];
      if (this.isFormValid()) {
        this.adherentService.updateAdherent(id1, id2, this.newAdherent).subscribe(
          (response) => {
            console.log('Adhérent mise à jour avec succès !', response);
            this.navigateToAdherentList();
          },
          (error) => {
            console.error('Erreur lors de la mise à jour de la formation :', error);
            this.navigateToAdherentList();
            if (error.error && error.error.message) {
              console.error('Message d\'erreur du serveur :', error.error.message);
            }
          }
        );
      } else {
        console.error('Formulaire invalide ! Veuillez remplir tous les champs.');
      }
    });
  }
  navigateToAdherentList(){
    this.route.params.subscribe(params => {
      const id1 =+params['id1'];
    this.router.navigate(['/formations', id1,'adherent'])
    })
  }
  private isFormValid(): boolean {
    return (
      this.newAdherent.name.trim() !== '' &&
      this.newAdherent.contact.trim() !== '' 
    );
  }
  navigateToAddFormation() {
    this.router.navigateByUrl('/formations');
  }
  
}
