# Developer Portfolio

En personlig utvecklarportfolio byggd med HTML, CSS och vanilla JavaScript. Syftet med webbplatsen är att presentera min bakgrund, arbetslivserfarenhet, utbildning och utvalda utvecklingsprojekt.

Portfolion kombinerar data från en lokal JSON-fil med information från GitHubs REST API för att skapa dynamiskt innehåll.

## Publicerad sida

[Developer Portfolio](https://codebyjk.github.io/u02-portfolio-javascript/)

## Funktioner

- Responsiv layout anpassad för mobil, surfplatta och desktop.
- Dynamisk presentation av CV-information från en lokal JSON-fil.
- Dynamisk hämtning av projektinformation från GitHubs REST API.
- Lokal projektdata som gör det möjligt att presentera även teamprojekt och projekt från andra GitHub-konton.
- Automatisk filtrering av forks.
- Loading-, error- och empty states för projektsektionen.
- Ljust och mörkt tema med användarens val sparat i localStorage.
- Stöd för användarens systeminställning för ljust eller mörkt tema.
- Responsiv navigering med stöd för tangentbord.
- Semantisk HTML och tydliga fokusmarkeringar.

## Tekniker

- HTML5
- CSS3
- JavaScript (ES Modules)
- GitHub REST API
- JSON
- localStorage
- Git och GitHub

## Projektstruktur

```text
u02-portfolio-javascript/
│
├── assets/
│   ├── logos/
│   └── project-pics/
│
├── css/
│   ├── base.css
│   ├── components.css
│   └── layout.css
│
├── data/
│   ├── cv.json
│   └── projects.json
│
├── js/
│   ├── main.js
│   ├── theme.js
│   ├── nav.js
│   ├── cv.js
│   ├── projects.js
│   ├── dom.js
│   ├── http.js
│   └── storage.js
│
├── index.html
└── README.md
```

## Köra projektet lokalt

1. Klona repot:

   ```bash
   git clone https://github.com/CodeByJK/u02-portfolio-javascript.git
   ```

2. Öppna projektmappen i Visual Studio Code.

3. Starta en lokal utvecklingsserver, exempelvis med tillägget Live Server.

4. Öppna den lokala adressen som servern tillhandahåller i webbläsaren.

En lokal server rekommenderas eftersom webbplatsen hämtar JSON-filer med `fetch()`.

---

# Reflektion

## 1. Dataflödet – från GitHub API till DOM

När webbplatsen laddas initierar `main.js` de olika JavaScript-modulerna, bland annat `initProjects()` i `projects.js`.

Projektsektionen hämtar data från två källor med hjälp av `Promise.all()`: GitHubs REST API och den lokala filen `data/projects.json`. Genom att använda `Promise.all()` kan båda anropen genomföras parallellt i stället för att vänta på att det ena ska bli klart innan det andra startar.

Anropet till GitHub är en GET-förfrågan till:

`https://api.github.com/users/CodeByJK/repos?sort=updated&per_page=100`

Förfrågan ber GitHub om upp till 100 publika repositories som tillhör mitt konto, sorterade efter när de senast uppdaterades.

GitHub svarar med JSON-data som bland annat innehåller repository-namn, beskrivningar, länkar och information om huruvida ett repository är en fork.

Innan informationen visas på webbplatsen bearbetar min kod svaret. I `renderProjects()` används bland annat `find()` för att matcha repositories med informationen i min lokala projektfil, och `filter()` för att sortera bort forks. Därefter kombineras informationen från de två källorna och `map()` används för att skapa projektkorten.

Slutligen läggs korten in i DOM med `replaceChildren()`.

Detta innebär att informationen inte bara hämtas och visas direkt. Den bearbetas och kombineras först för att ge det resultat jag vill presentera.

## 2. Varför jag valde två olika datakällor

Jag valde att kombinera GitHubs API med en egen JSON-fil eftersom jag ville ha flexibilitet i vilka projekt som kunde visas i portfolion.

GitHubs API hämtar automatiskt information om mina egna publika repositories. Det är användbart eftersom informationen hålls aktuell utan att jag behöver uppdatera den manuellt varje gång ett repository ändras.

Det finns däremot en begränsning: när jag hämtar repositories från mitt eget GitHub-konto får jag inte automatiskt med teamprojekt som ligger under någon annans konto.

Därför skapade jag `projects.json` som en kompletterande datakälla. Där kan jag själv bestämma vilka projekt som ska presenteras och lägga till information som beskrivningar, bilder och tekniker.

Det gör att jag även kan visa teamprojekt där repositoryt tillhör en annan person eller organisation, även om det inte finns bland resultaten från mitt eget GitHub API-anrop.

Mitt CV fungerar på ett annat sätt. Informationen i `cv.json` har jag skrivit själv och den innehåller relativt statisk information om min utbildning och arbetslivserfarenhet. Den behöver därför inte hämtas från en extern tjänst.

Skillnaden är alltså att CV:t har en enda lokal datakälla, medan projektsektionen kombinerar en extern och en lokal datakälla. Genom att dela upp informationen på det här sättet får jag både automatiserad uppdatering och kontroll över innehållet.

## 3. DOM-manipulation och händelser

Jag har delat upp JavaScript-koden i ES-moduler för att varje fil ska ha ett tydligt ansvarsområde. `main.js` initierar funktionerna, medan exempelvis `cv.js`, `projects.js`, `theme.js` och `nav.js` hanterar olika delar av webbplatsen.

I `dom.js` skapade jag en återanvändbar hjälpfunktion som heter `el()`. Den använder `document.createElement()` för att skapa HTML-element, sätta attribut och lägga till underordnade element.

I `projects.js` används exempelvis `createProjectCard()` för att bygga projektkorten. På motsvarande sätt använder `cv.js` funktionen `createEntry()` för att skapa poster i CV-sektionerna.

Jag använder händelselyssnare där användaren behöver kunna interagera med webbplatsen. Temaknappen lyssnar på klick, medan navigeringen hanterar klick, klick utanför menyn, Escape-tangenten och förändringar i skärmens storlek.

Det gör att funktionerna kan reagera på användarens handlingar och anpassa sig efter olika skärmstorlekar.

## 4. Semantisk och tillgänglig markup

En utmaning var att se till att HTML som genereras med JavaScript håller samma semantiska kvalitet och tillgänglighet som den HTML jag själv skrev i u01.

Jag använder semantiska element som `article`, rubriker, `p`, `li` och `time` i stället för att bygga hela strukturen med generella `div`-element.

Bilder får beskrivande alt-texter när de förmedlar information, medan dekorativa bilder kan ha tomma alt-attribut. Datum presenteras med `time`-element och ett `datetime`-attribut.

I min hjälpfunktion `el()` använder jag `textContent` för att lägga in text i stället för att använda `innerHTML`. Det gör också att texten inte tolkas som HTML-kod.

Jag har kontrollerat webbplatsen med WAVE, testat tangentbordsnavigering och fokusmarkeringar samt kontrollerat HTML-koden med W3C:s validator. Valideringen visade inga fel eller varningar.

## 5. Temaväxling med CSS-variabler

Jag implementerade ljust och mörkt tema med hjälp av CSS custom properties, även kallade CSS-variabler.

Grundfärgerna definieras i `:root` i `base.css`. Det mörka temat använder samma variabler men skriver över deras värden under klassen `html.dark`.

JavaScript i `theme.js` ansvarar endast för att lägga till eller ta bort klassen `dark` på HTML-elementet. Därefter sköter CSS resten av färgväxlingen.

Användarens val sparas i localStorage med hjälp av funktioner i `storage.js`. När sidan laddas kontrolleras först om det finns ett sparat val. Om det inte finns något sparat val följer webbplatsen användarens systeminställning med hjälp av `prefers-color-scheme`.

Jag valde denna lösning eftersom den separerar ansvarsfördelningen mellan JavaScript och CSS. Om jag hade satt alla färger direkt i JavaScript hade jag behövt hantera många individuella färgvärden och stylingbeslut i koden. Med CSS-variabler kan jag ändra färgpaletten på ett centralt ställe utan att behöva ändra JavaScript-logiken.

## 6. Felhantering och oväntade situationer

Jag ville att projektsektionen skulle ge tydlig återkoppling till besökaren även när något inte fungerar som förväntat.

I `projects.js` visas ett laddningsmeddelande innan datahämtningen börjar. Den gemensamma funktionen `fetchJson()` i `http.js` kontrollerar om anropet lyckades och använder även `AbortController` för att avbryta anrop som tar längre tid än åtta sekunder.

Om ett anrop misslyckas fångas felet upp och ett felmeddelande visas i stället för projektkorten.

Om anropen lyckas men det inte finns några projekt som kan visas efter matchning och filtrering, visas i stället ett meddelande om att det inte finns några projekt att visa.

Det är viktigt eftersom ett lyckat API-anrop inte nödvändigtvis innebär att det finns innehåll att presentera. Ett långsamt svar, ett misslyckat anrop och en tom lista är olika situationer som behöver hanteras på olika sätt.

Jag testade detta genom att använda Chrome DevTools för att simulera långsamma nätverksanrop och blockera API-anropet. På så sätt kunde jag kontrollera att både laddningsmeddelandet och felmeddelandet visades som förväntat.

## 7. Styrkor och utvecklingsmöjligheter

En styrka med projektet är att JavaScript-koden är uppdelad i mindre moduler med tydliga ansvarsområden. De återanvändbara hjälpfunktionerna gör också att jag slipper upprepa samma kod på flera ställen.

Jag tycker även att kombinationen av en lokal JSON-fil och GitHubs API blev en bra lösning eftersom den ger mig både kontroll över presentationen och möjlighet att hämta aktuell information automatiskt.

Under arbetet har jag framför allt utvecklat min förståelse för asynkron JavaScript, promises, `fetch()`, arraymetoder, DOM-manipulation, händelselyssnare och localStorage.

Med mer tid skulle jag vilja förbättra presentationen och strukturen för arbetslivserfarenhet och utbildning. Jag skulle också kunna utveckla felhanteringen ytterligare, exempelvis genom att lägga till en knapp för att försöka hämta projekten igen om API-anropet misslyckas.

## 8. Användning av AI-verktyg

Jag har använt ChatGPT och Claude som ett stöd under utvecklingsarbetet, framför allt för att förstå JavaScript-koncept, felsöka kod och diskutera olika lösningar.

Det har varit särskilt användbart när jag arbetat med asynkron JavaScript, DOM-manipulation, responsiv design, tillgänglighet och händelsehantering.

Jag har inte velat använda AI för att bara kopiera färdig kod. I stället har jag arbetat steg för steg, bett om förklaringar till hur koden fungerar och anpassat förslagen till min befintliga kodstruktur.

Ett exempel är arbetet med laddnings- och felhantering för GitHub API. Jag testade själv olika nätverkssituationer i Chrome DevTools för att kontrollera att webbplatsen visade rätt information när anropen var långsamma eller misslyckades.

AI har därmed fungerat som ett hjälpmedel i min inlärningsprocess, medan jag själv har fattat besluten om implementationen och testat resultatet.