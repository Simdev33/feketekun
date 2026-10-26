// Minden szöveg és adat itt van — a komponensek csak innen olvasnak.
// Forrás: a Facebook-oldal posztjai és az étlap-plakát (lásd CEGADATOK.md).

export const site = {
  name: "Fekete Kun Falatozó",
  short: "Fekete Kun",
  slogan: "ahol mindig készül valami finom",
  pillars: ["Hagyomány", "Ízek", "Erő"],
  phone: "06 20 997 4589",
  phoneHref: "tel:+36209974589",
  address: "Karcag, Deák Ferenc krt. 78.",
  addressShort: "Karcag, Deák krt. 78.",
  mapsQuery: "Karcag, Deák Ferenc körút 78.",
  facebook: "https://www.facebook.com/p/Fekete-Kun-Falatoz%C3%B3-61594123626047/",
  url: "https://feketekunfalatozo.hu",
  opened: "2026. szeptember 17.",
  followers: "1,2 E",
};

// 0 = vasárnap … 6 = szombat
export const hours: { day: string; open: string | null; close: string | null }[] = [
  { day: "Vasárnap", open: null, close: null },
  { day: "Hétfő", open: "10:00", close: "20:00" },
  { day: "Kedd", open: "10:00", close: "20:00" },
  { day: "Szerda", open: "10:00", close: "20:00" },
  { day: "Csütörtök", open: "10:00", close: "20:00" },
  { day: "Péntek", open: "10:00", close: "20:00" },
  { day: "Szombat", open: "10:00", close: "20:00" },
];
export const lastOrder = "19:30";

export const delivery = {
  fee: 300,
  freeAbove: 5000,
  lastOrder: "19:30",
  modes: ["Helyben fogyasztás", "Elvitel", "Házhozszállítás"],
};

export const nav = [
  { href: "#etlap", label: "Étlap" },
  { href: "#akciok", label: "Akciók" },
  { href: "#legendak", label: "Kedvencek" },
  { href: "#rolunk", label: "Rólunk" },
  { href: "#galeria", label: "Galéria" },
  { href: "#rendeles", label: "Rendelés" },
];

export const marquee = [
  "Kézműves hamburgerek",
  "Kemencében sült pizza",
  "Gyros tál",
  "Ropogós Kentucky csirke",
  "Hekk",
  "Frissen sült lángos",
  "Csavart fagyi",
  "Limonádék",
];

export type MenuItem = {
  name: string;
  price: number;
  desc?: string;
  extra?: string;
  priceLabel?: string;
  tag?: string;
  unit?: string;
  menu?: string;
};

export type MenuCategory = {
  id: string;
  label: string;
  title: string;
  image: string;
  imageAlt: string;
  note?: string;
  items: MenuItem[];
};

const dupla = "dupla hús + 1100 Ft";

