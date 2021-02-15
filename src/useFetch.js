import { useState, useEffect } from "react";

const useFetch = (url) => {
   // initial states
   const [data, setData] = useState(null);
   // pending data
   const [pending, setPending] = useState(true);
   //handle errors
   const [error, setError] = useState(null);

   useEffect(() => {
      const abortCont = new AbortController();

      fetch(url, {signal: abortCont.signal})
         .then(res => {
            if(!res.ok) {
               throw Error("couldn't fetch data");
            }
            return res.json();
         })
         .then(data => {
            setData(data);
            setPending(false);
            setError(null);
         })
         .catch(err => {
            if(err.name === "AbortError") {
               console.log("fetch aborted");
            } else {
               setError(err.message);
               setPending(false);
            }
         });

         return () => abortCont.abort();
   }, [url]);

   return {data, pending, error};
};

// export it to the outside files
export default useFetch;