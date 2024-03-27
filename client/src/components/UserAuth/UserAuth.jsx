import { useContext } from "react";
import { UserContext } from "/Users/isaiahaguilera/Development/code/phase-5/Fore-Score-2/client/src/components/UserContext/UserContext.jsx";

const useAuth = () => {
  const { user, setUser } = useContext(UserContext);

  

  return { user, setUser };
};

export default useAuth;
