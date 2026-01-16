import { useState, useMemo, useRef, useEffect } from "react";
import type { Movie } from "./types";

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
  const [isFocused, setIsFocused] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setSuggestions([]);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  },[])

  const fetchMovies = async (query: string) => {
    const url = `https://www.omdbapi.com/?apikey=eefdbc41&s=${query}&type=movie`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.Response === "True" && data.Search) {
    setSuggestions(data.Search.map((m: Movie)=> ({
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

  const fetchIfNeeded = (text: string) => {
    if (text.trim() !== '') fetchMovies(text);
  };

  return (
  <div className="absolute top-5 left-1/2 -translate-x-1/2 flex gap-4 w-96" ref={wrapperRef}> 
    <div className="relative flex-1">
      <input
        value={query}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={() => {
          setIsFocused(true);
          fetchIfNeeded(query);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSearchClick();
        }}
        className="w-full px-4 py-2 bg-zinc-800 text-white placeholder:text-zinc-400 text-center rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border border-white"
      />

      {isFocused && suggestions.length > 0 && (
        <ul className="absolute top-full left-0 w-full mt-1 rounded-md border overflow-hidden bg-zinc-800 text-white z-10">
          {suggestions.map((s) => (
            <li
              key={s.id}
              className="px-4 py-2 cursor-pointer hover:bg-zinc-600 transition"
              onClick={() => handleSuggestionClick(s)}
            >
              {s.label}
            </li>
          ))}
        </ul>
      )}
    </div>

    <button
      onClick={handleSearchClick}
      className="px-4 py-2 bg-zinc-800 text-white font-medium rounded-md hover:bg-zinc-700 active:scale-95 transition flex-none"
    >
      Поиск
    </button>
  </div>
  );
}