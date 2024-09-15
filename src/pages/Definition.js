import { useState, useEffect, useLocation } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import NotFound from "../components/NotFound";
import DefinitionSearch from "../components/DefinitionSearch";

export default function Definition() {
  const [word, setWord] = useState();
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState("false");

  let { search } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // const url = "https://httpstat.us/501";
    const url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + search;
    fetch(url)
      .then((response) => {
        if (response.status === 404) {
          setNotFound(true);
        } else if (response.status === 401) {
          navigate("/login", {
            state: {
              previousUrl: location.pathname,
            },
          });
        } else if (response.status === 500) {
          setError(true);
        }

        if (!response.ok) {
          setError(true);

          throw new Error("Something went wrong");
        }

        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setWord(data[0].meanings);
        }
      })
      .catch(() => {
        console.log("Something went wrong!");
      });
  }, []);

  if (notFound === true) {
    return (
      <>
        <NotFound />
        <Link to="/dictionary">Search another</Link>
      </>
    );
  }

  if (error === true) {
    return (
      <>
        <p>Something went wrong,Try again</p>
        <Link to="/dictionary">Search another</Link>
      </>
    );
  }
  return (
    <>
      {word ? (
        <>
          <h1>Here is the definition</h1>
          {word.map((meaning) => {
            return (
              <p key={uuidv4()}>
                {meaning.partOfSpeech + ": "}
                {meaning.definitions[0].definition}
              </p>
            );
          })}
          <p>Search again:</p>
          <DefinitionSearch />
        </>
      ) : null}
    </>
  );
}
