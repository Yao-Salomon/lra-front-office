import Constants from "../constants";

export function Services(){

    function logIn(){
        return "log In";
    }
    function logOut(){
        return "log out";
    }
}

export async function logIn(username:string,password:string){
    
    const response=await fetch(Constants.userLoginUrl+`?username=${username}&password=${password}`)
    return response.json();
    
}

export async function loadCommands(username:string){
    const response=await fetch(Constants.commandsUrl+`?username=${username}`)
    return response.json();
}
export async function loadCommandDetails(username:string,commandId:number){
    const response=await fetch(Constants.commandsUrl+`?username=${username}&commandId=${commandId}`)
    return response.json();
}

export async function loadEssais(){
    const response=await fetch(Constants.essaisUrl)
    return response.json();
}

export async function loadMateriaux(){
    const response=await fetch(Constants.materiauxUrl)
    return response.json();
}
export async function loadSettings(username:string){
    const response=await fetch(Constants.settingsUrl+`?username=${username}`);
    return response.json();
}
export async function loadNotifications(username:string){
    const response=await fetch(Constants.notificationUrl+`?username=${username}`);
    return response.json();
}
export async function loadCorrespondance(materiau:number){
    const response=await fetch(Constants.correspondanceUrl+`?materiauId=${materiau}`);
    return response.json();
}
export async function createCommands(datePrelevement:string,essais:any,materiaux:any,details:string,username:string){
    const response=await fetch(Constants.commandsUrl,{
        method:"Post",
        headers: {
            "Content-Type": 'application/json; charset=UTF-8',
          },
        body:JSON.stringify({
            "datePrelevement":datePrelevement,
            "essais":essais,
            "materiaux":materiaux,
            "details":details,
            "username":username,
        })
    })
    return response.json();
}

export async function createMailList(id:number,mail_list:string,username:string){
    const response=await fetch(Constants.settingsUrl,{
        method:"Post",
        headers: {
            "Content-Type": 'application/json; charset=UTF-8',
          },
        body:JSON.stringify({
            "id":id,
            "mail_list":mail_list,
            "username":username,
        })
    })
    return response.json();
}

export async function updateNotification(id:number){
    const response=await fetch(Constants.notificationUrl,{
        method:"Post",
        headers: {
            "Content-Type": 'application/json; charset=UTF-8',
          },
        body:JSON.stringify({
            "id":id,
        })
    })
    return response.json();
}