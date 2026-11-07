# EPK Flo

Dépôt partagé pour construire l'EPK web de Flo. **Choix technique validé : React + Vite + TypeScript + Tailwind CSS**, avec Motion pour les animations. Vite produit une page statique déployable ; aucun serveur applicatif n'est nécessaire.

La page actuelle est une **maquette de travail** pour BRAIDSPLACE / Living Hair Art. Le projet est une performance visuelle ; les contenus, visuels et coordonnées doivent être confirmés par Flo avant publication. Le dépôt GitHub est actuellement public.

## Démarrer

Node.js 20.19+ ou 22.12+ est requis par Vite. Dans le dossier du dépôt :

```bash
npm ci
npm run dev
```

Ouvrir l'adresse locale affichée par Vite. Pour vérifier la version de production :

```bash
npm run build
npm run preview
```

Le dossier `dist/` est généré par le build et ne doit pas être ajouté à Git.

## Nouvelle maquette à valider

Sur la branche de navigation par chapitres, la vidéo de couverture reste fixe et boucle pendant que les phrases anglaises proposées par Flo se succèdent de gauche à droite au défilement. Leurs titres utilisent Climate Crisis, y compris les mots colorés, avec Manrope pour les repères. Juste après « Live Canvas », la présentation de Flow remplace le texte sur ce même écran fixe en entrant de gauche à droite ; son portrait original est agrandi, remonté et son panneau brun est rendu blanc par un filtre sélectif. L'Africa Tour constitue le chapitre suivant et entre aussi de gauche à droite sur le même fond ; sa carte reste fixe et son itinéraire se dessine en trait continu lors de l’entrée dans le chapitre. Un lien HOME est disponible dès la page artiste et reste présent dans les chapitres suivants pour revenir à l’ouverture. Les étapes affichées sont Réunion Island, Cape Town (International Jazz Festival), Johannesburg et Tanzania. Le dernier chapitre « Explore more » arrive de gauche à droite avec seulement trois liens typographiques : BACKSTAGE, GALLERY et STATISTICS. Ils ouvrent leurs pages annexes via `?page=film`, `?page=galerie` et `?page=statistiques` ; ces pages entrent elles aussi de gauche à droite et leurs liens de retour ramènent directement à « Explore more ». La direction et les formulations finales attendent la validation de Flo. Les descriptions détaillées plus bas conservent l'historique de la maquette précédente.

La section « Explore more » laisse désormais voir en fond la vidéo de couverture qui continue à boucler ; un voile sombre garde ses liens lisibles. La préférence de réduction du mouvement conserve l'image d'attente à la place de la vidéo.

## Organisation

La page `/?page=portfolio` reprend les six rubriques, les projets et les photographies du portfolio Squarespace de Flo, ainsi que les quatre images de l'ancienne galerie de l'EPK. Les 68 images Squarespace sont copiées dans `public/portfolio/` pour éviter une dépendance au site Squarespace expiré ; `contenu/portfolio-sources.json` conserve leur provenance. Flo a confirmé le 7 novembre 2026 les droits des nouveaux médias, des personnes représentées et les crédits. Le lien PORTFOLIO apparaît dans le menu et sur la page Explore More. La page Gallery indépendante a été retirée ; ses anciennes URL affichent Portfolio. Le bouton Play/Pause du film de fond a été retiré à la demande de Flo ; la vidéo conserve sa tentative de lecture automatique et son image d'attente. Backstage reste accessible, avec un étalonnage plus chaud et cinématographique choisi par Flo le 7 novembre 2026.

