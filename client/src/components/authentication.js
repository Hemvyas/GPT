import useUserStore from "../store";
import axios from "axios";
import { useEffect, useState } from "react";

function AppInitializationComponent() {
  const setUser = useUserStore((state) => state.setUser);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const validateTokenAndFetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/auth/validate",
          {
            withCredentials: true,
          }
        );
        const userInfo = response.data;
        setUser(userInfo);
      } catch (error) {
        console.error(
          "Token validation failed or user is not logged in.",
          error
        );
        setUser(null);
      } finally {
        setIsLoading(false); // Ensure loading is set to false after the process
      }
    };

    validateTokenAndFetchUser();
  }, [setUser]);

  if (isLoading) {
    return <div>Loading...</div>; // Splash screen or loader
  }
  return null;
}

export default  AppInitializationComponent;
