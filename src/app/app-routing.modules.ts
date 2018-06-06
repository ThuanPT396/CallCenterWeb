import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './list-user/user-list.component'
import { UserEditComponent } from './list-user/edit-user/user-edit.component'
import { ClinicListComponent } from './list-clinic/clinic-list.component'
import { ClinicEditComponent } from './list-clinic/edit-clinic/clinic-edit.component'
import {ListLicenseComponent} from './list-license/list-license.component'
import {EditLicenseComponent} from './list-license/edit-license/edit-license.component'

const appRoutes: Routes = [
    { path: '', component: UserListComponent },
    { path: 'userAdd', component: UserEditComponent },
    { path: 'userList', component: UserListComponent },
    { path: 'clinicAdd', component: ClinicEditComponent },
    { path: 'clinicList', component: ClinicListComponent },
    { path: 'licenseAdd',component: EditLicenseComponent},
    { path: 'licenseList',component:ListLicenseComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }