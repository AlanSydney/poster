# poster


# How to setup
Download the code from git lab first `git clones`

Inside the project directory,
1. install packages and dependencies using `yarn install` command in terminal
2. add android sdk path to ./android/local.properties  `sdk.dir = C:\\Users\\Alan(you account)\\AppData\\Local\\Android\\Sdk`
3. run app using `yarn android` command
4. if app doesn't run, open new tab and run `yarn start`. And then run `yarn android` in other tab
5. run `yarn lint` to check the lint issues. if you want to fix issues, run `yarn lint --fix`

# How to test app in local
1. `npm install -g json-server` to install json-server
2. `json-server db.json` under server folder to run json server 
3. download ngrok and run command `ngrok http 3000`
4. copy and replace that https url into BASE_URL in the constant file
5. test app