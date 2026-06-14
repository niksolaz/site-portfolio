import type { LocaleMap } from '../types'

export interface FormLabels {
  name: string
  email: string
  message: string
  placeholderName: string
  placeholderEmail: string
  placeholderMessage: string
}

export interface NavMenuLabels {
  hero: string
  cards: string
  about: string
  contact: string
}

export const navContactLink: LocaleMap<string> = {
  en: 'CONTACT ME',
  it: 'CONTATTAMI',
  es: 'CONTACTAME',
  fr: 'CONTACTEZ-MOI',
}

export const navMenu: LocaleMap<NavMenuLabels> = {
  en: {
    hero: 'Intro',
    cards: 'Projects',
    about: 'About',
    contact: 'Contact',
  },
  it: {
    hero: 'Intro',
    cards: 'Progetti',
    about: 'Chi sono',
    contact: 'Contatti',
  },
  es: {
    hero: 'Intro',
    cards: 'Proyectos',
    about: 'Sobre mí',
    contact: 'Contacto',
  },
  fr: {
    hero: 'Intro',
    cards: 'Projets',
    about: 'À propos',
    contact: 'Contact',
  },
}

export const homeSubtitle: LocaleMap<string> = {
  en: 'Full Stack Consultant for PMI and Startup. Scalable and performant Web App development.',
  it: "Consulente Full Stack per PMI e Startup. Sviluppo Web App scalabili e performanti.",
  es: 'Consultor Full Stack para PMI y Startup. Desarrollo de Web App escalables y performantes.',
  fr: "Consultant Full Stack pour PMI et Startup. Développement de Web App scalables et performants.",
}

export const contactPreTitle: LocaleMap<string> = {
  en: 'Write me for info and I will reply as soon as possible ...',
  it: 'Scrivimi per info e ti risponderò al più presto ... ',
  es: 'Escríbeme para obtener información y te responderé lo antes posible ...',
  fr: 'Écrivez-moi pour obtenir des informations et je vous répondrai dès que possible ...',
}

export const contactEndTitle: LocaleMap<string> = {
  en: '... or contact me on Linkedin',
  it: '... oppure contattami su Linkedin',
  es: '... o contáctame en Linkedin',
  fr: '... ou contactez-moi sur Linkedin',
}

export const contactBtnSend: LocaleMap<string> = {
  en: 'SEND',
  it: 'INVIA',
  es: 'ENVIAR',
  fr: 'ENVOYER',
}

export const contactModalTitle: LocaleMap<string> = {
  en: 'Here is your answer',
  it: 'Ecco la tua risposta',
  es: 'Aqui esta tu respuesta',
  fr: 'Voici votre reponse',
}

export const contactModalClose: LocaleMap<string> = {
  en: 'Close',
  it: 'Chiudi',
  es: 'Cerrar',
  fr: 'Fermer',
}

// Messaggio neutro mostrato quando il messaggio e' classificato come spam (nessuna email inviata).
export const contactNeutralMessage: LocaleMap<string> = {
  en: 'Thanks for reaching out.',
  it: 'Grazie per averci scritto.',
  es: 'Gracias por escribirnos.',
  fr: 'Merci de nous avoir contactes.',
}

// Messaggio di successo quando un lead viene inoltrato via email.
export const contactSuccessMessage: LocaleMap<string> = {
  en: 'Message sent successfully',
  it: 'Messaggio inviato con successo',
  es: 'Mensaje enviado con exito',
  fr: 'Message envoye avec succes',
}

export const contactErrorMessage: LocaleMap<string> = {
  en: 'An error occurred, please try again later',
  it: "Si e' verificato un errore, riprova piu' tardi",
  es: 'Ocurrio un error, intentalo de nuevo mas tarde',
  fr: "Une erreur s'est produite, veuillez reessayer plus tard",
}

