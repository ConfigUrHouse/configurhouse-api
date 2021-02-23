# configurhouse-api
## Pré-requis
- NodeJS
- Une base de données (MySql, MariaDB, SQLite, PostgreSQL ou MSSQL)
## Installation
1. Cloner le projet  
`git clone https://github.com/ConfigUrHouse/configurhouse-api.git`
2. Ajouter un fichier .env à la racine du projet sur le modèle du fichier .env.example
3. Installer les dépendances  
`npm install` ou `yarn install`
4. Build le projet  
`npm run webpack`
5. Lancer le projet  
Dans un autre terminal, exécuter la commande `npm start`

L'API est disponible à l'adresse http://localhost:PORT, PORT étant spécifié dans le fichier .env 