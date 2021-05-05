
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import Credentials from './components/Credentials';
import Dashboard from './components/Dashboard';


function App() {
    return (
        <>
            <Router>
                <Route exact path="/">
                    <Credentials />
                </Route>

                <Route exact path="/dashboard">
                    <Dashboard />
                </Route>

            </Router>
        </>
    );
}

export default App;
