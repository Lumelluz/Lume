import styles from './Container.module.css';

function Container({ children }) {
    return (
    <section>
        { children }
    </section>
    )
}

export default Container;