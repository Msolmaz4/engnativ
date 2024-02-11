import { createSlice } from "@reduxjs/toolkit";
const Slice = createSlice({
    name:"dictinionary",
    initialState:[
    {
     en:"computer",
     tr:"Bilgisayar"
    },
    {
     en:"chair",
     tr:"Sandalye"
    },
    {
     en:"Pen",
     tr:"kalem"
    },


 ],

    reducers:{
        add(state,action){
            const word = action.payload
            state.push(word)

        }
    }
})
export const {add} = Slice.actions
export default Slice;