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
          ca: 'Quina és la longitud de la rampa?',
          es: '¿Cuál es la longitud de la rampa?',
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
        answer: 26.2,
        unit: 'cúbits',
        narrative: {
          ca: 'Al mur lateral hi ha una inscripció que descriu un conducte d\'aigua diagonal. La longitud total del conducte és de 28 cúbits i baixa verticalment la mateixa distància que has calculat al problema anterior. Necessites saber quant avança horitzontalment per activar el segon mecanisme.',
          es: 'En el muro lateral hay una inscripción que describe un conducto de agua diagonal. La longitud total del conducto es de 28 cúbits y baja verticalmente la misma distancia que has calculado en el problema anterior. Necesitas saber cuánto avanza horizontalmente para activar el segundo mecanismo.',
        },
        question: {
          ca: 'Quina és la distància horitzontal que avança el conducte?',
          es: '¿Cuál es la distancia horizontal que avanza el conducto?',
        },
        hint: {
          ca: 'La longitud total del conducte (hipotenusa = 28 cúbits) i el descens vertical (valor anterior) ja els coneixes. Aïlla el catet horitzontal: catet² = hipotenusa² − catet conegut².',
          es: 'La longitud total del conducto (hipotenusa = 28 cúbits) y el descenso vertical (valor anterior) ya los conoces. Despeja el cateto horizontal: cateto² = hipotenusa² − cateto conocido².',
        },
        triangle: { leg1: 'chain', leg2: null, hyp: 28 },
      },
      {
        id: 'r1p3',
        usesChain: true,
        answer: 10.5,
        unit: 'cúbits',
        narrative: {
          ca: 'El tercer mecanisme! La porta del passadís té un marc triangular. La diagonal del marc té exactament la mateixa longitud que has calculat al problema anterior, i la seva alçada és de 24 cúbits. Has de trobar l\'amplada de la porta per calibrar el pany.',
          es: 'El tercer mecanismo. El marco de la puerta del pasillo tiene forma triangular. La diagonal del marco tiene exactamente la misma longitud que has calculado en el problema anterior, y su altura es de 24 cúbits. Tienes que encontrar el ancho de la puerta para calibrar la cerradura.',
        },
        question: {
          ca: 'Quina és l\'amplada de la porta?',
          es: '¿Cuál es el ancho de la puerta?',
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
          ca: 'Quina és la longitud de la columna caiguda?',
          es: '¿Cuál es la longitud de la columna caída?',
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
          ca: 'Quina és l\'alçada del passatge secret?',
          es: '¿Cuál es la altura del pasaje secreto?',
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
        answer: 14.7,
        unit: 'cúbits',
        narrative: {
          ca: 'Al fons del passatge hi ha un pont de pedra. La biga diagonal de suport mesura 19 cúbits. La longitud horitzontal del pont és igual al valor que has calculat anteriorment. Necessites saber l\'alçada dels suports verticals per activar el mecanisme.',
          es: 'Al fondo del pasaje hay un puente de piedra. La viga diagonal de soporte mide 19 cúbits. La longitud horizontal del puente es igual al valor que has calculado anteriormente. Necesitas saber la altura de los soportes verticales para activar el mecanismo.',
        },
        question: {
          ca: 'Quina és l\'alçada dels suports verticals del pont?',
          es: '¿Cuál es la altura de los soportes verticales del puente?',
        },
        hint: {
          ca: 'Coneixes la hipotenusa (biga diagonal = 19 cúbits) i el catet horitzontal (valor anterior). Aïlla el catet vertical: catet² = hipotenusa² − catet conegut².',
          es: 'Conoces la hipotenusa (viga diagonal = 19 cúbits) y el cateto horizontal (valor anterior). Despeja el cateto vertical: cateto² = hipotenusa² − cateto conocido².',
        },
        triangle: { leg1: null, leg2: 'chain', hyp: 19 },
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
          ca: 'Quina és la longitud de l\'escala?',
          es: '¿Cuál es la longitud de la escalera?',
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
        answer: 21.2,
        unit: 'cúbits',
        narrative: {
          ca: 'El segon mecanisme és al costat del sarcòfag! La rampa cerimonial té una longitud diagonal de 26 cúbits. L\'alçada de la rampa coincideix amb el valor que has calculat al pas anterior. Necessites saber la longitud horitzontal de la rampa.',
          es: 'El segundo mecanismo está al lado del sarcófago. La rampa ceremonial tiene una longitud diagonal de 26 cúbits. La altura de la rampa coincide con el valor que has calculado en el paso anterior. Necesitas saber la longitud horizontal de la rampa.',
        },
        question: {
          ca: 'Quina és la longitud horitzontal de la rampa cerimonial?',
          es: '¿Cuál es la longitud horizontal de la rampa ceremonial?',
        },
        hint: {
          ca: 'Coneixes la longitud total de la rampa (hipotenusa = 26 cúbits) i l\'alçada (valor anterior). Aïlla el catet horitzontal: catet² = hipotenusa² − catet conegut².',
          es: 'Conoces la longitud total de la rampa (hipotenusa = 26 cúbits) y la altura (valor anterior). Despeja el cateto horizontal: cateto² = hipotenusa² − cateto conocido².',
        },
        triangle: { leg1: 'chain', leg2: null, hyp: 26 },
      },
      {
        id: 'r3p3',
        usesChain: true,
        answer: 20,
        unit: 'cúbits',
        narrative: {
          ca: 'El tercer mecanisme! Una vareta de metall, la longitud de la qual coincideix amb el resultat del problema anterior, recolza contra el mur de la cambra. El punt on toca el mur és a 7 cúbits d\'alçada. Quina és la distància horitzontal des de la base de la vareta fins al mur?',
          es: 'El tercer mecanismo. Una varilla de metal, cuya longitud coincide con el resultado del problema anterior, se apoya contra el muro de la cámara. El punto donde toca el muro está a 7 cúbits de altura. ¿Cuál es la distancia horizontal desde la base de la varilla hasta el muro?',
        },
        question: {
          ca: 'Quina és la distància horitzontal de la base de la vareta al mur?',
          es: '¿Cuál es la distancia horizontal desde la base de la varilla hasta el muro?',
        },
        hint: {
          ca: 'Aquí la hipotenusa és la longitud del problema anterior i el catet vertical (7) és a la imatge. Aïlla el catet horitzontal: catet² = hipotenusa² − catet conegut².',
          es: 'Aquí la hipotenusa es la longitud del problema anterior y el cateto vertical (7) está en la imagen. Despeja el cateto horizontal: cateto² = hipotenusa² − cateto conocido².',
        },
        triangle: { leg1: null, leg2: 7, hyp: 'chain' },
      },
      {
        id: 'r3p4',
        usesChain: true,
        answer: 18.1,
        unit: 'cúbits',
        narrative: {
          ca: 'L\'últim mecanisme! La diagonal del pany fa 27 cúbits. La barra horitzontal del pany té una longitud igual al valor que acabes d\'obtenir al problema anterior. Gira la clau calculant la longitud de la barra vertical!',
          es: 'El último mecanismo. La diagonal del cerrojo mide 27 cúbits. La barra horizontal del cerrojo tiene una longitud igual al valor que acabas de obtener en el problema anterior. ¡Gira la llave calculando la longitud de la barra vertical!',
        },
        question: {
          ca: 'Quina és la longitud de la barra vertical del pany?',
          es: '¿Cuál es la longitud de la barra vertical del cerrojo?',
        },
        hint: {
          ca: 'Coneixes la diagonal del pany (hipotenusa = 27 cúbits) i la barra horitzontal (valor anterior). Aïlla el catet vertical: catet² = hipotenusa² − catet conegut².',
          es: 'Conoces la diagonal del cerrojo (hipotenusa = 27 cúbits) y la barra horizontal (valor anterior). Despeja el cateto vertical: cateto² = hipotenusa² − cateto conocido².',
        },
        triangle: { leg1: 'chain', leg2: null, hyp: 27 },
      },
    ],
  },
];
