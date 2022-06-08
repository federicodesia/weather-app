import styles from './search-bar.module.css';

import { ChangeEvent, useEffect, useState } from 'react';
import { Suggestion } from '../../interfaces/suggestion';
import useDebounce from '../../hooks/use-debounce';
import clamp from '../../utils/clamp';
import useRoveFocus from '../../hooks/use-rove-focus';

type SearchBarProps = {
    placeholder: string
    prefix?: React.ReactNode
    suggestions?: Suggestion[]
    onSearch: (value: string) => void
    onSelected: (item: any) => void
}

function SearchBar({ placeholder, prefix, suggestions, onSearch, onSelected }: SearchBarProps) {

    const [value, setValue] = useState('')
    const debouncedValue = useDebounce(value, 500)
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value)

    useEffect(() => {
        onSearch(debouncedValue)
    }, [debouncedValue])

    const onSuggestionSelected = (suggestion: Suggestion) => {
        setValue('');
        onSelected(suggestion.item);
    }

    const { currentFocus, setCurrentFocus } = useRoveFocus({
        length: suggestions?.length ?? 0,
        onSelected: (index: number) => {
            const suggestion = suggestions?.at(index)
            if (suggestion) onSuggestionSelected(suggestion)
        }
    });

    const [isFocused, setFocused] = useState(false)
    const onFocus = () => setFocused(true)
    const onBlur = () => setFocused(false)

    useEffect(() => {
        setCurrentFocus(undefined)
    }, [isFocused, suggestions])

    const getSuggestionsContainerStyle = () => {
        if (!isFocused || suggestions === undefined) return {}

        const length = clamp(suggestions.length, 1)
        return {
            height: `calc(${length} * var(--suggestion-height))`,
            paddingBottom: 16
        }
    }

    return (
        <div
            className={styles.container}
            onFocus={onFocus}
            onBlur={onBlur}>
            <div className={`${styles.content} ${suggestions !== undefined && isFocused && styles.expandedContent}`}>
                <div className={styles.inputContainer}>
                    {
                        prefix && <div className={styles.prefix}> {prefix} </div>
                    }

                    <input
                        type='text'
                        placeholder={placeholder}
                        value={value}
                        onChange={handleChange}
                        spellCheck={false} />
                </div>

                <ul
                    className={styles.suggestionsContainer}
                    style={getSuggestionsContainerStyle()}>
                    {
                        suggestions !== undefined && (suggestions.length === 0
                            ? <li>No results found</li>
                            : suggestions.map((suggestion, index) => {
                                return <li
                                    className={`${currentFocus === index && styles.focused}`}
                                    key={`${suggestion.value} ${index}`}
                                    onClick={() => onSuggestionSelected(suggestion)}>
                                    {suggestion.value}
                                </li>
                            }))
                    }
                </ul>
            </div>
        </div>
    )
}

export default SearchBar;