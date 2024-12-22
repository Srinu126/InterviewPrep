/**
 By default, React batches all state updates and commits them to the screen only once during every re-render, 
 which can lead to inefficiencies, especially for time-consuming tasks.
 The useTransition hook allows us to mark certain tasks as low-priority, 
 enabling the main thread to continue processing high-priority tasks without being blocked.
 This helps keep the UI responsive, particularly for expensive operations,
 by allowing updates like input changes to be processed immediately while background tasks
  (like fetching and rendering large data) are deferred.
 */

import { useState, useTransition } from "react";

const UseTransition = () => {
  const [content, setContent] = useState("");
  const [list, setList] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
    startTransition(() => {
      let newArr: string[] = [];
      for (let i = 0; i < 9000; i++) {
        //time consuming task
        newArr.push(e.target.value);
      }
      setList(newArr);
    });
  };

  return (
    <div className="m-3">
      <h1>useTransition Demo</h1>
      <input
        className="w-3/4 p-3 bg-slate-200"
        type="text"
        value={content}
        onChange={handleChange}
      />
      <div>
        <ul>
          {isPending ? (
            <p>Loading....</p>
          ) : (
            list.map((ele, index) => <li key={`${ele}-${index}`}>{ele}</li>)
          )}
        </ul>
      </div>
    </div>
  );
};

export default UseTransition;
