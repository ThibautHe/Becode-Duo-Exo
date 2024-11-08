// const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMGQ4MjkwZGVmZDA3MzAxNDlhNmExOTAzMDA0NDI0ZCIsIm5iZiI6MTczMDcyNjk2NS41NTYyNSwic3ViIjoiNjcyOGM5MTJjMDkwMTA5NTgwZmEwNzUxIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.gT1LzTBI_gtCAv5Zb18H3NTackzo438mazz2oDCRFlg'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err));

const url = "https://api.themoviedb.org/3/genre/movie/list?language=en";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMGQ4MjkwZGVmZDA3MzAxNDlhNmExOTAzMDA0NDI0ZCIsIm5iZiI6MTczMDcyNjk2NS41NTYyNSwic3ViIjoiNjcyOGM5MTJjMDkwMTA5NTgwZmEwNzUxIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.gT1LzTBI_gtCAv5Zb18H3NTackzo438mazz2oDCRFlg",
  },
};

fetch(url, options)
  .then((res) => res.json())
  .then((json) => console.log(json.genres.find((el) => el.name === "Comedy")))
  .catch((err) => console.error(err));
