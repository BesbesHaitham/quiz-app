# QuizApp

Un quiz complet sur les bases de React, écrit en JavaScript et JSX, avec une interface entièrement en français. Trois panneaux regroupent la navigation des questions, la question et ses réponses, puis le compte à rebours et le bouton de fin. Le projet reprend l’architecture, les API des composants, les thèmes et les outils de `../todo-list/`. Le projet d’origine n’est pas modifié.

## Installation

Utilisez Node.js 22.12 ou une version LTS plus récente prise en charge, npm et Java 17 ou supérieur pour WireMock.

```sh
npm install
npm run dev
```

Ouvrez l’adresse locale affichée par Vite. WireMock est facultatif : si l’API est indisponible ou renvoie des données invalides, la première tentative utilise les questions intégrées. Une tentative déjà enregistrée est restaurée immédiatement, sans requête réseau.

Copiez `.env.example` vers `.env.local` pour personnaliser l’API ou la durée, puis redémarrez Vite :

```dotenv
VITE_API_BASE_URL=/api
VITE_API_PROXY_TARGET=http://127.0.0.1:8080
VITE_QUIZ_DURATION_SECONDS=600
```

La durée doit être un entier compris entre 1 et 86400 secondes. Elle s’applique aux nouvelles tentatives. Une tentative existante conserve sa durée, y compris lors d’un redémarrage du quiz. Pour appliquer une autre durée à une installation existante, terminez la tentative puis supprimez l’entrée `quiz-attempt:v1` du stockage du navigateur avant de recharger. Sans configuration explicite, la durée provient des données du quiz. Les variables `VITE_*` sont publiques : ne les utilisez jamais pour des secrets.

## Commandes

| Commande                  | Rôle                                                  |
| ------------------------- | ----------------------------------------------------- |
| `npm run dev`             | Démarrer le serveur de développement Vite             |
| `npm run start:mock`      | Démarrer WireMock avec npm sur le port 8080           |
| `npm run build`           | Compiler l’application dans `dist/`                   |
| `npm run preview`         | Servir localement la version compilée                 |
| `npm run lint`            | Vérifier le JS/JSX avec la configuration plate ESLint |
| `npm run format`          | Appliquer les règles Prettier du projet de référence  |
| `npm run format:check`    | Vérifier la mise en forme                             |
| `npm run storybook`       | Démarrer Storybook sur le port 6006                   |
| `npm run build-storybook` | Compiler la bibliothèque dans `storybook-static/`     |

## Architecture

```text
src/
  assets/                    Logo SVG local
  components/
    atoms/                   Button, IconButton, Input, Checkbox, Badge
    molecules/               AnswerOption, QuestionNavItem, CountdownTimer,
                             Modal, QuestionReview
    organisms/               QuestionNavigator, QuestionCard, QuizSummary, QuizResults
    templates/               QuizLayout : en-tête, disposition et état de sauvegarde
  pages/                     QuizPage : composition et confirmation de fin
  routes/                    Routes BrowserRouter et redirection des URL inconnues
  services/                  Requêtes fetch, récupération du quiz et accusé de réception
  store/                     Modèle, réducteur, magasin externe et hooks
  stories/                   Exemples Storybook et documentation MDX
  styles/                    Variables de thème et utilitaires partagés des atomes
wiremock/
  __files/react-basics.json   Questions communes à l’API et au mode local
  mappings/                  Réponses statiques GET et POST
.storybook/                  Configuration React/Vite, thèmes et extensions
```

Chaque composant visuel possède ses propres fichiers `.jsx` et `.module.css`. Les composants reçoivent des données et des fonctions de rappel ; ils n’appellent pas l’API et n’écrivent pas dans le stockage. `quizModel.js` gère la validation, les transitions immuables, les durées, la traduction des anciennes données et les statistiques finales. `createQuizStore()` gère la persistance, les abonnements, l’initialisation et les accusés de réception. L’API, le stockage, l’horloge, le générateur d’identifiants et la durée sont injectables pour des vérifications isolées. `useQuiz()` relie React au magasin avec `useSyncExternalStore` et gère les événements de minuterie et de stockage.

