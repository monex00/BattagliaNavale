var faseSelezione = true;
var faseGioco = false;

var modGioco; //true:bot false:player
var json;
var selezioneFlotta = true; //true: selezione flotta1; false:selezione flotta2

var naviDaPosizionare = new Array();
naviDaPosizionare[0] =  2; //2 navi da una casella
naviDaPosizionare[1] =  1; //1 nave da 2 caselle
naviDaPosizionare[2] =  2; //2 navi da 3 caselle
naviDaPosizionare[3] =  1; //1 nave da 5 caselle

var naviDaPosizionareCopia = dupArr(naviDaPosizionare); //faccio una copia nel caso di selezione nelle modalità player vs player

var caselleNavi = new Array();
caselleNavi[0] = 2; // 2 caselle per due navi
caselleNavi[1] = 2; // 2 caselle per 1 nave
caselleNavi[2] = 3; // 3 caselle per 1 nave
caselleNavi[3] = 3; // 3 caselle per la seconda nave da 3
caselleNavi[4] = 5; // 5 caselle per 1 nave

var caselleNaviAlleate = dupArr(caselleNavi); //faccio una copia per ripoter utlizzare lo stesso meccanismo con le navi alleate

var predProxMoss = ""; 

var turnoAttacco = true; //permette di stabilire il turno di attacco in caso di player vs player

var maxVert_navePiccola = 10;
var maxOriz_navePiccola = 9;
var maxVert_naveMedia = 9;
var maxOriz_naveMedia = 8;
var maxVert_naveGrande = 6;
var maxOriz_naveGrande = 5;
var row = 10;
var col = 10;

var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

var coloreNavPiccola = "#55b52b";
var coloreNavMedia = "#074beb";
var coloreNavGrande = "#bccc10";
var coloreNavGrandissima = "#e80e07";
var coloreMiss = "#b2a3cf";

var flottaAlleata = new flotta();
var flottaNemica = new flotta();

function flotta(){
        this.caselleOccupate = {
            A10: 0,
            A9: 0,
            A8: 0,
            A7: 0,
            A6: 0,
            A5: 0,
            A4: 0,
            A3: 0,
            A2: 0,
            A1: 0,
            
            B10: 0,
            B9: 0,
            B8: 0,
            B7: 0,
            B6: 0,
            B5: 0,
            B4: 0,
            B3: 0,
            B2: 0,
            B1: 0,

            C10: 0,
            C9: 0,
            C8: 0,
            C7: 0,
            C6: 0,
            C5: 0,
            C4: 0,
            C3: 0,
            C2: 0,
            C1: 0,

            D10: 0,
            D9: 0,
            D8: 0,
            D7: 0,
            D6: 0,
            D5: 0,
            D4: 0,
            D3: 0,
            D2: 0,
            D1: 0,

            E10: 0,
            E9: 0,
            E8: 0,
            E7: 0,
            E6: 0,
            E5: 0,
            E4: 0,
            E3: 0,
            E2: 0,
            E1: 0,

            F10: 0,
            F9: 0,
            F8: 0,
            F7: 0,
            F6: 0,
            F5: 0,
            F4: 0,
            F3: 0,
            F2: 0,
            F1: 0,

            G10: 0,
            G9: 0,
            G8: 0,
            G7: 0,
            G6: 0,
            G5: 0,
            G4: 0,
            G3: 0,
            G2: 0,
            G1: 0,

            H10: 0,
            H9: 0,
            H8: 0,
            H7: 0,
            H6: 0,
            H5: 0,
            H4: 0,
            H3: 0,
            H2: 0,
            H1: 0,

            I10: 0,
            I9: 0,
            I8: 0,
            I7: 0,
            I6: 0,
            I5: 0,
            I4: 0,
            I3: 0,
            I2: 0,
            I1: 0,

            J10: 0,
            J9: 0,
            J8: 0,
            J7: 0,
            J6: 0,
            J5: 0,
            J4: 0,
            J3: 0,
            J2: 0,
            J1: 0,
    };
}

function start(){
    var div1 = document.getElementById("intro");
    var div2 = document.getElementById("theMenu");

    div1.style.display = "none";
    div2.style.display = "block";
}


