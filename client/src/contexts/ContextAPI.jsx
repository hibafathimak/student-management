import { createContext, useState } from "react";

export const addStudentResponseContext = createContext();
export const editStudentResponseContext = createContext();

const ContextApi = ({ children }) => {
  const [addStudentResponse, setAddStudentResponse] = useState("");
  const [editStudentResponse, setEditStudentResponse] = useState("");
  return (
    <addStudentResponseContext.Provider
      value={{ addStudentResponse, setAddStudentResponse }}
    >
     <editStudentResponseContext.Provider value={{editStudentResponse, setEditStudentResponse}}> {children}</editStudentResponseContext.Provider>
    </addStudentResponseContext.Provider>
  );
};

export default ContextApi;