export const menu: MenuCategory[] = [
  {
    id: "hamburgerek",
    label: "Hamburgerek",
    title: "Kézműves hamburgerek",
    image: "/img/csibe-burger.webp",
    imageAlt: "Kentucky csibe burger szezámmagos bucin",
    note: "Minden burgerünk menüben is kérhető + 1150 Ft felár ellenében.",
    items: [
      {
        name: "Öreg Halász",
        price: 2850,
        desc: "10 dkg pizac húspogácsa, saláta, csemegeuborka, paradicsom, lilahagyma, kapros joghurt, szarvasgombás majonéz",
        extra: dupla,
      },
      {
        name: "New York Classic",
        price: 3250,
        desc: "15 dkg prémium marhahúspogácsa, lilahagymalekvár, cheddar sajt, bacon, saláta, csemegeuborka, paradicsom, lilahagyma, dijoni mustár, ketchup",
        extra: dupla,
      },
      {
        name: "Cifra Pista",
        price: 3650,
        desc: "15 dkg prémium marhahúspogácsa, mozzarella sajt, cheddar sajt, lecsós BBQ, lilahagymalekvár, sült hagymakarika, tükörtojás, bacon, saláta, paradicsom, csemegeuborka, jalapeno paprika",
        extra: dupla,
        tag: "A legkiadósabb",
      },
      {
        name: "Nagy Vadász",
        price: 3250,
        desc: "15 dkg prémium marhahúspogácsa, saláta, paradicsom, lilahagyma, csemegeuborka, bacon, sült hagymakarika, erdei gombás-majonézes ragu, cheddar sajt",
        extra: dupla,
      },
      {
        name: "Kötöny Kán",
        price: 3250,
        desc: "15 dkg prémium marhahúspogácsa, coleslaw saláta, cheddar sajt, lilahagymalekvár, bacon, saláta, paradicsom, csemegeuborka",
        extra: dupla,
        tag: "A kán kedvence",
      },
      { name: "Retro burger", price: 1450, extra: "dupla hús + 200 Ft" },
      {
        name: "Kentucky BBQ csibe burger",
        price: 2950,
        desc: "Szezámmagos pirított hamburgerbuci, Kentucky csirkemellcsíkok, coleslaw saláta, BBQ szósz, füstös bacon szósz, cheddar sajt, mozzarella sajt, paradicsom, lila hagyma, jégsaláta, csemege uborka",
      },
      {
        name: "Kentucky csibe burger",
        price: 2950,
        desc: "Szezámmagos pirított hamburgerbuci, Kentucky fűszeres csirkemellcsíkok, salsa szósz, cheddar sajt, cheddar sajtszósz, bacon, csemege uborka, lila hagyma, paradicsom, jégsaláta",
      },
    ],
  },
  {
    id: "pizzak",
    label: "Pizzák",
    title: "Kemencében sült pizzák",
    image: "/img/foto-pizza-szalamis.webp",
    imageAlt: "Kemencében sült pizza dobozban",
    items: [
      { name: "Magyaros", price: 2950, desc: "Paradicsomos alap, szalámi, kolbász, bacon, hagyma, paprika, mozzarella sajt" },
      { name: "Gyrosos", price: 2950, desc: "Fokhagymás-tejfölös alap, gyroshús, paradicsom, kígyóuborka, lilahagyma, mozzarella sajt" },
      { name: "SON-GO-KU", price: 2950, desc: "Paradicsomos alap, sonka, gomba, kukorica, mozzarella sajt" },
      {
        name: "Legényes",
        price: 3250,
        desc: "Paradicsomos alap, szalámi, kolbász, sonka, bacon, főtt tojás, jalapeno paprika, lilahagyma, gomba, mozzarella sajt",
        tag: "Legényes adag",
      },
      { name: "Maximus", price: 3450, desc: "Paradicsomos alap, olivabogyó, proscutto sonka, rukkola, mozzarella sajt, parmezán sajt" },
      { name: "Hawai", price: 2950, desc: "Paradicsomos alap, sonka, bacon, ananász, mozzarella sajt" },
    ],
  },
  {
    id: "gyros",
    label: "Gyros",
    title: "Gyros",
    image: "/img/gyrostal.webp",
    imageAlt: "Gyros tál sült burgonyával, salátával és tzatzikivel",
    items: [{ name: "Gyros tál", price: 3150, desc: "Gyros hús, sültburgonya, saláta, mozzarella sajt, lilahagyma, tzatziki" }],
  },
  {
    id: "csirke",
    label: "Csirkés ételek",
    title: "Csirkés ételek",
    image: "/img/nuggets.webp",
    imageAlt: "Ropogós csirke nuggets sült burgonyával és szósszal",
    note: "Menüben csónakburgonyával és választható szósszal, + 1150 Ft.",
    items: [
      { name: "Csirke nuggets", unit: "6 db", price: 1250, menu: "+1150" },
      { name: "Kentucky csirkemellcsíkok", unit: "4 db", price: 1650, menu: "+1150" },
      { name: "Kijevi csirkegolyó", unit: "5 db", price: 1450, menu: "+1150" },
    ],
  },
  {
    id: "koretek",
    label: "Köretek & saláták",
    title: "Köretek & saláták",
    image: "/img/foto-burger-menu.webp",
    imageAlt: "Hamburger csónakburgonyával",
    items: [
      { name: "Csónakburgonya", price: 550 },
      { name: "Választható szósz", price: 150, desc: "ketchup, mustár, majonéz, cheddar szósz", priceLabel: "+150 Ft" },
      { name: "Coleslaw saláta", price: 400 },
    ],
  },
];