function clickCas(coord){
    var realCoord = coord.substring(1);

    var flotta = flottaAlleata;
    var charToCheck = '0';
    if(modGioco == false){  //setta le condizioni per le quali ripetere la selezione anche per il secondo player oppure far partire la selezione del bot
        if(selezioneFlotta){
            flotta = flottaAlleata;
            charToCheck = '0';
        }else{
            naviDaPosizionare = naviDaPosizionareCopia;
            flotta = flottaNemica;
            charToCheck = '1';
        }     
    }
    
    if(!json && faseSelezione && coord.charAt(0) == charToCheck){
        var vertical = document.getElementById("vertical").checked;
        var horizontal = document.getElementById("horizontal").checked;
        if(flotta.caselleOccupate[realCoord] == 0){
            if(naviDaPosizionare[0] != 0){  //prima fase selezione nave 1 casella
                seleziona(coord, realCoord, 0, true, flotta,true);
                naviDaPosizionare[0] = naviDaPosizionare[0] - 1;
            }else if(naviDaPosizionare[1] != 0){
                if(vertical != false || horizontal != false){
                    var controllo = true;
                    var number;
                    var coordControllo = coord;
                    var realCoordControllo = realCoord;

                    if(flotta.caselleOccupate[realCoordControllo] != 0){
                        controllo = false;
                        stampa("non puoi posizionare la nave",false);
                    }
                    /*Controllo che siano libere la casella succesive */
                    if(vertical){ 
                        number = parseInt(coordControllo.slice(-1)) + 1; 
                        coordControllo = coordControllo.slice(0, coordControllo.length - 1) + number.toString();
                        realCoordControllo = coordControllo.substring(1);
                    }else{
                        letter = nextChar(coordControllo.charAt(1)); 
                        coordControllo = coordControllo.substring(0,1) + letter + coordControllo.substring(2,coord.length); 
                        realCoordControllo = coordControllo.substring(1);
                    }
                    if(flotta.caselleOccupate[realCoordControllo] != 0 && letter != "L" && number != 11){
                        controllo = false;
                        stampa("non puoi posizionare la nave",false);
                    }
                    
                    if(controllo && vertical){  
                        seleziona(coord, realCoord, 2, true, flotta, true);
                        naviDaPosizionare[1] = naviDaPosizionare[1] - 1;
                    }else if(controllo && horizontal){
                        seleziona(coord, realCoord, 2, false, flotta, true);
                        naviDaPosizionare[1] = naviDaPosizionare[1] - 1;
                    }
                    
                }else{
                    stampa("seleziona il verso in cui vuoi posizionare le tua nave",false);
                }
            }else if(naviDaPosizionare[2] != 0){ //seconda fase selezione nave da 3 caselle
                if(vertical != false || horizontal != false){
                    var controllo = true;
                    var number;
                    var coordControllo = coord;
                    var realCoordControllo = realCoord;

                    if(flotta.caselleOccupate[realCoordControllo] != 0){
                        controllo = false;
                        stampa("non puoi posizionare la nave",false);
                    }
                    /*Controllo che siano libere 2 caselle succesive */
                    for (i = 0; i < 2 && controllo; i++) { 
                        if(vertical){ 
                            number = parseInt(coordControllo.slice(-1)) + 1; 
                            coordControllo = coordControllo.slice(0, coordControllo.length - 1) + number.toString();
                            realCoordControllo = coordControllo.substring(1);
                        }else{
                            letter = nextChar(coordControllo.charAt(1)); 
                            coordControllo = coordControllo.substring(0,1) + letter + coordControllo.substring(2,coord.length); 
                            realCoordControllo = coordControllo.substring(1);
                        }
                        if(flotta.caselleOccupate[realCoordControllo] != 0 && letter != "L" && number != 11){
                            controllo = false;
                            stampa("non puoi posizionare la nave",false);
                        }
                    }
                    var range;
                    if(naviDaPosizionare[2] == 1){ //se ho gia selezionato una nave grande 3 per distinguerla dalla seconda la salvo con una grandezza di 3.1
                        range = 3.1;
                    }else{
                        range = 3;
                    }
                    if(controllo && vertical){  
                        seleziona(coord, realCoord, range, true, flotta, true);
                        naviDaPosizionare[2] = naviDaPosizionare[2] - 1;
                    }else if(controllo && horizontal){
                        seleziona(coord, realCoord, range, false, flotta, true);
                        naviDaPosizionare[2] = naviDaPosizionare[2] - 1;
                    }
                    
                }else{
                    stampa("seleziona il verso in cui vuoi posizionare le tua nave",false);
                }
            }else if(naviDaPosizionare[3] != 0){ //terza fase selezione nave da 5 caselle
                if(vertical != false || horizontal != false){
                    var controllo = true;
                    var number;
                    var coordControllo = coord;
                    var realCoordControllo = realCoord;

                    if(flotta.caselleOccupate[realCoordControllo] != 0){
                        controllo = false;
                        stampa("non puoi posizionare la nave",false);
                    }
                    /*controllo che siano libere le 4 caselle successive*/
                    for (i = 0; i < 4 && controllo; i++) { 
                        if(vertical){
                            number = parseInt(coordControllo.slice(-1)) + 1; 
                            coordControllo = coordControllo.slice(0, coordControllo.length - 1) + number.toString();
                            realCoordControllo = coordControllo.substring(1);
                        }else{
                            letter = nextChar(coordControllo.charAt(1)); 
                            coordControllo = coordControllo.substring(0,1) + letter + coordControllo.substring(2,coord.length); 
                            realCoordControllo = coordControllo.substring(1);
                        }
                        if(flotta.caselleOccupate[realCoordControllo] != 0 && letter != "L" && number != 11){
                            controllo = false;
                            stampa("non puoi posizionare la nave", false);
                        }
                    }
                    if(controllo && vertical){  
                        seleziona(coord, realCoord, 5, true, flotta, true);
                        naviDaPosizionare[3] = naviDaPosizionare[3] - 1;
                        if(modGioco){ //se gioco contro il bot faccio partire la selezione delle navi del bot
                            faseSelezione = false;
                            stampa("seleziona una casella nemica per iniziare a giocare",false);
                            selezioneNemica();
                        }else{
                            if(selezioneFlotta){ //controllo a che punto è la selezione in caso di player vs player : selezione player1
                                selezioneFlotta = false;
                                stampa("Inizio selezione giocatore 2");
                                decolora();
                            }else{ //selezione player 2
                                decolora();
                                faseSelezione = false;
                                stampa("seleziona una casella nemica per iniziare a giocare",false);
                                faseGioco = true;
                            }
                        }
                    }else if(controllo && horizontal){
                        seleziona(coord, realCoord, 5, false, flotta, true);
                        naviDaPosizionare[3] = naviDaPosizionare[3] - 1;
                        if(modGioco){
                            faseSelezione = false;
                            stampa("seleziona una casella nemica per iniziare a giocare",false);
                            selezioneNemica();
                        }else{
                            if(selezioneFlotta){
                                decolora();
                                selezioneFlotta = false;
                                stampa("Inizio selezione giocatore 2");
                            }else{
                                decolora();
                                faseSelezione = false;
                                stampa("seleziona una casella nemica per iniziare a giocare",false);
                                faseGioco = true;
                            }
                        }   
                    }
                }else{
                    stampa("seleziona il verso in cui vuoi posizionare le tua nave",false);
                }
            }
        //document.getElementById("horizontal").checked = false;
        //document.getElementById("vertical").checked = false;
        }else{
            stampa("casella gia' selezionata",false);
        }
       
    }else if(faseGioco && modGioco && coord.charAt(0) != '0'){
        attacca(coord, realCoord, flottaNemica, caselleNavi, false);
    }else if(faseGioco && !modGioco){ //regola il turno di attacco in caso di player vs player
        if(coord.charAt(0) == 1 && turnoAttacco){
            attacca(coord, realCoord, flottaNemica, caselleNavi, false);
            turnoAttacco = false;
        }else if(coord.charAt(0) == 0 && !turnoAttacco){
            attacca(coord, realCoord, flottaAlleata, caselleNaviAlleate, true);
            turnoAttacco = true;
        }else{
            alert("Non è il tuo turno");
        }
    }else if(!modGioco && json){ //nel caso sia attiva l'opzione json devo saltare la fase di selezione della flotta 1 e continuare con la selezione del bot o del player 2; nel caso del bot guadare la funzione selezioneMod()
        json = false;
        selezioneFlotta = false;
        clickCas(coord);
    }

}

