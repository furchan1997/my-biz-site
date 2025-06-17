import { createContext, useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { jobOfferService } from "../server/jobOffers";

export const AdminContext = createContext();
AdminContext.displayName = "Admin";

export function AdminProvider({ children }) {
  const navigate = useNavigate();

  const [offers, setOffers] = useState([]);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const signIn = async () => {
    setError(null);
    try {
      const response = await jobOfferService.signIn(password);
      if (response.status === 200) {
        setError(false);
      }
    } catch (err) {
      setError(true);
    }
  };

  const getJobOffers = async () => {
    setError(null);
    try {
      const response = await jobOfferService.getJobOffer();
      setOffers(response?.data?.data);
    } catch (err) {
      setError(err?.response || err?.response?.data);
      if (err?.response?.status === 401) {
        navigate("/admin/sign-in");
        setOffers([]);
      }
    }
  };

  const delateOffer = async (ID) => {
    setError(null);
    try {
      const response = await jobOfferService.deleteOffer(ID);
      return response.data;
    } catch (err) {
      setError(err?.response || err?.response?.data);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        signIn,
        setPassword,
        password,
        error,
        logout: jobOfferService.logout,
        getJobOffers,
        offers,
        delateOffer,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}