export const burgerMenu = {
  price: 1150,
  includes: ["burger", "csónakburgonya", "választható szósz", "0,3 l üdítő"],
};

export type Promo = {
  title: string;
  kicker: string;
  poster: string;
  image: string;
  price: number;
  was?: number;
  lines: string[];
};

export const promos: Promo[] = [
  {
    title: "Kentucky Box",
    kicker: "Doboznyi ropogósság",
    poster: "/img/plakat-kentucky-box.webp",
    image: "/img/kentucky-box.webp",
    price: 4500,
    was: 4900,
    lines: ["Kentucky csibe burger", "6 db nuggets", "Csónakburgonya", "Cheddar sajtszósz"],
  },
  {
    title: "Szombati gyrostál akció",
    kicker: "Ha 2 gyrostálat veszel",
    poster: "/img/plakat-gyrostal.webp",
    image: "/img/gyrostal-duo.webp",
    price: 2350,
    was: 3150,
    lines: ["a második gyrostál csak 2350 Ft", "gyros hús, sültburgonya, saláta, tzatziki"],
  },
  {
    title: "Szombati burgerakció",
    kicker: "Ha 2 kézműves hamburgert veszel",
    poster: "/img/plakat-burgerakcio.webp",
    image: "/img/burger-duo.webp",
    price: 2500,
    lines: ["a második csak 2500 Ft", "15 dkg prémium marhahúsos burgerek"],
  },
];

export type Legend = {
  name: string;
  image: string;
  price: number;
  lead: string;
  ingredients: string[];
};

// A plakátsorozat ételei, a plakátokon szereplő összetevőkkel
export const legends: Legend[] = [
  {
    name: "Kentucky BBQ csibe burger",
    image: "/img/bbq-csibe-burger.webp",
    price: 2950,
    lead: "Füstös, ragacsos, roppanós — a BBQ szósz és a coleslaw találkozása.",
    ingredients: ["Szezámmagos pirított buci", "Kentucky csirkemellcsíkok", "Coleslaw saláta", "BBQ szósz", "Füstös bacon szósz", "Cheddar & mozzarella"],
  },
  {
    name: "Kentucky csibe burger",
    image: "/img/csibe-burger.webp",
    price: 2950,
    lead: "Fűszeres csirke, salsa és dupla cheddar egy pirított bucin.",
    ingredients: ["Kentucky fűszeres csirkemellcsíkok", "Salsa szósz", "Cheddar sajt", "Cheddar sajtszósz", "Bacon", "Jégsaláta"],
  },
  {
    name: "Kentucky csirkemellcsíkok menü",
    image: "/img/csirkemellcsikok.webp",
    price: 2800,
    lead: "4 db aranybarnára sült csirkemellcsík csónakburgonyával.",
    ingredients: ["4 db Kentucky csirkemellcsík", "Csónakburgonya", "Választható szósz"],
  },
  {
    name: "Csirke nuggets menü",
    image: "/img/nuggets.webp",
    price: 2400,
    lead: "6 db ropogós nuggets — a gyerekek (és a felnőttek) kedvence.",
    ingredients: ["6 db csirke nuggets", "Csónakburgonya", "Választható szósz"],
  },
  {
    name: "Kijevi csirkegolyó menü",
    image: "/img/kijevi.webp",
    price: 2600,
    lead: "Kívül ropog, belül olvadt vajas-fűszeres töltelék.",
    ingredients: ["5 db kijevi csirkegolyó", "Csónakburgonya", "Választható szósz"],
  },
  {
    name: "Kentucky Box",
    image: "/img/kentucky-box.webp",
    price: 4500,
    lead: "Burger, nuggets, burgonya és szósz — egy dobozban, egy áron.",
    ingredients: ["Kentucky csibe burger", "6 db nuggets", "Csónakburgonya", "Cheddar sajtszósz"],
  },
];

