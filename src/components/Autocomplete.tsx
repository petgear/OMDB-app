import { useState, useMemo } from "react";

type Suggestion = {
  id: string;
  label: string;
}

type AutoCompleteProps = {
  onSearch: (query: string) => void;
}

export default function AutoComplete({onSearch}: AutoCompleteProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  const fetchMovies = async (query: string) => {
    const url = `https://www.omdbapi.com/?apikey=eefdbc41&s=${query}&type=movie`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.Response === "True" && data.Search) {
    setSuggestions(data.Search.map((m: any)=> ({
      id: m.imdbID,
      label: m.Title,
    })));
  } else {
    setSuggestions([]);
  }
}
  

  const debounce = <T extends (...args: any[]) => void>(fn: T, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), delay);
    }
  }

  const debouncedFetch = useMemo(
    () => debounce(fetchMovies, 500),
    []
  );

  const handleChange = (val: string) => {
    setQuery(val);
    if (val.trim() === '') {
      setSuggestions([]);
    } else {
      debouncedFetch(val);
    }
  }

  const handleSearchClick = () => {
    onSearch(query);
    setSuggestions([]);
  }

  const handleSuggestionClick = (s: Suggestion) => {
    setQuery(s.label);
    setSuggestions([]);
    onSearch(s.label);
  }

  return (
    <div className="control-div">
      <button 
      onClick={handleSearchClick}
      >
        Поиск</button>
    <input
    value={query}
    onChange={(e) => handleChange(e.target.value)}
    className=""
    />
    <ul>
      {suggestions.map((s) => (
        <li
         key={s.id}
         onClick={() => handleSuggestionClick(s)}>
          {s.label}
          </li>
      ))}
    </ul>
    </div>
  );
}