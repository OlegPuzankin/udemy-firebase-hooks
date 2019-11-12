import React from "react";
import {FirebaseContext} from "../../firebase";
import LinkItem from "./LinkItem";
import {useSelector } from "react-redux";

function SearchLinks() {

    const [queryString, setQueryString] = React.useState('');
    //const [links, setLinks] = React.useState([]);
    const [filteredLinks, setFilteredLinks] = React.useState([]);
    //const {fb} = React.useContext(FirebaseContext);

    const linksFromStore = useSelector(state => state.links.linkList);

    function handleSearch(event) {
        //debugger
        event.preventDefault();
        const query = queryString.toLowerCase();
        const matchedLinks = linksFromStore.filter(link => {
          //debugger
            return (
                link.description.toLowerCase().includes(query)
                || link.url.toLowerCase().includes(query)
                || link.postedBy.name.toLowerCase().includes(query)
            )
        });
        setFilteredLinks(matchedLinks);


    }

    //console.log('linksRdx', linksFromStore);


    return (
        <div>
            <form onSubmit={handleSearch}>
                <div>
                    Search
                    <input type="text"
                           value={queryString}
                           onChange={e => setQueryString(e.target.value)}/>
                    <button>OK</button>
                </div>

            </form>

            {filteredLinks.map((filteredLink, index) => {
                return <LinkItem key={filteredLink.id} showCount={false} link={filteredLink} index={index}/>
            })}
        </div>)
}

export default SearchLinks;
