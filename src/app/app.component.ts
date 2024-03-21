import { Component } from '@angular/core';
import { Continent, Tier, TiereContinent } from './tiereContinent';
import AFRIKA from '../assets/AfrikaMitWeiterenTieren.json';
import EUROPA from '../assets/EuropaMitWeiterenTieren.json';
import ASIEN from '../assets/AsienMitWeiterenTieren.json';
import AUSTRALIEN from '../assets/AustralienMitWeiterenTieren.json';
import { concat } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {


  myData = [AFRIKA, ASIEN, AUSTRALIEN, EUROPA]

  namenTiereContinent: TiereContinent = {
    continent: [],
    tiere: []
  };

  testAusgabe():void{
    // for (let i = 0; i < this.myData.length; i++) {
    //   if(i === 1) { break;}
    //   for(let j= 0; j < this.myData[i].tiere.length; j++)
    //   console.log(this.myData[i].tiere[j].name);
      
    // }
    const i = this.myData.forEach(e => e.continent === 'Afrika');

    console.log('Typ von ',typeof(i));
  }

  public uploadFileName: string;
  public uploadFileContent:string;
  public saveFileName = "test";
  public saveFileContent = '{ "name": "test"}';
  public saveFileExtension = 'json';
  newTier:string = '';
  auswahlUser: string;
  vorhanden:boolean = false;

  ngOnInit(){
    this.testAusgabe();
    console.log(this.myData)
    let ergebnis = this.myData.filter(e => e.continent === 'Afrika')
    console.log(' %d \n %s', ergebnis.filter(e => e.continent), this.namenTiereContinent.tiere.forEach(n => n.name))
    console.log("my data",ergebnis);
    this.namenTiereContinent = {
      // continent: [{ContinentName: 'Afrika'}],
      continent: [{ContinentName: 'Afrika'}],
      tiere: [{name: 'Elefant'}, {name: 'Gnu'}, {name: 'Krokodil'}]
    }
    this.saveFileName = JSON.stringify(this.namenTiereContinent.continent,null,2);
    this.saveFileContent = JSON.stringify(this.namenTiereContinent,null,2 )
  }
  addTierZuKontinent(): void {
    if (this.newTier != '' || this.newTier != undefined){
      let tier: Tier = {name: this.newTier};
      this.namenTiereContinent.tiere.push(tier);
      this.saveFileContent = JSON.stringify(this.namenTiereContinent, null, 2);
    }
  }
  deleteTierVonKontinent(tname: string): void {
    console.log('dtvk:',tname, this.auswahlUser);
    if (tname != undefined){
      this.namenTiereContinent.tiere = this.namenTiereContinent.tiere.filter(t => t.name != tname)
      this.saveFileContent = JSON.stringify(this.namenTiereContinent, null, 2);
    }
  }
  







  // continentName(): Continent {
  //   this.vorhanden = false;
  //   if (this.auswahlUser != '' || this.auswahlUser != undefined) {
  //       let continent: Continent = { ContinentName: this.auswahlUser};
  //       return continent;
  //     }
  //   // console.log("Fehler continentName nicht gefunden. Auswahl Standard")
  //   return this.namenTiereContinent.continent[0];
  // }


  public async onFileSelected(event:any) {

    const file:File = event.target.files[0];
    this.uploadFileName = file.name;
    this.uploadFileContent = await file.text(); 
    
    //get object from json file
    //let obj = JSON.parse(this.uploadFileContent);
    this.namenTiereContinent = JSON.parse(this.uploadFileContent)
  }


  


  public onSaveFile(): void {
    let fileName = this.saveFileName + '.' + this.saveFileExtension;
    let fileContent = this.saveFileContent;
    // let fileContent = JSON.stringify( {name: "test name"} );
  
    const file = new Blob([fileContent], { type: "text/plain" });
  
    const link = document.createElement("a");
    link.href = URL.createObjectURL(file);
    link.download = fileName;
    link.click();
    link.remove(); 
  }

}

// export enum Kontis  {
//   AFRIKA = 0,  
//   EUROPA = 1, 
//   ASIEN = 2, 
//   AUSTRALIEN = 3
// }
export enum Kontis  {
  AFRIKA,  
  EUROPA, 
  ASIEN, 
  AUSTRALIEN
}