function attacca(coord, realCoord, flotta, navi, flag){ //i parametri flotta e navi generalizzano la funzione, permettendo di riutilizzare lo stesso codice per l'attacco del player 2
    var button = document.getElementById(coord);
    if(flotta.caselleOccupate[realCoord] == 1){
        button.style.background = coloreNavPiccola;
        navi[0] = navi[0] - 1;
        flotta.caselleOccupate[realCoord] = 0;
        if(!flag){ //condiziona la stampa in caso di player vs player
            stampa("FLOTTA1: colpisce e affonda nave piccola in: " + realCoord, false);
        }else{
            stampa("FLOTTA2: colpisce e affonda nave piccola in: " + realCoord, true);
        }
    }else if(flotta.caselleOccupate[realCoord] == 2){
        button.style.background = coloreNavMedia;
        if(navi[1] != 1){
            if(!flag){
                stampa("FLOTTA1: colpisce ma non affonda nave da 2 in: " + realCoord,false);
            }else{
                stampa("FLOTTA2: colpisce ma non affonda nave da 2 in: " + realCoord, true);
            }
        }else{
            if(!flag){
                stampa("FLOTTA1: colpisce e affonda nave da 2 in: " + realCoord,false);
            }else{
                stampa("FLOTTA2: colpisce e affonda nave da 2 in: " + realCoord,true);
            }
        }
        navi[1] = navi[1] - 1;
        flotta.caselleOccupate[realCoord] = 0;
    }
    else if(flotta.caselleOccupate[realCoord] == 3){
        button.style.background = coloreNavGrande;
        if(navi[2] != 1){
            if(!flag){
                stampa("FLOTTA1: colpisce ma non affonda prima nave da 3 in: " + realCoord,false);
            }else{
                stampa("FLOTTA2: colpisce ma non affonda prima nave da 3 in: " + realCoord,true);
            }
        }else{
            if(!flag){
                stampa("FLOTTA1: colpisce e affonda prima nave da 3 in: " + realCoord,false);
            }else{    
                stampa("FLOTTA2: colpisce e affonda prima nave da 3 in: " + realCoord,true);
            }
        }
        navi[2] = navi[2] - 1;
        flotta.caselleOccupate[realCoord] = 0;
    }else if(flotta.caselleOccupate[realCoord] == 3.1){
        button.style.background = coloreNavGrande;
        if(navi[3] != 1){
            if(!flag){
                stampa("FLOTTA1: colpisce ma non affonda seconda nave da 3 in: " + realCoord,false);
            }else{
                stampa("FLOTTA2: colpisce ma non affonda seconda nave da 3 in: " + realCoord, true);
            }
        }else{
            if(!flag){
                stampa("FLOTTA1: colpisce e affonda seconda nave da 3 in: " + realCoord,false);
            }else{
                stampa("FLOTTA2: colpisce e affonda seconda nave da 3 in: " + realCoord, true);
            }
        }
        navi[3] = navi[3] - 1;
        flotta.caselleOccupate[realCoord] = 0;
    }else if(flotta.caselleOccupate[realCoord] == 5){
        button.style.background = coloreNavGrandissima;
        if(navi[4] != 1){
            if(!flag){
                stampa("FLOTTA1: colpisce ma non affonda nave da 5 in:" + realCoord,false);
            }else{   
                stampa("FLOTTA2: colpisce ma non affonda nave da 5 in:" + realCoord,true);
            }
        }else{
            if(!flag){
                stampa("FLOTTA1: colpisce e affonda nave da 5 in: " + realCoord,false);
            }else{  
                stampa("FLOTTA2: colpisce e affonda nave da 5 in: " + realCoord,true);
            }
        }
        navi[4] = navi[4] - 1;
        flotta.caselleOccupate[realCoord] = 0;
    }else{
        button.style.background = coloreMiss;
        if(!flag){
            stampa("FLOTTA1: attacca a vuoto in: " + realCoord,false);
        }else{
            stampa("FLOTTA2: attacca a vuoto in: " + realCoord,true);
        }
    }
    
    controlloVittoria();

    /* ATTACCO DEL BOT */
    if(faseGioco && modGioco){
        var randomrow;
        var randomcol;
        if(predProxMoss == ""){
            randomrow = Math.floor(Math.random() * (row) + 1);
            randomcol = characters.charAt(Math.floor(Math.random() * (row  - 1) + 1));
            realCoord = randomcol + randomrow;  //creazione coordinate casuali
            coord = "0" + realCoord;
            button = document.getElementById(coord);
        }else{
            realCoord = predProxMoss;
            coord = "0" + realCoord;
        }
        if(flottaAlleata.caselleOccupate[realCoord] == 1){
            button.style.background = coloreNavPiccola;
            caselleNaviAlleate[0] = caselleNaviAlleate[0] - 1
            flottaAlleata.caselleOccupate[realCoord] = 0;
            stampa("FLOTTA2: colpisce e affonda nave piccola in: " + realCoord, true);
        }else if(flottaAlleata.caselleOccupate[realCoord] == 2){
            button.style.background = coloreNavMedia;
            if(caselleNaviAlleate[1] != 1){
                stampa("FLOTTA2: colpisce ma non affonda nave da 2 in: " + realCoord, true);
            }else{
                stampa("FLOTTA2: colpisce e affonda nave da 2 in: " + realCoord, true);
            }
            caselleNaviAlleate[1] = caselleNaviAlleate[1] - 1;
            flottaAlleata.caselleOccupate[realCoord] = 0;
        }else if(flottaAlleata.caselleOccupate[realCoord] == 3){
            button.style.background = coloreNavGrande;
            if(caselleNaviAlleate[2] != 1){
                stampa("FLOTTA2: colpisce ma non affonda nave da 3 in: " + realCoord, true);
            }else{
                stampa("FLOTTA2: colpisce e affonda nave da 3 in: " + realCoord, true);
            }
            caselleNaviAlleate[2] = caselleNaviAlleate[2] - 1;
            flottaAlleata.caselleOccupate[realCoord] = 0;
        }else if(flottaAlleata.caselleOccupate[realCoord] == 3.1){
            button.style.background = coloreNavGrande;
            if(caselleNaviAlleate[3] != 1){
                stampa("FLOTTA2: colpisce ma non affonda nave da 3 in: " + realCoord, true);
            }else{
                stampa("FLOTTA2: colpisce e affonda nave da 3 in: " + realCoord, true);
            }
            caselleNaviAlleate[3] = caselleNaviAlleate[3] - 1;
            flottaAlleata.caselleOccupate[realCoord] = 0;
        }else if(flottaAlleata.caselleOccupate[realCoord] == 5){
            button.style.background = coloreNavGrandissima;
            if(caselleNaviAlleate[4] != 1){
                stampa("FLOTTA2: colpisce ma non affonda nave da 5 in: " + realCoord, true);
            }else{
                stampa("FLOTTA2: colpisce ma non affonda nave da 3 in: " + realCoord, true);
            }
            caselleNaviAlleate[4] = caselleNaviAlleate[4] - 1;
            flottaAlleata.caselleOccupate[realCoord] = 0;
        }else{
            button.style.background = coloreMiss;
            stampa("FLOTTA2: attacca a vuoto in: " + realCoord, true);
        }
    
    controlloVittoria();
    }
}