export const story = {
  title: "A kunok asztalán sosem volt szűk az adag.",
  lead: "Karcag a Nagykunság szíve — mi pedig az ízeit hoztuk el a Deák körútra. Kiadós adagok, változatos kínálat és olyan hely, ahová mindig van miért visszatérni.",
  body: [
    "A Fekete Kun Falatozó 2026. szeptember 17-én nyitotta meg kapuit. Kézműves hamburgereket sütünk prémium marhahúsból, kemencében sült, ropogós pizzát, gyros tálat és ropogós Kentucky csirkét készítünk — helyben, elvitelre vagy házhoz szállítva.",
    "Folyamatosan bővülő kínálattal, időről időre limitált és különleges ételekkel, szezonális finomságokkal és új ízekkel készülünk. Legyen szó egy gyors ebédről, egy kiadós vacsoráról vagy csak egy jó hamburgerről és egy csavart fagyiról — nálunk mindenki találhat kedvére valót.",
  ],
  stats: [
    { value: 8, suffix: "", label: "kézműves burger" },
    { value: 6, suffix: "", label: "kemencés pizza" },
    { value: 15, suffix: " dkg", label: "prémium marhahús" },
    { value: 6, suffix: " nap", label: "nyitva egy héten" },
  ],
  pillars: [
    { title: "Hagyomány", text: "Kun vendégszeretet: bőséges tányér, nagy szívvel. A burgereink neve is mesél: Kötöny Kán, Nagy Vadász, Cifra Pista." },
    { title: "Ízek", text: "Lilahagymalekvár, szarvasgombás majonéz, erdei gombás ragu, lecsós BBQ — ismerős ízek, merész párosításban." },
    { title: "Erő", text: "15 dkg prémium marhahús, dupla hús 1100 Ft-ért. Aki tőlünk éhesen távozik, az nem kért repetát." },
  ],
};

export const extras = {
  title: "A kínálat ennél is bővebb",
  lead: "Az étlap csak a kezdet — a pult mögött ezek is várnak. Az aktuális kínálatról és árakról telefonon szívesen tájékoztatunk.",
  items: [
    { name: "Hekk", text: "Ropogósra sütve, citrommal, burgonyával" },
    { name: "Frissen sült lángos", text: "Sajtosan-tejfölösen, ahogy kell" },
    { name: "Csavart fagyi", text: "A vacsora utáni kötelező kör" },
    { name: "Limonádék", text: "Jéghidegen, frissítőnek" },
    { name: "Finom desszertek", text: "Mert a desszert mindig belefér" },
  ],
};

export const gallery = [
  { src: "/img/foto-csaladi-asztal.webp", alt: "Pizzák, gyros tál, hamburger és hekk az asztalon", w: 1600, h: 1200, span: "wide" },
  { src: "/img/foto-burger-menu.webp", alt: "Kézműves hamburger hasábburgonyával", w: 1600, h: 1200 },
  { src: "/img/foto-pizza-szalamis.webp", alt: "Szalámis pizza dobozban", w: 1600, h: 1200 },
  { src: "/img/foto-hekk-burger-gyros.webp", alt: "Hekk, hamburger és gyros tál", w: 1600, h: 1200, span: "wide" },
  { src: "/img/foto-langos.webp", alt: "Sajtos-tejfölös lángos", w: 1600, h: 1200 },
  { src: "/img/foto-hekk.webp", alt: "Ropogós hekk citrommal és burgonyával", w: 1600, h: 1200 },
  { src: "/img/foto-pizza-zoldseges.webp", alt: "Zöldséges pizza", w: 1600, h: 1200 },
  { src: "/img/foto-gyros-langos.webp", alt: "Gyros tál és lángos", w: 1600, h: 1200 },
  { src: "/img/foto-bejarat.webp", alt: "A Fekete Kun Falatozó bejárata Karcagon", w: 1600, h: 1200, span: "flat" },
];

export const steps = [
  { n: "01", title: "Hívj minket", text: `Rendelésfelvétel minden nyitvatartási napon ${lastOrder}-ig.` },
  { n: "02", title: "Mi elkészítjük", text: "Konyhánk frissen, forrón elkészíti a rendelésed." },
  { n: "03", title: "Házhoz visszük", text: "Kiszállítás 300 Ft, 5000 Ft felett ingyenes." },
];

export const ft = (n: number) => `${n.toLocaleString("hu-HU").replace(/ /g, " ")} Ft`;
