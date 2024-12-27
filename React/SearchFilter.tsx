/**
 * Search Filter
 * React Query
 * useDebounce Custom Hook
 */

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

type Post = {
  id: string;
  title: string;
  body: string;
};

const useDebounce = (searchValue: string, delay: number = 1000) => {
  const [debouncedValue, setDebouncedValue] = useState(searchValue);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(searchValue);
    }, delay);
    return () => clearTimeout(timer);
  }, [searchValue, delay]);
  return debouncedValue;
};

const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) {
    throw new Error("Failed to Fetch Posts");
  }
  return response.json();
};

const SearchFilter: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const { data, error, isLoading } = useQuery<Post[], Error>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const debouncedValue = useDebounce(searchValue, 2000);

  if (isLoading) return <div>Loading..........</div>;

  if (error instanceof Error) return <div>Error: {error.message}</div>;

  if (!data) return <div>Issue fetching data</div>;

  const filteredPosts: Post[] = data?.filter(({ title }) =>
    title.includes(debouncedValue)
  );

  return (
    <div className="max-w-3xl flex flex-col justify-center items-center">
      <h1 className="text-center">Search Posts</h1>
      <input
        className="bg-slate-100 p-3 rounded-lg w-full"
        type="text"
        placeholder="Search Posts...."
        value={searchValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchValue(e.target.value)
        }
      />
      <ul>
        {filteredPosts.length === 0 ? (
          <li>No posts found for your search.</li>
        ) : (
          filteredPosts.map((post: Post) => <li key={post.id}>{post.title}</li>)
        )}
      </ul>
    </div>
  );
};

export default SearchFilter;
