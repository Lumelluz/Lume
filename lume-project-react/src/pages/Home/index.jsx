import styles from './Home.module.css';
import SobreNos from '../../components/SobreNos';
import CategoriasProdutos from '../../components/CategoriasProdutos';
import ComeceAComprar from '../../components/ComeceAComprar';

function Home() {
    return (
        <> 
            <SobreNos />
            <CategoriasProdutos />
            <ComeceAComprar/>
        </>
    )
}

export default Home;