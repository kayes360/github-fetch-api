 
import FetchPage from "./components/FetchPage";
import PostManagement from "./components/PostManagement";

export default function Home() {  
  return (
    <div className="font-sans min-h-screen flex items-center justify-center">
      <main className="max-w-7xl mx-auto px-4 ">
        <div className=" flex flex-col-reverse md:flex-row   gap-[32px] items-start  border"> 
             <FetchPage />
            <PostManagement /> 
        </div>
      </main>
    </div>
  );
}
