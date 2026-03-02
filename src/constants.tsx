import type { EscapeRoom } from './types';

// ──────────────────────────────────────────────────────────────────────────────
// Google Apps Script endpoint (reuses same sheet as Pitàgores app)
// ──────────────────────────────────────────────────────────────────────────────
export const APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycby-W5ibyyd0q_SsQLaREAFsBjgUXPGQhQCJs1kClJKf6zIJpP2ylca0byD54ypNfdie/exec';

// ──────────────────────────────────────────────────────────────────────────────
// UI Texts (bilingual)
// ──────────────────────────────────────────────────────────────────────────────
export const UI = {
  appTitle:      { ca: 'Escapada de la Piràmide', es: 'Escapada de la Pirámide' },
  appSubtitle:   { ca: 'Un escape room de Pitàgores', es: 'Un escape room de Pitágoras' },

  emailGateTitle:  { ca: 'Identifica\'t per entrar', es: 'Identifícate para entrar' },
  emailGateDesc:   { ca: 'Escriu el teu correu escolar per entrar a la piràmide.', es: 'Escribe tu correo escolar para entrar a la pirámide.' },
  emailPlaceholder:{ ca: 'correu@escola.cat', es: 'correo@escuela.es' },
  emailEnter:      { ca: 'Entrar a la piràmide', es: 'Entrar a la pirámide' },
  emailError:      { ca: 'Correu no autoritzat. Comprova\'l i torna-ho a intentar.', es: 'Correo no autorizado. Compruébalo e inténtalo de nuevo.' },
  emailLoading:    { ca: 'Comprovant...', es: 'Comprobando...' },
  emailInvalid:    { ca: 'Escriu un correu vàlid.', es: 'Escribe un correo válido.' },

  welcomeTitle:    { ca: '⚠️ Has quedat atrapat!', es: '⚠️ ¡Estás atrapado!' },
  welcomeStory: {
    ca: `Mentre exploraves la Gran Piràmide, la porta de pedra s'ha tancat darrere teu. Tres sales misterioses bloquegen la sortida: La Sala dels Escribes, el Passadís de les Columnes i la Cambra del Faraó.

Cada porta té un mecanisme secret activat per càlculs matemàtics. Els antics egipcis eren mestres de la geometria... i van deixar problemes encadenats: la resposta d'un passeig és la clau del següent.

Recorda el que has après: h² = c₁² + c₂²

Tens allò que necessites. Endavant!`,
    es: `Mientras explorabas la Gran Pirámide, la puerta de piedra se ha cerrado a tus espaldas. Tres salas misteriosas bloquean la salida: La Sala de los Escribas, el Pasillo de las Columnas y la Cámara del Faraón.

Cada puerta lleva un mecanismo secreto activado por cálculos matemáticos. Los antiguos egipcios eran maestros de la geometría... y dejaron problemas encadenados: la respuesta de un paso es la clave del siguiente.

Recuerda lo que has aprendido: h² = c₁² + c₂²

Tienes todo lo que necesitas. ¡Adelante!`,
  },
  welcomeStart:    { ca: '🔦 Entrar a la primera sala', es: '🔦 Entrar a la primera sala' },

  problemOf:       { ca: 'Problema', es: 'Problema' },
  checkBtn:        { ca: 'Comprovar', es: 'Comprobar' },
  nextBtn:         { ca: 'Endavant →', es: 'Adelante →' },
  hintBtn:         { ca: '💡 Pista', es: '💡 Pista' },
  hideHintBtn:     { ca: 'Amagar pista', es: 'Ocultar pista' },
  correctMsg:      { ca: '✅ Correcte! La porta fa clic.', es: '✅ ¡Correcto! La puerta hace clic.' },
  wrongMsg:        { ca: '❌ No és correcte. Torna-ho a intentar.', es: '❌ No es correcto. Inténtalo de nuevo.' },
  chainLabel:      { ca: '🔗 Valor de l\'anterior:', es: '🔗 Valor del anterior:' },
  chainTooltip:    { ca: 'Aquest valor prové de la teva resposta anterior', es: 'Este valor viene de tu respuesta anterior' },
  yourAnswer:      { ca: 'La teva resposta:', es: 'Tu respuesta:' },
  enterAnswer:     { ca: 'Escriu el valor...', es: 'Escribe el valor...' },

  roomSuccess:     { ca: 'Sala completada!', es: '¡Sala completada!' },
  roomContinue:    { ca: 'Seguir endavant →', es: 'Seguir adelante →' },
  progress:        { ca: 'Progrés de l\'escapada', es: 'Progreso de la escapada' },
  roomN:           { ca: 'Sala', es: 'Sala' },

  victoryTitle:    { ca: '🎉 T\'has escapat!', es: '🎉 ¡Te has escapado!' },
  victoryStory: {
    ca: 'Increïble! Has resolt tots els enigmes matemàtics dels antics egipcis i has aconseguit obrir la porta de la piràmide. La llum del sol t\'encega mentre surts a l\'exterior. Ets tot un/a expert/a en el Teorema de Pitàgores!',
    es: 'Increíble! Has resuelto todos los enigmas matemáticos de los antiguos egipcios y has conseguido abrir la puerta de la pirámide. La luz del sol te ciega al salir al exterior. ¡Eres todo un experto/a en el Teorema de Pitágoras!',
  },
  victoryScore:    { ca: 'Puntuació final', es: 'Puntuación final' },
  victoryCorrect:  { ca: 'respostes correctes de', es: 'respuestas correctas de' },
  victoryReplay:   { ca: '🔄 Jugar de nou', es: '🔄 Jugar de nuevo' },

  langToggle:      { ca: 'ES', es: 'CA' },

  diagramHyp:      { ca: 'hipotenusa', es: 'hipotenusa' },
  diagramLeg1:     { ca: 'catet 1', es: 'cateto 1' },
  diagramLeg2:     { ca: 'catet 2', es: 'cateto 2' },
  diagramFind:     { ca: '? (troba això)', es: '? (encuentra esto)' },

  roomLocked:      { ca: '🔒 Sala tancada', es: '🔒 Sala cerrada' },
  totalProblems:   { ca: 'problemes en total', es: 'problemas en total' },
};

