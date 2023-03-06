# Trybe Football Club (TFC) ⚽

## Project Context 💡
This project is an informative website about football matches and classifications. [@Trybe](https://github.com/trybe-tech-ops) developed the front end for this project using React.

As the back-end developer, I  built an API using Typescript, Node.js, express, and Sequelize and integrated it with the front end using Docker and docker-compose. The API allows users to add new matches and update existing ones by consuming a database.

To ensure security and prevent unauthorized access, users must log in to obtain a token to add a match. The login system uses JWT authentication and verifies user credentials against a user database.

### Acquired Knowledge 📖

In this project, I was able to:
- Build and API using the Model-Service-Controller (MSC) architecture;
- Build a CRUD with TypeScript, using Sequelize ORM;
- Use OOP and SOLID concepts;
- Create and associate tables using Sequelize Models and Migrations;
- Use Docker to integrate front-end with back-end;
- Write integration tests;
- Write MySQL raw queries.

## Back-End Main Technologies 🧰
<table>
    <caption align="center"><h3>Development</h3></caption>
    <thead>
        <tr>
            <th>TypeScript</th>
            <th>Express</th>
            <th>Sequelize</th>
            <th>Node.JS</th>
            <th>MySQL</th>
            <th>JWT</th>
            <th>Joi</th>
            <th>Docker</th>
            <th>Insomnia</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td align="center">
                <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"> 
                    <img 
                        src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" 
                        alt="typescript" 
                        width="40" 
                        height="40"
                    />
                </a>
            </td>
            <td align="center">
                <a href="https://expressjs.com/" target="_blank">
                    <img
                        src="https://www.orafox.com/wp-content/uploads/2019/01/expressjs.png"
                        alt="express"
                        width="40"
                        height="40"
                    />
                </a>
            </td>
            <td align="center">
                <a href="https://sequelize.org/" target="_blank">
                    <img
                        src="https://sequelize.org/api/v6/image/brand_logo.png"
                        alt="sequelize"
                        width="40"
                        height="40"
                    />
                </a>
            </td>
            <td align="center">
                <a href="https://nodejs.org" target="_blank" rel="noreferrer"> 
                    <img 
                        src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" 
                        alt="nodejs" 
                        width="40" 
                        height="40"
                    /> 
                </a>
            </td>
            <td align="center">
                 <a href="https://www.mysql.com/" target="_blank" rel="noreferrer"> 
                     <img 
                         src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" 
                         alt="mysql" 
                         width="40" 
                         height="40"
                    /> 
                </a>
            </td>
            <td align="center">
                 <a href="https://www.npmjs.com/package/jsonwebtoken" target="_blank" rel="noreferrer"> 
                     <img 
                         src="https://jwt.io/img/pic_logo.svg" 
                         alt="jwt" 
                         width="40" 
                         height="40"
                    /> 
                </a>
            </td>
            <td align="center">
                <a href="https://joi.dev/" target="_blank" rel="noreferrer">
                    <img
                        src="https://avatars.githubusercontent.com/u/3774533?s=200&v=4"
                        alt="joi"
                        width="40"
                        height="40"
                    />
                </a>
            </td>
            <td align="center">
                <a href="https://www.docker.com/" target="_blank" rel="noreferrer"> 
                    <img 
                        src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg" 
                        alt="docker" 
                        width="40" 
                        height="40"
                    /> 
                </a>
            </td>
            <td align="center">
                <a href="https://insomnia.rest/" target="_blank" rel="noreferrer"> 
                    <img 
                        src="https://storage.googleapis.com/indie-hackers.appspot.com/product-avatars/insomnia/ibTLPyjwVebnZjMGKvz6ztarnuV2" 
                        alt="insomnia" 
                        width="40" 
                        height="40"
                    /> 
                </a>
            </td>
        </tr>
    </tbody>
</table>
<table>
    <caption align="center"><h3>Test</h3></caption>
    <thead>
        <tr>
            <th>Mocha</th>
            <th>Chai</th>
            <th>Sinon</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td align="center">
                <a href="https://mochajs.org/" target="_blank" rel"noreferrer">
                    <img
                        src="https://avatars.githubusercontent.com/u/8770005?s=200&v=4"
                        alt="mocha-js"
                        width="40"
                        height="40"
                    />
                </a>
            </td>
             <td align="center">
                <a href="https://www.chaijs.com/" target="_blank" rel="noreferrer"> 
                    <img src="https://raw.githubusercontent.com/gist/keithamus/3d8cfbaeddf8bdf5f7cd94a3bdae0934/raw/63ca295f3aa7e1b94b598d84dfe0330383497a8c/Chai%20Logo%20(C).svg"
                        alt="chai-js" 
                        width="40" 
                        height="40"
                    /> 
                </a>
            </td>
             <td align="center">
                <a href="https://sinonjs.org/" target="_blank" rel="noreferrer"> 
                    <img 
                        src="https://sinonjs.org/assets/images/logo.png" 
                        alt="sinon-js" 
                        width="40" 
                        height="40"
                    /> 
                </a>
            </td>
        </tr>
    </tbody>
</table>

## Running the application ⚙️
 > You must have node, docker, and docker-compose installed

1. Clone the repository and enter it
```
git clone git@github.com:ImVictorM/Trybe-Football-Club.git && cd Trybe-Football-Club
```
2. Get the containers running
```
npm run compose:up
```
It can take a while for the application to be up. <br>
The front end will be running on http://localhost:3000 (PORT 3000). <br>
The back end will be running on http://localhost:3001 (PORT 3001).

## Endpoints 🌐

Click here to export automatically:

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=TFC&uri=https%3A%2F%2Fraw.githubusercontent.com%2FImVictorM%2FTrybe-Football-Club%2FREADME-construction%2FinsomniaRoutes.json)

Or just import the file `insomniaRoutes.json` inside your environment: https://docs.insomnia.rest/insomnia/import-export-data
