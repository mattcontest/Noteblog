import tokenService from "./tokenService";

const BASE_URL = "/api/"

export function create(noteId){
    return fetch(`${BASE_URL}notes/${noteId}/noted`,{
        method: 'POST',
        headers:{
            Authorization: "Bearer " + tokenService.getToken()
        }
    }).then(responseFromTheServer => {
        if(responseFromTheServer.ok) return responseFromTheServer.json();
        throw new Error("Something went wrong in trying to get a post Noted")
    })

}


export function removeNoted(notedId){
    console.log(notedId, " <--- notedId")
    return fetch(`${BASE_URL}notes/${notedId}`, {
        method: 'DELETE',
        headers: {
            Authorization: "Bearer " + tokenService.getToken()

        }
    }).then(responseFromTheServer => {
        if(responseFromTheServer.ok) return responseFromTheServer.json();
        throw new Error("Something went wrong while trying to remove Noted from this note")
    })
}


