import React from "react";
import FirebaseContext from "../../firebase/FirebaseContext";
import LinkItem from "./LinkItem";
import dateFns from 'date-fns/distance_in_words_to_now'

function LinkDetail(props) {

    const linkId = props.match.params.linkId;
    const {fb, user} = React.useContext(FirebaseContext);
    const [link, setLink] = React.useState(null);
    const [commentText, setCommentText] = React.useState('');
    const linkRef = fb.db.collection('links').doc(linkId);


    React.useEffect(() => {
        getLink()
    }, []);

    function getLink() {
        linkRef.get().then(doc => {
            setLink({...doc.data(), id: doc.id})
        })

    }

    function handleAddComment() {
        if (!user)
            props.history.push('/login');
        else {
            linkRef.get().then(doc => {
                if (doc.exists) {
                    const previousComments = doc.data().comments;
                    const comment = {
                        postedBy: {id: user.uid, name: user.displayName},
                        created: Date.now(),
                        text: commentText
                    };
                    const updatedComments = [...previousComments, comment];

                    linkRef.update({comments: updatedComments})
                    setLink(prevState => {
                        return {
                            ...prevState, comments: updatedComments
                        }
                    })
                  setCommentText('');

                }

            })
        }

    }

    return !link
        ? <div>Loading...</div>
        : (<div>
            <LinkItem link={link} showCount={false}/>
            <textarea
                cols="60"
                rows="6"
                value={commentText}
                onChange={e => setCommentText(e.target.value)}>

          </textarea>
            <div>
                <button className='button' onClick={handleAddComment}>
                    Add comment
                </button>
            </div>
            {link.comments.map((comment, index) => {
                return <div key={index}>
                    <p className='comment-author'>
                        {comment.postedBy.name} | {`${dateFns(comment.created)} ago`}
                    </p>
                    <p>{comment.text}</p>
                </div>
            })}
        </div>)

}

export default LinkDetail;
