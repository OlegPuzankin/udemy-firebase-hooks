import React from "react";
import {FirebaseContext} from "../../firebase";
import LinkItem from "./LinkItem";
import {useSelector} from "react-redux";


function LinkList(props) {
    const linksFromStore = useSelector(state => state.links.linkList);

    //const {fb} = React.useContext(FirebaseContext);
    const [links] = React.useState([]);
    const isNewPage = props.location.pathname.includes('new');



    function renderLinks() {
        if (isNewPage)
            return linksFromStore;
        else
            return linksFromStore.slice().sort((l1, l2) => l2.votes.length - l1.votes.length)
    }

    return (
        linksFromStore.length!==0
            ? <div>
                {renderLinks().map((link, index) => {
                    return <LinkItem key={link.id} showCount={true} link={link} index={index + 1}/>
                })}
            </div>
            : <div>loading...</div>
    )
}


export default LinkList;
