
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home';
import Menu from '../pages/Menu';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';

function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
    )
}

export default AppRouter;
