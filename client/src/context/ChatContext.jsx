import { createContext, useContext, useReducer, useState } from "react";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const { currentuser } = useContext(AuthContext);

  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  //this function is used to change the intial state of the chats to advanced state if any(chats) 
  //it basically updates the user and the chatID
  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentuser.uid > action.payload.uid
              ? currentuser.uid + action.payload.uid
              : action.payload.uid + currentuser.uid,
        };

      default:
        return {
          state,
        };
    }
  };
  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