export const contactFormLabels: LocaleMap<FormLabels> = {
  en: {
    name: 'Your Name',
    email: 'Your Email',
    message: 'Your Message',
    placeholderName: 'John Doe',
    placeholderEmail: 'email@example.com',
    placeholderMessage: 'let me know how I can help you',
  },
  it: {
    name: 'Il tuo Nome',
    email: 'La tua Email',
    message: 'Il tuo Messaggio',
    placeholderName: 'Mario Rossi',
    placeholderEmail: 'email@esempio.com',
    placeholderMessage: 'fammi sapere come posso aiutarti',
  },
  es: {
    name: 'Tu Nombre',
    email: 'Tu Correo Electrónico',
    message: 'Tu Mensaje',
    placeholderName: 'Juan Pérez',
    placeholderEmail: 'email@ejemplo.com',
    placeholderMessage: 'déjame saber cómo puedo ayudarte',
  },
  fr: {
    name: 'Votre Nom',
    email: 'Votre Email',
    message: 'Votre Message',
    placeholderName: 'Jean Dupont',
    placeholderEmail: 'email@exemple.com',
    placeholderMessage: 'faites-moi savoir comment je peux vous aider',
  },
}

// ---------------------------------------------------------------------------
// Sezione legale: banner cookie, link nel footer e testi (Termini, Cookie,
// Privacy) mostrati nel Modal. Tutto multilingua come il resto del sito.
// ---------------------------------------------------------------------------

export interface LegalDocCopy {
  title: string
  body: string
}

export interface LegalCopy {
  banner: {
    message: string
    accept: string
    reject: string
    more: string
  }
  links: {
    terms: string
    cookie: string
    privacy: string
  }
  close: string
  docs: {
    terms: LegalDocCopy
    cookie: LegalDocCopy
    privacy: LegalDocCopy
  }
}

