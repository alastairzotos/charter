import { Typography } from '@mui/material';
import Link from 'next/link';
import { useUserState } from "../src/state/user";
import { urls } from '../src/urls';

export default function Web() {
  const user = useUserState(s => s.loggedInUser);

  return (
    <div>
      <h1>Test</h1>
      {!!user && <p>Welcome {user.givenName}</p>}
      {!user && <p>Welcome user</p>}
      
      <Typography><Link href={urls.user.operators()}>Operators</Link></Typography>
      <Typography><Link href={urls.admin.home()}>Admin</Link></Typography>
      <Typography><Link href={urls.operators.home()}>Operator Admin</Link></Typography>
    </div>
  );
}
