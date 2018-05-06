# react-redux-user-management_CodeSpace
React-Redux application to manage, add, and delete users

# Whats in the Repo?
- There are two versions of the project:
  - usr-mgmt-axios
    - Uses Stephen Grider's API
    - I wrote this project when learning react-redux: https://www.udemy.com/react-redux/learn/v4/overview
    - Refactored it for this exercise
  - uusr-mgmt-ls
    - Uses local storage to store data
    - Refactored from axios version
    - Uses middleware to shape data

# What was refactored?
- I changed the way the form is rendered
- Ability to update the user
- Clear values button
- Testing: Mocha, Chai Unit testing
- ES6 syntax
- Local Storage
- Middleware
- Styling, alerts
    
# Setup:
  - You mush download and install Node.js: https://nodejs.org/en/download/
  - Clone the repo
  - run install_run_project.bat
  
# Custom Scripts:
  - You will find a folder named custom scripts
    - In here you will see .bat files to run
      - install_run_project.bat: installs the project, launches default browser (navigates to localhost:8080), and runs project
      - launch_browser.bat: will launch the default browser and naviagate to localhost:8080
      - run_project.bat: runs launch_browser.bat, runs the project
      - runTests.bat: runs the unit tests for the project
