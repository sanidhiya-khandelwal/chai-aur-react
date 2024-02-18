import conf from '../conf/conf.js' //step 1 since we'll need "Apiendpoint" and "project id" so imported conf

import { Client, Account, ID } from "appwrite"; //step 2 copy this line from documentation

/**
 * we could have copy pasted the whole code from documentation as it is in this file
 * but we did not did that. Reason-> ui code and bizz logic sb ek jagah is not good.
 * So to improve code quality we will export object
 */

/*
 * step 3  
 * exporting object instead of class why coz jo bhi usey use krega usey object bnana
 * padega iss class se tbhi toh saar methods use kr paenge so better way is to create
 *  an object and export it as object me saare methds ki access honge like login,logout etc
*/
//create class
export class AuthService {
    // step 3.1 create properties
    client = new Client(); //client bnta h "new Client()" krkr
    account; //right now "account" is a variable and we did not do"=new Account(client);" reason "client" abhi bna nhi h as client needs ".setEndpoint()" and ".setProject()" and we've not created them above reason is there is no senese in doing that as y class by default bn jaenge that is wastage of resource ... what we want ki jb koi object bnae "authService" tb client bne and then account ka access ho so we will now use constructor
    // step 3.2 create constructor
    constructor() {
        this.client  //"client" ka reference using "this" and setting ".setEndpoint" and ".setProject"
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        //now adding value to account 
        this.account = new Account(this.client);
    }

    // step 3.3 methods
    //FUNCTIONALITY TO CREATE ACCOUNT
    /* 
        * we use async await instead of promises reason being we want ki jb tk account create na ho ..cheeze aage na bdhe
        * jo bhi y menthod call krega vo ek object pass krega and is object hum yha destructure kr kr values nikal rhe h
        * this method "createAccount" can fail also so using try catch
    */
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);// ID upr import kra tha and unique method hota h 

            if (userAccount) { //useAccount create hogya
                // calling login
                return this.login({ email, password })
            }
            else {
                return userAccount; //it can be null and we will handle it later
            }

        } catch (error) {
            throw error;//we could hav handle the error more gracefully but backnd error acche se handle krleta h toh jyada yha handle krne ki zarurat nhi hoti
        }
    }

    //FUNCTIONALITY TO LOGIN ACCOUNT
    async login({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password);
        }
        catch (error) {
            throw error;
        }
    }

    // FUNCTIONALITY TO CHECK WHETHER THE USER IS LOGGED IN OR NOT
    async getCurrentUser() {
        try {
            return await this.account.get(); //suppose some error comes here then we're not using if-else here instead we'll "return null" from function 
        }
        catch (error) {
            // throw error;
            //we can handle this by printing console.log
            console.log("Appwrite service :: getCurrentUser :: error ", error);
        }

        return null; //executes only when "try" fails suppose account mila hi nhi toh however "try" bhi is case me "null" return krega
    }

    // FUNCTIONALITY TO LOGOUT user from all devices
    async logout() {
        try {
            await this.account.deleteSessions();
        }
        catch (error) {
            console.log("Appwrite service :: logout :: error ", error);
        }
    }
}

//step 4 creating object with name "authService"
const authService = new AuthService();

//step 5  exporting object
export default authService;

/**
 * u can access any method or property using example "authService.logout"
 * Now since we crated this file and if we change tje service from AppWrite to Firebase then
 * we need to chnage in this files functions only like chnage only inside getCurrentUser(),logout(),login(),createUser(), function
 * 
 */

