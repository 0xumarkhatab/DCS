import { configureStore } from "@reduxjs/toolkit";


export const initialState={

    PROPOSALSLIST:null,
    USER:null,
    CURRENTPROPOSAL:null,


}

const reducer=(state=initialState,action)=>{
    console.log("action is ",action)
    switch (action.type) {
        case "SET__USER":
            return {
                ...state,
                USER : action.USER,
            }
            break;
        case "SET__PROPOSALSLIST":
            return {
                ...state,
                PROPOSALSLIST : action.PROPOSALSLIST,
            }
            break;
        case "SET__CURRENTPROPOSAL":
            return {
                ...state,
                CURRENTPROPOSAL:action.CURRENTPROPOSAL,
            }
            break;
        default:
            break;
    }
}




export const store=configureStore({reducer:reducer});


