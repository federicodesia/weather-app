import { ReactNode } from 'react';
import styles from './context-menu.module.css';

type ContextMenuItem = {
    isDisabled?: boolean
    icon: ReactNode
    text: string
    onClick: () => void
}

type ContextMenuMenuProps = {
    event: React.MouseEvent
    items: ContextMenuItem[]
};

function ContextMenu({ event, items }: ContextMenuMenuProps) {

    const getContainerStyle = (): React.CSSProperties => {
        return {
            top: event.pageY,
            left: event.pageX
        }
    }

    return (
        <div
            className={styles.container}
            style={getContainerStyle()}>
            <ul>
                {
                    items.map((item, index) => {
                        return <li
                            key={`${item.text} ${index}`}
                            onClick={item.isDisabled ? undefined : item.onClick}
                            className={`${item.isDisabled ? styles.disabled : styles.enabled}`} >

                            <div className={styles.icon}>{item.icon}</div>
                            <span>{item.text}</span>
                        </li>
                    })
                }
            </ul>
        </div>
    )
}

export default ContextMenu;