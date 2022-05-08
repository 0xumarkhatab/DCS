import { doc, where,query,getDoc,setDoc,getFirestore ,getDocs, Firestore ,collection} from "@firebase/firestore"; 
// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { proposalsList } from "./components/Data/data";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCVS1vzG1-pQCxoURb1GFETw-wV0FDwJpk",
  authDomain: "creativesocietydao.firebaseapp.com",
  projectId: "creativesocietydao",
  storageBucket: "creativesocietydao.appspot.com",
  messagingSenderId: "386855287271",
  appId: "1:386855287271:web:99cf1c8b070c8641782542",
  measurementId: "G-X3KWQ717K4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Add a new document in collection "user"
const db=getFirestore();
    

export async function updateProposal(p){
    console.log("Updating proposal",p);
    await setDoc(doc(db, "Proposal","proposal__"+p.id),p)
}

export async function UploadProposals(p){
    proposalsList.map(async (p)=>{
        await setDoc(doc(db, "Proposal","proposal__"+p.id),p)    
    })
    
}

export async function UpdatePerson(person){
    console.log("Updating Person",person);
    await setDoc(doc(db, "User",person.rollnumber),person)
}

let currentProposalsSnapshot=[];


export async function verifyUser(user,verifier,rejector){

    const q = query(collection(db, "User"));

    const querySnapshot = await getDocs(q);
    let users=[];
    await querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      let p=doc.data();
      users.push(p);

    });
    if(users.length>0){
    return users?.map((item)=>{
        if((item.rollnumber==user.rollnumber) && (item.password===user.password)){
            verifier(true);
            return true;

        }
    })
    
    rejector();
    return false;
    }

}


async function dispatchProposals(){

    const q = query(collection(db, "Proposal"));

    const querySnapshot = await getDocs(q);
    let proposals=[];
    await querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      let p=doc.data();
      proposals.push(p);

    });
    
    if(proposals?.length){
        console.log("calling2");
        console.log(proposals);
        currentProposalsSnapshot=[...proposals]
        return true;
    }


}



export const  dispatchRedux=async (dispatch)=>{
    await dispatchProposals();
    
    console.log("\n\n\n\t\t\tType is ",typeof(currentProposalsSnapshot),currentProposalsSnapshot,"\n\n\n")
if(currentProposalsSnapshot){
    dispatch({
        type:"SET__PROPOSALSLIST",
        PROPOSALSLIST:currentProposalsSnapshot
    })

}
    


}

