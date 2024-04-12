import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EmpListing from './EmpListing';
import EmpEdit from './EmpEdit';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<EmpListing />} />
           <Route path="/employee/edit/:empid" element={<EmpEdit />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;
