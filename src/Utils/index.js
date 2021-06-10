

export const isLogged = () => {
    if(sessionStorage.getItem('Token')){
        return true;
    }

    return false;
}

export const Logout = () => {
    sessionStorage.removeItem('Token');
}