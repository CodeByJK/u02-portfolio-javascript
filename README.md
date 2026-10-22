# Developer Portfolio

## Publicerad sida

[Developer Portfolio](https://deluxe-gumption-4f4082.netlify.app/)

## Designskiss

[Originaldesign i Figma](https://www.figma.com/design/ikRGSB3qPVQzgyeMCrCM4S/Developer-Portfolio-Design?node-id=0-1&p=f&t=H0b7oqlB5WhoET4A-0)

## Från designskiss till kod

Jag började med att studera Figma-skissen för att förstå hur sidan var uppbyggd, vilka färger och typsnitt som användes, spacing och hur layouten ändrades mellan mobil och desktop. Jag började med mobil-layouten eftersom det var en instruktion från läraren att arbeta mobile-first. Jag byggde först HTML-strukturen och sedan CSS och delade upp CSS:en i `base.css` för globala regler, `layout.css` för struktur och layout och `components.css` för visuell styling.

En av sakerna som blev kluriga var navigationen. Jag valde att göra den fixerad eftersom den alltid är synlig i designskissen. Det gjorde att sektioner inte syntes då de låg bakom navigationen när jag klickade på en ankarlänk. Jag löste det med `padding-top` på `main` som skapar plats för den fixerade navigationen och `scroll-margin-top` på `section` som gör att sektionen hamnar rätt vid navigering.

När jag hade byggt mobil-versionen upptäckte jag att desktop-versionen i Figma egentligen var uppdelad i flera sidor. Jag frågade min lärare och fick ok på att behålla min struktur, eftersom mobilversionen är en scrollande sida och vi senare kommer att arbeta med React och TypeScript. Mina navigeringslänkar leder därför till respektive sektion på samma sida. Om jag skulle följa desktopskissen exakt skulle jag dela upp innehållet i separata HTML-sidor och länka navigationen till respektive sida.

CSS-variabler i `:root` används för färger, gradient och andra återkommande värden. Det gör det enklare att ändra färger konsekvent och minskar upprepning i CSS:en. Jag använder också CSS-arv, exempelvis genom att sätta `font-family` och grundläggande textfärg på `body`, så att dessa egenskaper kan ärvas av innehållet.

## Semantik

Jag använder semantiska HTML-element där det passar innehållet, bland annat `header`, `nav`, `main`, `section`, `article`, `footer`, rubriker och listor.

Exempelvis används `article` för varje arbetslivserfarenhet och `nav` för navigationen. Tech Stack och sociala länkar är uppbyggda som listor eftersom de består av flera länkar/objekt.

`Div` används där det behövs som strukturell wrapper men där det inte finns något bättre semantiskt element. Ett exempel är `.experience-info`, som grupperar jobbtitel, företag och plats.

## Layout och responsivitet

Jag använder både Flexbox och Grid eftersom de passar för olika typer av layout och har olika styrkor. De kompletterar också varandra bra när de används tillsammans.

Flexbox passar när layouten huvudsakligen är endimensionell, exempelvis i navigationen, sociala länkar och hero-sektionen. På desktop har `.hero-content`:

```css
.hero-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

Här placeras texten på ena sidan och bilden på den andra. `space-between` fördelar utrymmet och `align-items: center` centrerar innehållet vertikalt.

Grid passar när jag behöver kontrollera både rader och kolumner, exempelvis i experience-sektionen, Tech Stack och projektkorten. På desktop har projektkorten:

```css
.projects-grid {
  grid-template-columns: repeat(3, 1fr);
}
```

Tre `1fr` skapar tre lika stora kolumner eftersom `1fr` delar upp det tillgängliga utrymmet. På mobil använder jag `1fr` så att korten visas i en kolumn.

På desktop används `display: contents` på `.experience-info` så att dess barn kan ingå direkt i `.experience-item`-elementets Grid-layout. Det gör att jag kan placera `h3` över två kolumner medan företag och plats hamnar i egna kolumner.

Jag valde `768px` som breakpoint eftersom det är en vanlig utgångspunkt för mindre tablets. Jag testade sidan i olika fönsterstorlekar och tyckte att layouten fungerade bra vid denna brytpunkt. Om innehållet hade sett dåligt ut vid `768px` hade jag flyttat breakpointen.

## Tillgänglighet

Jag har tänkt på tillgänglighet både i HTML och CSS. Bilder som innehåller information har beskrivande alt-texter och dekorativa ikoner har `alt=""`. Jag har också lagt till `:focus-visible` så att fokus syns när sidan används med tangentbord.

Jag kontrollerade färgkontrasten och upptäckte att vissa färgkombinationer från Figma-skissen inte uppfyllde WCAG AA. Jag justerade därför vissa färger för att få bättre kontrast samtidigt som jag försökte vara så nära Figma-skissen som möjligt.

Jag har testat sidan på flera sätt:

* HTML-validatorn gav 0 fel.
* Jag testade navigering med tangentbord och Tab-tangenten.
* Lighthouse gav 100 % Accessibility i både ljust och mörkt läge.
* Jag testade den publicerade sidan i Chrome och Firefox.
* Eftersom jag använder Windows testade jag Safari via BrowserStack och fick 100 % på accessibility-testet.
* Jag testade även dark mode och kontrollerade att text och ikoner fortfarande var läsbara.

Jag använder `prefers-color-scheme` för att följa användarens systeminställning för dark mode. Vissa SVG-ikoner syntes dåligt mot den mörka bakgrunden, så jag använder `filter: invert(1)` på dessa i dark mode.

## Användbarhet

Jag tycker att designen använder visuell hierarki, whitespace och konsekvens på ett bra sätt. Rubrikernas storlek och färg visar vad som är viktigast, medan mellanrummen skapar tydliga avstånd mellan sektionerna. De återkommande projektkorten har samma struktur, vilket gör sidan lättare att överblicka. Den fixerade navigationen gör det enkelt att ta sig mellan sidans olika delar.

Om jag skulle utveckla sidan vidare skulle jag göra hamburgerikonen funktionell och ersätta sociala länkar och projektlänkar med riktiga länkar. Mobilversionen följer designskissen visuellt, men hamburger-menyn är inte funktionell eftersom vi inte skulle använda JavaScript i uppgiften.

## Styrkor och svagheter

En styrka med projektet är att jag har fått en bättre förståelse för när Flexbox och Grid passar bäst och hur de kan kombineras. Jag är också nöjd med uppdelningen mellan `base.css`, `layout.css` och `components.css`, eftersom det gör koden lättare att hitta och förstå.

En svaghet är att mobil- och desktop-layouten skiljer sig ganska mycket, vilket gjorde vissa delar mer komplicerade att anpassa responsivt. Jag hade också kunnat strukturera CSS:en ännu bättre genom att planera vissa regler och komponenter mer konsekvent från början. Det hade kunnat göra koden enklare att underhålla och ändra.

## AI-verktyg

Jag använde AI som stöd och bollplank under utvecklingen, framför allt kring Flexbox och Grid, responsiv design, tillgänglighet och felsökning. Ett exempel är problemet med den fixerade navigationen och ankarlänkarna. Jag använde även AI för att förstå `display: contents` och dark mode.

Förslagen kontrollerade jag genom att prova dem i min egen kod, anpassa dem efter designen och testa resultatet med validatorer, Lighthouse och DevTools. Jag gjorde själv de slutliga valen och implementerade lösningarna.
