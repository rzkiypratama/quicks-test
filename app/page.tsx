import React from "react";
import SearchBar from "@/components/SearchBar";
import ButtonContainer from "@/components/button/ButtonContainer";

const Home: React.FC = () => {
  return (
    <main className="m-auto font-Lato h-screen">
      <div className="relative h-screen overflow-hidden">
        <div className="relative z-10 ml-auto h-full w-4/5 border-l-2 border-white">
          <SearchBar />
          <ButtonContainer />
        </div>
      </div>
    </main>
  );
};

export default Home;
