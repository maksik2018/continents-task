import React, { useState } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import "./Continents.css";

const GET_CONTINENTS = gql`
  query {
    continents {
      code
      name
      countries {
        name
        languages {
          name
        }
      }
    }
  }
`;

function Continents() {
  const [contries, setCountries] = useState([]);
  const [languages, setLanguages] = useState([]);
  // const [languages, setLanguages] = useState({ show: false, current: 0 });
  const { loading, error, data } = useQuery(GET_CONTINENTS);
  console.log(data, "dsds");
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!(</p>;

  const addCountries = (index) => {
    if (contries.includes(index))
      setCountries(contries.filter((el) => el !== index));
    else setCountries([...contries, index]);
    console.log(index, "ggggg");
  };

  const addLanguages = (index, countryIndex) => {
    //   if (languages.includes(index))
    //     setLanguages(languages.filter((el) => el !== index));
    //   else setLanguages([...languages, index]);
    //   console.log(languages.length === 0, "languages.length === 0");
    // };
    if (languages.length === 0) {
      setLanguages([
        {
          countries: countryIndex,
          lang: [index],
        },
      ]);
    } else if (languages.find((el) => el.countries === countryIndex)) {
      const arrLang = languages.find(
        (el) => el.countries === countryIndex
      ).lang;
      if (arrLang.includes(index))
        setLanguages([
          {
            countries: countryIndex,
            lang: [arrLang.filter((el) => el !== index)],
          },
        ]);
      else
        setLanguages([
          {
            countries: countryIndex,
            lang: [...arrLang, index],
          },
        ]);
    } else {
      setLanguages([
        {
          countries: countryIndex,
          lang: [index],
        },
      ]);
    }

    console.log(index, "fffff");
  };

  // const addLanguages = (index) => {
  //   setLanguages({ current: index });
  //   setLanguages({ show: !languages.show, current: index });
  //   console.log(index, "fffff");
  // };
  console.log(languages, "fffff");

  return (
    <ul>
      {data.continents.map(({ code, name, countries }, idx) => (
        <li key={code}>
          <button onClick={() => addCountries(idx)}>{name}</button>
          {contries.includes(idx) &&
            countries.map((el, indexLang) => (
              <p className="text" onClick={() => addLanguages(indexLang, idx)}>
                {el.name}
                {languages.length > 0 &&
                  languages
                    .find((el) => el.countries === idx)
                    .lang.includes(indexLang) &&
                  el.languages.map(
                    (lang) => (
                      // countries.length - 1 === indexLang ? (
                      //   <p
                      //     className="lang"
                      //     onClick={() => {
                      //       setLanguages([]);
                      //       addCountries(idx);
                      //     }}
                      //   >
                      //     {lang.name}
                      //   </p>
                      // ) : (
                      <p className="lang">{lang.name}</p>
                    )
                    // )
                  )}
              </p>
            ))}
        </li>
      ))}
    </ul>
  );
}

export default Continents;
