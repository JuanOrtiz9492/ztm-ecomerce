import Home from "./routes/home/home.component";
import Dummy from "./componets/dummy/dummy";
import Authentication from "./routes/authentication/authentication.component";
import Navigation from "./routes/navigation/navigation.component";
import { Routes, Route } from "react-router-dom";

const App = () => (
    <Routes>
        <Route path="/" element={<Navigation />}>
            <Route index element={<Home />} />
            <Route path="/shop" element={<Dummy viewName="Shop" />} />
            <Route path="auth" element={<Authentication />} />
        </Route>
    </Routes>
)

export default App;