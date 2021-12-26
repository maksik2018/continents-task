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
    if (languages.find((el) => el.countries === countryIndex)) {
      const arrLang = languages.find(
        (el) => el.countries === countryIndex
      ).lang;
      console.log(arrLang, "ssfsarrLang");
      if (arrLang.includes(index)) {
        const arr = [...languages].map((el) => {
          if (el.countries === countryIndex)
            return { ...el, lang: arrLang.filter((el) => el !== index) };
          return el;
        });
        console.log(arr, "arrsss");

        setLanguages(arr);
      } else
        setLanguages(
          [...languages].map((el) => {
            if (el.countries === countryIndex)
              return { ...el, lang: [...arrLang, index] };
            return el;
          })
        );
    } else {
      setLanguages([
        ...languages,
        {
          countries: countryIndex,
          lang: [index],
        },
      ]);
    }

    console.log(index, "fffff");
  };

  console.log(languages, "fff22ff");
  const checkCondition = (arr, index, indexLang) => {
    const elementList = arr.find((el) => el.countries === index);
    if (elementList) return elementList.lang.includes(indexLang);
    return false;
  };
  return (
    <ul>
      {data.continents.map(({ code, name, countries }, idx) => (
        <li key={code}>
          <button onClick={() => addCountries(idx)}>{name}</button>
          {contries.includes(idx) &&
            countries.map((el, indexLang) => (
              <div
                key={el.name + code + idx}
                className="text"
                onClick={() => addLanguages(indexLang, idx)}
              >
                {el.name}
                {
                  // languages.length > 0 &&
                  checkCondition(languages, idx, indexLang) &&
                    el.languages.map((lang) =>
                      countries.length - 1 === indexLang ? (
                        <div
                          key={lang.name + indexLang}
                          className="lang"
                          onClick={() => {
                            // setLanguages([]);
                            addCountries(idx);
                          }}
                        >
                          {lang.name}
                        </div>
                      ) : (
                        <div key={lang.name + indexLang} className="lang">
                          {lang.name}
                        </div>
                      )
                    )
                }
              </div>
            ))}
        </li>
      ))}
    </ul>
  );
}

export default Continents;
