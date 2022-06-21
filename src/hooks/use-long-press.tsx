import React, { useCallback, useMemo, useRef, useState } from "react";

type UseLongPressProps = {
    onClick?: () => void
    onLongPress?: () => void
    delay?: number
    preventDefault?: boolean
}

type UseLongPressEvent = React.MouseEvent | React.TouchEvent

export function useLongPress({
    onClick,
    onLongPress,
    delay = 300,
    preventDefault = true
}: UseLongPressProps) {

    const [longPressTriggered, setLongPressTriggered] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | undefined>();

    const callback = useCallback(() => {
        setLongPressTriggered(true)
        if (onLongPress) onLongPress();
    }, [onLongPress]);

    const start = useCallback(() => {
        setLongPressTriggered(false)
        timerRef.current = setTimeout(callback, delay);
    }, [callback, delay]);

    const stop = useCallback((
        event: UseLongPressEvent,
        triggerClick = true
    ) => {
        if (preventDefault) event.preventDefault();

        if (timerRef.current) {
            clearTimeout(timerRef.current);
            if (triggerClick && !longPressTriggered && onClick) onClick();
        }
    }, [preventDefault, onClick, longPressTriggered]);

    return useMemo(
        () => ({
            onMouseDown: start,
            onMouseUp: stop,
            onMouseLeave: (e: React.MouseEvent) => stop(e, false),
            onTouchStart: start,
            onTouchEnd: stop,
        }),
        [start, stop]
    );
}