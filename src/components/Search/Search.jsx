import './Search.css'

function Search() {
    // const debouncedCallback = useDebounce((e) => updateSearchTerm(e.target.value))
    return (
        <div className="search-wrapper">
            <input 
                id="pokemon-name-search"
                type="text"
                placeholder="pokemon name...."
                // onChange={debouncedCallback}
            />

         </div>
    );
}

export default Search;