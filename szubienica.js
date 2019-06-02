var clue = "Bez pracy nie ma kołaczy";
// var clue = "BuB";
clue = clue.toUpperCase();

var clueLength = clue.length;
var mistakeCounter = 0;

var yes = new Audio("yes.wav");
var no = new Audio("no.wav");

var clueBlank = "";
// clueBlank();

// function clueBlank(){
for (i = 0; i < clueLength; i++) {
    if (clue.charAt(i) == " ") clueBlank += " ";
    else (clueBlank += "-");
}
// }

function printClue() {
    document.getElementById("board").innerHTML = clueBlank;
}

var letterArray = new Array(
    "A", "Ą", "B", "C", "Ć", "D", "E",
    "Ę", "F", "G", "H", "I", "J", "K",
    "L", "Ł", "M", "N", "Ń", "O", "Ó",
    "P", "Q", "R", "S", "Ś", "T", "U",
    "V", "W", "X", "Y", "Z", "Ż", "Ź");

function start() {
    var divContent = "";

    for (i = 0; i <= 34; i++) {
        var element = "lit" + i;
        divContent += '<div class="letter" onclick="check('+i+')" id="' + element + '">' + letterArray[i] + '</div>';
        if ((i + 1) % 7 == 0) divContent += '<div style="clear:both;"></div>';
    }
    document.getElementById("alphabet").innerHTML = divContent;
    printClue();
}

String.prototype.setClueChar = function (index, character) {
    if (index > this.length - 1) return this.toString();
    else return this.substr(0, index) + character + this.substr(index + 1);
}

function check(num) {
    var guessed = false;

    for (i = 0; i < clueLength; i++) {
        if (clue.charAt(i) == letterArray[num]) {
            clueBlank = clueBlank.setClueChar(i, letterArray[num]);
            guessed = true;
        }
    }

    if (guessed == true) {
        yes.play();
		var element = "lit" + num;
		document.getElementById(element).style.background = "#003300";
        document.getElementById(element).style.color = "#00C000";
        document.getElementById(element).style.border = "3px solid #00C000";
        document.getElementById(element).style.cursor = "default";
        printClue();
    } else {
        no.play();
        var element = "lit" + num;
        document.getElementById(element).style.background = "#330000";
        document.getElementById(element).style.color = "#C00000";
        document.getElementById(element).style.border = "3px solid #C00000";
        document.getElementById(element).style.cursor = "default";
        document.getElementById(element).setAttribute("onclick", ";");      // przypisz wydarzenie, które nic nie robi

        mistakeCounter++;
        var image = "img/s"+ mistakeCounter + ".jpg";
        document.getElementById("gallows").innerHTML = '<img src="'+image+'" alt="" />';
    }
    //wygrana
	if (clue == clueBlank)
	document.getElementById("alphabet").innerHTML  = "Tak jest! Podano prawidłowe hasło: "+clue+'<br /><br /><span class="reset" onclick="location.reload()">JESZCZE RAZ?</span>';
	
	//przegrana
	if (mistakeCounter>=9)
	document.getElementById("alphabet").innerHTML  = "Przegrana! Prawidłowe hasło: "+clue+'<br /><br /><span class="reset" onclick="location.reload()">JESZCZE RAZ?</span>';
    }


window.onload = start;