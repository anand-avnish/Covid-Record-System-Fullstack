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
      { path: 'patient/createPatient', loadChildren: () => import('src/app/pages/patient/create-patient/create-patient.module').then(m => m.CreatePatientModule) },
			{
				path: "hospital",
				loadChildren: () => import('src/app/pages/hospital/hospital.module').then(m => m.HospitalModule)
			},
      // {
			// 	path: "gallery",
			// 	loadChildren: () => import('src/app/pages/gallery/gallery.module').then(m => m.GallModule)
			// },
			// {
			// 	path: "contact",
			// 	loadChildren: () => import('src/app/pages/contact/contact.module').then(m => m.ContactModule)
			// }
		]
	},

	// 404 Page Not Found
	{ path: "**", redirectTo: "" }
];

export const LayoutRoutingModule = RouterModule.forChild(LAYOUT_ROUTES);

