import styles from './BotoesNavegacao.module.css'
import menuHamburguerBranco from '../../../assets/icons/menuHamburguerBranco.svg'
import { useState, useEffect } from 'react';

function BotoesNavegacao() {
    const [showMenu, setShowMenu] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY

            if (currentScrollY > lastScrollY) {
                setShowMenu(true)
            } else {
                setShowMenu(false)
            }

            setLastScrollY(currentScrollY)
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY])

    return (
        <section className={`${styles.container} ${showMenu ? styles.show : styles.hide}`}>
            <img src={menuHamburguerBranco} alt="" />
            <img src={menuHamburguerBranco} alt="" />
            <img src={menuHamburguerBranco} alt="" />
            <img src={menuHamburguerBranco} alt="" />
        </section>
    )
}

export default BotoesNavegacao