// Local mock data (no API). Add a `poster` URL to any movie to use a real image.
const m = (id, title, year, rating, genres, director, cast, description, extra = {}) =>
  ({ id, title, year, rating, genres, director, cast, description, ...extra });

export const movies = [
  m(1, "Midnight Harbor", 2024, 8.6, ["Thriller", "Drama"], "Elena Marsh", ["Idris Cole", "Mara Voss"], "A night-shift ferry captain uncovers a smuggling ring hiding in plain sight.", { trending: true, popular: true }),
  m(2, "The Last Orbit", 2023, 8.2, ["Sci-Fi", "Adventure"], "Kenji Aoki", ["Lena Fox", "Sam Ortega"], "A failing space station crew races to bring home the final transmission from Earth.", { trending: true }),
  m(3, "Paper Lanterns", 2022, 7.9, ["Romance", "Drama"], "Priya Nair", ["Arun Dev", "Mei Tan"], "Two strangers keep meeting at a lantern festival across three different cities.", { popular: true }),
  m(4, "Iron Meridian", 2021, 7.4, ["Action", "Thriller"], "Jack Doran", ["Tom Reyes", "Alina Petrov"], "A retired courier is pulled back in for one impossible cross-continent delivery.", { popular: true }),
  m(5, "Laugh Track", 2024, 7.1, ["Comedy"], "Rosa Imani", ["Dev Rao", "Ana Lopez"], "A struggling stand-up comic accidentally becomes the voice of a viral sitcom.", { trending: true }),
  m(6, "Hollow Pines", 2020, 6.8, ["Horror", "Mystery"], "Mark Everly", ["Sara Blake", "Noah Quinn"], "Campers find a trail marked with names of people who never came home."),
  m(7, "Salt & Saffron", 2023, 8.0, ["Drama", "Comedy"], "Farah Khan", ["Zoya Ali", "Ravi Menon"], "A family restaurant is saved, and nearly torn apart, by a viral review.", { popular: true }),
  m(8, "Neon Detective", 2025, 8.4, ["Sci-Fi", "Mystery"], "Ivo Brandt", ["Kai Mori", "Dana Cruz"], "In a city lit by ads, one detective hunts a crime nobody remembers.", { trending: true, popular: true }),
  m(9, "Wide Open Sky", 2019, 7.6, ["Adventure", "Drama"], "Hannah Reid", ["Luis Vega", "Cora Bell"], "A father and daughter cross the Patagonian plains on foot."),
  m(10, "The Quiet Heist", 2022, 7.7, ["Action", "Comedy"], "Theo Marsh", ["Jin Park", "Olu Adeyemi"], "A crew of retirees plans the politest bank robbery in history."),
  m(11, "Ember Kingdom", 2025, 8.8, ["Fantasy", "Adventure"], "Sofia Laurent", ["Ari Stone", "Nia Okoro"], "An heir with no magic must win back a throne from a realm of fire.", { trending: true, popular: true }),
  m(12, "Static Hearts", 2018, 6.5, ["Romance", "Sci-Fi"], "Ben Aldous", ["Eve Hart", "Milo Chen"], "Two radio operators fall in love across a signal that only works at dawn."),
];
export const allGenres = [...new Set(movies.flatMap((x) => x.genres))].sort();

// Unsplash photo ids. Swap any id for your own pick from unsplash.com (photo-xxxx part of the URL).
const photos = {
  1: "photo-1500375592092-40eb2168fd21", 2: "photo-1446776811953-b23d57bd21aa",
  3: "photo-1528360983277-13d401cdc186", 4: "photo-1494976388531-d1058494cdd8",
  5: "photo-1516280440614-37939bbacd81", 6: "photo-1448375240586-882707db888b",
  7: "photo-1414235077428-338989a2e8c0", 8: "photo-1480714378408-67cf0d13bc1b",
  9: "photo-1506905925346-21bda4d32df4", 10: "photo-1486406146926-c627a92ad1ab",
  11: "photo-1506744038136-46273834b3fb", 12: "photo-1478737270239-2f02b77fc618",
};
const url = (id, w, h) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=75`;
movies.forEach((mv) => { mv.poster = url(photos[mv.id], 500, 750); mv.wide = url(photos[mv.id], 1600, 900); });
