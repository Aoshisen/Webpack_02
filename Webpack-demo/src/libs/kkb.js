import axios from "axios";

export const hello = async () => {
    console.log('欢迎来到开课ba');
    let rs=await axios({
        url:"/api/getUser"
    }) 
    console.log("rs",rs) ;  

}