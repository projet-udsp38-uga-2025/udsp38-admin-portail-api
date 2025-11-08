# API du Portail Admin UDSP38

Ceci est l'API backend pour le Portail Admin UDSP38, construite avec Next.js 15, TypeScript et Prisma ORM.

## 🚀 Pour Commencer

### Prérequis
- Node.js 18+
- npm
- Base de données PostgreSQL en local

### Installation

2. Installer les dépendances :
```bash
cd udsp38-admin-portail-api
npm install
```

3. Configurer les variables d'environnement :

Si vous n'avez pas le fichier .env dans votre dossier du projet,
- Créez le fichier .env
- Récuperez le contenu sur le dossier drive partagé du projet
- Modifiez `.env` avec vos identifiants de base de données.

### Configuration de Prisma

📄📚Lien docs : https://www.prisma.io/docs/

1. Générer le client Prisma :

C'est l'ORM (Object-Relational Mapper) pour interagir avec ta base de données de manière type-safe. A chaque fois que le fichier `schema.prisma` est modifié, il faut lancer cette commande ci-dessous. Mais elle ne fait que mettre à jour le mapping de l'ORM sans appliquer les modifications à la base de données. Pour appliquer les modifications dans la base de données il faut lancer la commande abordée au point suivant.

```bash
npx prisma generate
```

2. Exécuter les migrations de la base de données :

Lancez cette commande toutes fois que vous apportez une modification au fichier `schema.prisma`. Cela va créer la migration pour appliquer les modifications à la base de données et Regénerer le client Prisma (essentiel pour le mapping objet dans le code).

```bash
npx prisma migrate dev
```

### Lancement de l'Application

Mode développement :
```bash
npm run dev
```
L'API sera disponible sur `http://localhost:3000`

Build de production :
```bash
npm build
npm start
```

## 🔄 Commandes Prisma

- Mettre à jour le schéma et générer le client :
```bash
npx prisma generate
```

- Créer une nouvelle migration :
```bash
npx prisma migrate dev
```

## 📝 Documentation de l'API

La documentation de l'API est disponible sur :
- Développement : `http://localhost:3000/api-docs`
- Production : `https://your-domain.com/api-docs`

## 🛠️ Stack Technique

- Next.js 15 (App Router)
- TypeScript
- Prisma ORM
- PostgreSQL
- Tailwind CSS
- React 19