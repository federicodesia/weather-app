import { useCallback, useState, useEffect } from "react";

type UseRoveFocusProps = {
  length: number
  onSelected: (index: number) => void
}

function useRoveFocus({ length, onSelected }: UseRoveFocusProps) {
  const [currentFocus, setCurrentFocus] = useState<number | undefined>(undefined);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault();
        const focus = currentFocus ?? length - 1
        setCurrentFocus(focus === length - 1 ? 0 : focus + 1);
        break
      }

      case 'ArrowUp': {
        e.preventDefault();
        const focus = currentFocus ?? 0
        setCurrentFocus(focus === 0 ? length - 1 : focus - 1);
        break
      }

      case 'Enter': {
        e.preventDefault();
        if (currentFocus !== undefined) onSelected(currentFocus);
        break
      }
    }
  }, [length, currentFocus, setCurrentFocus]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown, false);
    return () => document.removeEventListener('keydown', handleKeyDown, false)
  }, [handleKeyDown]);

  return { currentFocus, setCurrentFocus };
}

export default useRoveFocus;