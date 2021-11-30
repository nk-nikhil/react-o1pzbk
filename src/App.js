import React, { useState, useEffect } from 'react';
import './style.css';
import MOCK_DATA from './MOCK_DATA.json';

export default function App() {
  const data = [
    {
      title: 'PhD Online Applications',
      body: {
        p_introduction: [
          'NIAS is looking for exceptionally motivated students, interested in pursuing interdisciplinary research in conflict and security studies, natural and engineering sciences, social sciences,   humanities or the arts. Unencumbered by the constraints of traditional disciplinary doctoral research, NIAS doctoral students have a unique opportunity to broaden their intellectual horizons,   even beyond the limits of the domains listed below. NIAS not only values such cross-pollination of ideas but encourages and strongly supports its students to develop interdisciplinary approaches to problems that span academic disciplines. This interdisciplinary ethos is also reflected in the work of its faculty and research scholars.',
        ],
        p_box: [
          'Students who are applying against Project based PhD vacancy will have to pursue research theme only within the profile and parameters of the respective project. They are not permitted to shift the fellowship from the Project under which they have been taken, to work in the general pool or in another Project.',
        ],
        img_registration: [
          {
            src: 'https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__480.jpg',
            alt: 'table',
          },
        ],
        h2_1: 'ONLINE APPLICATION',
        a_left_block: [
          {
            link_text: 'Register Now',
            link: 'https://www.nias.res.in/content/doctoral-programme',
          },
        ],
        h2_2: 'IMPORTANT DATES',
        ul_1: [
          'Last Date for online Registration||30 May, 2019',
          'Release of Shortlisted candidates||10 Jun, 2019',
          'Date for Written test and interview||17 and 18 Jun, 2019',
          'Declaration of Final Results||30 Jun, 2019',
        ],
        h4_1: 'Important Instructions',
        p_important: [
          'Please note that the <strong>word/pdf</strong> icon beside the School name provides a <strong>preview of the application</strong> form and its requirements for your reference. <strong>Please checkout these requirements before you begin filling the application online</strong>, as there is <strong>no provision to save</strong> your work during the process of filling the application.',
        ],
        ul_2: [
          'Students are requested to apply under one school and one area only.',
          'All applications must be submitted online; offline applications will not be considered.',
          'Last Date for receiving application with all required documents submitted online is closed.',
          'Shortlisted candidates will be invited for a written test and interview on 17th and 8th June 2019.',
        ],
        p_end: [
          'For any query, you may write to niasphd@nias.res.in or niasphd@gmail.com',
        ],
        a_end: [
          {
            link_text: '2019 ADMISSIONS - List of Selected Candidates',
            link: 'https://www.nias.res.in/content/doctoral-programme',
          },
          {
            link_text: 'NIAS ANNUAL STUDENT COLLOQUIA during 2-3 December 2019',
            link: 'https://www.nias.res.in/content/doctoral-programme',
          },
        ],
      },
      field_blocks:
        'http://localhost/nias/api/academics/doctoral-programme/schools, http://localhost/nias/api/academics/doctoral-programme/programmes',
    },
  ];

  const [count, setCount] = useState(1);
  const [likes, setLikes] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [userdata, setUserData] = useState([]);

  var incVal = () => {
    setCount(count + 1);
  };
  var decVal = () => {
    if (count <= 1) return 1;
    setCount(count - 1);
  };
  const createDigits = () => {
    const digits = [];

    for (let i = 1; i < 10; i++) {
      digits.push(<button key={i}>{i}</button>);
    }
    return digits;
  };
  function getBadgeClasses() {
    var classes = 'btn';
    classes = count === 1 ? 'noactive-btn' : 'btn';
    return classes;
  }
  const likesVal = () => {
    setLikes(!likes);
    // var maxLikes = likes+1;
    // console.log(maxLikes);
  };
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users`)
      .then((response) => response.json())
      .then(setUserData);
  }, []);

  return (
    <>
      <input
        type="text"
        placeholder="Search.."
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      ></input>

      {userdata
        .slice(0, 5)
        .filter((val1) => {
          if (searchTerm == '') return val1;
          else if (val1.name.toLowerCase().includes(searchTerm.toLowerCase()))
            return val1;
        })
        .map((val1, key) => {
          return (
            <div className="user-data-api" key={key}>
              <label>Id:</label>
              {val1.id} <br />
              <label>First Name:</label>
              {val1.name}
              <br />
              <label>Email:</label>
              {val1.email}
            </div>
          );
        })}

      <input
        type="text"
        placeholder="Search.."
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      ></input>
      {MOCK_DATA.slice(0, 5)
        .filter((val) => {
          if (searchTerm == '') return val;
          else if (
            val.firstName.toLowerCase().includes(searchTerm.toLowerCase())
          )
            return val;
        })
        .map((val, key) => {
          return (
            <div className="mock-data" key={key}>
              <label>First Name:</label>
              {val.firstName}
              <br />
              <label>Last Name:</label>
              {val.lastName}
            </div>
          );
        })}

      <div>
        <div className="digits">
          {createDigits()}
          <button>0</button>
          <button>.</button>
          <button>=</button>
        </div>

        {data[0].body.img_registration.map((img_registration) => {
          return (
            <img
              width="300px"
              height="200px"
              src={img_registration.src}
              alt={img_registration.alt}
            />
          );
        })}
        <h1>Hello React!</h1>

        {likes ? (
          <button onClick={likesVal}>Liked</button>
        ) : (
          <button style={{ backgroundColor: 'blue' }} onClick={likesVal}>
            Like
          </button>
        )}
        {/* <button onClick = {likesVal}>Like</button><br/> */}
        {/* <span>Total {likes}</span> */}
        <br />

        <button className={getBadgeClasses()} onClick={decVal}>
          -
        </button>
        <span>{count}</span>
        <button className="btn" onClick={incVal}>
          +
        </button>
        <p>Start editing to see some magic happen :)</p>
        {data.map((data, index) => (
          <>
            <p>
              {data.title}
              <br />
              <br />
              <br />
              {data.body.ul_2}
            </p>

            <p dangerouslySetInnerHTML={{ __html: data.body.p_important }}></p>
          </>
        ))}

        {data[0].body.ul_1.map((ele) => {
          const arr = ele.split('||');
          return (
            <p>
              {arr[0]} - {arr[1]}
            </p>
          );
        })}
        <hr />
        {data[0].body.ul_2.slice(0, 2).map((ul_2) => {
          return <li className="li1">{ul_2}</li>;
        })}
        <br />
        <hr />
        <br />
        {data[0].body.ul_2.slice(2).map((ul_2) => {
          return <li className="li2">{ul_2}</li>;
        })}
        <a href="www.google.com">
          <button>{data[0].body.a_left_block[0].link_text}</button>
        </a>
      </div>
    </>
  );
}
