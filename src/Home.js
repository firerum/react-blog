import BlogList from "./BlogList";
import useFetch from "./useFetch";

const Home = () => {
  const {data: blogs, pending, error} = useFetch("http://localhost:8000/blogs");

   return (  
      <div className="home">
         {error && <div>{error}</div>}
         {pending && <div>Loading...</div>} {/* && is to evaluate data on the left first before rendering the one on the right */}
         {blogs && <BlogList blogs={blogs} title="All Blogs" />}
      </div>
   );
}
 
export default Home;