function controlloVittoria(){
    var controllo = true
    for (let i = 0; i < caselleNavi.length && controllo; i++) {
        if(caselleNavi[i] > 0){
            controllo = false;
        }
    }

    if(controllo){
        faseGioco = false;
        stampa("Vittoria flotta 1");
    }else{
        controllo = true;
        for (let i = 0; i < caselleNaviAlleate.length && controllo; i++) {
            if(caselleNaviAlleate[i] != 0){
                controllo = false;
            }
        }
        if(controllo && faseGioco){
            faseGioco = false;
            stampa("Vittoria flotta 2");
        }
    }
}

/*funzione che effettua le operazioni di selezione delle diverse tipologia di navi */
function seleziona(coord, realCoord, range, orientation, flotta, colora){ //orientation: true se verticale, false se orizzontale
    var button;
    var number;
    var letter;
    if(range == 0){
        if(colora){
            var button = document.getElementById(coord);
            button.style.background = coloreNavPiccola;
        }
        flotta.caselleOccupate[realCoord] = 1;
    }else{
        if(orientation){
            for (let i = 0; i < Math.floor(range); i++) { //dispone automaticamente range caselle verticali partendo da una data
                if(colora){
                    button = document.getElementById(coord);
                    if(range == 2){
                        button.style.background = coloreNavMedia;
                    }else if(range == 3 || range == 3.1){
                        button.style.background = coloreNavGrande;
                    }else{
                        button.style.background = coloreNavGrandissima;
                    }
                }
                flotta.caselleOccupate[realCoord] = range;
                number = parseInt(coord.slice(-1)) + 1; //prendo ultimo numero delle coordinate
                coord = coord.slice(0, coord.length - 1) + number.toString();
                realCoord = coord.substring(1);
            }
        }else{
            for (let i = 0; i < Math.floor(range); i++) { //dispone automaticamente range caselle orizzontali partendo da una data
                if(colora){
                    button = document.getElementById(coord);
                    if(range == 2){
                        button.style.background = coloreNavMedia;
                    }else if(range == 3){
                        button.style.background = coloreNavGrande;
                    }else{
                        button.style.background = coloreNavGrandissima;
                    }
                }
                flotta.caselleOccupate[realCoord] = range;
                letter = nextChar(coord.charAt(1)); //prendo la lettera per incrementarla 
                coord = coord.substring(0,1) + letter + coord.substring(2,coord.length); //creo nuove coordinate
                realCoord = coord.substring(1);
            }
        }
    }  
}

