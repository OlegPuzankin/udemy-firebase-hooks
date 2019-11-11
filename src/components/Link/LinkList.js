import React from "react";
import {FirebaseContext} from "../../firebase";
import LinkItem from "./LinkItem";

function LinkList(props) {

    const {fb} = React.useContext(FirebaseContext);
    const [links, setLinks] = React.useState([]);
    const isNewPage = props.location.pathname.includes('new');

    React.useEffect(() => {
        console.log('useEffect linkslist');
        let  unmount = getLinks();
        console.log('unmount-', unmount);

        return unmount

    }, []);

    function getLinks() {
        return fb.db.collection('links').
        orderBy('created', 'desc').
        onSnapshot(handleSnapshot)

    }

    function handleSnapshot(snapshot){
        const links = snapshot.docs.map(doc => {
            return {id: doc.id, ...doc.data()}
        });
        //console.log(links);
        setLinks(links);
    }
    function renderLinks (){
        if(isNewPage)
            return links;
        else
            return links.slice().sort((l1, l2)=>l2.votes.length-l1.votes.length)
    }

    console.log('render linkslist');

    return (
        <div>
            {renderLinks().map((link, index) => {
                return <LinkItem key={link.id} showCount={true} link={link} index={index + 1}/>
            })}
        </div>
    );

}


export default LinkList;
