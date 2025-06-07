import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageBase from "./pages/PageBase";
import Home from "./pages/Home";
import TelaLogin from "./pages/TelaLogin";
// import CheckOutPagamento from "./pages/CheckOutPagamento";
import SobreNos from "./pages/SobreNos";
import CadastrarEmpresa from "./pages/CadastrarEmpresa"
import FaleConosco from "./pages/FaleConosco";
import PerguntasFrequentes from "./pages/PerguntasFrequentes";
import Produtos from "./pages/Produtos";
import ProdutoEspecifico from "./pages/ProdutoEspecifico";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PageBase />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<TelaLogin />} />
                    <Route path="/sobre-nos" element={<SobreNos />} />
                    <Route path="/cadastrar-empresa" element={<CadastrarEmpresa />} />
                    {/* <Route path="/checkout-pagamento" element={<CheckOutPagamento />} /> */}
                    <Route path="/fale-conosco" element={<FaleConosco />} />
                    <Route path="/perguntas-frequentes" element={<PerguntasFrequentes />} />
                    <Route path="/produtos" element={<Produtos />} />
                    <Route path="/produto-especifico" element={<ProdutoEspecifico />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;