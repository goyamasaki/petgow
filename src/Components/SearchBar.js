import React,{useState} from 'react';
import Search from "../pages/Search";

const SearchBar=({onSubmit})=>{
  const[term,setTerm]=useState('');
      const onFormSubmit=(event)=>{
      event.preventDefault();
      // onSubmit(term);
      console.log(term);
    };
    return(
        <form onSubmit={onFormSubmit}class="ui form">
        <div class="field">
          <label>検索する→</label>
          <input   type="text"   name="search"    placeholder='' value={term} onChange={(event)=>{setTerm(event.target.value);
          }}/>
         </div>
        </form>
         );
};

export default SearchBar;