// ===================================================== Acquisition des ressources ========================================================

const clavier = document.querySelector('#clavier');
const pendu = document.querySelector('#pendu');
const score = document.querySelector('#score');
const zone = document.querySelector('#zone');
const fond = document.querySelector('#fond');
const jeu = document.querySelector('#jeu');

const listTouches = document.getElementsByClassName('touches');
const hasardMot = Math.floor(Math.random() * 1600);
const tailleMot = dictionnaire[hasardMot].length;
const Mot = dictionnaire[hasardMot];
var nombreDErrreurs = 0;

// console.log(`Le mot à trouver est ${Mot} et la longueur de la chaine est ${tailleMot}`);

// ===================================================== Compteur de Lettre ===============================================================

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ ";
var result = {};

for (let char of alphabet) {
    result[char] = 0;
}

for (let char of Mot) {
    if (char in result) {
        result[char] += 1;
    }
}

var motAfficher = Mot.split('');
var solution = Mot.split('');
var resultat = [];

for (var caractere in result) {

    if (result[caractere] <= 2) {
        for (let lete in motAfficher) {
            if (motAfficher[lete] === caractere && motAfficher[lete] !== ' ') {
                motAfficher[lete] = '_';
            }
            if (result[caractere] === ' ' || motAfficher[lete] === caractere) {
                motAfficher[lete] = '&nbsp';
            }
        }
    }
}

function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
// =============================================================== Partie ===================================================================
const boutonSon = document.getElementById('boutonSon');
const clic = new Audio("song/clic.wav");
let sonOffOn;
sonOff()

function sonOn() {
    boutonSon.innerHTML = `<?xml version="1.0" ?><svg id="son" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title/><g data-name="Layer 2" id="Layer_2"><path d="M19.45,4.11a1,1,0,0,0-1,.09L10.67,10H3a1,1,0,0,0-1,1V21a1,1,0,0,0,1,1h7.67l7.73,5.8A1,1,0,0,0,20,27V5A1,1,0,0,0,19.45,4.11Z"/><path d="M23,12a1,1,0,0,0-1,1v6a1,1,0,0,0,2,0V13A1,1,0,0,0,23,12Z"/><path d="M26,10a1,1,0,0,0-1,1V21a1,1,0,0,0,2,0V11A1,1,0,0,0,26,10Z"/><path d="M29,8a1,1,0,0,0-1,1V23a1,1,0,0,0,2,0V9A1,1,0,0,0,29,8Z"/></g></svg>`;
    boutonSon.setAttribute('onclick', 'sonOff()');
    sonOffOn = true;
    createCookie('ppkcookie', sonOffOn, 7);
    return
};

console.log(readCookie(sonOffOn))


function sonOff() {
    boutonSon.innerHTML = `<?xml version="1.0" ?><svg id="son" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title/><g data-name="Layer 2" id="Layer_2"><path d="M19.45,4.11a1,1,0,0,0-1,.09L10.67,10H3a1,1,0,0,0-1,1V21a1,1,0,0,0,1,1h7.67l7.73,5.8A1,1,0,0,0,20,27V5A1,1,0,0,0,19.45,4.11Z"/><path d="M27.41,16l2.29-2.29a1,1,0,0,0-1.41-1.41L26,14.59l-2.29-2.29a1,1,0,0,0-1.41,1.41L24.59,16l-2.29,2.29a1,1,0,1,0,1.41,1.41L26,17.41l2.29,2.29a1,1,0,0,0,1.41-1.41Z"/></g></svg>`;
    boutonSon.setAttribute('onclick','sonOn()');
    sonOffOn = false;
    return
};


function eraseCookie(name) {
    createCookie(name, "", -1);
}

function affichageMotATrou() {
    jeu.innerHTML = motAfficher.join(' ');
}

for (let i = 0; i < listTouches.length; i++) {

    const objetTouche = listTouches[i];
    const valeurTouche = listTouches[i].value;
    const emp = solution.indexOf(valeurTouche)
    objetTouche.addEventListener('click', function () {
        bon(objetTouche, valeurTouche, emp)
    });
    objetTouche.addEventListener('click', () => {
        if (sonOffOn === true) {
            clic.play()
        }
    });
}