export const legal: LocaleMap<LegalCopy> = {
  en: {
    banner: {
      message:
        'We use only technical storage to remember your language and preferences. No advertising or tracking cookies.',
      accept: 'Accept',
      reject: 'Decline',
      more: 'Cookie Policy',
    },
    links: {
      terms: 'Terms & Conditions',
      cookie: 'Cookie Policy',
      privacy: 'Privacy Policy',
    },
    close: 'Close',
    docs: {
      terms: {
        title: 'Terms & Conditions',
        body: `Last updated: June 2026

Welcome to this website. By accessing and using this site you agree to these Terms & Conditions. If you do not agree, please do not use the site.

1. Purpose — This is a personal portfolio presenting the professional profile, projects and services of Nicola Solazzo. The content is provided for informational purposes only.

2. Intellectual property — All texts, graphics, logos, code and other materials on this site are owned by Nicola Solazzo unless otherwise stated, and may not be reproduced without prior written permission.

3. No warranty — The site is provided "as is" without warranties of any kind. While we strive to keep information accurate and up to date, we do not guarantee completeness or the absence of errors.

4. External links — This site may contain links to third-party websites. We are not responsible for their content or privacy practices.

5. Limitation of liability — To the maximum extent permitted by law, Nicola Solazzo shall not be liable for any damages arising from the use of this site.

6. Changes — These terms may be updated at any time. Continued use of the site constitutes acceptance of the updated terms.

7. Contact — For any questions, please write to solazzo.nicola@gmail.com or use the contact form on this site.`,
      },
      cookie: {
        title: 'Cookie Policy',
        body: `Last updated: June 2026

This website takes a privacy-friendly approach and does not use advertising or profiling cookies.

Technical storage — We use your browser's local storage only to remember technical preferences that improve your experience:
• your preferred language;
• your display/theme preference;
• your cookie consent choice.

These items are stored on your device, are not used to track you and are never shared with third parties.

Third-party services — When you submit the contact form or use the AI assistant, your input is processed by the service providers needed to deliver that feature. See the Privacy Policy for details.

Managing preferences — You can delete locally stored data at any time by clearing your browser storage for this site.

Consent — By clicking "Accept" you confirm you have read this policy. The site remains fully functional even if you decline.`,
      },
      privacy: {
        title: 'Privacy Policy',
        body: `Last updated: June 2026

This Privacy Policy explains how personal data is handled on this website, in line with the EU General Data Protection Regulation (GDPR).

Data controller — Nicola Solazzo. For any privacy request you can write to solazzo.nicola@gmail.com or use the contact form on this site.

Data we collect:
• Contact form: name, email address and the message you send, used solely to reply to your request.
• AI assistant: the messages you type are processed to generate a response.
• Technical preferences: language, theme and consent, stored locally on your device.

Legal basis — Data is processed on the basis of your consent and of our legitimate interest in responding to your enquiries.

Third parties — Messages may be processed by email delivery and AI providers strictly to provide the requested service. Data is not sold or used for advertising.

International transfers — Some providers (e.g. email or AI services) may process data outside the European Economic Area; in such cases appropriate safeguards apply, such as the European Commission's Standard Contractual Clauses.

Retention — Contact data is kept only as long as necessary to handle your request.

Your rights — You may request access, correction or deletion of your data, and withdraw consent at any time, by contacting us through the site. You also have the right to lodge a complaint with your local supervisory authority (in Italy, the Garante per la protezione dei dati personali).`,
      },
    },
  },
  it: {
    banner: {
      message:
        'Usiamo solo memorizzazione tecnica per ricordare la lingua e le tue preferenze. Nessun cookie pubblicitario o di tracciamento.',
      accept: 'Accetta',
      reject: 'Rifiuta',
      more: 'Cookie Policy',
    },
    links: {
      terms: 'Termini e Condizioni',
      cookie: 'Cookie Policy',
      privacy: 'Privacy Policy',
    },
    close: 'Chiudi',
    docs: {
      terms: {
        title: 'Termini e Condizioni',
        body: `Ultimo aggiornamento: giugno 2026

Benvenuto su questo sito. Accedendo e utilizzando il sito accetti i presenti Termini e Condizioni. Se non li accetti, ti preghiamo di non utilizzare il sito.

1. Finalità — Questo è il portfolio personale che presenta il profilo professionale, i progetti e i servizi di Nicola Solazzo. I contenuti hanno finalità puramente informativa.

2. Proprietà intellettuale — Tutti i testi, le grafiche, i loghi, il codice e gli altri materiali presenti sul sito sono di proprietà di Nicola Solazzo, salvo diversa indicazione, e non possono essere riprodotti senza autorizzazione scritta.

3. Assenza di garanzie — Il sito è fornito "così com'è", senza garanzie di alcun tipo. Pur impegnandoci a mantenere le informazioni accurate e aggiornate, non garantiamo la completezza o l'assenza di errori.

4. Link esterni — Il sito può contenere link a siti di terze parti. Non siamo responsabili dei loro contenuti o delle loro pratiche sulla privacy.

5. Limitazione di responsabilità — Nei limiti massimi consentiti dalla legge, Nicola Solazzo non è responsabile per eventuali danni derivanti dall'uso del sito.

6. Modifiche — I presenti termini possono essere aggiornati in qualsiasi momento. L'uso continuato del sito costituisce accettazione dei termini aggiornati.

7. Contatti — Per qualsiasi domanda puoi scrivere a solazzo.nicola@gmail.com oppure utilizzare il form di contatto presente sul sito.`,
      },
      cookie: {
        title: 'Cookie Policy',
        body: `Ultimo aggiornamento: giugno 2026

Questo sito adotta un approccio rispettoso della privacy e non utilizza cookie pubblicitari o di profilazione.

Memorizzazione tecnica — Utilizziamo la memoria locale del browser solo per ricordare preferenze tecniche che migliorano la tua esperienza:
• la lingua preferita;
• la preferenza di tema/visualizzazione;
• la tua scelta sul consenso ai cookie.

Questi dati restano sul tuo dispositivo, non vengono usati per tracciarti e non sono mai condivisi con terzi.

Servizi di terze parti — Quando invii il form di contatto o usi l'assistente AI, i dati inseriti vengono elaborati dai fornitori necessari a erogare la funzione. Vedi la Privacy Policy per i dettagli.

Gestione delle preferenze — Puoi eliminare in qualsiasi momento i dati memorizzati localmente cancellando la memoria del browser per questo sito.

Consenso — Cliccando "Accetta" confermi di aver letto questa policy. Il sito resta pienamente funzionante anche se rifiuti.`,
      },
      privacy: {
        title: 'Privacy Policy',
        body: `Ultimo aggiornamento: giugno 2026

La presente Informativa spiega come vengono trattati i dati personali su questo sito, in conformità al Regolamento UE sulla protezione dei dati (GDPR).

Titolare del trattamento — Nicola Solazzo. Per qualsiasi richiesta sulla privacy puoi scrivere a solazzo.nicola@gmail.com oppure usare il form di contatto presente sul sito.

Dati raccolti:
• Form di contatto: nome, indirizzo email e messaggio inviato, usati esclusivamente per rispondere alla tua richiesta.
• Assistente AI: i messaggi che digiti vengono elaborati per generare una risposta.
• Preferenze tecniche: lingua, tema e consenso, memorizzati localmente sul tuo dispositivo.

Base giuridica — I dati sono trattati sulla base del tuo consenso e del legittimo interesse a rispondere alle tue richieste.

Terze parti — I messaggi possono essere elaborati da fornitori di invio email e di servizi AI esclusivamente per fornire il servizio richiesto. I dati non vengono venduti né usati per pubblicità.

Trasferimenti extra-UE — Alcuni fornitori (es. servizi email o AI) potrebbero trattare i dati al di fuori dello Spazio Economico Europeo; in tal caso si applicano garanzie adeguate, come le Clausole Contrattuali Standard della Commissione Europea.

Conservazione — I dati di contatto sono conservati solo per il tempo necessario a gestire la tua richiesta.

I tuoi diritti — Puoi richiedere l'accesso, la rettifica o la cancellazione dei tuoi dati e revocare il consenso in qualsiasi momento, contattandoci tramite il sito. Hai inoltre il diritto di proporre reclamo all'autorità di controllo competente (in Italia, il Garante per la protezione dei dati personali).`,
      },
    },
  },
  es: {
    banner: {
      message:
        'Usamos solo almacenamiento técnico para recordar tu idioma y tus preferencias. Sin cookies publicitarias ni de seguimiento.',
      accept: 'Aceptar',
      reject: 'Rechazar',
      more: 'Política de Cookies',
    },
    links: {
      terms: 'Términos y Condiciones',
      cookie: 'Política de Cookies',
      privacy: 'Política de Privacidad',
    },
    close: 'Cerrar',
    docs: {
      terms: {
        title: 'Términos y Condiciones',
        body: `Última actualización: junio de 2026

Bienvenido a este sitio web. Al acceder y utilizar el sitio aceptas estos Términos y Condiciones. Si no estás de acuerdo, te rogamos que no utilices el sitio.

1. Finalidad — Este es el portafolio personal que presenta el perfil profesional, los proyectos y los servicios de Nicola Solazzo. El contenido tiene fines meramente informativos.

2. Propiedad intelectual — Todos los textos, gráficos, logotipos, código y demás materiales del sitio son propiedad de Nicola Solazzo, salvo que se indique lo contrario, y no pueden reproducirse sin autorización por escrito.

3. Sin garantías — El sitio se ofrece "tal cual", sin garantías de ningún tipo. Aunque nos esforzamos por mantener la información precisa y actualizada, no garantizamos su integridad ni la ausencia de errores.

4. Enlaces externos — El sitio puede contener enlaces a sitios de terceros. No somos responsables de su contenido ni de sus prácticas de privacidad.

5. Limitación de responsabilidad — En la máxima medida permitida por la ley, Nicola Solazzo no será responsable de los daños derivados del uso del sitio.

6. Cambios — Estos términos pueden actualizarse en cualquier momento. El uso continuado del sitio implica la aceptación de los términos actualizados.

7. Contacto — Para cualquier consulta puedes escribir a solazzo.nicola@gmail.com o utilizar el formulario de contacto del sitio.`,
      },
      cookie: {
        title: 'Política de Cookies',
        body: `Última actualización: junio de 2026

Este sitio adopta un enfoque respetuoso con la privacidad y no utiliza cookies publicitarias ni de perfilado.

Almacenamiento técnico — Utilizamos el almacenamiento local del navegador solo para recordar preferencias técnicas que mejoran tu experiencia:
• tu idioma preferido;
• tu preferencia de tema/visualización;
• tu elección sobre el consentimiento de cookies.

Estos datos permanecen en tu dispositivo, no se usan para rastrearte y nunca se comparten con terceros.

Servicios de terceros — Cuando envías el formulario de contacto o usas el asistente de IA, los datos introducidos son procesados por los proveedores necesarios para ofrecer esa función. Consulta la Política de Privacidad para más detalles.

Gestión de preferencias — Puedes eliminar en cualquier momento los datos almacenados localmente borrando el almacenamiento del navegador para este sitio.

Consentimiento — Al hacer clic en "Aceptar" confirmas que has leído esta política. El sitio sigue siendo plenamente funcional aunque la rechaces.`,
      },
      privacy: {
        title: 'Política de Privacidad',
        body: `Última actualización: junio de 2026

Esta Política de Privacidad explica cómo se tratan los datos personales en este sitio web, de acuerdo con el Reglamento General de Protección de Datos de la UE (RGPD).

Responsable del tratamiento — Nicola Solazzo. Para cualquier solicitud de privacidad puedes escribir a solazzo.nicola@gmail.com o usar el formulario de contacto del sitio.

Datos que recopilamos:
• Formulario de contacto: nombre, dirección de correo electrónico y el mensaje que envías, usados únicamente para responder a tu solicitud.
• Asistente de IA: los mensajes que escribes se procesan para generar una respuesta.
• Preferencias técnicas: idioma, tema y consentimiento, almacenados localmente en tu dispositivo.

Base jurídica — Los datos se tratan sobre la base de tu consentimiento y de nuestro interés legítimo en responder a tus consultas.

Terceros — Los mensajes pueden ser procesados por proveedores de envío de correo y de servicios de IA exclusivamente para prestar el servicio solicitado. Los datos no se venden ni se usan con fines publicitarios.

Transferencias fuera de la UE — Algunos proveedores (p. ej. servicios de correo o de IA) pueden tratar los datos fuera del Espacio Económico Europeo; en tal caso se aplican garantías adecuadas, como las Cláusulas Contractuales Tipo de la Comisión Europea.

Conservación — Los datos de contacto se conservan solo durante el tiempo necesario para gestionar tu solicitud.

Tus derechos — Puedes solicitar el acceso, la rectificación o la supresión de tus datos y retirar el consentimiento en cualquier momento, contactándonos a través del sitio. También tienes derecho a presentar una reclamación ante la autoridad de control competente (en España, la Agencia Española de Protección de Datos).`,
      },
    },
  },
  fr: {
    banner: {
      message:
        'Nous utilisons uniquement un stockage technique pour mémoriser votre langue et vos préférences. Aucun cookie publicitaire ou de suivi.',
      accept: 'Accepter',
      reject: 'Refuser',
      more: 'Politique de Cookies',
    },
    links: {
      terms: 'Conditions Générales',
      cookie: 'Politique de Cookies',
      privacy: 'Politique de Confidentialité',
    },
    close: 'Fermer',
    docs: {
      terms: {
        title: 'Conditions Générales',
        body: `Dernière mise à jour : juin 2026

Bienvenue sur ce site web. En accédant au site et en l'utilisant, vous acceptez les présentes Conditions Générales. Si vous ne les acceptez pas, veuillez ne pas utiliser le site.

1. Objet — Il s'agit du portfolio personnel présentant le profil professionnel, les projets et les services de Nicola Solazzo. Le contenu est fourni à titre purement informatif.

2. Propriété intellectuelle — Tous les textes, graphismes, logos, codes et autres éléments du site sont la propriété de Nicola Solazzo, sauf indication contraire, et ne peuvent être reproduits sans autorisation écrite préalable.

3. Absence de garantie — Le site est fourni "en l'état", sans garantie d'aucune sorte. Bien que nous nous efforcions de maintenir des informations exactes et à jour, nous ne garantissons ni l'exhaustivité ni l'absence d'erreurs.

4. Liens externes — Le site peut contenir des liens vers des sites tiers. Nous ne sommes pas responsables de leur contenu ni de leurs pratiques en matière de confidentialité.

5. Limitation de responsabilité — Dans toute la mesure permise par la loi, Nicola Solazzo ne saurait être tenu responsable des dommages résultant de l'utilisation du site.

6. Modifications — Les présentes conditions peuvent être mises à jour à tout moment. L'utilisation continue du site vaut acceptation des conditions mises à jour.

7. Contact — Pour toute question, vous pouvez écrire à solazzo.nicola@gmail.com ou utiliser le formulaire de contact du site.`,
      },
      cookie: {
        title: 'Politique de Cookies',
        body: `Dernière mise à jour : juin 2026

Ce site adopte une approche respectueuse de la vie privée et n'utilise pas de cookies publicitaires ou de profilage.

Stockage technique — Nous utilisons le stockage local du navigateur uniquement pour mémoriser des préférences techniques qui améliorent votre expérience :
• votre langue préférée ;
• votre préférence de thème/affichage ;
• votre choix concernant le consentement aux cookies.

Ces données restent sur votre appareil, ne sont pas utilisées pour vous suivre et ne sont jamais partagées avec des tiers.

Services tiers — Lorsque vous envoyez le formulaire de contact ou utilisez l'assistant IA, les données saisies sont traitées par les prestataires nécessaires à la fourniture de cette fonctionnalité. Consultez la Politique de Confidentialité pour plus de détails.

Gestion des préférences — Vous pouvez supprimer à tout moment les données stockées localement en effaçant le stockage du navigateur pour ce site.

Consentement — En cliquant sur "Accepter", vous confirmez avoir lu cette politique. Le site reste pleinement fonctionnel même si vous refusez.`,
      },
      privacy: {
        title: 'Politique de Confidentialité',
        body: `Dernière mise à jour : juin 2026

La présente Politique de Confidentialité explique comment les données personnelles sont traitées sur ce site, conformément au Règlement général sur la protection des données de l'UE (RGPD).

Responsable du traitement — Nicola Solazzo. Pour toute demande relative à la confidentialité, vous pouvez écrire à solazzo.nicola@gmail.com ou utiliser le formulaire de contact du site.

Données collectées :
• Formulaire de contact : nom, adresse e-mail et le message que vous envoyez, utilisés uniquement pour répondre à votre demande.
• Assistant IA : les messages que vous saisissez sont traités pour générer une réponse.
• Préférences techniques : langue, thème et consentement, stockés localement sur votre appareil.

Base légale — Les données sont traitées sur la base de votre consentement et de notre intérêt légitime à répondre à vos demandes.

Tiers — Les messages peuvent être traités par des prestataires d'envoi d'e-mails et de services d'IA uniquement pour fournir le service demandé. Les données ne sont ni vendues ni utilisées à des fins publicitaires.

Transferts hors UE — Certains prestataires (par ex. services d'e-mail ou d'IA) peuvent traiter les données en dehors de l'Espace économique européen ; dans ce cas, des garanties appropriées s'appliquent, telles que les Clauses Contractuelles Types de la Commission européenne.

Conservation — Les données de contact ne sont conservées que le temps nécessaire au traitement de votre demande.

Vos droits — Vous pouvez demander l'accès, la rectification ou la suppression de vos données et retirer votre consentement à tout moment, en nous contactant via le site. Vous avez également le droit d'introduire une réclamation auprès de l'autorité de contrôle compétente (en France, la CNIL).`,
      },
    },
  },
}
