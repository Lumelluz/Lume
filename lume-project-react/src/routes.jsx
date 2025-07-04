import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageBase from "./pages/PageBase";
import Home from "./pages/Home";
import TelaLogin from "./pages/TelaLogin";
import CheckoutPagamento from "./pages/CheckoutPagamento";
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
import TelaCadastro from "./pages/TelaCadastro";
import ProtectedRoute from './components/auth/ProtectedRoute';
import BusinessDashboard from "./pages/BusinessDashboard";
import PaginaVendedor from "./pages/PaginaVendedor";
import UserDashboard from "./pages/UserDashboard";
import AssinaturaLumeClientes from "./pages/AssinaturaLumeClientes";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PageBase />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<TelaLogin />} />
                    <Route path="/cadastro" element={<TelaCadastro />} />
                    <Route path="/sobre-nos" element={<SobreNos />} />
                    <Route path="/fale-conosco" element={<FaleConosco />} />
                    <Route path="/perguntas-frequentes" element={<PerguntasFrequentes />} />
                    <Route path="/produtos" element={<Produtos />} />
                    <Route path='/produto-especifico/:productId' element={<ProdutoEspecifico />} />
                    <Route path="/seja-parceiro" element={<Parcerias />} />
                    <Route path="/politicas-privacidade" element={<PoliticaPrivacidade />} />
                    <Route path="/cadastrar-produto" element={<CadastrarProdutos />} />
                    <Route path="/pagina-vendedor/:companyId" element={<PaginaVendedor />} />
                    <Route path='/assinatura-lume-clientes' element={<AssinaturaLumeClientes />} />

                    {/* ... outras rotas públicas ... */}

                    {/* --- ROTA PROTEGIDA PARA ADMINS --- */}
                    <Route element={<ProtectedRoute allowedRoles={['ROLE_ADMIN']} />}>
                        <Route path="/admin-dashboard" element={<AdminDashboard />} />
                        <Route path="/missoes-beneficios" element={<MissaoBeneficios />} />

                    </Route>

                    {/* --- ROTA PROTEGIDA PARA UTILIZADORES LOGADOS --- */}
                    <Route element={<ProtectedRoute allowedRoles={['ROLE_USER', 'ROLE_ADMIN', 'ROLE_BUSINESS']} />}>
                        <Route path='/perfil' element={<UserDashboard />} />
                        <Route path='/cadastrar-empresa' element={<CadastrarEmpresa />} />
                        <Route path="/checkout-pagamento" element={<CheckoutPagamento />} />


                    </Route>

                    {/* --- ROTA PROTEGIDA PARA UTILIZADORES DE EMPRESAS APENAS --- */}
                    <Route element={<ProtectedRoute allowedRoles={['ROLE_BUSINESS']} />}>
                    </Route>

                    {/* --- ROTA PROTEGIDA PARA UTILIZADORES DE EMPRESAS E ADMINISTRADORES APENAS --- */}
                    <Route element={<ProtectedRoute allowedRoles={['ROLE_BUSINESS', 'ROLE_ADMIN']} />}>
                        <Route path="/perfil-empresa" element={<BusinessDashboard />} />
                    </Route>


                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;