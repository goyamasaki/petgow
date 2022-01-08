import React,{useState} from 'react';
import Search from "../pages/Search";

const SearchBar=({onSerchSubmit})=>{
  const[term,setTerm]=useState('');
  const onFormSubmit=(event)=>{
      event.preventDefault();
      // onSubmit(term);
      console.log(term,onSerchSubmit);
  };
    return(
        <div class="field">
          
          <input   type="text"   name="search"    placeholder='' value={term} onChange={(event)=>{setTerm(event.target.value);
          }}/>
          <button type="button" onClick={onSerchSubmit} data-value={term}>検索</button><br></br>
          <label>検索したいキーワードを入力する</label>
         </div>
         );
};

export default SearchBar;