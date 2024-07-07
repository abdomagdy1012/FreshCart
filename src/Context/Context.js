import React, { createContext, useState } from "react";

export let context = createContext();

export default function CounterContextProvider(props){

    const [counter, setCounter]= useState(0)

    function changeCounter(){
        setCounter(Math.random())
    }
    return <>
    <context.Provider value={{counter , changeCounter}}>
        {props.children}
    </context.Provider>
    </>
    
}
