<div align="center">
    <h1>ConfigUrHouse</h1>
</div>

---

# Installation

## Pré-requis

- node.js
- MySQL

## Environnement de développement

Cloner le projet :

```bash
git clone git@github.com:ConfigUrHouse/configurhouse-api.git

ou

git clone https://github.com/ConfigUrHouse/configurhouse-api.git
```

Se déplacer dans le dossier du projet :

```bash
cd configurhouse-api
```

Installer les dépendances :

```bash
yarn install
```

Copier le contenu du fichier _.env.example_ dans un nouveau fichier _.env_

```bash
cp .env.example .env
```

Dans ce fichier il faudra changer le nom de base de données, l'utilisateur, le mot de passe qui seront utilisés par l'application en fonciton de votre environnement.

Préparer la base de données avec les migrations et les seeds :

```bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

Pour lancer l'application, lancer les deux commandes dans deux terminales différentes :

```bash
npm run webpack
npm run start
```

## k6

documentation

https://k6.io/docs/results-visualization/influxdb-+-grafana

```
$ git clone 'https://github.com/loadimpact/k6'
$ cd k6
$ docker-compose up -d \
    influxdb \
    grafana
$ docker-compose run -v $PWD/samples:/scripts k6 run /scripts/es6sample.js
``
```
