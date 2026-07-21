# CalorieTrack
**A Fitness Calculator React Application** 
A React application that calculates BMI, BMR, and TDEE based on user input. Inputs are validated in real time and on form submission. 
Term and definition modal windows provide information about the values calculated. 

**Live Site**:

# Folder List
- public
- src: parent folder for components, stylesheets, and assets
    - components: parent folder for individual components
        - Header.jsx
        - Inputs.jsx
        - Results.jsx
        - SelectMenu.jsx
        - SubmitButton.jsx
    - styles: houses all style sheets 
        - App.css
    - tests: parent folder for validation and calculation tests 
        - calculations.test.js
        - validation.test.js
    - utilities: parent folder for utility functions, such as calculations and validations 
        - calculations.js
        - validation.js
- App.jsx
- main.jsx
- .gitignore
- babel.config.cjs
- eslint.config.js
- index.html
- package-lock.json
- package.json
- README.md
vite.config.js

# Features
- Real-time input validation 
- State-management across components via prop passing 
- Term definition and result modal pop up windows 

# How To Run
- To view the production build locally:
    - npm run build
    - npm run preview
    - Open a browser and navigate to the URL shown in the terminal (typically http://localhost:5173/)

- To launch via VS Code:
    - Open the root folder in VS Code (or preferred code editor)
        - CalorieTrack
    - Open a terminal window (CTRL + `)
    - To install the necessary dependencies: npm install
    - To start the application: npm run dev
    - Open a browser of your choice and navigate to:
        - http://localhost:5173/

# When Running
Once a browser window is opened with the above URL, the Fitness & Expenditure Calculator will appear

This page features:
Real-time input validation 
Dynamic content and modal rendering based on component states
Clean, graceful error handling 

# What I Learned / Built From Scratch

This project was built as a deliberate, hands-on exercise in fundamental React state management — implemented manually, withour form libraries, 
to build a working understanding of the patterns those libraries abstract away. 

**Controlled vs uncontrolled components**: Migrating the original vanilla JS version,
which read input values directly from the DOM on submit, required rethinking every
input as a controlled component: state drives what's displayed, and every keystroke
flows through an `onChange` handler back into state, rather than the DOM holding its
own independent copy of the value.

**Lifting state up, and its tradeoffs**: All form state — field values, validity flags,
touched flags, and results — lives in a single owning component (`App`) and flows
down to presentational child components via props. This keeps one source of truth
and makes the final submit-time validation straightforward, at the cost of a fairly
large prop list on each child. That tradeoff was made deliberately, at this project's
scale, understanding it won't hold up as the app grows — which is exactly why a
React Hook Form refactor is the planned next step.

**Two-layer validation strategy**: Each field validates live, on every keystroke,
for immediate feedback — but a second, independent validation pass runs again at
submit time, re-checking every field's current value rather than trusting
previously-cached results. This closes a real gap: a field the user never
interacted with keeps a default "valid" flag that was never actually verified
against its (possibly empty) value, so submission can't rely on live-validation
state alone.

**Separating pure logic from UI**: All validation and calculation functions live in
standalone utility modules with no dependency on React or the DOM — each one takes
a value in and returns a value out. This wasn't just an organizational choice: it's
what made the functions independently unit-testable with Jest, and it's the same
reason the same validators can run identically in both the live-typing check and
the submit-time re-check without duplicating logic.

**Using `useEffect` for genuine state synchronization**: The results modal needed to
reopen automatically on every new calculation, even after being manually closed —
solved by watching the `results` object as a `useEffect` dependency and resetting
the modal's local `isOpen` state whenever a new results object arrives. This was a
useful concrete case for understanding what `useEffect` is actually for: reacting
to an external value changing by re-synchronizing a separate piece of state, rather
than reaching for it as a general-purpose "run some code" hook.

# Tools Used
React + Vite
Jest
npm
JavaScript 
Vercel (deployment)
VS Code + GitHub