Les atomes génériques conservent les propriétés publiques du projet de référence : attributs HTML, événements, références React 19, variantes, cinq tailles, arrondis, icônes, chargement et classes personnalisées. Input accepte input, select et textarea ; Checkbox prend en charge l’état indéterminé ; Badge propose une suppression facultative ; IconButton gère le nom accessible et l’état de bascule. Les styles utilisent les variables communes du thème.

## Fonctionnement et persistance

- Dix questions avec quatre propositions chacune. Sélectionnez ou modifiez une réponse, utilisez Précédent/Suivant ou choisissez directement une question. Une nouvelle tentative commence à la première question, sans réponse préremplie.
- La progression compte les questions répondues. La liste affiche leurs numéros, leurs titres et la question actuelle. Les bonnes et mauvaises réponses sont indiquées dans les résultats finaux, calculés à partir des réponses enregistrées sans double comptage.
- Le compte à rebours utilise une échéance absolue enregistrée. Le temps continue de s’écouler lorsque l’onglet est fermé ou inactif. Un rechargement conserve l’échéance ; une tentative déjà expirée est envoyée immédiatement.
- Chaque sélection, navigation ou demande de fin vérifie l’échéance, même si le navigateur a ralenti les minuteries d’un onglet inactif. L’expiration termine le quiz, ferme une éventuelle confirmation et utilise l’échéance comme date de soumission.
- Le bouton Terminer le quiz ouvre une confirmation lorsqu’il reste des questions sans réponse. Si toutes les questions sont répondues, le résultat s’affiche directement. Il comprend le score, le pourcentage, la durée, les totaux, les quatre choix, la réponse choisie, la bonne réponse et une explication pour chaque question. Une question sans réponse ne rapporte aucun point.
- Recommencer crée un nouvel identifiant et une nouvelle échéance, efface les réponses et revient à la première question. Les résultats terminés sont conservés au rechargement et ne peuvent plus être modifiés.
- localStorage conserve une enveloppe `{ version: 1, attempt }` sous `quiz-attempt:v1` : copie du quiz, réponses, question actuelle, dates, durée, motif de fin et statut. Les scores sont recalculés pour éviter les totaux dupliqués. La copie du quiz préserve la cohérence d’une tentative si l’API évolue.
- Les anciennes copies anglaises du quiz compatible sont traduites en français lors de leur restauration. Les identifiants, l’ordre des questions et des choix, les indices des bonnes réponses, les réponses choisies, la question actuelle, les dates et la durée sont conservés. Les valeurs techniques de difficulté restent `Easy`, `Medium` et `Hard` ; leurs libellés affichés sont Facile, Moyen et Difficile.
- La validation refuse les quiz mal formés, identifiants dupliqués, choix invalides, échéances incohérentes, statuts de fin invalides et versions de stockage incompatibles. Des données illisibles entraînent une nouvelle tentative accompagnée d’un message. Un stockage bloqué ou plein laisse le quiz utilisable en mémoire avec un avertissement. Les événements de stockage synchronisent les tentatives entre onglets ; en cas de modifications simultanées, la dernière écriture prévaut.
- Le thème est initialisé depuis `quiz-theme` ou la préférence du système, appliqué avec `data-theme`, puis enregistré. Un script HTML initial évite un changement de thème visible au chargement. Le thème reste utilisable si le stockage est bloqué.

Ce quiz sert à s’entraîner localement. Les bonnes réponses sont intégrées au code et le temps dépend de l’horloge de l’appareil ; il ne s’agit pas d’un système d’examen sécurisé avec validation serveur. Effacer les données du site supprime la tentative. Aucun compte ni historique distant n’est créé.

## WireMock

Dans un second terminal :

```sh
npm run start:mock
```

La commande reprend celle du projet de référence : `wiremock --root-dir ./wiremock --port 8080 --enable-stub-cors`. Le paquet npm inclut le fichier JAR autonome de WireMock et le lance avec Java, sans Docker.

| Point d’accès                   | Comportement                                                         |
| ------------------------------- | -------------------------------------------------------------------- |
| `GET /api/quizzes/react-basics` | Sert `wiremock/__files/react-basics.json`                            |
| `POST /api/quiz-submissions`    | Renvoie un accusé de réception statique `202`, sans stockage distant |

