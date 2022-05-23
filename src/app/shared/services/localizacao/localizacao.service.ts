import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalizacaoService {
  constructor() { }

 getPosition(): Observable<GeolocationCoordinates>{
    return new Observable((emissor)=>{ 
      const geolocation: Geolocation = navigator.geolocation;    
  
      if (geolocation) { 
        geolocation.getCurrentPosition(
          (pos) => {
            emissor.next(pos.coords); 
            emissor.complete(); 
          },
          (erro) => emissor.error(erro) 
        );
      }else {
        emissor.error(new Error('Geolocatio not found')); 
      }
    });
  } 
  
  getPositionRealTime(): Observable<GeolocationCoordinates>{
    return new Observable((emissor) => {
      const geolocation = navigator.geolocation;
      let watchId: number | undefined;
  
      if(geolocation){ 
        watchId = geolocation.watchPosition(     
          (pos) => emissor.next(pos.coords), 
          (erro) => emissor.error(erro) 
        );
      }else {
        emissor.error(new Error('Navegador não suportado')); 
      }
      return () => { 
        geolocation.clearWatch(watchId!);
      };
    });
  }
  }
  