function bon(objetTouche, valeurTouche, emp) {

    for (let lettre in solution, motAfficher) {

        // Bonne Réponse
        if (valeurTouche === solution[lettre]) {
            let indexS = solution.indexOf(valeurTouche);
            var indexBis = solution.indexOf(valeurTouche);

            resultat.push(solution[lettre]);
            motAfficher.splice(indexS, 1, valeurTouche);
            solution.splice(indexS, 1, ' ');
            jeu.innerHTML = motAfficher.join(' ');
        }
        // Double lettre
        if (valeurTouche === solution[lettre]) {
            motAfficher.splice(indexBis, 1, valeurTouche);
        }
    }

    // Mauvaise Réponse
    if (valeurTouche !== Mot.charAt(emp)) {
        nombreDErrreurs++
    }

    // Défaite
    switch (nombreDErrreurs) {
        case 1:
            zone.src = "img/p1.gif";
            break;
        case 2:
            zone.src = "img/p2.gif";
            break;
        case 3:
            zone.src = "img/p3.gif";
            break;
        case 4:
            zone.src = "img/p4.gif";
            break;
        case 5:
            zone.src = "img/p5.gif";
            break;
        case 6:
            let reset = document.querySelector('#reset2');
            zone.src = "img/corde0.gif";
            clavier.remove();
            score.innerHTML = '<h3>Vous avez été pendu ... Réessayer ?</h3>';
            jeu.innerHTML = Mot;
            score.appendChild(reset);
            reset.style.display = 'block';
            break;
    };

    // Désactivation touches
    objetTouche.innerHTML = `&nbsp;`;
    objetTouche.disabled = true;


    // Victoire
    let imgVictoire = document.createElement('img');
    let reset = document.querySelector('#reset2');

    imgVictoire.src = "img/soleil.png";
    imgVictoire.id = 'soleil';
    if (resultat.length === solution.length) {
        zone.remove();
        clavier.remove();
        score.innerHTML = '<h3>Vous avez trouvé le bon mot, bravo !</h3>';
        pendu.appendChild(imgVictoire);
        score.appendChild(reset);
        reset.style.display = 'block';
        jeu.innerHTML = Mot;
    }
}

// =================================================== Prépration de la Partie =============================================================

for (var lettres in motAfficher) {
    for (let i = 0; i < listTouches.length; i++) {
        let ot = listTouches[i];
        let vt = listTouches[i].value;
        if (vt === motAfficher[lettres]) {
            ot.disabled = true
            ot.innerHTML = `&nbsp;`
        }
    }
}

for (let lettres in solution, motAfficher) {
    if (solution[lettres] === '-' || solution[lettres] === ' ' || solution[lettres] === "'" || solution[lettres] === motAfficher[lettres]) {
        resultat.push(solution[lettres])
    }
}

// ========================================================== Reset Partie =================================================================

function reset() {
    return window.location.reload();
}

// =========================================================== Mode d'emploi ===============================================================

function aideOpen() {
    let notice = document.getElementById('notice');
    let aide = document.getElementById('aide');
    let reset = document.getElementById('reset');

    reset.style.display = 'none';
    aide.style.display = "initial";
    notice.innerHTML = "Cacher les régles du jeu";

    let notice2 = document.createElement('button');
    notice2.id = 'notice2';
    notice.remove();

    let regleBouton = document.getElementById('regleSon');
    regleBouton.appendChild(notice2);
    notice2.innerHTML = "Cacher les régles du jeu";
    notice2.addEventListener('click', function () {
        aideClosed()
    });
}

function aideClosed() {
    let reset = document.getElementById('reset');
    reset.style.display = 'block';

    let aide = document.getElementById('aide');
    aide.style.display = "none";

    let notice2 = document.getElementById('notice2');
    notice2.innerHTML = "Régles du jeu";

    let notice = document.createElement('button');
    notice.id = 'notice';
    notice2.remove();

    let regleBouton = document.getElementById('regleSon');
    regleBouton.appendChild(notice);
    notice.innerHTML = "Régles du jeu";
    notice.addEventListener('click', function () {
        aideOpen()
    });
}