import {SET_COUNT_PAGES, SET_LINKS_LIST} from "./action-types";


export const setLinksToStore = (linkList)=>({
    type: SET_LINKS_LIST,
    linkList
});

export const setCountPages = (countPages)=>({
    type: SET_COUNT_PAGES,
    countPages
});

