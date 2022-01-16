import { Routes, RouterModule } from "@angular/router";
import { LayoutComponent } from "./layout.component";


const LAYOUT_ROUTES: Routes = [
	{
		path: "",
		component: LayoutComponent,
		children: [


			{ path: "", redirectTo: "home", pathMatch: "full", },

      {
        path: "home",
        loadChildren: () => import('src/app/pages/home/home.module').then(m => m.HomeModule)
      },
			{
				path: "patient",
				loadChildren: () => import('src/app/pages/patient/patient.module').then(m => m.PatientModule)
			},
      {
        path: 'patient/createPatient',
        loadChildren: () => import('src/app/pages/patient/create-patient/create-patient.module').then(m => m.CreatePatientModule) },
      {
        path: 'patient/updatePatient',
        loadChildren: () => import('src/app/pages/patient/update-patient/update-patient.module').then(m => m.UpdatePatientModule) },
			{
				path: "treatment",
				loadChildren: () => import('src/app/pages/treatment/treatment.module').then(m => m.TreatmentModule)
			},
      {
        path: 'treatment/createTreatment',
        loadChildren: () => import('src/app/pages/treatment/create-treatment/create-treatment.module').then(m => m.CreateTreatmentModule) },
      {
        path: 'treatment/updateTreatment',
        loadChildren: () => import('src/app/pages/treatment/update-treatment/update-treatment.module').then(m => m.UpdateTreatmentModule) },
      {
        path: "hospital",
				loadChildren: () => import('src/app/pages/hospital/hospital.module').then(m => m.HospitalModule)
			},
      {
        path: 'hospital/createHospital',
        loadChildren: () => import('src/app/pages/hospital/create-hospital/create-hospital.module').then(m => m.CreateHospitalModule) },
      {
        path: 'hospital/updateHospital',
        loadChildren: () => import('src/app/pages/hospital/update-hospital/update-hospital.module').then(m => m.UpdateHospitalModule) },
		]
	},

	// 404 Page Not Found
	{ path: "**", redirectTo: "" }
];

export const LayoutRoutingModule = RouterModule.forChild(LAYOUT_ROUTES);

