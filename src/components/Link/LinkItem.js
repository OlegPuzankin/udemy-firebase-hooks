import React from "react";
import {Link, withRouter} from "react-router-dom";
import {getDomain} from "../../utils";
import dateFns from 'date-fns/distance_in_words_to_now'
import {FirebaseContext} from "../../firebase";

function LinkItem({link, index, showCount, history, forceUpdate}) {

    const {fb, user} = React.useContext(FirebaseContext);




    function handleVote() {
        if (!user)
            history.push('/login');
        else {

            const linkRef = fb.db.collection('links').doc(link.id);

            linkRef.get().then(doc => {
                if (doc.exists) {
                    const previousVotes = doc.data().votes;
                    //debugger
                    // previousVotes.forEach(vote => {
                    //     //debugger
                    //     if (vote.votedBy.id === user.uid) {
                    //         isVoted = true;
                    //     }
                    // });

                    // if (isVoted) {
                    //     console.log(`${user.displayName} is already voted`);
                    // } else {
                    const vote = {votedBy: {id: user.uid, name: user.displayName}};
                    const updatedVotes = [...previousVotes, vote];
                    const votesCount = updatedVotes.length;
                    linkRef.update({votes: updatedVotes, votesCount});
                    forceUpdate()

                }
            })
        }
    }

    function handleDeleteLink() {
        const linkRef = fb.db.collection('links').doc(link.id);
        linkRef.delete().then(() => {
            console.log('Link deleted')
        }).catch(err => {
            console.error("Error deleting link", err)
        })


    }

    const postedByAuthUser = user && user.uid === link.postedBy.id;


    console.log('linkItem render');

    return (
        <div className='flex items-start mt2'>
            <div className='flex items-center'>
                {showCount && <span className='gray'>{index}.</span>}
                <div className='vote-button' onClick={handleVote}>⮝</div>
            </div>
            <div className='ml1'>
                <div>
                    <a href={link.url} className='black no-underline'>{link.description}</a>
                    {''}
                    <span className='link'> ({getDomain(link.url)})</span>
                </div>
                <div className='f6 lh-copy gray'>
                    {link.votesCount} votes | posted by {link.postedBy.name} {dateFns(link.created)}
                    {'|'}
                    <Link to={`/link/${link.id}`}>
                        {link.comments.length > 0
                            ? `${link.comments.length} comments`
                            : 'discuss'
                        }
                    </Link>
                    {postedByAuthUser && (
                        <>
                            {'|'}
                            <span className='delete-button' onClick={handleDeleteLink}>delete</span>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default withRouter(LinkItem);
