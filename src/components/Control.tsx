import { useState } from "react";
type ControlProps = {
  onSearch: (query: string) => void | Promise<void>;
}

export default function Control({onSearch}: ControlProps) {
const [query, setQuery] = useState('');

  const handleClick = () => {
    onSearch(query); 
  } 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }

  return (
    <div>
      <input
      value={query}
      onChange={handleChange}
      />
      <button
      onClick={handleClick}
      >Поиск</button>
    </div>
  );
}