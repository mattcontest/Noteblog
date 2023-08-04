import {Card} from 'semantic-ui-react'
import PostCard from '../PostCard/PostCard'
// import { removeNoted } from '../../utils/notedApi'


export default function PostGallery({ notes, isProfile, noted, removeNoted, user, itemsPerRow, removeNote}) {
    const noteCards = notes.map((note) => {
        return <PostCard note={note} key={note._id} isProfile={isProfile} noted={noted} removeNoted={removeNoted} user={user} removeNote={removeNote}/>
    })


    return(
        <Card.Group itemsPerRow={itemsPerRow}>
             {noteCards}
        </Card.Group>
    )
}