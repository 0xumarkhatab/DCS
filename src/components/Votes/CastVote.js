import React, { useEffect ,useState} from 'react'
import Proposal from "../Proposal/Proposal";
import "./CastVote.css";
import ProposalInformation from "../Proposal/ProposalInformation";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { Navigate, useNavigate } from 'react-router-dom'
import { getAcceptedProposals} from '../Data/data'
import { dispatchRedux } from '../../firebaseConfig'

function CastVote() {

  const navigate=useNavigate();
  const [selected, setSelected] = useState(false);
  const dispatch = useDispatch();  
  const proposalsList=useSelector(state=>state?.PROPOSALSLIST);
  dispatchRedux(dispatch);
if(proposalsList===undefined){
navigate("/");
}

console.log("\nProposals List in CastVote := ",proposalsList)
    let user=null;
    user = useSelector(state=>state?.USER);
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
  console.log("Accepted ",acceptedIndices);
  let filteredList=[];
   

  proposalsList?.map((item)=>{
    
    if((acceptedIndices?.includes(item.id-1)===false)&& (item.proposedby!==user?.rollnumber) ){
      console.log("proposal ",item.id," has not been contributed\n");
      filteredList.push(item);
    }
    
  }) ;

  
  

  
  console.log("Filtered List is ",filteredList);

  filteredList=filteredList.sort(function (a,b){
    return b.contributers.length-a.contributers.length;
  })
  if(user?.type==="admin")
    filteredList=filteredList.filter(obj=>obj.status==="pending");
  else 
    filteredList=filteredList.filter(obj=>obj.status==="listed");
    console.log("filtered lists",filteredList);

  return (
    <div className="castVote">
        
        {
          filteredList?.length>0?<div className='title'>
          <h5>Here Are The New Proposals</h5>
          <p>Vote for the Better Future !!</p>

        </div>
:<div className='title'><h5>There Are No New Proposals For You !</h5></div>
        }

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
