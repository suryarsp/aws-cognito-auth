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
    const data = await Auth.currentUserInfo();
    console.info(data);

    //! Generate the bearer token that can be used to valid API request
    const token = (await Auth.currentSession()).getIdToken().getJwtToken();
    console.info(token);

    //! Check if the current user session is valid
    const validSession = (await Auth.currentSession()).isValid();
    console.info(validSession);

    //! Provide the user pool summary , client , signedInUser Session, username and other details
    const cred = await Auth.currentUserPoolUser();
    console.info(cred);
  };

  useEffect(() => {
    testLogger();
    console.log(process.env);
  }, []);

  const Header = () => (
    <header className="flex py-2 justify-center items-center bg-white">
      <img src="/assets/coding.png" className="object-cover w-10 h-10" />
      <h5 className="px-2 text-2xl font-medium">Coding Habits Pro</h5>
      <img src="/assets/coding.png" className="object-cover w-10 h-10" />
    </header>
  );

  const PageHeader = () => (
    <header className="flex py-2 justify-center items-center">
      <img src="/assets/coding.png" className="object-cover w-10 h-10" />
      <h5 className="px-2 text-2xl font-medium">Coding Habits Pro</h5>
      <img src="/assets/coding.png" className="object-cover w-10 h-10" />
    </header>
  );

  return (
    <>
      <Authenticator
        hideSignUp
        variation="modal"
        components={{ Header }}
        initialState="signIn"
      >
        {({ signOut, user }) => (
          <div className="w-screen h-screen ">
            <nav className="bg-teal-500 flex justify-between items-center text-white rounded-sm p-5">
              <PageHeader />
              <div className="flex items-center gap-4">
                <p className="px-1 text-2xl">Welcome {user?.username}</p>
                <button
                  className="bg-orange-500 p-2 rounded-sm font-bold"
                  onClick={signOut}
                >
                  Sign Out
                </button>
              </div>
            </nav>
          </div>
        )}
      </Authenticator>
    </>
  );
}

export default App;
