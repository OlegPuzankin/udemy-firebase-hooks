import React from "react";
import {FirebaseContext} from "../../firebase";
import LinkItem from "./LinkItem";

function LinkList(props) {

    const {fb} = React.useContext(FirebaseContext);
    const [links, setLinks] = React.useState([]);

    React.useEffect(() => {
        console.log('useEffect linkslist');
        const unmount = getLinks();
        console.log('unmount', unmount);

        //return unmount;
        //debugger
    }, []);

    function getLinks() {
        fb.db.collection('links').onSnapshot(snapshot => {
            const links = snapshot.docs.map(doc => {
                return {id: doc.id, ...doc.data()}
            });
            //console.log(links);
            setLinks(links);
        })
    }

    console.log('render linkslist');

    return (
        <div>
            {links.map((link, index) => {
                return <LinkItem key={link.id} showCount={true} link={link} index={index + 1}/>
            })}
        </div>
    );

}


export default LinkList;
