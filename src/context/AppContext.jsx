import { createContext, useState } from "react";
import { baseUrl } from '../baseUrl'
//step 1: createcontext
export const AppContext = createContext();

//step2: provider
export default function AppContextProvider({children}){
    const [loading, setLoading] = useState(false);
    const [posts , setPosts]= useState([]);
    const [page, setPage]= useState(1);
    const [totalpage, setTotalpage]= useState(null);

    //data filling in the variable

    async function fetchBlogPost(page=1){
        setLoading(true);
        let url=`${baseUrl}?page=${page}`
        console.log(url);
        try{
            const result=await fetch(url);
            const data= await result.json();
            setPage(data.page);
            setPosts(data.posts);
            setTotalpage(data.totalPages);
        }
        catch(err){
            console.log('err in fetching data');
            setPage(1);
            setPosts([]);
            setTotalpage(null);
        }
        setLoading(false);///data aane ke baad loader bnd kr dia
    }

    function handlePageChange(page){
        setPage(page);
        fetchBlogPost(page)
    }
    

    //refers to the data that need to be send
    const value={
        posts,
        setPosts,
        loading,
        setLoading,
        page,
        setPage,
        totalpage,
        setTotalpage,
        handlePageChange,
        fetchBlogPost 
    };
    //we have sended all the data to the childer which is our app.js
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

