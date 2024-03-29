import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Router} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Adherent } from '../../models/adherent.model';
import { AdherentService } from '../../services/adherent-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-adherent',
  standalone: true,
  imports: [InputTextModule,CardModule, ButtonModule, FormsModule],
  templateUrl: './add-adherent.component.html',
  styleUrl: './add-adherent.component.css'
})
export class AddAdherentComponent {
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
            //this.openSnackBar('Formation ajoutée avec succès', 'Fermer');
            //this.toastr.success('Hello world!', 'Toastr fun!');
            //this.messageService.add({severity :"success", summary:'Votre formation été bien ajouté', detail:""})
          },
          (error) => {
            console.error('Erreur lors de l\'ajout de la formation :', error);
            this.router.navigate(['/formations', this.formationId,'adherent']);
            //this.openSnackBar('Formation ajoutée avec succès', 'Fermer');
            if (error.error && error.error.message) {
              console.error('Message d\'erreur du serveur :', error.error.message);
            }
          }
        );
      }
    }
    );
  }
  navigateToListAdherents(){
    this.route.params.subscribe(params => {
    const id = +params['id'];
      this.formationId = id;
      this.router.navigate(['/formations', this.formationId,'adherent']);
    });
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
