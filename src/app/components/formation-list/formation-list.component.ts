import { Component, OnInit } from '@angular/core';
import { Formation } from '../../models/formation.model';
import { FormationService } from '../../services/formation.service';
import { DatePipe, NgFor } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Router, RouterModule} from '@angular/router';
import { DataViewModule } from 'primeng/dataview';
import { FormationFilterPipe } from '../../pipes/formation-filter.pipe';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-formation-list',
  standalone: true,
  imports: [NgFor, DatePipe,NgbModule, DatePipe, RouterModule, DataViewModule, FormationFilterPipe, FormsModule],
  templateUrl: './formation-list.component.html',
  styleUrl: './formation-list.component.css'
})
export class FormationListComponent implements OnInit{
  formations : Formation[] = [];
  searchText: string = '';
  constructor(private formationService : FormationService, private router : Router, private snackBar : MatSnackBar){}

  ngOnInit() : void{
    this.getFormation();
  }

  getFormation ():void {
    this.formationService.getFormations()
      .subscribe(formations => this.formations = formations)
  }
  navigateToAddFormation() {
    this.router.navigateByUrl('/add-formation');
  }
  navigateToFormationDetail(formationId: number): void {
    this.router.navigate(['/formations', formationId]);
  }
}