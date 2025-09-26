import { useState } from "react";
type ControlProps = {
  findQuery: (query: string) => void | Promise<void>;
}

export default function Control({findQuery}: ControlProps) {
const [query, setQuery] = useState('');

  const handleClick = () => {
    findQuery(query);
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