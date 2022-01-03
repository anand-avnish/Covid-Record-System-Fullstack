import { Component, OnInit } from '@angular/core';
import { CovidService } from 'src/app/services/covid.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cases;
  deaths;
  fetched=false;

  constructor(
    private covidService: CovidService
  ) { }

  async ngOnInit(){
    try {
      const covid = await this.covidService.covidRecord();
      let record = covid['response'][0];
      this.cases = record.cases;
      console.log(this.cases);
      this.deaths = record.deaths;
      console.log(this.deaths);
      this.fetched = true;
      console.log(this.fetched);

      // console.log(record);
    } catch (error) {
      console.log(error)
    }
  }

}
