import tokenService from "./tokenService";

const BASE_URL = "/api/notes/"

export function create(data){
    console.log(data, "Check here @notesApi")
    return fetch(BASE_URL,{
        method: 'POST',
        body: data,
        headers: {
            Authorization: 'Bearer ' + tokenService.getToken()
        }
    }).then(responseFromTheServer => {
        if(responseFromTheServer.ok) return responseFromTheServer.json();
        //if the responseFromTheServer is succesfull a JSON response will be returned
        //Otherwise throw a new error
        throw new Error('Somethin went wrong in creaing the Note @ noteApi')
    })

}

    export function getAll(){
        return fetch(BASE_URL,{
            method: 'GET',
            headers:{
                Authorization: "Bearer " + tokenService.getToken()
                //Through the retrieved JWT token we know who is making the request

            }
        }).then(responseFromTheServer => {
            if(responseFromTheServer.ok ) return responseFromTheServer.json();
            //If the responseFromTheServer is positive a JSON response will be returned
            throw new Error('Something went wrong while exectuing getAll()')

        })
    }