function selezioneNemica(){
    var listacoordinate = [];  //lista contenente tutte le coordinate nemiche
    var i = 0;
    var randomrow;
    var randomcol;
    var realCoord;
    var coord;
    var number;
    /*selezione casuale navi da 1 */
    while(i<2){
        randomrow = Math.floor(Math.random() * (row) + 1);
        randomcol = characters.charAt(Math.floor(Math.random() * (row  - 1) + 1));
        realCoord = randomcol + randomrow;  //creazione coordinate casuali
        if(listacoordinate.indexOf(realCoord) === -1){  //evito che ci siano due navi da 1 cella sovrapposte
            listacoordinate.push(realCoord);
            coord = 1 + realCoord;
            seleziona(coord, realCoord, 0, true, flottaNemica, false);
            i = i + 1;
        }  
    }

    /*selezione casuale nave da 3 e da 5*/
    for(let j = 2; j<=5; j++){ //prima fase con nave da 3 caselle e seconda con nave da 5
        var controllo = true;
        var orientation = Math.floor(Math.random() * (2 - 0)) + 0; //1 se verticale 0 orizzontale
        while(controllo){  //while che testa che le navi non vengano sovrapposte a quelle gia presenti, nel caso accada rigenera altre coordinate casuali
            if(j == 2){ //distinzione necessaria per rispettare i vincoli di range del campo
                if(orientation == 1){
                    randomrow = Math.floor(Math.random() * (maxVert_navePiccola - 1)) + 1;
                    randomcol = characters.charAt(Math.floor(Math.random() * (col - 1 ))+ 1);
                }else{
                    randomrow = Math.floor(Math.random() * (row - 1)) + 1;
                    randomcol = characters.charAt(Math.floor(Math.random() * (maxOriz_navePiccola - 1 ))+ 1);
                }
            }else if(j == 3 || j == 4){  
                if(orientation == 1){
                    randomrow = Math.floor(Math.random() * (maxVert_naveMedia - 1)) + 1;
                    randomcol = characters.charAt(Math.floor(Math.random() * (col - 1 ))+ 1);
                }else{
                    randomrow = Math.floor(Math.random() * (row - 1)) + 1;
                    randomcol = characters.charAt(Math.floor(Math.random() * (maxOriz_naveMedia - 1 ))+ 1);
                }
            }else{
                if(orientation == 1){
                    randomrow = Math.floor(Math.random() * (maxVert_naveGrande - 1)) + 1;
                    randomcol = characters.charAt(Math.floor(Math.random() * (col - 1 ))+ 1);
                }else{
                    randomrow = Math.floor(Math.random() * (row - 1)) + 1;
                    randomcol = characters.charAt(Math.floor(Math.random() * (maxOriz_naveGrande - 1 ))+ 1);
                }
            }
            realCoord = randomcol + randomrow;
            coord = 1 + realCoord;
            var originrealCoord = realCoord;  //salvo i punti iniziali da dove verranno generate le navi, in caso di successo durante il controllo so da dove iniziare a selezionare
            var origincoord = coord;
            var nave = [];
            var temp;

            if(j == 4){ //permette di disegnare nel campo nemico due volte la nave da 3
                temp = 3.1; //3.1 permette di distinguere le due navi da 3
            }else{
                temp = j;
            }

            //controllo la che la prima casella non sia gia stata selezionata
            if(listacoordinate.indexOf(realCoord) != -1){
                controllo = false;
            }

            /*INIZIO CONTROLLO SOVRAPPOSIZIONE CON ALTRE NAVI */
            for (i = 0; i < Math.floor(temp) && controllo; i++) { 
                if(orientation == 1){
                    number = parseInt(coord.slice(-1)) + 1; 
                    coord = coord.slice(0, coord.length - 1) + number.toString();
                    realCoord = coord.substring(1);
                }else{
                    letter = nextChar(coord.charAt(1)); 
                    coord = coord.substring(0,1) + letter + coord.substring(2,coord.length); 
                    realCoord = coord.substring(1);
                }
                if(listacoordinate.indexOf(realCoord) != -1){
                    controllo = false;
                }else{
                    nave.push(realCoord);
                }
            }
            controllo = !controllo;
        }

        listacoordinate = listacoordinate.concat(nave);
        if(orientation == 1){
            seleziona(origincoord, originrealCoord, temp, true, flottaNemica, false);
        }else{
            seleziona(origincoord, originrealCoord, temp, false, flottaNemica, false);
        }
    }
    faseGioco = true;
}

