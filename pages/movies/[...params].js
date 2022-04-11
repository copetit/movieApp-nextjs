import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Seo from "../../components/Seo";

export default function Detail({ params }) {
  const router = useRouter();
  // console.log(router);
  const [title, id] = params || [];
  const [movie, setMovie] = useState("");
  const [images, setImages] = useState("");

  useEffect(() => {
    // get Movie Info
    (async () => {
      const movieRes = await (await fetch(`/api/movies/${id}`)).json();
      console.log(movieRes);
      setMovie(movieRes);
    })();
    // get Images
    (async () => {
      const res = await (await fetch(`/api/movies/images/${id}`)).json();
      const images = res.backdrops
        .filter((data) => data.iso_639_1 == null)
        .slice(0, 4);

      setImages(images);
    })();
  }, [id]);

  return (
    <>
      <div className="container">
        <img
          className="bg-image"
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        />
        <Seo title={title} />
        {movie && (
          <>
            <div className="space" />
            <div className="movie">
              <div className="section">
                <div className="poster">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  />
                </div>
                <div className="detail">
                  <div className="info">
                    <div className="score">⭐️ {movie.vote_average}</div>
                    <h1 className="title">{title}</h1>
                    <div className="release-date">
                      {movie.release_date.slice(0, 4)}
                    </div>
                    <ul className="genres">
                      {movie.genres.map((genre) => (
                        <li key={genre.id}>{genre.name}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="overview">{movie.overview}</div>
              <div className="space" />
              {images && (
                <div className="movie-images">
                  {images.map((image, index) => (
                    <img
                      key={index}
                      src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                    />
                  ))}
                </div>
              )}
              <div className="space" />
            </div>
          </>
        )}
        <style jsx>{`
          .container {
            position: relative;
            background: black;
            color: white;
            overflow: hidden;
          }
          .container::after {
            position: absolute;
            top: 0;
            left: 0;
            display: block;
            width: 100%;
            height: 100%;
            content: "";
            background: linear-gradient(
              180deg,
              rgba(0, 0, 0, 0.3) 0%,
              rgba(0, 0, 0, 0.37) 3.23%,
              rgba(0, 0, 0, 0.73) 35.81%,
              rgba(0, 0, 0, 1) 60%,
              #000000 100%
            );
          }
          .space {
            height: 100px;
          }
          .bg-image {
            position: absolute;
            width: 100%;
          }
          .movie {
            position: relative;
            max-width: 80%;
            margin: 0 auto;
            z-index: 1;
          }
          .section {
            margin-top: 35px;
            z-index: 1;
          }
          .movie-images > img {
            width: 100%;
          }
          .poster {
            display: flex;
            justify-content: center;
          }
          .poster img {
            width: 300px;
            padding: 20px;
          }
          .info {
            margin-bottom: 50px;
          }
          .score {
            font-size: 1.5em;
            text-align: right;
          }
          .title {
            font-size: 2.5em;
          }
          .genres {
            list-style: none;
            padding: 0;
          }
          .genres {
            color: gray;
          }
          .overview {
            font-size: 20px;
            margin-top: 50px;
          }

          @media only screen and (min-width: 768px) {
            .movie {
              position: relative;
              max-width: 80%;
              margin: 0 auto;
              z-index: 1;
            }
            .section {
              position: relative;
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-top: 35px;
              z-index: 1;
            }
            .movie-images {
              position: relative;
              display: grid;
              place-items: center;
              grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
              gap: 20px;
              z-index: 1;
            }
            .poster img {
              width: 400px;
            }
            .detail {
              display: flex;
              flex-direction: column;
              max-width: 50%;
            }
            .title,
            .genres,
            .release-date {
              text-align: right;
            }
            .score {
              font-size: 2.5em;
            }
          }
        `}</style>
      </div>
    </>
  );
}

export function getServerSideProps({ params: { params } }) {
  return {
    props: { params },
  };
}
