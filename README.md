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
- Interaktiv filtrering i sektionen Tech Stack & Tools.

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
│   ├── images/ 
│   ├── logos/
│   ├── project-pics/
│   └── Johanna_Krantz_CV.docx
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
│   ├── techstack.js
│   └── storage.js
│
├── index.html
└── README.md
```


# Reflektion

## 1. Dataflödet – från GitHub API till DOM

När sidan laddas anropas `initProjects()` från `main.js`. Med `Promise.all()` hämtas projektdata parallellt från GitHubs API och `data/projects.json`.

Anropet till GitHub använder GET-metoden för att hämta mina publika repositories. GitHub svarar med en HTTP-statuskod och data i JSON-format. Funktionen `fetchJson()` i `http.js` kontrollerar `response.ok`. Om svaret inte är lyckat kastas ett fel med information om statuskoden. Vid ett lyckat svar omvandlar `response.json()` svaret till JavaScript-data. Med `AbortController` avbryts anropet om det tar längre än åtta sekunder.

Därefter matchas projekten i `projects.json` med repositories från GitHub utifrån repositoryts namn. Forkade repositories filtreras bort. Jag använder mina egna beskrivningar och bilder från `projects.json` tillsammans med länkarna från GitHub. Projektkorten skapas och läggs in i DOM:en med `replaceChildren()`.

## 2. Varför jag valde två olika datakällor

Jag kombinerade GitHubs API med `projects.json` för att kunna visa både egna projekt och teamprojekt. API:et hämtar automatiskt information om mina publika repositories, vilket gör att informationen hålls aktuell utan att jag behöver uppdatera allt manuellt.

En begränsning är att API-anropet till mitt konto inte automatiskt hämtar teamprojekt som ligger under någon annans konto. I `projects.json` kan jag välja vilka projekt som ska visas och komplettera med beskrivningar, bilder och tekniker och även styra hur projekten presenteras.

CV:t hämtas i stället från `cv.json`, som jag själv har skrivit. Utbildning och arbetslivserfarenhet är relativt statisk information och behöver inte hämtas från en extern tjänst. På så sätt använder jag en lokal källa för CV:t och kombinerar en extern och en lokal källa för projekten.

## 3. DOM-manipulation och händelser

Jag har delat upp JavaScript-koden i ES-moduler med olika ansvarsområden. `main.js` initierar funktionerna, medan exempelvis `cv.js`, `projects.js`, `theme.js` och `nav.js` hanterar olika delar av webbplatsen.

I `dom.js` har jag skapat den återanvändbara hjälpfunktionen `el()`. Den använder `document.createElement()` för att skapa element, sätta attribut och lägga till underordnade element. `createProjectCard()` bygger projektkorten och `createEntry()` skapar posterna i CV:t. Hjälpfunktionerna gör att jag kan återanvända samma struktur i stället för att upprepa kod.

Jag använder händelselyssnare för funktioner som besökaren kan påverka. Temaknappen reagerar på klick, medan navigeringen hanterar bland annat klick, klick utanför menyn och Escape-tangenten.

Jag har också lagt till filtrering i Tech Stack & Tools, där besökaren kan välja tekniker för att filtrera innehållet. Det gör det lättare att hitta och utforska de tekniker som finns med i min portfolio.

## 4. Semantisk och tillgänglig markup

Jag har sett till att innehåll som skapas med JavaScript håller samma semantiska kvalitet och tillgänglighet som HTML-koden jag skrev för hand. Därför använder jag bland annat `article`, rubrikelement, `p`, `li` och `time` i det genererade innehållet. Bilder har beskrivande alt-texter när de förmedlar information och tomma alt-attribut när de är dekorativa. Datum använder `time` med `datetime`.

I `el()` använder jag `textContent` för text i stället för `innerHTML`. Då behandlas innehållet som text och inte som HTML-kod.

Jag har testat sidan med WAVE, kontrollerat att textkontrasterna uppfyller WCAG AA och navigerat med enbart tangentbord för att kontrollera logisk ordning och synlig fokusmarkering. Jag har också validerat HTML-koden med W3C Validator, som inte visade några fel eller varningar.

## 5. Temaväxling med CSS-variabler

Jag använder CSS-variabler för att hantera ljust och mörkt tema. Grundfärgerna definieras i `:root` i `base.css`, och värdena skrivs över när klassen `dark` finns på `html`.

`theme.js` lägger till eller tar bort klassen på HTML-elementet. JavaScript behöver alltså inte ändra enskilda färger; CSS ansvarar för utseendet. Användarens val sparas i `localStorage` via funktioner i `storage.js`. Om det inte finns ett sparat val följer sidan systeminställningen med `prefers-color-scheme`.

Jag valde den här lösningen för att separera ansvaret mellan JavaScript och CSS. Med variabler kan jag ändra färgpaletten på ett centralt ställe. Om färgerna i stället låg direkt i JavaScript skulle koden bli svårare att underhålla.

## 6. Felhantering och oväntade situationer

För att hantera situationer där datahämtningen tar lång tid eller misslyckas har jag implementerat ett laddningsmeddelande, felhantering och en timeout. `fetchJson()` kontrollerar HTTP-svaret och använder `AbortController` för att avbryta anrop som tar längre än åtta sekunder.

Om ett anrop misslyckas fångas felet i `projects.js` och ett felmeddelande visas på sidan. Om anropen lyckas men inga projekt kan visas efter matchning och filtrering visas i stället ett meddelande om att det inte finns några projekt tillgängliga. Ett lyckat anrop betyder alltså inte automatiskt att det finns projekt att visa.

Jag testade laddning och felhantering med Chrome DevTools genom att simulera ett långsamt nätverk och blockera API-anropet. Då kunde jag kontrollera att besökaren fick rätt återkoppling.

## 7. Styrkor och utvecklingsmöjligheter

En av styrkorna är att jag har delat upp koden i moduler med olika ansvarsområden. Hjälpfunktionerna gör också att jag slipper upprepa samma kod på flera ställen. Jag tycker också att kombinationen av GitHubs API och lokal JSON ger en bra balans mellan automatiserad information och kontroll över vilka projekt som visas.

Arbetet har framför allt utvecklat min förståelse för asynkron JavaScript, promises, `fetch()`, arraymetoder, DOM-manipulation, händelselyssnare och `localStorage`.

Med mer tid skulle jag vidareutveckla presentationen av arbetslivserfarenheten genom att lägga till arbetsuppgifter för varje roll. Jag skulle komplettera `cv.json` med ett nytt fält för ansvarsområden och ändra `createEntry()` så att arbetsuppgifterna renderas som punktlistor. Det skulle ge en tydligare bild av vad jag faktiskt har arbetat med, utan att behöva skriva in innehållet direkt i HTML-koden.

## 8. Användning av AI-verktyg

Jag har använt ChatGPT och Claude som stöd under utvecklingsarbetet, framför allt för att förstå JavaScript-koncept, felsöka kod och diskutera lösningar inom exempelvis asynkron JavaScript, DOM-manipulation och tillgänglighet.

Jag har arbetat steg för steg, bett om förklaringar och anpassat förslagen till min egen kodstruktur i stället för att bara kopiera färdig kod. Exempelvis använde jag AI som stöd vid arbetet med laddnings- och felhantering för GitHub API, men testade själv olika nätverkssituationer i Chrome DevTools.

AI har fungerat som ett hjälpmedel i min inlärning, medan jag själv har fattat besluten om implementationen och testat resultatet.