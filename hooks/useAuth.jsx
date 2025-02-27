const { useSession } = require("next-auth/react");
const { useState, useEffect } = require("react")

const useAuth = ()=>{
    const [loggedInSession,setLoggedInSession] = useState({});
    const {data:session} = useSession();
    useEffect(()=>{
        if(session){
            setLoggedInSession(session)
        }
            
    },[session])

    return loggedInSession;
}

export {useAuth}