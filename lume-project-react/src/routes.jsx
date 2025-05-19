import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageBase from "./pages/PageBase";
import Home from "./pages/Home";
import TelaLogin from "./pages/TelaLogin";
import LoginSenha from "./pages/LoginSenha";
import CheckOutPagamento from "./pages/CheckOutPagamento";
import SobreNos from "./pages/SobreNos";
import CadastrarEmpresa from "./pages/CadastrarEmpresa"

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PageBase />}>
                    <Route path="/" element={<Home />} />                   
                    <Route path="/login" element={<TelaLogin />} />
                    <Route path="/loginPassword" element ={<LoginSenha />} />
                    <Route path="/sobreNos" element={<SobreNos />} />
                    <Route path="/cadastrarEmpresa" element={<CadastrarEmpresa />} />
                    <Route path="/checkoutPagamento" element={<CheckOutPagamento />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;