/**
 * Auth ko track kr rhe h
 * we will check/track here whether the user is authenticated or not 
 * Hum store se har bar puchenge ki user is authenticated or not 
 */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    status: false, //by default hum y de rhe h ki user authenticated nhi h 
    userData: null //means abhi humare pass koi user data nhi h
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: { //"reducers" ek object h.. and reducers k andr sbke pass "state" (inital state hogi isme) and "action"(isme vo data hoga jo hume update/add krna h) ka access hota h but compulsion nhi h inhe use krne ka
        login: (state, action) => {
            state.status = true; //phle toh status true krenge
            state.userData = action.payload.userData; //userData... lhs and rhs me "userdata" name same hi h toh "action.payload" likhoge toh bhi kaam hi jaega
        },
        logout: (state) => { //yha "action" ki need nhi thi toh nhi liya
            state.status = false; //status false kra 
            state.userData = null; //userData null kra
        }
    }
})

export const { login, logout } = authSlice.actions; //exporting them individually

export default authSlice.reducer; //authSlice me se reducer export krdo saare
