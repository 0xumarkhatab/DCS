import React, { useEffect ,useState} from 'react'
import Proposal from "../Proposal/Proposal";
import "./CastVote.css";
import ProposalInformation from "../Proposal/ProposalInformation";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { Navigate, useNavigate } from 'react-router-dom'
import { getAcceptedProposals,getRejectedProposals } from '../Data/data'

function CastVote() {
  const navigate=useNavigate();

const proposalsList=useSelector(state=>state?.PROPOSALSLIST);
console.log("proposal list ",proposalsList);
if(proposalsList===undefined){
navigate("/");
}

console.log("\nFresh Proposals List ",proposalsList)
const [selected, setSelected] = useState(false);
const dispatch = useDispatch();
    let user=null;
    user = JSON.parse( localStorage.getItem("USER"))
    console.log("USer is ",user );
    
        if(user===null){
            navigate("/")
        }
    
    

  function clickHandler(obj) {
    console.log("view proposal ", obj);
    dispatch({
      type: "SET__CURRENTPROPOSAL",
      CURRENTPROPOSAL: obj,
    });
    navigate("/proposalInformation")
    setSelected(true);


  }

  let acceptedIndices=getAcceptedProposals(user?.rollnumber,proposalsList);
  let rejectedIndices=getRejectedProposals(user?.rollnumber,proposalsList);
  console.log("Accepted ",acceptedIndices);
  console.log("rejected ",rejectedIndices);
  let filteredList=[];
   

  proposalsList?.map((item)=>{
    
    if((acceptedIndices?.includes(item.id-1)===false) && (rejectedIndices?.includes(item.id-1)===false)){
      console.log("proposal ",item.id," neither accepted nor rejected");
      filteredList.push(item);
    }
  
  
  }) ;

  
  

  
  console.log("Filtered List is ",filteredList);
  return (
    <div className="castVote">
        <div className='title'>
          <h5>Here Are The New Proposals</h5>
          <p>Vote for the Better Future !!</p>
        </div>
        <div className="proposals__list">
          {
          user===null?<Navigate to={"/login"}/>:
          filteredList?.map((item) => {
            return (
              <Proposal
                onClickHandler={clickHandler}
                key={"pid" + item.id}
                object={item}
              />
              
            );
          })}
        </div>
      
      


    </div>
  );
}

export default CastVote;
