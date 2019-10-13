import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  cakes = [];
  newCake = {baker: '', url: ''}

  constructor(private _httpService: HttpService){}
  ngOnInit(){
    this.getCakesFromService();
  }

  getCakesFromService(){
    let self = this;
    let observable = self._httpService.getCakes();
    observable.subscribe(function(response){
      if(response['message'] == 'success'){
        if(typeof self['shownCake'] != 'undefined'){
          var saveCakeId = self['shownCake']['_id'];
        }
        delete self['shownCake'];
        self.cakes = [];
        for(var i = 0; i < response['cakes'].length; i++){
          self.cakes.push(response['cakes'][i]);
          let total = 0;
          for(var j = 0; j < self.cakes[i]['ratings'].length; j++){
            total += self.cakes[i]['ratings'][j].stars;
          }
          self.cakes[i]['avg'] = (total / self.cakes[i]['ratings'].length).toFixed(1);
          if(response['cakes'][i]['_id'] == saveCakeId){
            self['shownCake'] = response['cakes'][i];
          }
        }
      }
    });
  }

  createCake(){
    let self = this;
    let savedCake = self.newCake;
    self.newCake = {baker: '', url: ''};
    if (savedCake.url != '' && savedCake.url != ''){
      let observable = this._httpService.createCake(savedCake);
      observable.subscribe(function(response){
        if(response['message'] == 'success'){
          self.getCakesFromService();
        }
      })
    }
  }
  
  showCake(cake){
    this['shownCake'] = cake;
  }

  createRating(event){
    let self = this;
    let newRating = {};
    let keys = Object.keys(event.target);
    for(var i = 0; i < keys.length - 2; i++){
      if(event.target[i]['name'] != ''){
        newRating[event.target[i]['name']] = event.target[i]['value'];
      }
    }
    let observable = self._httpService.createRating(newRating);
    observable.subscribe(function(response){
      if(response['message'] == 'success'){
        self.getCakesFromService();
      }
    });
  }
}
