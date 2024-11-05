# Logo Generator - Créateur de Logo Personnalisé

Ce **Logo Generator** permet aux utilisateurs de concevoir des logos en combinant du texte principal, un sous-texte et des images.

## Points clés

- **Web Components** : Construit avec des Web Components pour une modularité et une réutilisabilité optimales.
- **Création de Logos Personnalisés** : Combinez facilement du texte, un sous-texte et des images pour créer un logo unique.
- **Aperçu Instantané** : Visualisez votre logo en temps réel dans la section de prévisualisation.
- **Téléchargement d'Images** : Téléchargez votre logo généré en tant qu'image PNG de haute qualité.
- **Génération de Code** : Affichez le code source de l'image générée (au format Base64) pour une intégration facile dans d'autres projets.

## Technologies Utilisées

- **HTML5** : Pour la structure de la page.
- **CSS3** : Pour le style et la mise en page.
- **JavaScript** : Pour la logique d'interaction.
- **Web Components** : Pour des composants réutilisables et modulaires.
- **[html2canvas](https://html2canvas.hertzen.com/)** : Pour la capture d'écran et la génération d'images.

## Architecture du Projet

Le projet est organisé en plusieurs composants, chacun gérant une partie spécifique de la création du logo :

- **TextComponent** : Gère le texte principal du logo.
- **SubTextComponent** : Gère le sous-texte du logo.
- **ImageComponent** : Gère l'importation et l'affichage des images.

Cette structure modulaire permet une séparation claire des responsabilités, facilitant ainsi la maintenance et l'évolution future de l'application.

## Installation

1. Clonez le dépôt :

   ```bash
   git clone https://github.com/votre-utilisateur/logo-generator.git
