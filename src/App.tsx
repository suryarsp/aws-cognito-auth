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

    //! Provide the user pool summary , client , signedInUser Session, username and other details
    const cred = await Auth.currentUserPoolUser();
    console.info(cred)
  }

  useEffect(() => {
    testLogger();
  }, []);

  return (
    <>
      <Authenticator hideSignUp variation="modal" initialState="signIn">
        {({ signOut, user }) => (
          <div>
            <p>Welcome {user?.username}</p>
            <button onClick={signOut}>Sign out</button>
          </div>
        )}
      </Authenticator>
    </>
  );
}

export default App;
