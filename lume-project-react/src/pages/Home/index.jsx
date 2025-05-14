import styles from './Home.module.css';
import SobreNos from '../../components/SobreNos';
import CategoriasProdutos from '../../components/CategoriasProdutos';
import ComeceAComprar from '../../components/ComeceAComprar';
import Container from '../../components/Container';

function Home() {
    return (
        <>
        <Container>
            <SobreNos />
        </Container>

        <Container>
            <CategoriasProdutos />
        </Container>
        
        <Container>
            <ComeceAComprar/>
        </Container>
        </>
    )
}

export default Home;