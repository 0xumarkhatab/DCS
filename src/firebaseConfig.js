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
export const db=getFirestore();
    

export async function updateProposal(p){
    console.log("Updating proposal",p);
    await setDoc(doc(db, "Proposals","proposal__"+p.id),p)
    return true
}

export async function UploadProposals(p){
    proposalsList.map(async (p)=>{
        await setDoc(doc(db, "Proposals","proposal__"+p.id),p)    
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
    let found=false;
    let theUser={};
    if(users.length>0){
     users?.map((item)=>{
        if((item.rollnumber==user.rollnumber) && (item.password===user.password)){
            found=true;
            theUser={...item};

//            return true;

        }
    })
if(found===true){
    verifier(theUser);
    return true;
}    
else{
    rejector();
    return false;
}    


}

}


// async function dispatchProposals(){

//     const q = query(collection(db, "Proposals"));

//     const querySnapshot = await getDocs(q);
//     let proposals=[];
//     await querySnapshot.forEach((doc) => {
//       // doc.data() is never undefined for query doc snapshots
//       let p=doc.data();
//       proposals.push(p);

//     });
    
//     if(proposals?.length){
//         console.log("calling2");
//         console.log(proposals);
//         currentProposalsSnapshot=[...proposals]
//         return true;
//     }


// }



