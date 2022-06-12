import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { ContextMenuContext } from './context-menu-context';

interface ContextMenuProviderProps {
    children: JSX.Element | JSX.Element[]
}

type ContextMenuState = React.ReactElement | null

export const ContextMenuProvider = ({ children }: ContextMenuProviderProps) => {

    const [currentContextMenu, setContextMenu] = useState<ContextMenuState>(null);

    const ContextMenuPortal = () => {
        const portal = document.getElementById('portal');
        if (portal) return ReactDOM.createPortal(currentContextMenu, portal)
        return null
    }

    const closeContextMenu = () => setContextMenu(null)
    const handleContextMenu = (e: MouseEvent) => !e.defaultPrevented && closeContextMenu()

    useEffect(() => {
        window.addEventListener('resize', closeContextMenu);
        window.addEventListener('click', closeContextMenu);
        window.addEventListener('scroll', closeContextMenu);
        window.addEventListener('blur', closeContextMenu);

        window.addEventListener('contextmenu', handleContextMenu);

        return () => {
            window.removeEventListener('resize', closeContextMenu);
            window.removeEventListener('click', closeContextMenu);
            window.removeEventListener('scroll', closeContextMenu);
            window.removeEventListener('blur', closeContextMenu);
            
            window.removeEventListener('contextmenu', handleContextMenu);
        }
    });

    return (
        <ContextMenuContext.Provider value={{
            showContextMenu: (menu) => setContextMenu(menu)
        }}>
            {children}
            <ContextMenuPortal />
        </ContextMenuContext.Provider>
    )
}