function selezioneMod(type){
    var div1 = document.getElementById("theMenu");
    var div2 = document.getElementById("theBody");
    json = document.getElementById("json").checked;
    
    var realCoord;
    var coord;
    var orientation;
    var range;

    div1.style.display = "none";
    div2.style.display = "block";

    if(type == "bot"){
        modGioco = true;
    }else{
        modGioco = false;
    }

    if(json){
        var mydata = JSON.parse(data);
        for (let i = 0; i < mydata.length; i++) {
            realCoord = mydata[i].x + mydata[i].y;
            coord = "0" + realCoord;
            if(mydata[i].orientation == "vertical"){
                orientation = true;
            }else{
                orientation = false;
            }
            if(i == 0){
                range = 0;
            }else if(i == 1){
                range = 0;
            }else if(i == 2){
                range = 2;
            }else if(i == 3){
                range = 3;
            }else if(i == 4){
                range = 3.1; 
            }else if(i == 5){
                range = 5;
            }
            seleziona(coord,realCoord, range, orientation, flottaAlleata, true);
        }
        if(modGioco){
            faseSelezione = false;
            stampa("seleziona una casella nemica per iniziare a giocare",false);
            selezioneNemica();
        }else{
            stampa("Inizio selezione giocatore 2");
        }
    }

}

