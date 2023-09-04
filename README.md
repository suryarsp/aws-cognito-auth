## AWS Cognito Authentication with Amplify and React

### Prerequisites

- Node.js >= 16
- npm or yarn

### Usage

To use this project, you will need to create an AWS Cognito user pool and add the following environment variables to your `.env` file:

```
AWS_COGNITO_USER_POOL_ID=<your user pool id>
AWS_APP_COGNITO_CLIENT_ID=<your client id>
```

You can find your user pool ID and client ID in the AWS Cognito console.

Once you have added the environment variables, you can start the development server and sign in to your application.

Follow this link for more detailed information, [user-pool-settings-client-app](https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-client-apps.html)

### Step 1: Create a new Vite project

```bash
npm create vite@latest aws-cognito-auth -- --template react && cd aws-cognito-auth
```

### Step 2: Install dependencies

```bash
npm install @aws-amplify/ui-react aws-amplify --save
```

### Step 3: Configure AWS Amplify

Create a file named `aws-exports.ts` and add the following code:

```javascript
export default {
  REGION: "XXXXXX",
  USER_POOL_ID: "XXXXXXX",
  USER_POOL_APP_CLIENT_ID: "XXXXXXXX",
};
```

### Step 4: Create the React component

Update `App.tsx` and add the following code:

```javascript
import { Amplify } from "@aws-amplify/core";
import awsExports from "../aws-exports";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useEffect } from "react";
import { Auth } from "aws-amplify";

Amplify.configure({
  Auth: {
    region: awsExports.REGION,
    userPoolId: awsExports.USER_POOL_ID,
    userPoolWebClientId: awsExports.USER_POOL_APP_CLIENT_ID,
  },
});

function App() {

  const testLogger = async () => {

    //! Get the user's information
    const data =  (await Auth.currentUserInfo());
    console.info(data)


    //! Generate the bearer token that can be used to valid API request
    const token = (await (Auth.currentSession())).getIdToken().getJwtToken();
    console.info(token);

    //! Check if the current user session is valid
    const validSession = (await (Auth.currentSession())).isValid()
    console.info(validSession);

  }
```

### Development

1. Start the development server:

```
npm run dev

```

2. Open http://localhost:3000 in your browser.

### Build

To build the application for production, run:

```

npm run build

```

The production build will be output to the `dist` directory.


### Conclusion

This project demonstrates how to use AWS Cognito for user authentication in a React application built with Vite. This project can be used as a starting point for building your own AWS Cognito-based authentication system.


