import styles from './input.module.css';

type InputProps = {
    placeholder: string
    prefix?: React.ReactNode
};

function Input({ placeholder, prefix }: InputProps) {

    return (
        <div className={styles.container}>
            {
                prefix
                    ? <div className={styles.prefix}> {prefix} </div>
                    : null
            }

            <input type="text" placeholder={placeholder} />
        </div>
    );
}

export default Input;