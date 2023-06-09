// import { useEffect, useState } from "react";

// //importing the css fill
// import "./app.css";

// const App = () => {
//   const [userData, setUserData] = useState([]);

//   function fetchUserhandler() {
//     fetch("http://localhost:5001/user/api")
//       .then((res) => {
//         console.log(res);
//         return res.json();
//       })
//       .then((json) => {
//         //   const transformUserList = users.userList.map((usersData) => {
//         //     return {
//         //       id: usersData._id,
//         //       name: usersData.first_name,
//         //       email: usersData.email,
//         //     };
//         //   });
//         //   // setUserData(transformUserList);
//         console.log(json.userList);
//         setUserData(json.userList);
//         console.log(userData);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   // useEffect(() => {
//   //   fetchUser();
//   // });

//   return (
//     <div>
//       <button onClick={fetchUserhandler}> fetch</button>
//       <br></br>
//       {/* <p>{JSON.stringify(userData)}</p> */}
//     </div>
//   );
// };

// export default App;

import { useEffect, useState } from "react";

//importing the css fill
import "./app.css";

//import an component
import MovieCard from "./MovieCard";

import SearchIcon from "./search.svg";

const API_URL = "http://www.omdbapi.com?apikey=a76f3831";

const movie1 = {
  Title: "Amazing Spiderman Syndrome",
  Year: "2012",
  imdbID: "tt2586634",
  Type: "movie",
  Poster: "N/A",
};

const App = () => {
  //variable defined

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);

  const searchMovies = async (title) => {
    //getting reponse from the API_URL by using title
    const reponse = await fetch(`${API_URL}&s=${title}`);
    //get the data the we recieved in the response
    const data = await reponse.json();
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("batman");
  }, []);

  return (
    <div className="app">
      <h1>MOVIE LIST</h1>

      {/* serach div */}
      <div className="search">
        {/*searchbar inputfiled*/}
        <input
          placeholder="search for movies"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        {/*adding the search icon button*/}
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard params={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
