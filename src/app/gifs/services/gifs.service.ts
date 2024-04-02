import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interface';

@Injectable({providedIn: 'root'})
export class GifsService {

  //arreglo que va a contener la lista de los gifs
  public gifList : Gif[] = []

  private _tagsHistory: string[] = []
  private apiKey:string = 'tyLt4mGBujs4UO4XavuevpNBEX8XS3ug'
  private serviceUrl:string = 'https://api.giphy.com/v1/gifs'

  constructor(private http: HttpClient) {

    this.loadLocalStorage()
    console.log('Gifs Service ready')

   }

  get tagsHistory (){

    return [...this._tagsHistory]
  }

  private organizeHistory(tag:string){
    tag = tag.toLowerCase()
    if (this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter((oldTag)=> oldTag!==tag)
    }

    this._tagsHistory.unshift(tag)
    this._tagsHistory= this.tagsHistory.splice(0,10)
    this.saveLocalStorage()
  }

  //método que guarda el historial en el LocalStorage
  private saveLocalStorage():void{
    localStorage.setItem('history', JSON.stringify(this._tagsHistory) )
  }

  //método que lee lo almacenado en el LocalStorage
  private loadLocalStorage():void{
    //si no hay datos que haga el return
    if (!localStorage.getItem('history')) return
    //Si hay datos:
    this._tagsHistory= JSON.parse(localStorage.getItem('history')!)
    //si no hya elementos no tiene que hacer nada
    if (this._tagsHistory.length  ===0) return
    //si hay elemntos tiene que buscar el primero
    this.searchTag(this._tagsHistory[0])


  }

  searchTag (tag:string):void{
    if (tag.length===0) return
    this.organizeHistory(tag)

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '15')
      .set('q', tag)

      //este observavble es del tipo de la interfaz creada
    this.http.get<SearchResponse>(`${ this.serviceUrl }/search`, {params})
      .subscribe(resp =>{
        //gifs que se estan mostrando
        this.gifList= resp.data
        //console.log({ gifs: this.gifList})
      })



    //this._tagsHistory.unshift(tag)
  }
 //Lo que se pone en la busqueda de postman:  api.giphy.com/v1/gifs/search?api_key=tyLt4mGBujs4UO4XavuevpNBEX8XS3ug&q=valorant&limit=10
}
