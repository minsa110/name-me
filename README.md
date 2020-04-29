# Naming Contests! :pencil2:

An application that hosts multiple naming contests--click on a contest and sugest a name! :thumbsup:

:pushpin: **Description & implemented technologies:**  

A fullstack JS project using `React.js` (client-side dev), `Node.js` with `Express.js` framework (server-side dev), and `MongoDB` (database). The application translates modular code for browsers with the `Webpack` bundler, and configures with `Babel` to transform JSX (a React syntax that produces React elements) to vanilla JavaScript. This application uses `EJS`, a dynamic template language, to render JavaScript front-end components, uses `Saas` with Node to style, the `Axios` library to handle Ajax requests, and the native browser's `History API` for navigation.

<br>

----

:bulb: **Future implementation ideas:**
- [ ] Containerize the app--separate front-end and server-side (e.g. Docker)
- [ ] Host the containers in cloud (e.g. Azure)
- [ ] Use React router for routing / navigation
- [ ] Update contents on different machines simultaneously
- [ ] Ability to add new contest
- [ ] Ability to submit new contest name with submitter's name
- [ ] Ability to vote on names and sort by highest votes
- [X] Handle empty name submission
- [ ] Move to 'next page' after certain number of suggested names

:spiral_notepad: **Notes:**  
_This app is currently not hosted. To run, clone to your machine then:_  
1. In terminal: `npm run dev`
2. In another terminal: `npm start`
3. Make sure MongoDB is working (`mongod`)
4. App is hosted in: http://localhost:8080/
