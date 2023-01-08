export interface TypeDarkMode {
  IsdarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
  toggleIsDarkMode: () => void;
}
export interface contextDarkModeType {
  IsdarkMode: boolean;
  toggleIsDarkMode: () => void;
}

export interface TypeNavbar {
  id: number;
  item: string;
  href: string;
  icon: string;
}

export interface ChatLogType {
  user: string;
  message: string;
}

export interface TypeChatProps {
  chatLog: { user: string; message: string }[];
  setChatLog: React.Dispatch<
    React.SetStateAction<{ user: string; message: string }[]>
  >;
  lastMessage: number;
  setLastMessage: React.Dispatch<React.SetStateAction<number>>;
}

export interface TypeSideBarProps {
  clearChat: () => void;
}