En développement et en aperçu, Vite transmet `/api` à `VITE_API_PROXY_TARGET`. Le service utilise `fetch`, valide les données GET, vérifie le statut HTTP et limite l’attente à 1,8 seconde. En cas d’échec initial, les mêmes questions JSON intégrées sont utilisées. À la soumission, les résultats sont enregistrés localement avant le POST facultatif. Un serveur simulé indisponible ne les efface pas. Ces réponses statiques ne constituent pas une base de données dynamique ; les envois hors connexion ne sont pas rejoués ultérieurement.

Pour le déploiement, configurez l’hébergement afin de servir `index.html` pour les routes du navigateur. Le proxy Vite concerne uniquement le développement et l’aperçu local. Une API déployée nécessite un proxy de même origine ou une URL publique avec une configuration CORS adaptée. Les questions intégrées permettent également un hébergement statique sans API.

## Styles, Storybook et accessibilité

`src/styles/tokens.css` centralise les couleurs des thèmes clair et sombre, espacements, typographie, dimensions, ombres, arrondis et animations. La disposition compacte utilise trois colonnes sur ordinateur, deux colonnes avec le suivi en dessous sur tablette, puis des cartes empilées sur mobile. La liste numérotée défile horizontalement sur mobile. Les dix questions restent accessibles à 320 px. Aucune police ni image distante n’est nécessaire.

Storybook reprend React/Vite et les extensions Docs, A11y, Chromatic et MCP. Les exemples sont dans `src/stories/`, couvrent tous les composants et proposent des contrôles interactifs ainsi que des thèmes clair et sombre. Les noms, contenus et descriptions des exemples et la documentation MDX sont en français. L’exemple complet utilise MemoryRouter et ne touche pas au stockage de l’application. Chromatic est présent pour conserver les mêmes outils ; aucune publication distante n’est configurée.

Les réponses utilisent des boutons radio natifs, accessibles avec les flèches et Espace. La navigation expose le libellé de chaque question et l’étape actuelle. Le focus passe au titre lors d’un changement de question. Un lien d’accès direct, des indicateurs de focus, une fenêtre modale native, une barre de progression étiquetée et la réduction des animations sont inclus. Le document est déclaré en français et les noms accessibles sont traduits. Le compte à rebours n’annonce pas chaque seconde ; il signale une fois la dernière minute.

## Vérification

Commandes à exécuter :

```sh
npm run lint
npm run format:check
npm run build
npm run build-storybook
```

Vérifications fonctionnelles :

1. Démarrer sans WireMock : vérifier le chargement des dix questions en français et une première question sans réponse.
2. Sélectionner et remplacer des réponses, naviguer avec Précédent/Suivant et la liste, puis vérifier les sélections et la progression.
3. Recharger pendant le quiz : vérifier les réponses, la question actuelle et l’échéance. Changer de thème puis recharger à nouveau.
4. Terminer avec des questions sans réponse : annuler avec Continuer, Échap ou le bouton de fermeture, puis confirmer. Vérifier les totaux, le pourcentage et le corrigé en français.
5. Recharger les résultats puis recommencer : vérifier une nouvelle tentative, les réponses effacées et le compte à rebours réinitialisé.
6. Utiliser une durée courte : vérifier la fin automatique après rechargement, dans un onglet inactif et avec la confirmation ouverte.
7. Essayer des données anciennes, corrompues et un stockage bloqué : vérifier la restauration ou le message de récupération approprié.
8. Restaurer une ancienne tentative anglaise compatible : vérifier sa traduction sans perte des réponses ni modification de l’échéance.
9. Lancer WireMock, vérifier les deux points d’accès, puis l’arrêter et vérifier la persistance locale.
10. Vérifier les dispositions ordinateur, tablette, 390 px et 320 px dans les deux thèmes, le clavier, le focus et l’absence de débordement horizontal.
11. Dans Storybook, vérifier les exemples, leurs contrôles, les thèmes et le panneau d’accessibilité.

Aucun outil de test automatisé supplémentaire, bibliothèque de glisser-déposer, Redux, Axios, code TypeScript ou configuration Docker n’est ajouté. Les sources, questions, configurations et le fichier de verrouillage restent suivis par Git ; les dépendances, compilations, caches et variables locales sont ignorés.
