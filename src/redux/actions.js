import {SET_LINKS_LIST} from "./action-types";


export const setLinksToStore = (linkList)=>({
    type: SET_LINKS_LIST,
    linkList
});