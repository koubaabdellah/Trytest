String.prototype.ltrim = function () { return this.replace(/^ */,""); } 
String.prototype.rtrim = function () { return this.replace(/ *$/,""); } 
String.prototype.trim = function () { return this.ltrim().rtrim(); }

//Algemene functie waarmee een waarde kan worden gecontroleerd ten opzicht van een reguliere expressie.
//Wordt o.a. gebruikt voor het valideren van de ingevoerde waarde voor een emailadres.
function validateFormat(expression, value)
{
    //Aanmaken van de reguliere expressie waartegen de ingevoerde waarde wordt gecontroleerd.
    var re = new RegExp(expression);

    var result = value.match(re)
    
    //Als er een resultaat is opgeleverd, is de waarde correct.
    if (result != null)
    {
        return true;
    }
    else
    {
        return false;
    }
}

//Controle of klantnummer moet worden ingevuld en of dat dan ook is gedaan (NAW blok).
function validateKlantnummerVerplicht(klantnummerNietBekend, klantnummer)
{
    //Klantnummer is verplicht wanneer het vinkje "Klantnummer niet bekend" niet is aangevinkt.
    if ((klantnummerNietBekend == false) && (klantnummer == ""))
    {
        return false;
    }
    else
    {
        return true;
    }
}

//Controle of een brinnummer voldoet aan het juiste formaat.
function validateBrinnummerFormaat(expression, brinnummer1, brinnummer2)
{
    //Controle op brinnummer vindt plaats als:
    //1) Het brinnummer1 een waarde bevat.
    //2) Het brinnummer2 een waarde bevat anders dan "00".
    if ( (brinnummer1 != "") || ((brinnummer2 != "") && (brinnummer2 != "00")) )
    {
        //Aanmaken van de reguliere expressie waartegen de ingevoerde waarde wordt gecontroleerd.
        var re = new RegExp(expression);

        var brinnummer = new String(brinnummer1 + brinnummer2);
        var result = brinnummer.match(re)
        
        //Als er een resultaat is opgeleverd, is het brinnummer correct.
        if (result != null)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    
    return true;
}

//Pretestblok: Controleren of de namen van van deelnemers zijn aangegeven wanneer wordt deelgenomen aan de trainingsmiddag.
function validateTrainingsmiddag(deelnameTrainingsmiddag, namenDeelnemers)
{
    for (var index = 0; index < deelnameTrainingsmiddag.childNodes.length; index++)
    {
        var node = deelnameTrainingsmiddag.childNodes[index];
    
        //Controleren van de radio buttons in de lijst.
        if ((node.tagName == "INPUT") && (node.type = "radio"))
        {
            //Controleren of de radio button met de waarde "Ja" (="1") is aangevinkt.
            if ((node.value == "1") && (node.checked))
            {
                //Als is aangegeven dat wordt deelgenomen aan de trainingsmiddag, moeten de namen van de deelnemers 
                //worden opgegeven.
                if (namenDeelnemers == "")
                {
                    return false;
                }
            }
        }
    }
    
    return true;
}