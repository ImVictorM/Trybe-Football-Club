# Trybe Football Club (TFC) ⚽

## Project Context 💡
This project is an informative website about football matches and classifications. [@Trybe](https://github.com/trybe-tech-ops) developed the front end for this project using React.

As the back-end developer, I  built an API using Typescript, Node.js, express, and Sequelize and integrated it with the front end using Docker and docker-compose. The API allows users to add new matches and update existing ones by consuming a database.

To ensure security and prevent unauthorized access, users must log in to obtain a token to add a match. The login system uses JWT authentication and verifies user credentials against a user database.

### Acquired Knowledge 📖

In this project, I was able to:
- Build and API using the Model-Service-Controller (MSC) architecture;
- Build a CRUD with TypeScript, using Sequelize ORM;
- Use POO and SOLID concepts;
- Create and associate tables using Sequelize Models and Migrations;
- Use Docker to integrate front-end with back-end;
- Write integration tests;
- Write MySQL raw queries.

## Main Technologies used 🧰
<table>
    <thead>
        <tr>
            <th>JavaScript</th>
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
                <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> 
                    <img 
                        src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" 
                        alt="javascript" 
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

## Running the application ⚙️

1. Clone the repository and enter it
```
git clone git@github.com:ImVictorM/Blog-API.git && cd Blog-API
```
### Methods

<details>
<summary><h4>🐋 Running with docker (recommended)</h4></summary>

 > You must have docker installed
 
2. Get the containers running
```
docker-compose up -d
```
3. Enter the server's container
```
docker exec -it blogs_api bash
```
4. Install the dependencies
```
npm install
```

5. Start the server
```
npm run start
---- or ----
npm run prestart
npm run debug
```
</details>

<details>
<summary><h4>🖥️ Running locally</h4></summary>

 > You must have node and MySQL installed
 
2. Install the dependencies
```
npm install
```

3. Rename the file `.env.example` to `.env`

4. Start the server
```
npm run start
---- or ----
npm run prestart
npm run debug
```

</details>

## Endpoints 🌐

Click here to export automatically:

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Blog%20API&uri=https%3A%2F%2Fraw.githubusercontent.com%2FImVictorM%2FBlog-API%2Fmain%2FinsomniaEndpoints.json)

Or just import the file `insomniaEndpoints.json` inside your environment: https://docs.insomnia.rest/insomnia/import-export-data
