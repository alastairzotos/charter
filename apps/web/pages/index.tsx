import { useUserState } from "../src/state/user";

export default function Web() {
  const user = useUserState(s => s.loggedInUser);

  return (
    <div>
      <h1>Test</h1>
      {!!user && <p>Welcome {user.givenName}</p>}
      {!user && <p>Welcome user</p>}
      
    </div>
  );
}