- `index.html` : point d'entrée HTML et métadonnées.
- `src/App.tsx` : accueil, navigation et pages annexes de l'EPK.
- `src/ScrollStory.tsx` : phrases successives sur la vidéo fixe de couverture.
- `src/ScrollExpandVideo.tsx` : prototype précédent de l'expansion du film, conservé dans le dépôt mais non affiché dans la nouvelle maquette.
- `src/MinimalistHairArt.tsx` : portrait et présentation de Flow sur la vidéo de couverture.
- `src/StatisticsRunway.tsx` : section de statistiques en trois tableaux, pilotée par les boutons précédent/suivant.
- `src/styles.css` : identité visuelle responsive et Tailwind.
- `src/main.tsx` : montage de l'application React.
- [`contenu/brief.md`](contenu/brief.md) : informations et médias à réunir avec Flo.
- [`contenu/charte-graphique.md`](contenu/charte-graphique.md) : direction visuelle déduite des documents de contexte, palette, typographies et règles d'usage.
- `AGENTS.md` : consignes communes pour les deux Codex.
- [`documents-de-contexte/`](documents-de-contexte/README.md) : PDF transmis pour préparer l’EPK Living Hair Art.
- [`medias/photos/`](medias/photos/README.md) : photos sources proposées pour l’EPK.
- [`medias/compositions/`](medias/compositions/README.md) : PNG transmis pour la présentation de l’artiste.
- [`medias/videos-source/`](medias/videos-source/README.md) : vidéos sources conservées localement.
- `public/videos/` : exports vidéo web (couverture 1174 × 782, film de la quatrième section 1080p) et leurs images d’attente.
- `public/images/` : versions web légères des photographies sélectionnées pour la maquette.
- [`contenu/selection-photos.md`](contenu/selection-photos.md) : correspondance entre versions web et originaux.
- [`docs/hebergement.md`](docs/hebergement.md) : procédure de mise en ligne sur `www.braidsplace.com` après validation.

## Hébergement préparé

Un workflow GitHub Actions manuel compile `main` pour GitHub Pages. Il ne se lance pas lors des pushes. Les réglages Pages et DNS restent à appliquer lors de la publication validée par Flo ; voir le [guide d’hébergement](docs/hebergement.md). La balise `noindex` et la mention de travail restent en place jusque-là.

## Introduction vidéo

