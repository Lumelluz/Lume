// Em src/AppRoutes.js

import { Route, Routes } from "react-router-dom";

// IMPORTANTE: Verifique se todos os caminhos de import abaixo
// correspondem à sua estrutura de pastas.
import PageBase from "./pages/PageBase";
import Home from "./pages/Home";
import TelaLogin from "./pages/TelaLogin";
import TelaCadastro from "./pages/TelaCadastro";
import SobreNos from "./pages/SobreNos";
import CadastrarEmpresa from "./pages/CadastrarEmpresa"
import FaleConosco from "./pages/FaleConosco";
import PerguntasFrequentes from "./pages/PerguntasFrequentes";
import Produtos from "./pages/Produtos";
import ProdutoEspecifico from "./pages/ProdutoEspecifico";
import Parcerias from "./pages/Parcerias";
import MissaoBeneficios from "./pages/MissaoBeneficios";
import PoliticaPrivacidade from "./pages/PoliticaPrivacidade";
import AdminDashboard from "./pages/AdminDashboard";
import CadastrarProdutos from "./pages/CadastrarProdutos";

function AppRoutes() {
    // Note que a tag <BrowserRouter> foi REMOVIDA daqui.
    return (
        <Routes>
            {/* Todas as rotas filhas usarão o layout do PageBase (Header e Footer) */}
            <Route path="/" element={<PageBase />}>
                
                {/* A rota "index" é a página padrão para a rota pai "/" */}
                <Route index element={<Home />} />
                
                <Route path="login" element={<TelaLogin />} />
                <Route path="cadastro" element={<TelaCadastro />} />
                <Route path="sobre-nos" element={<SobreNos />} />
                <Route path="cadastrar-empresa" element={<CadastrarEmpresa />} />
                <Route path="fale-conosco" element={<FaleConosco />} />
                <Route path="perguntas-frequentes" element={<PerguntasFrequentes />} />
                <Route path="produtos" element={<Produtos />} />
                <Route path='produto-especifico/:productId' element={<ProdutoEspecifico />} />
                <Route path="parcerias" element={<Parcerias />} />
                <Route path="missoes-beneficios" element={<MissaoBeneficios />} />
                <Route path="politicas-privacidade" element={<PoliticaPrivacidade />} />
                <Route path="admin-dashboard" element={<AdminDashboard />} />
                <Route path="cadastrar-produto" element={<CadastrarProdutos />} />

            </Route>
        </Routes>
    )
}

export default AppRoutes;