/*FUNZIONI DI SUPPORTO*/

function decolora(){ //decolora tutto il campo
    var row = document.getElementById("table1").rows;
    for (let i = 0; i < row.length; i++) {
        var elements = row[i].cells;
        for (let j = 0; j < elements.length; j++) {
            if(elements[j].childNodes[0].className =="casella"){
                elements[j].childNodes[0].style.background = "#0b0e0b";
            }    
        }
    }

    var row = document.getElementById("table2").rows;
    for (let i = 0; i < row.length; i++) {
        var elements = row[i].cells;
        for (let j = 0; j < elements.length; j++) {
            if(elements[j].childNodes[0].className =="casella"){
                elements[j].childNodes[0].style.background = "#0b0e0b";
            }    
        }
    }
    
}


function nextChar(c) {// restituisce il prossimo carattere di c
    return String.fromCharCode(c.charCodeAt(0) + 1);
}

function stampa(message, flag1){ //stampa nella textarea
    var txtArea = document.getElementById("log"); 
    
    if(flag1){
        message = txtArea.innerHTML + "\n" +  message;
        txtArea.innerHTML = message;
    }else{
        txtArea.innerHTML = message;
    }
}

function dupArr(arr){//duplica un array
    var arr1 = [];
    for(let i=0; i<arr.length; i++){
        arr1[i] = arr[i];
    }
    return arr1;
}
