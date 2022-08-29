import { SORT_BY_LOCATION } from "./action.types"

const initState={
    data:[]

}

export const reducer =(state=initState,{ type,payload})=>
{
     console.log(type)
    switch(type)
    {
        case SORT_BY_LOCATION :{
              return {
                ...state,
                data:[...initState.data, payload]
              }
        }
        default :{
            return state
        }
        
    }

}