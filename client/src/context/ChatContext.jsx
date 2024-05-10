import { createContext, useContext } from "react";

export const ChatContext = createContext({});

export const useChatContext = () => {
	return useContext(ChatContext);
};

export default function ChatContextProvider({ children }) {
	const chatContextValue = {};
	return (
		<ChatContext.Provider value={chatContextValue}>
			{children}
		</ChatContext.Provider>
	);
}
