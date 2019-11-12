import {SET_LINKS_LIST} from "./action-types";


const initialState = {
    linkList: []
};

export const linksListReducer=(state=initialState, action)=>{
    //debugger

    switch (action.type) {
        case SET_LINKS_LIST:
            return {
                ...state,
                linkList: action.linkList
            };

        default:
            return state

    }
};