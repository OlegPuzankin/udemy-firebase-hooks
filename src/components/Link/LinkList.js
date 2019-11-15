import React from "react";
import {FirebaseContext} from "../../firebase";
import LinkItem from "./LinkItem";
import {useSelector, useDispatch} from "react-redux";
import axios from 'axios'
import {setCountPages} from "../../redux/actions";

const LINKS_PER_PAGE = 3;


function LinkList(props) {
    const {fb} = React.useContext(FirebaseContext);
    const [links, setLinks] = React.useState([]);
    const[loading, setLoading] =React.useState(false);
    const countPages = useSelector(state => state.links.countPages);
    const dispatch = useDispatch();


    //const[cursor, setCursor]=React.useState(null);
    const isNewPage = props.location.pathname.includes('new');
    const isTopPage = props.location.pathname.includes('top');
    const isOldPage = props.location.pathname.includes('old');
    const page = Number(props.match.params.page);
    //let isLastPage=false;


    React.useEffect(() => {
        const unsubscribe = getLinks();
        getCountPages();
        return () => unsubscribe();
    }, [isTopPage, isOldPage, isNewPage, page, countPages]);


    function getCountPages() {
        let pagesCount = 3;
        fb.db.collection('links').get().then(snapshot => {
            //debugger
            const linksCount = snapshot.docs.length;
            pagesCount = Math.ceil(linksCount / LINKS_PER_PAGE);
            dispatch(setCountPages(pagesCount))

            //debugger
        });
        return pagesCount;

    }


    function getLinks() {

        setLoading(true);

        //const hasCursor = Boolean(cursor);

        if (isTopPage) {
            return fb.db.collection('links')
                .orderBy('votesCount', 'desc')
                .limit(LINKS_PER_PAGE)
                .onSnapshot(handleSnapshot)
        } else if (isOldPage) {
            return fb.db.collection('links')
                .orderBy('created', 'asc')
                .limit(LINKS_PER_PAGE)
                .onSnapshot(handleSnapshot)
        }

        else {
            const offset = page * LINKS_PER_PAGE - LINKS_PER_PAGE;
            axios
                .get(`https://us-central1-udemy-hooks-firebase.cloudfunctions.net/linksPagination?offset=${offset}`)
                .then(response => {
                    const links = response.data;
                    setLinks(links);
                    setLoading(false)
                });
            return () => {
            };

        }

    }


    function handleSnapshot(snapshot) {
        //debugger
        const links = snapshot.docs.map(doc => {
            return {id: doc.id, ...doc.data()}
        });
        setLinks(links);
        setLoading(false);
    }

    const pageIndex = page
        ? (page - 1) * LINKS_PER_PAGE + 1
        : 1;

    function handlePrevPage() {
        if (page > 1) {
            props.history.push(`/new/${page - 1}`)

        }

    }

    function handleNextPage() {

        if (page <= (links.length + pageIndex - 1) / LINKS_PER_PAGE) {
            //debugger
            props.history.push(`/new/${page + 1}`)
        }
    }

    console.log('countPages', countPages);

    return (
        <div style={{opacity: loading?0.25:1}}>
            {links.map((link, index) => {
                return <LinkItem key={link.id} showCount={true} link={link} index={index + pageIndex}/>
            })}

            {isNewPage && (
                <div className='pagination'>
                    {page > 1 && <div className='pointer mr2' onClick={handlePrevPage}>Previous</div>}
                    {page !== countPages && (<div className='pointer mr2' onClick={handleNextPage}>Next</div>)}
                </div>
            )}
        </div>
    )
}

export default LinkList;
