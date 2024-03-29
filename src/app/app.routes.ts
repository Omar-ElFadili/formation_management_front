import { Routes } from '@angular/router';
import { FormationListComponent } from './components/formation-list/formation-list.component';
import { AddFormationComponent } from './components/add-formation/add-formation.component';
import { FormationComponent } from './components/formation/formation.component';
import { EditFormationComponent } from './components/edit-formation/edit-formation.component';
import { AdherentListComponent } from './components/adherent-list/adherent-list.component';
import { AddAdherentComponent } from './components/add-adherent/add-adherent.component';
import { EditAdherentComponent } from './components/edit-adherent/edit-adherent.component';

export const routes: Routes = [
    { path: "", redirectTo: '/formations', pathMatch: 'full' },
    { path: "formations", component: FormationListComponent },
    { path: "add-formation", component: AddFormationComponent },
    { path: 'formations/:id', component: FormationComponent },
    { path: 'formations/:id/edit', component: EditFormationComponent },
    { path: 'formations/:id/adherent', component: AdherentListComponent },
    { path: 'formations/:id/adherent/add', component: AddAdherentComponent },
    { path: 'formations/:id1/adherent/:id2/edit', component: EditAdherentComponent },


];
