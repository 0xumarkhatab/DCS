import './App.css';
import Navbar from './components/Navbar/Navbar'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import CastVote from './components/Votes/CastVote'
import Introduction from "./components/Introduction/Introduction"
import Login from "./components/Authentication/Login"
import Instructions from './components/Instructions/Instructions'
import ProposalInformation from './components/Proposal/ProposalInformation'
import {useSelector,useDispatch} from "react-redux";
import {dispatchProposalsList} from "./components/Data/data";
import ProposalSuggestion from './components/Proposal/ProposalSuggestion'
import { useEffect } from 'react'
import AcceptedProposal from './components/Proposal/AcceptedProposal'
import {dispatchRedux, UploadProposals} from "./firebaseConfig";
import Authentication from './components/Authentication/Authentication'
import Signup from "./components/Authentication/Signup";

function App() {
  const dispatch=useDispatch(); 
  //UploadProposals();
  dispatchRedux(dispatch);
  




  return (
    <Router>

      <div className="app">
      <Navbar/>
      <Routes>
                 <Route index  exact path="" element={ <Introduction/> }/>
                 <Route exact path="/" element={<Instructions/>}/>
                 <Route exact path='/castVote' element={< CastVote  />}></Route>
                 <Route exact path='/proposalInformation' element={<ProposalInformation />}></Route>
                 <Route exact path="/giveProposal" element={<ProposalSuggestion />} ></Route>
                 <Route exact path="/acceptedProposals" element={<AcceptedProposal />} ></Route>
                 <Route exact path="/authentication" element={<Authentication />} />
                 <Route exact path="/signup" element={<Signup />} />
                 
                 <Route exact path="/login" element={<Login />} />



                 
          </Routes>
    </div>
    


    </Router>
    
  );
}

export default App;
