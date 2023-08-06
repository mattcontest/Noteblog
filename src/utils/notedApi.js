import tokenService from "./tokenService";

const BASE_URL = "/api/notes/liked/"

export function create(noteId){
    return fetch(`${BASE_URL}${noteId}`,{
        method: 'POST',
        headers:{
            Authorization: "Bearer " + tokenService.getToken(),
            'Content-Type': 'application/json',
        }
    }).then(responseFromTheServer => {
        if(responseFromTheServer.ok) return responseFromTheServer.json();
        throw new Error("Something went wrong in trying to get a post Noted")
    })

}


export function removeNoted(notedId){
    console.log("We get inside but nothing more than that")
    console.log(notedId, " <--- notedId")
    return fetch(`${BASE_URL}${notedId}`, {
        method: 'DELETE',
        headers: {
            Authorization: "Bearer " + tokenService.getToken(),
            'Content-Type': 'application/json',


        }
    }).then(responseFromTheServer => {
        if(responseFromTheServer.ok) return responseFromTheServer.json();
        throw new Error("Something went wrong while trying to remove Noted from this note")
    })
}


