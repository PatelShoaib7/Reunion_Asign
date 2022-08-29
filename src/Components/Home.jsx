import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sortByLocation } from '../Redux/action'
import { Finaldata } from '../data';
import axios from "axios";
import styles from "../Components/Home.module.css";
import styles2 from "../Components/Input.module.css"
import { useState } from 'react';
import { useEffect } from 'react';
const COMMAN_CSS={
  Common:{width:'70%', height:'21px',color:'lightgrey' , borderRadius:'12px'},
  type:{color:'grey'},
  Three_Grid_Img:{ height:"30px", display:'grid', gridTemplateColumns:'repeat(3,1fr)'},
  Nav_Elem:{ margin:'5px', height:'30px' }
}
 
export const Home = () => 
{
   const [state , setState]=useState(Finaldata)
   const [SortState , setSortState]=useState("");
   const [FilterState, setFilterState]= useState('ALL');
   const dispatch = useDispatch()
   
    const FilterIt_By_Location =(e)=>
    {
      if(e.target.value=="all")
        {
          setState(Finaldata)
        }
        else {
          const UpadatedData = Finaldata.filter((elem)=>(
            elem.location == e.target.value
          ))
          setState(UpadatedData)
         }

    }
    const FilterIt_By_Category =(e)=>
    {
      if(e.target.value=="all")
      {
        setState(Finaldata)
      }else{
        const UpadatedData = state.filter((elem)=>(
          elem.category == e.target.value
        ))
        setState(UpadatedData)
       }
    }
    
   const Filter_Prices ={
    ALL:(elem)=>(elem),
    BELOW_5 :(elem)=>(elem.price<=5),
    BELOW_10 :(elem)=>(elem.price<=10),
    BELOW_15 :(elem)=>(elem.price<=15),
    BELOW_20 :(elem)=>(elem.price<=20),
    BELOW_40 :(elem)=>(elem.price<=40),
    ABOVE_40:(elem)=>(elem.price>=40)

   }
   

    const SortMethod={
         ASENDING :(a,b)=> (a.price - b.price),
         DSENDING :(a,b)=> (b.price- a.price),
         NONE:(a, b) => null
       
    }
  
    console.log(state)
   
  return (
    <div>
         
        <div className={styles.Main_Container}>
                  <div  className={styles.child_div_Navbar}>
                        <div className={styles.Navbar_Child_div} >
                            <div style={COMMAN_CSS.Nav_Elem}><button  className={styles2.All_Select_Box_Estate}>Estatery</button></div>
                            <div style={COMMAN_CSS.Nav_Elem}><button  className={styles2.All_Select_Box3}>Rent</button></div>
                            <div style={COMMAN_CSS.Nav_Elem}><button  className={styles2.All_Select_Box3}>Buy</button></div>
                            <div style={COMMAN_CSS.Nav_Elem}><button  className={styles2.All_Select_Box3}>Sell</button></div>
                            <div style={COMMAN_CSS.Nav_Elem}><button  className={styles2.All_Select_Box3}>Mange Proprties</button></div>
                            <div style={COMMAN_CSS.Nav_Elem}><button  className={styles2.All_Select_Box3}>Resource</button></div>
                        </div>
                    <div  className={styles.Login_Sign_Btn_div}>
                      <button className={styles.button_login}>Login</button>
                      <button className={styles.button_SignUp}>Sign Up</button>
                     

                    </div>
                          
                  
                  </div>
                  <div className={styles.child_div_Search_Prop}>
                            <div  style={{ marginBottom:'15px'}}>
                                      <h1>Search Properties to sent to</h1>
                                      
                                    </div>
                                    <div >
                                      <select className={styles2.Select_Box_LargeSize}>
                                        <option>Search Wit Search Bar</option>
                                      </select>
                                      
                             </div>
                    </div>
  <div className={styles.child_div_Filter}>

                <label className={styles2.label}>Sort</label>
                <select className={styles2.All_Select_Box} onChange={(e)=> setSortState(e.target.value)}>
                  <option value="NONE">₹ Price Sort</option>
                  <option value="ASENDING"> Low-To-High</option>
                  <option value="DSENDING">High-To-Low</option>
                </select>
               
                 
                 <label className={styles2.label}>Price</label>
                 <select className={styles2.All_Select_Box} onChange={(e)=> setFilterState(e.target.value)} >
                            <option value="ALL">ALL</option>
                            <option value="BELOW_5">Below 5 lac</option>
                            <option value="BELOW_10">Below 10 lac</option>
                            <option value="BELOW_15">Below 15 lac</option>
                            <option value="BELOW_20">Below 20 </option>
                            <option value="BELOW_40">Blow 40 lac</option>
                            <option value="ABOVE_40">Above 40 lac</option>
                 </select>
                 <label className={styles2.label}> location</label>
                 <select className={styles2.All_Select_Box} onChange={FilterIt_By_Location} >
                            <option value="all">All</option>
                            <option value="Banglore">Banglore</option>
                            <option value="Mumbai">Mumbau</option>
                            <option value="Pune">Pune</option>
                            <option value="New Delhi">New Delhi</option>
                            <option value="Chennai">Chennai</option>
                            <option velue="Hydrabad">Hydrabad</option>
                 </select>
                 <label className={styles2.label}>  Category</label>
                   <select className={styles2.All_Select_Box} onChange={FilterIt_By_Category}>
                           <option  value="all">All</option>
                           <option  value="Flat">Flat </option>
                           <option  value="Building">Building</option> 
                           <option  value="Vila">Villa</option>
                           <option  value="House">House</option>
                           <option  value="Plot">Plot</option>
                           
                   </select>

                 
                    <button className={styles.button_Search}>Serach</button>
                  
        </div>
       
{/* div for mapping all the data */}
        <div className={styles.child_div_Map_Data}>
      {
        state.filter(Filter_Prices[FilterState]).sort(SortMethod[SortState]).map((elem,index )=>(
              <div key={elem.index}  className={styles.Data_Div}>
                 {/*  Data appended img along with data  */}
                    <img  src={elem.img} className={styles.Data_Div_Img}></img>
                            <div className={styles.Data_Inner_Div}>
                                          <div className={styles.elem_name}>A{elem.name}</div>
                                          <div  className={styles.elem_price}>{elem.price} Lac$ </div>
                                          <div  className={styles.elem_price}>{elem.location} </div>
                                          <div style={COMMAN_CSS.type}>Category-Type : {elem.category}</div>
                                          <div  className={styles.elem_price}> {elem.furnishing}</div>
                                    
                                    
                                     {/* grid box for three bootom images */}
                                          <div  style={COMMAN_CSS.Three_Grid_Img}>
                                                        <div >
                                                            <img  style={COMMAN_CSS.Common} src="https://image.shutterstock.com/image-vector/double-bed-vector-icon-600w-1175446654.jpg" />2
                                                        </div>
                                                        <div >
                                                            <img style={COMMAN_CSS.Common} src="https://image.shutterstock.com/image-vector/bathroom-icon-600w-570363670.jpg"/>1
                                                        </div>
                                                        <div>
                                                             <img  style={COMMAN_CSS.Common} src="https://image.shutterstock.com/image-vector/house-vector-icon-260nw-1079133470.jpg"/>4
                                                        </div>
                                            </div>
                             </div>
              </div>
            ))
        }
          </div> 
    </div>
</div>
  )
}
