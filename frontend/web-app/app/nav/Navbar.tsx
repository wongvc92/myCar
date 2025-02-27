import LoginButton from "./LoginButton";
import { getCurrentUser } from "../actions/authActions";
import UserActions from "./UserActions";
import Logo from "./Logo";

const Navbar = async () => {
  const user = await getCurrentUser();
  return (
    <header className="sticky top-0 z-50 flex justify-between items-center p-4 shadow-md bg-white">
      <Logo />
      <div>Search</div>
      {user ? <UserActions user={user} /> : <LoginButton />}
    </header>
  );
};

export default Navbar;
