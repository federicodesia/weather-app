import { createContext } from "react";

export type ContextMenuContextProps = {
    showContextMenu: (menu: React.ReactElement) => void
}

export const ContextMenuContext = createContext({} as ContextMenuContextProps);