const API_KEY = "5d3b317f681430b9aeb42cd5e3fc20ff";

const requests = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionsMovies: `/discover/movie?api_key=${API_KEY}&lwith_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&lwith_genres=35`,
  fetchHorroMovies: `/discover/movie?api_key=${API_KEY}&lwith_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&lwith_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&lwith_genres=99`,
};

export default requests;
