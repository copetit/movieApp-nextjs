import { useRouter } from "next/router";
import Seo from "../components/Seo";

export default function Home({ results }) {
  const router = useRouter();
  const onClick = (id, title) => {
    router.push(`/movies/${title}/${id}`);
  };

  return (
    <div className="container">
      <Seo title="Home" />
      {results?.map((movie) => (
        <div
          onClick={() => onClick(movie.id, movie.original_title)}
          className="movie"
          key={movie.id}
        >
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
          <h4>{movie.original_title}</h4>
        </div>
      ))}
      <style jsx>{`
        .container {
          background: #222;
          display: grid;
          grid-template-columns: 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie {
          cursor: pointer;
        }
        .movie img {
          max-width: 100%;
          border-radius: 15px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
            rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .movie h4 {
          font-size: 18px;
          text-align: center;
          color: white;
        }

        @media only screen and (min-width: 768px) {
          .container {
            grid-template-columns: 1fr 1fr 1fr;
          }
        }
        @media only screen and (min-width: 1280px) {
          .container {
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
          }
          .movie h4 {
            font-size: 24px;
          }
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps() {
  const API_DOMAIN_URL = process.env.API_DOMAIN_URL;
  const { results } = await (
    await fetch(`${API_DOMAIN_URL}/api/movies`)
  ).json();
  return {
    props: {
      results,
    },
  };
}
