import {SET_COUNT_PAGES, SET_LINKS_LIST} from "./action-types";


const initialState = {
    linkList: [],
    countPages: 0
};

export const linksListReducer=(state=initialState, action)=>{
    //debugger

    switch (action.type) {
        case SET_LINKS_LIST:
            return {
                ...state,
                linkList: action.linkList
            };
        case SET_COUNT_PAGES:
            return  {
                ...state,
                countPages: action.countPages
            };

        default:
            return state

    }
};