import React, {useState} from 'react';

function Search({onFilter}) {
    const initSearch = {title:''}
    const [addSearch, setSearch] = useState(initSearch);

    const handleFilter = (e) => {
        setSearch({[e.target.name]: e.target.value});
        onFilter(e.target.value)
    }

    return (
        <p>
           <input type="text"
                name="title"
                style={{padding: '5px'}}
                placeholder="Hae"
                onChange={handleFilter}
                value={addSearch.title}>
            </input> 
        </p>
    )
}

export default Search