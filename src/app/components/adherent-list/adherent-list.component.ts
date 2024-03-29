import { Component, OnInit } from '@angular/core';
import { AdherentService } from '../../services/adherent-service.service';
import { Adherent } from '../../models/adherent.model';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import { DataViewModule } from 'primeng/dataview';
import { NgFor } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-adherent-list',
  standalone: true,
  imports: [DataViewModule, TableModule, NgFor, ButtonModule, RouterModule],
  templateUrl: './adherent-list.component.html',
  styleUrl: './adherent-list.component.css'
})
export class AdherentListComponent implements OnInit{
  adherents : Adherent[] = [];
  formationId : number =0;
  constructor(private adherentService : AdherentService, private router: Router,
    private route: ActivatedRoute){}
  ngOnInit() : void{
    this.getAdherents();
  }

  getAdherents():void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.formationId = id;
      this.adherentService.getAdherent(id)
      .subscribe(adherents => this.adherents = adherents)
    });
    
  }
  deleteAdherent(id2 : number): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.adherentService.deleteAdherent(id, id2).subscribe(
        () => {
          console.log('adherent supprimée avec succès !');
          this.getAdherents();
        },
        (error) => {
          console.error('Erreur lors de la suppression de la formation :', error);
          this.getAdherents();
        }
      );
    });
  }
  navigateToFormation(){
    
  }
  navigateToAddAdherent(formationId: number) : void{
    this.router.navigate(['/formations', formationId,'/adherent', '/add']);
  }
  navigateToEditAdherent(formationId: number, adherentId : number) : void{
    this.router.navigate(['/formations', formationId,'/adherent',adherentId,'/edit']);
  }
}
