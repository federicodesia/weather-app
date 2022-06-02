import styles from './search-bar.module.css';

import { ChangeEvent, useEffect, useRef, useState } from 'react';
import useDebounce from '../../hooks/useDebounce';
import { clamp } from '../../utils/utils';
import useOnClickOutside from '../../hooks/useOnClickOutside';

type Suggestion = {
    item: any
    value: string
}

type SearchBarProps = {
    placeholder: string
    prefix?: React.ReactNode
    onChange: (value: string) => Promise<Suggestion[]>
    onSelected: (item: any) => void
}

function SearchBar({ placeholder, prefix, onChange, onSelected }: SearchBarProps) {

    const [value, setValue] = useState<string>('')
    const debouncedValue = useDebounce<string>(value, 500)
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value)

    const [suggestions, setSuggestions] = useState<Suggestion[]>([])
    const [isExpanded, setExpanded] = useState<boolean>(false)

    const containerRef = useRef(null);
    const handleClickOutside = () => setExpanded(false);
    const handleClickInside = () => value && !isExpanded && setExpanded(true);
    useOnClickOutside(containerRef, handleClickOutside)

    const handleSuggestionClick = (item?: any) => {
        setExpanded(false);
        if (item) {
            setValue('');
            onSelected(item);
        }
    }

    useEffect(() => {
        if (debouncedValue) {
            const callback = async () => {
                setSuggestions(await onChange(debouncedValue));
                setExpanded(true);
            }
            callback().catch(console.error);
        }
        else {
            setSuggestions([]);
            setExpanded(false);
        }
    }, [debouncedValue])

    const getSuggestionsContainerStyle = () => {
        if (!isExpanded) return {};
        const lenght = clamp(suggestions.length, 1)
        return {
            height: `calc(${lenght} * var(--suggestion-height))`,
            paddingBottom: 16
        }
    }

    return (
        <div
            className={styles.container}
            ref={containerRef}
            onClick={handleClickInside}>
            <div className={`${styles.content} ${isExpanded && styles.expandedContent}`}>
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
                        isExpanded && suggestions.length === 0
                            ? <li onClick={() => handleSuggestionClick(null)}>
                                No results found
                            </li>

                            : suggestions.map((suggestion, index) => {
                                return <li
                                    key={`${suggestion.value} ${index}`}
                                    onClick={() => handleSuggestionClick(suggestion.item)}>
                                    {suggestion.value}
                                </li>
                            })
                    }
                </ul>
            </div>
        </div>
    )
}

export default SearchBar;