// ──────────────────────────────────────────────────────────────────────────────
// ROOMS & PROBLEMS DATA
// ──────────────────────────────────────────────────────────────────────────────
//
// Cadena de respostes per sala:
// SALA 1: P1: catets 6,8 → hip=10 | P2: catets [10],24 → hip=26 | P3: hip=[26],catet=24 → catet=10
// SALA 2: P4: catets 5,12 → hip=13 | P5: hip=[13],catet=5 → catet=12 | P6: catets [12],16 → hip=20
// SALA 3: P7: catets 9,12 → hip=15 | P8: catets [15],20 → hip=25 | P9: hip=[25],catet=7 → catet=24 | P10: catets [24],10 → hip=26
//
// ──────────────────────────────────────────────────────────────────────────────

export const ROOMS: EscapeRoom[] = [
  // ─────────────────────────────────────────
  // SALA 1 — La Sala dels Escribes
  // ─────────────────────────────────────────
  {
    id: 'room1',
    name:     { ca: 'La Sala dels Escribes', es: 'La Sala de los Escribas' },
    subtitle: { ca: 'Entrada de la piràmide', es: 'Entrada de la pirámide' },
    emoji: '📜',
    intro: {
      ca: 'Entres a una sala plena de columnes gravades amb jeroglifícs. La torxa revela tres mecanismes de pedra a la paret. Cada un et demana un càlcul precís per girar.',
      es: 'Entras en una sala llena de columnas grabadas con jeroglíficos. La antorcha revela tres mecanismos de piedra en la pared. Cada uno te pide un cálculo preciso para girar.',
    },
    success: {
      ca: '🗝️ La porta de pedra gira lentament. Se sent el so de l\'engranatge antic cedint. El passadís t\'espera...',
      es: '🗝️ La puerta de piedra gira lentamente. Se oye el sonido del engranaje antiguo cediendo. El pasillo te espera...',
    },
    bgGradient: 'from-stone-900 via-stone-800 to-stone-900',
    accentColor: '#c9a227',
    problems: [
      {
        id: 'r1p1',
        usesChain: false,
        answer: 10,
        unit: 'cúbits',
        narrative: {
          ca: 'Al centre de la sala hi ha una rampa de pedra sagrada. L\'escriba principal va gravar les seves mides a la paret: base 6 cúbits, alçada 8 cúbits. Necessites saber la longitud de la rampa per activar el primer mecanisme.',
          es: 'En el centro de la sala hay una rampa de piedra sagrada. El escriba principal grabó sus medidas en la pared: base 6 cúbits, altura 8 cúbits. Necesitas saber la longitud de la rampa para activar el primer mecanismo.',
        },
        question: {
          ca: 'Quina és la longitud de la rampa (hipotenusa)?',
          es: '¿Cuál es la longitud de la rampa (hipotenusa)?',
        },
        hint: {
          ca: 'Identifica els dos costats que formen l\'angle recte a la imatge. Eleva\'ls al quadrat, suma\'ls i extreu l\'arrel quadrada del resultat.',
          es: 'Identifica los dos lados que forman el ángulo recto en la imagen. Eleva cada uno al cuadrado, súmalos y saca la raíz cuadrada del resultado.',
        },
        triangle: { leg1: 6, leg2: 8, hyp: null },
      },
      {
        id: 'r1p2',
        usesChain: true,
        answer: 26,
        unit: 'cúbits',
        narrative: {
          ca: 'Al mur lateral hi ha una inscripció que descriu un conducte d\'aigua que travessa el gruix de la paret en diagonal. Segons el papir, el conducte baixa verticalment la mateixa quantitat de cúbits que has calculat en el problema anterior, i a més avança 24 cúbits en horitzontal. Necessites la longitud total del conducte per activar el segon mecanisme.',
          es: 'En el muro lateral hay una inscripción que describe un conducto de agua que atraviesa el grosor de la pared en diagonal. Según el papiro, el conducto baja verticalmente la misma cantidad de cúbits que has calculado en el problema anterior, y además avanza 24 cúbits en horizontal. Necesitas la longitud total del conducto para activar el segundo mecanismo.',
        },
        question: {
          ca: 'Quina és la longitud total del conducte diagonal?',
          es: '¿Cuál es la longitud total del conducto diagonal?',
        },
        hint: {
          ca: 'El conducte diagonal és la hipotenusa d\'un triangle rectangle. Tens els dos catets: un prové del problema anterior i l\'altre el pots llegir a la imatge.',
          es: 'El conducto diagonal es la hipotenusa de un triángulo rectángulo. Tienes los dos catetos: uno viene del problema anterior y el otro puedes leerlo en la imagen.',
        },
        triangle: { leg1: 'chain', leg2: 24, hyp: null },
      },
      {
        id: 'r1p3',
        usesChain: true,
        answer: 10,
        unit: 'cúbits',
        narrative: {
          ca: 'El tercer mecanisme! La porta del passadís té un marc triangular. La diagonal del marc té exactament la mateixa longitud que has calculat al problema anterior, i la seva base és de 24 cúbits. Has de trobar l\'alçada de la porta per calibrar el pany.',
          es: 'El tercer mecanismo. El marco de la puerta del pasillo tiene forma triangular. La diagonal del marco tiene exactamente la misma longitud que has calculado en el problema anterior, y su base es de 24 cúbits. Tienes que encontrar la altura de la puerta para calibrar la cerradura.',
        },
        question: {
          ca: 'Quina és l\'alçada de la porta (catet vertical)?',
          es: '¿Cuál es la altura de la puerta (cateto vertical)?',
        },
        hint: {
          ca: 'Aquesta vegada coneixes la hipotenusa i un catet. Recorda que pots aïllar el catet desconegut: catet² = hipotenusa² − catet conegut².',
          es: 'Esta vez conoces la hipotenusa y un cateto. Recuerda que puedes despejar el cateto desconocido: cateto² = hipotenusa² − cateto conocido².',
        },
        triangle: { leg1: null, leg2: 24, hyp: 'chain' },
      },
    ],
  },

  // ─────────────────────────────────────────
  // SALA 2 — El Passadís de les Columnes
  // ─────────────────────────────────────────
  {
    id: 'room2',
    name:     { ca: 'El Passadís de les Columnes', es: 'El Pasillo de las Columnas' },
    subtitle: { ca: 'Cor de la piràmide', es: 'Corazón de la pirámide' },
    emoji: '🏛️',
    intro: {
      ca: 'Un passadís llarg i estret. Columnes de granit s\'alcen a banda i banda. Una de les columnes ha caigut en diagonal, bloquejant el pas. Tres enigmes matemàtics activen el mecanisme que la mourà.',
      es: 'Un pasillo largo y estrecho. Columnas de granito se alzan a ambos lados. Una de las columnas ha caído en diagonal, bloqueando el paso. Tres enigmas matemáticos activan el mecanismo que la moverá.',
    },
    success: {
      ca: '⚙️ Les engranatges antics rugeixen. La columna es mou sola, obrint el pas. La cambra del faraó et crida...',
      es: '⚙️ Los engranajes antiguos rugen. La columna se mueve sola, abriendo el paso. La cámara del faraón te llama...',
    },
    bgGradient: 'from-egypt-dark via-stone-900 to-egypt-dark',
    accentColor: '#e67c1b',
    problems: [
      {
        id: 'r2p1',
        usesChain: false,
        answer: 13,
        unit: 'cúbits',
        narrative: {
          ca: 'La columna caiguda va des d\'un punt del terra fins a un punt de la paret. Mesures les distàncies: el punt del terra és a 5 cúbits del mur i la paret on toca és a 12 cúbits d\'alçada. Necessites la longitud exacta de la columna caiguda.',
          es: 'La columna caída va desde un punto del suelo hasta un punto de la pared. Mides las distancias: el punto del suelo está a 5 cúbits del muro y la pared donde toca está a 12 cúbits de altura. Necesitas la longitud exacta de la columna caída.',
        },
        question: {
          ca: 'Quina és la longitud de la columna caiguda (hipotenusa)?',
          es: '¿Cuál es la longitud de la columna caída (hipotenusa)?',
        },
        hint: {
          ca: 'La columna és la hipotenusa. Llegeix els dos catets a la imatge, aplica el teorema de Pitàgores i no oblidis extreure l\'arrel al final.',
          es: 'La columna es la hipotenusa. Lee los dos catetos en la imagen, aplica el teorema de Pitágoras y no olvides sacar la raíz al final.',
        },
        triangle: { leg1: 5, leg2: 12, hyp: null },
      },
      {
        id: 'r2p2',
        usesChain: true,
        answer: 12,
        unit: 'cúbits',
        narrative: {
          ca: 'Darrere de la columna hi ha un passatge secret! La seva entrada diagonal té exactament la mateixa longitud que la columna que acabes de mesurar. L\'amplada del passatge és de 5 cúbits. Necessites saber l\'alçada per saber si pots passar-hi.',
          es: 'Detrás de la columna hay un pasaje secreto. Su entrada diagonal tiene exactamente la misma longitud que la columna que acabas de medir. El ancho del pasaje es de 5 cúbits. Necesitas saber la altura para saber si puedes pasar.',
        },
        question: {
          ca: 'Quina és l\'alçada del passatge secret (catet vertical)?',
          es: '¿Cuál es la altura del pasaje secreto (cateto vertical)?',
        },
        hint: {
          ca: 'Coneixes la diagonal i un dels costats. Per trobar l\'altre catet, recorda que el quadrat de la hipotenusa és igual a la suma dels quadrats dels dos catets: pots aïllar el que et falta.',
          es: 'Conoces la diagonal y uno de los lados. Para encontrar el otro cateto, recuerda que el cuadrado de la hipotenusa es igual a la suma de los cuadrados de los dos catetos: puedes despejar el que te falta.',
        },
        triangle: { leg1: null, leg2: 5, hyp: 'chain' },
      },
      {
        id: 'r2p3',
        usesChain: true,
        answer: 20,
        unit: 'cúbits',
        narrative: {
          ca: 'Al fons del passatge hi ha un pont de pedra. Els suports verticals tenen la mateixa alçada que has calculat al problema anterior. El pont creua 16 cúbits en horitzontal. L\'activador necessita saber la longitud de la biga diagonal de suport.',
          es: 'Al fondo del pasaje hay un puente de piedra. Los soportes verticales tienen la misma altura que has calculado en el problema anterior. El puente cruza 16 cúbits en horizontal. El activador necesita saber la longitud de la viga diagonal de soporte.',
        },
        question: {
          ca: 'Quina és la longitud de la biga diagonal (hipotenusa)?',
          es: '¿Cuál es la longitud de la viga diagonal (hipotenusa)?',
        },
        hint: {
          ca: 'La biga diagonal és la hipotenusa. Els dos costats de l\'angle recte ja els tens: un prové del problema anterior i l\'altre apareix a la imatge.',
          es: 'La viga diagonal es la hipotenusa. Los dos lados del ángulo recto ya los tienes: uno viene del problema anterior y el otro aparece en la imagen.',
        },
        triangle: { leg1: 'chain', leg2: 16, hyp: null },
      },
    ],
  },

  // ─────────────────────────────────────────
  // SALA 3 — La Cambra del Faraó
  // ─────────────────────────────────────────
  {
    id: 'room3',
    name:     { ca: 'La Cambra del Faraó', es: 'La Cámara del Faraón' },
    subtitle: { ca: 'El repte final', es: 'El reto final' },
    emoji: '👑',
    intro: {
      ca: 'La cambra del faraó. El sarcòfag d\'or brilleja a l\'obscuritat. Però la sortida está bloquejada per quatre mecanismes encadenats. Cada resposta porta a la següent. Concentra\'t: és l\'últim esforç!',
      es: 'La cámara del faraón. El sarcófago de oro brilla en la oscuridad. Pero la salida está bloqueada por cuatro mecanismos encadenados. Cada respuesta lleva a la siguiente. Concéntrate: ¡es el último esfuerzo!',
    },
    success: {
      ca: '🌟 La porta de la piràmide s\'obre de bat a bat! La llum del sol entra a raigs daurats. T\'has escapat!',
      es: '🌟 ¡La puerta de la pirámide se abre de par en par! La luz del sol entra en rayos dorados. ¡Te has escapado!',
    },
    bgGradient: 'from-yellow-950 via-stone-900 to-yellow-950',
    accentColor: '#c9a227',
    problems: [
      {
        id: 'r3p1',
        usesChain: false,
        answer: 15,
        unit: 'cúbits',
        narrative: {
          ca: 'El sarcòfag es troba sobre un pedestal elevat. Una escala de fusta porta fins a ell. L\'escala comença a 9 cúbits de la base del pedestal i el pedestal té 12 cúbits d\'alçada. Necessites la longitud de l\'escala per al primer mecanisme.',
          es: 'El sarcófago está sobre un pedestal elevado. Una escalera de madera lleva hasta él. La escalera empieza a 9 cúbits de la base del pedestal y el pedestal tiene 12 cúbits de altura. Necesitas la longitud de la escalera para el primer mecanismo.',
        },
        question: {
          ca: 'Quina és la longitud de l\'escala (hipotenusa)?',
          es: '¿Cuál es la longitud de la escalera (hipotenusa)?',
        },
        hint: {
          ca: 'L\'escala és la hipotenusa del triangle. Localitza els dos catets a la imatge, aplica a²+b²=c² i recorda l\'arrel quadrada al final.',
          es: 'La escalera es la hipotenusa del triángulo. Localiza los dos catetos en la imagen, aplica a²+b²=c² y recuerda la raíz cuadrada al final.',
        },
        triangle: { leg1: 9, leg2: 12, hyp: null },
      },
      {
        id: 'r3p2',
        usesChain: true,
        answer: 25,
        unit: 'cúbits',
        narrative: {
          ca: 'El segon mecanisme és al costat del sarcòfag! Una rampa cerimonial puja fins a una alçada igual a la longitud de l\'escala que has calculat al pas anterior. La rampa cobreix 20 cúbits en horitzontal. Quina és la longitud total de la rampa?',
          es: 'El segundo mecanismo está al lado del sarcófago. Una rampa ceremonial sube hasta una altura igual a la longitud de la escalera que has calculado en el paso anterior. La rampa cubre 20 cúbits en horizontal. ¿Cuál es la longitud total de la rampa?',
        },
        question: {
          ca: 'Quina és la longitud de la rampa cerimonial (hipotenusa)?',
          es: '¿Cuál es la longitud de la rampa ceremonial (hipotenusa)?',
        },
        hint: {
          ca: 'Tens els dos catets: un te\'l dona el problema anterior i l\'altre és a la imatge. Aplica Pitàgores per obtenir la longitud de la rampa.',
          es: 'Tienes los dos catetos: uno te lo da el problema anterior y el otro está en la imagen. Aplica Pitágoras para obtener la longitud de la rampa.',
        },
        triangle: { leg1: 'chain', leg2: 20, hyp: null },
      },
      {
        id: 'r3p3',
        usesChain: true,
        answer: 24,
        unit: 'cúbits',
        narrative: {
          ca: 'El tercer mecanisme! Una vareta de metall, la longitud de la qual coincideix amb el resultat del problema anterior, surt des d\'un punt a 7 cúbits del terra i arriba directament al bany del faraó. Quina és l\'alçada vertical a la qual arriba la vareta?',
          es: 'El tercer mecanismo. Una varilla de metal, cuya longitud coincide con el resultado del problema anterior, sale desde un punto a 7 cúbits del suelo y llega directamente al baño del faraón. ¿A qué altura vertical llega la varilla?',
        },
        question: {
          ca: 'Quina és l\'alçada vertical on arriba la vareta (catet vertical)?',
          es: '¿A qué altura vertical llega la varilla (cateto vertical)?',
        },
        hint: {
          ca: 'Aquí la hipotenusa és la longitud del problema anterior i un catet és a la imatge. Aïlla el catet que et falta: catet² = hipotenusa² − catet conegut².',
          es: 'Aquí la hipotenusa es la longitud del problema anterior y un cateto está en la imagen. Despeja el cateto que te falta: cateto² = hipotenusa² − cateto conocido².',
        },
        triangle: { leg1: null, leg2: 7, hyp: 'chain' },
      },
      {
        id: 'r3p4',
        usesChain: true,
        answer: 26,
        unit: 'cúbits',
        narrative: {
          ca: 'L\'últim mecanisme! La barra horitzontal del pany té una longitud igual al valor que acabes d\'obtenir al problema anterior. La barra vertical fa 10 cúbits. Gira la clau en la diagonal exacta per obrir la porta de la piràmide per sempre!',
          es: 'El último mecanismo. La barra horizontal del cerrojo tiene una longitud igual al valor que acabas de obtener en el problema anterior. La barra vertical mide 10 cúbits. Gira la llave en la diagonal exacta para abrir la puerta de la pirámide para siempre.',
        },
        question: {
          ca: 'Quina és la longitud de la diagonal del pany (hipotenusa)?',
          es: '¿Cuál es la longitud de la diagonal del cerrojo (hipotenusa)?',
        },
        hint: {
          ca: 'La diagonal del pany és la hipotenusa. Tens els dos costats de l\'angle recte: un prové del problema anterior i l\'altre és a la imatge. Ara aplica el teorema.',
          es: 'La diagonal del cerrojo es la hipotenusa. Tienes los dos lados del ángulo recto: uno viene del problema anterior y el otro está en la imagen. Ahora aplica el teorema.',
        },
        triangle: { leg1: 'chain', leg2: 10, hyp: null },
      },
    ],
  },
];
