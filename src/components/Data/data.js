


export const proposalsList = [
    {
      title: "Venue For Farewell Party",
      id: 1,
      statement:
        "We Want to Organize the 2022 Farewell Party in Syed Rafaqat Auditorium  ! Kindly show your Opinions by Accepting or rejecting ! You can propose another Venue by Giving a new Proposal.",
         
        votedUsers:[],
        proposedby:"19L-1034",
        acceptedBy:["19L-1212"],
        rejectedBy:[],

      },
    {
      title: "Schedule for Farewell Party 2022",
      id: 2,
      statement:
        "We Want to commence the party at sharp 5:00 PM on May 29,2022. Kindly Show Your Suggestions in case of Denying or Accept the Proposal.",
         
        votedUsers:[],
        proposedby:"19L-2765",
        acceptedBy:[],
        rejectedBy:["19L-1212","19L-1215"],
      },
    {
      title: "Schedule for Welcome Party 2022",
      id: 3,
      statement:
        "We Want to commence the party at sharp 5:00 PM on May 29,2022. Kindly Show Your Suggestions in case of Denying or Accept the Proposal.",
         
        votedUsers:[],
        proposedby:"19L-2765",
        acceptedBy:["19L-1112","19L-2332"],
        rejectedBy:["19L-0923","19L-2112"],
      },
    {
      title: "Schedule for Welcome Party 2022",
      id: 4,
      statement:
        "We Want to commence the party at sharp 5:00 PM on May 29,2022. Kindly Show Your Suggestions in case of Denying or Accept the Proposal.",
         
        votedUsers:[],
        proposedby:"19L-1034",
        acceptedBy:["19L-1212"],
        rejectedBy:["19L-2456","19L-1222"],
      },
    
  ];

  export const getAcceptedProposals=(userKey,ProposalsList)=>{
    let result=[];
    let index=0;
    ProposalsList?.map((item)=>{
      let acceptedby=[...item.acceptedBy];
      acceptedby?.map((person)=>{
        if(person.rollnumber===userKey){
          result.push(index)
        }
      }
      
      );
      index+=1;
      
    }
    
    )
    return result;
  }

export const getRejectedProposals=(userKey,ProposalsList)=>{
    let result=[];
    let index=0;
    ProposalsList?.map((item)=>{
      let rejectedby=[...item.rejectedBy];
      rejectedby?.map((person)=>{
        if(person.rollnumber===userKey){
          result.push(index)
        }
      }
      
      );
      index+=1;
      
    }
    
    )
    return result;
  }
  
  

export const dispatchProposalsList=(dispatch)=>{

dispatch({
  type:"SET__PROPOSALSLIST",
  PROPOSALSLIST:proposalsList,
})
console.log("\nResult for 19L-2765 is",getAcceptedProposals("19L-2765"),proposalsList);

  }