La première vue reprend la composition et les phrases du [modèle Canva transmis par Flo](https://canva.link/jttf7nfxgobcc2n). Le titre utilise **Climate Crisis**, la même police que le modèle, déjà chargée localement. Les petits textes du modèle sont en **Neue Montreal** ; la maquette utilise temporairement **Manrope** avec les mêmes tailles, capitales et espacements. Une licence web Neue Montreal et les fichiers correspondants sont nécessaires pour une reproduction typographique exacte de ces petits textes.

Dans le manifeste de l'ouverture, « ARTISTIC WORLDS. » et « A LIVING EXPERIENCE WHERE ART COMES TO LIFE. » sont surlignés en ocre selon la capture de référence fournie par Flo.

La couverture utilise la dernière vidéo de cinq secondes fournie par Flo. La source reste locale et ignorée par Git ; son export H.264 suivi dans le dépôt a été allégé et sa piste audio retirée. La vidéo se lance muette en boucle derrière les textes existants ; l’image d’attente reste visible si la lecture automatique est bloquée ou si la réduction du mouvement est activée. Le portrait `adriiii bg.png` remplit la deuxième section en plein écran, avec le texte d’accueil fourni par Flo à droite sur un dégradé sombre ; la section apparaît en fondu. La vidéo en couleur de la quatrième section, après « L’ARTISTE », reste sur fond ivoire : son export 1080p s’agrandit au défilement, puis l’EPK reprend. Le titre « Live Hair Art » en Climate Crisis reprend l'ocre du surlignage de l'ouverture derrière les mots, avec les initiales en majuscules. Les couleurs prélevées sur la capture de Flo sont l’ocre `#AF8C5C`, le brun `#372A20` et l’ivoire `#F6F2EC`. La vidéo de la quatrième section possède des commandes de lecture et reste fixe quand la réduction du mouvement est activée. Les sources, les droits, les personnes filmées et les crédits restent à confirmer avant une publication publique.

La deuxième section affiche maintenant « E-PRESS KIT » et « Flow ». Toute l’interface visible est en anglais, y compris les textes alternatifs, les commandes, les dates de la tournée et les métadonnées. Sur mobile, le texte d’accueil se place en haut du portrait pour garder le visage visible. Les maquettes originales des statistiques contiennent des libellés français incorporés dans les JPG : des cartouches HTML opaques les masquent et affichent la traduction anglaise modifiable. Pour la version finale, demander des visuels sans texte incorporé.

## Motion design et 21st.dev

La quatrième section reprend le principe visuel de [Scroll media expansion hero de @arunachalam](https://21st.dev/@arunachalam/components/scroll-expansion-hero), publié sous licence MIT : le titre est placé au-dessus du petit cadre vidéo ; au défilement, la vidéo grandit vers le haut et recouvre progressivement le titre. La troisième section centre verticalement le texte sur le côté du portrait et adapte la composition et l’apparition du [Minimalist Hero de @ravikatiyar162](https://21st.dev/@ravikatiyar162/components/minimalist-hero) avec le portrait fourni par Flo et le texte à la première personne fourni par Flo sous « L’ARTISTE ». Ces adaptations sont locales, en React et Motion, sans nouvelle dépendance. Les animations respectent la préférence système de réduction du mouvement.

Après la vidéo, la section 5 « Gallery » présente « Un concept : rendre les choses vivante » et les photographies sélectionnées sur une seule ligne. Les flèches font défiler les photos d’un clic à la fois ; aucune légende n’apparaît sous les images. La section 6 « Statistiques » utilise trois maquettes fournies dans l'ordre rose → blanc → jaune, superposées sur un plateau fixe. Les boutons « précédent » et « suivant » font passer d’une maquette à l’autre avec un fondu ; sur mobile, un rappel textuel des chiffres accompagne l’image. En mode de réduction du mouvement, la transition est instantanée. Ces maquettes comportent encore du texte incorporé dans les images : pour la version finale, les chiffres devront être confirmés avec Flo et composés en HTML afin de rester entièrement modifiables et accessibles. La section 7 « BRAIDSPLACE Africa Tour » part de l’île de La Réunion, sans date de départ annoncée, puis relie Cape Town (mars 2027, « Validé »), Johannesburg et la Tanzanie (avril 2027, « À venir ») sur une carte animée avec un trajet en petits pointillés et les dates et statuts placés directement sur l’image. Les cartouches translucides laissent voir les pays, et celui de Johannesburg est remonté pour ne plus masquer La Réunion. La Tanzanie est indiquée comme pays, sans ville inventée. La carte utilise les contours [Natural Earth 1:110m](https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_admin_0_countries.geojson), domaine public. Les points de Cape Town et Johannesburg suivent les coordonnées de [UNGEGN/SAGNS](https://ungegn.un.org/dashboard/cities/details?id=2699) et de [Statistics South Africa](https://www.statssa.gov.za/?id=11306&page_id=4286) ; le point « Tanzanie » reprend le repère du pays dans Natural Earth. Le point de La Réunion est projeté d’après les coordonnées indiquées par [Réunion Tourisme](https://en.reunion.fr/organize/useful-information-before-travelling/time-difference/), et sa silhouette agrandie reprend son contour [Natural Earth 1:10m](https://gisgp.com/boundaries/france/reunion), domaine public. Cochin est appelée comme police système pour les textes de cette section, avec Instrument Serif en repli ; Climate Crisis dessine les titres.

## Page contact finale

La dernière page de la présentation utilise l'image d'attente de la vidéo de couverture, après « Explore More ». Elle affiche les contacts fournis par Flo le 4 novembre 2026 : téléphone, email et identifiant Instagram BRAIDSPLACE. L'identifiant Instagram reste en texte tant que son URL officielle n'est pas confirmée.

## Collaboration à distance


Alexandre et Flo utilisent chacun leur compte GitHub et leur Codex sur ce même dépôt. Chacun part de la dernière version de `main`, travaille sur une branche dédiée et ouvre une pull request. L'autre relit avant fusion ; `main` représente la version commune validée.

```bash
git clone https://github.com/Blackpearl97410/EPK-flo.git
cd EPK-flo
git switch main
git pull
git switch -c feat/nom-de-la-tache
```

La maquette React/Vite est sur `main`. Chaque nouvelle modification part d'une branche dédiée.

Flo valide les contenus et la direction artistique. La personne chargée des mises à jour techniques après publication et l'hébergement restent à définir.

## Avant publication

Remplacer les éléments « à compléter » par des contenus approuvés. Vérifier droits et crédits des médias, liens, contact, mobile et accessibilité. Retirer la balise `noindex` et la mention « version de travail » quand Flo valide la mise en ligne. Ne jamais committer de mot de passe, de clé API ou de média non autorisé à la publication.

## État

- [x] Dépôt partagé initialisé
- [x] Pile React + Vite + TypeScript + Tailwind CSS choisie
- [x] Maquette responsive migrée sur cette pile et fusionnée dans `main`
- [ ] Accès de Flo comme collaboratrice GitHub confirmé
- [ ] Identité, textes, visuels, dates et contact validés avec droits d'utilisation
- [ ] Composants 21st.dev choisis et adaptés si utiles
- [ ] Version personnalisée relue par Flo
- [x] Déploiement GitHub Pages manuel préparé pour `www.braidsplace.com`
- [ ] Accès DNS, configuration Pages, maintenance et publication validés
