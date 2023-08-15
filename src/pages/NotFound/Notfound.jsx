import "./Notfound.css"
import NoteHeader from "../../components/Header/Header"
import { Button, Header, Icon, Segment } from "semantic-ui-react"
import { useNavigate } from "react-router-dom"

export default function Notfound(){
    const navigate = useNavigate();
    function goBack(){
        navigate('/')

    }

    return(
        <Segment placeholder>
        <Header Icon >
           <h1 className="logoname">Noteblog</h1>
        </Header>
        <h1>
          <Icon  name='search' size='huge' />
          We could not find any Noteblog profile
        </h1>
        <Segment.Inline>
          <Button primary onClick={goBack}> Home</Button>
          {/* <Button>Add Document</Button> */}
        </Segment.Inline>
      </Segment>

    )



}

// const goBack = () => {
//     navigate('/')
// };