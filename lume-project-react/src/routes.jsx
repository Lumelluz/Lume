import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageBase from "./pages/PageBase";
import Home from "./pages/Home";
import TelaLogin from "./pages/TelaLogin";
import LoginSenha from "./pages/LoginSenha";
import CheckOutPagamento from "./pages/CheckOutPagamento";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PageBase />}>
                    <Route path="/" element={<Home />} />                   
                    <Route path="/login" element={<TelaLogin />} />
                    <Route path="/loginpassword" element ={<LoginSenha />} />
                    <Route path="/checkoutpagamento" element ={<CheckOutPagamento />} />


                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;