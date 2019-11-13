import React from "react";
import {FirebaseContext} from "../../firebase";
import LinkItem from "./LinkItem";

import axios from 'axios'

const LINKS_PER_PAGE =3;

function LinkList(props) {
    const {fb} = React.useContext(FirebaseContext);
    const [links, setLinks] = React.useState([]);
    const[cursor, setCursor]=React.useState(null);
    const isNewPage = props.location.pathname.includes('new');
    const isTopPage = props.location.pathname.includes('top');
    const isOldPage = props.location.pathname.includes('old');
    const page=Number(props.match.params.page);
    let isLastPage=false;


    React.useEffect(() => {
        const unsubscribe = getLinks();
        return () => unsubscribe();
    }, [isTopPage, isOldPage, isNewPage, page, isLastPage]);


    function getLinks() {

        const hasCursor = Boolean(cursor);

        if (isTopPage) {
            return fb.db.collection('links')
                .orderBy('votesCount', 'desc')
                .limit(LINKS_PER_PAGE)
                .onSnapshot(handleSnapshot)
        }
        else if (isOldPage) {
            return fb.db.collection('links')
                .orderBy('created', 'asc')
                .limit(LINKS_PER_PAGE)
                .onSnapshot(handleSnapshot)
        }

        // else if(page===1){
        //     debugger
        //     return fb.db.collection('links')
        //         .orderBy('created', 'desc')
        //         .limit(LINKS_PER_PAGE)
        //         .onSnapshot(handleSnapshot)
        // }
        // else if(hasCursor){
        //     debugger
        //     return fb.db.collection('links')
        //         .orderBy('created', 'desc')
        //         .startAfter(cursor.created)
        //         .limit(LINKS_PER_PAGE)
        //         .onSnapshot(handleSnapshot)

        //}
        else {
            const offset = page*LINKS_PER_PAGE - LINKS_PER_PAGE;
            axios
                .get(`https://us-central1-udemy-hooks-firebase.cloudfunctions.net/linksPagination?offset=${offset}`)
                .then(response=>{
                    const links =response.data;
                    const lastLink=links[links.length-1];
                    setLinks(links);
                    setCursor(lastLink);

                });
            return ()=>{};

        }

    }


    function handleSnapshot(snapshot) {
        debugger
        const links = snapshot.docs.map(doc => {
            return {id: doc.id, ...doc.data()}
        });
        const lastLink=links[links.length-1];
        setLinks(links);
        setCursor(lastLink);
    }

    const pageIndex =  page
        ? (page -1)*LINKS_PER_PAGE+1
        : 0;

    function handlePrevPage(){
        if(page>1){
            props.history.push(`/new/${page -1}`)

        }

    }

    function handleNextPage(){

        if(page<=(links.length+pageIndex-1) / LINKS_PER_PAGE){
            debugger
            props.history.push(`/new/${page +1}`)
            isLastPage=false;
        }
        else{
            debugger
            isLastPage=true;
        }


    }

    console.log('handle next page', (page<=links.length/LINKS_PER_PAGE));

    return (
        <div>
            {links.length !== 0
            ?
            links.map((link, index) => {
                return <LinkItem key={link.id} showCount={true} link={link} index={index + pageIndex}/>
            })
            : <div>loading...</div>}
            {isNewPage &&(
            <div className='pagination'>

                {page>1 && <div className='pointer mr2' onClick={handlePrevPage}>Previous</div>}
                {!isLastPage && (<div className='pointer mr2' onClick={handleNextPage}>Next</div>)}
            </div>
            )}
        </div>
    )
}


export default LinkList;
