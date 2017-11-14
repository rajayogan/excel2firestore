import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import * as _ from 'lodash';
import 'rxjs/add/operator/map';

@Injectable()
export class XltofirestoreService {

  ref = firebase.storage().ref('excel');

  constructor(private afs: AngularFirestore, private http: Http) { }

  uploadFile(file) {
    return new Promise((resolve) => {

    
    this.ref.put(file).then(function (snapshot) {
        let downloadurl = snapshot.downloadURL;
        firebase.database().ref('excelimport').child('newexcel').set({
          thaturl: downloadurl
        }).then(() => {
          
          console.log('uploaded');
          
              
          })
          
        
    });
    setTimeout(() => {
            this.firestorethis().then(() => {
              resolve();
            }) 
          }, 60000);  
    })  
    
    
  }

  firestorethis() {
    return new Promise((resolve) => {

    
       firebase.storage().ref('jsonfile.json').getDownloadURL().then((url) => {
        this.http.get(url).map(res => res.json()).subscribe((data) => {
          let somerand = JSON.stringify(data);
          this.storethis(data).then(() => {
            resolve();
          })
    })
       })
  })    
    
  }

  storethis(somejson) {
    return new Promise((resolve) => {

    
      _.map(somejson, (element, i) => {
        _.keys(element).map(elementkey => {
          this.afs.collection('mycoll').doc('document' + i).set(element);
        })
      })
      resolve();
    })

      
  }

}
