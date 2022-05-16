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
import {dispatchRedux, UploadProposals} from "./firebaseConfig";
import Authentication from './components/Authentication/Authentication'
import Signup from "./components/Authentication/Signup";
import AdminNavbar from './components/Navbar/AdminNavbar'

import { collection, query, where, onSnapshot } from "@firebase/firestore";
import {db} from "./firebaseConfig"
import Contributed from './components/Proposal/Contributed'
function App() {
  let user=useSelector(state=>state?.USER);  
  const dispatch=useDispatch(); 

const q = query(collection(db, "Proposals"));
let list=[];
const unsubscribe = onSnapshot(q, (querySnapshot) => {
  const cities = [];
  querySnapshot.forEach((doc) => {
      list.push(doc.data())
  });
  
  dispatch({
    type:"SET__PROPOSALSLIST",
    PROPOSALSLIST:list,
  })
  console.log("the snapshot is ",list);

});
    

  return (
    <Router>

      <div className="app">
      {
        user?.type==="admin"?<AdminNavbar /> :<Navbar/>
      }
      
      <Routes>
                 <Route index  exact path="" element={ <Introduction/> }/>
                 <Route exact path="/" element={<Instructions/>}/>
                 <Route exact path='/castVote' element={< CastVote  />}></Route>
                 <Route exact path='/proposalInformation' element={<ProposalInformation />}></Route>
                 <Route exact path="/giveProposal" element={<ProposalSuggestion />} ></Route>
                 <Route exact path="/contributed" element={<Contributed />} ></Route>
                 <Route exact path="/authentication" element={<Authentication />} />
                 <Route exact path="/signup" element={<Signup />} />
                 
                 <Route exact path="/login" element={<Login />} />



                 
          </Routes>
    </div>
    


    </Router>
    
  );
}

export default App;
