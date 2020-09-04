import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://rs-react-schedule.firebaseapp.com/api/team/53/',
});


export const httpRequests = {
    getEvents: () => {
        instance.get('events').then(function (response: any) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
    } 
        

}

