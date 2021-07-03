
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import Credentials from './components/Credentials';
import MainDashboard from './components/MainDashboard';


function App() {
    return (
        <>
            <Router>
                <Route exact path="/">
                    <Credentials />
                </Route>
                <Route exact path="/dashboard/teacher">
                    <MainDashboard />
                </Route>
                <Route exact path="/dashboard/admin">
                    <MainDashboard permissionLevel={'admin'} />
                </Route>
            </Router>
        </>
    );
}

export default App;
