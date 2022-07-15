import React, { useState, createContext, useContext } from "react";

interface IDonationPersonaData {
  name: string;
  email: string;
  cellphone: string;
  birthdate: string;
  cpf: string;
}

interface IAddress {
  zipcode: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
}

export type RegisterContextType = {
  donationPersonalData: IDonationPersonaData;
  address: IAddress;
  setDonationPersonalData: React.Dispatch<
    React.SetStateAction<IDonationPersonaData>
  >;
  setAddress: React.Dispatch<React.SetStateAction<IAddress>>;
  resetState: () => void;
};

const RegisterContext = createContext<RegisterContextType>(
  {} as RegisterContextType
);

const RegisterProvider = ({ children }: { children: React.ReactNode }) => {
  const [donationPersonalData, setDonationPersonalData] = useState(
    {} as IDonationPersonaData
  );

  const [address, setAddress] = useState({} as IAddress);

  const resetState = () => {
    setDonationPersonalData({} as IDonationPersonaData);
    setAddress({} as IAddress);
  }

  const value = {
    donationPersonalData,
    address,
    setDonationPersonalData,
    setAddress,
    resetState
  };

  return (
    <RegisterContext.Provider value={value}>
      {children}
    </RegisterContext.Provider>
  );
};

const useRegister = () => {
  const context = useContext(RegisterContext);

  if (!context)
    throw new Error("useRegister must be used within a RegisterProvider");

  return context;
};

export { RegisterProvider, useRegister };
