// Web programiranje test - 06.11.2019.
// GRUPA A
// Ime i prezime: [Josip Pinjuh]

// 1. Napišite funkciju za asinkroni dohvat podataka sa servera.
// Dohvatite JSON sa linka: https://api.myjson.com/bins/78k40 - 5 bodova

function loadData(url, cb) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        cb(JSON.parse(this.responseText));
      }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }
  
  function parseData(data) {
   console.log('\n2. zadatak\n');
   mainCity(data);
   console.log('\n3. zadatak\n');
   tripDistance(data);
   console.log('\n4. zadatak\n');
   tripDay(data);
   choosenCountry(data);
  }
  
  loadData("https://api.myjson.com/bins/78k40", parseData);
  
  // 2. Napravite funkciju koja prima podatke koje ste dohvatili sa servera.
  // Funkcija treba za svako putovanje ispisati dinamicki koliko glavniGrad ima samoglasnika, te ako ime glavnog grada pocinje slovom "H" ispisati ga jos jednom u formatu "Glavni grad koji pocinje sa slovom H je {glavniGrad}" - 15 bodova
  
  function mainCity(data){
      data.putovanja.forEach(key =>{
        var count = Array.from(key.glavniGrad).filter(letter => 'AEIOUaeiou'.includes(letter)).length;
      console.log(key.glavniGrad + ' ima ' + count + ' samoglasnika');
      if(key.glavniGrad[0] === 'H'){
          console.log('Glavni grad koji počinje sa slovom H je ' + key.glavniGrad);
      }
    });
  }
  
  // 3. Napravite funkciju koja prima podatke koje ste dohvatili sa servera.
  // Funkcija treba sortirati dobijene podatke ("putovanja") po udaljenosti(gledajuci property "udaljenost"), od najudaljenijeg putovanja prema najblizem i ispisati tekst, nakon sortiranja, (za svako putovanje) u obliku "ime drzave - glavni grad - udaljenost" (imena drzava se nalaze u propertiju "imenaDrzava" i svaki key imena drzave odgovara id-u iz objekata putovanja) - 15 bodova
  
  function tripDistance(data){
      data.putovanja.forEach(key =>{
        var x = parseInt(key.udaljenost.split(' ')[0]);
      key.distance = x;
    });
    
    data.putovanja.sort((a,b) => b.distance - a.distance);
    
    data.putovanja.forEach(key => {
        console.log(data.imenaDrzava[key.id] + ' - ' + key.glavniGrad + ' - ' + key.udaljenost);
    });
  }
  
  // 4. Napraviti funkciju koja će za svako putovanje napisati na koji dan u tjednu je polazak(Format ispisa: glavniGrad: datumPolaska - dan u tjednu ). Nakon toga ispisati za svaki dan u tjednu koliko putovanja polazi na taj dan(Primjer: Nedjelja - 1, Ponedjeljak - 2, Utorak - 0 itd.) - 20 bodova
  
  function tripDay(data){
    var daysCount = {};
    data.putovanja.forEach(key => {
        var day = new Date(key.datumPolaska).toLocaleString("hr-HR", {weekday: 'long'});
        console.log(key.glavniGrad + ': ' + key.datumPolaska + ' - ' + day);
        if(!daysCount[day]) daysCount[day] = 0;
        daysCount[day]++;
    });

    Object.keys(daysCount).forEach(day => {
        console.log(day + ' - ' + daysCount[day]);
    });
  }
  
  // 5. Napraviti novi objekt mojePutovanje. Dodati mu metodu izracunajNajduzePutovanje koja ce primati niz putovanja, iz niza izracunati najduze potovanje po property-u "vrijemeLetenja" (property "vrijemeLetenja" je u formatu h:mm) te vratiti to putovanje.
  // Zatim dodati objektu mojePutovanje novi property odabranaDrzava u koju cete upisati ime drzave vracenog najduzeg putovanja te nakon toga ispisati objekt mojePutovanje - 25 bodova
  
  var mojePutovanje = {
  	izracunajNajduzePutovanje: function(data){
    	data.forEach(key => {
      	var x = (key.vrijemeLetenja).split(':')
      	var minutes = parseInt(x[0])*60 + parseInt(x[1]);
        key.flightLengthInMinutes = minutes;
      });
      data.sort((a,b) => b.flightLengthInMinutes - a.flightLengthInMinutes);
      return data[0];
    }
  }
  
 function choosenCountry(data) {
 	var x = mojePutovanje.izracunajNajduzePutovanje(data.putovanja);    
  mojePutovanje.odabranaDrzava = data.imenaDrzava[x.id];
 }
 
 console.log('\n5. zadatak\n');
 console.log(mojePutovanje);
 
  
  // 6. Koristeći se HTML-om, napravite jedan div element. Div element nek sadrzi text Random putovanje. Napravite button koji ce imati tekst Generiraj random putovanje.
  // Na klik buttona postavite funkciju koja će dinamički odabrati random putovanje iz dohvacenih putovanja, i upisati ime drzave i njen glavni grad unutar div elementa - 20 bodova
  function generateRandomTrip(data){
    var randIndex = Math.floor(Math.random()*data.putovanja.length),
      x = data.putovanja[randIndex],
      div = document.querySelector('.box');
      
    div.innerHTML = data.imenaDrzava[x.id] + ' - ' + x.glavniGrad;
  }
  


