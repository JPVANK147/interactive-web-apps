// scripts.js

const MONTHS = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  
const data = {
    response: {
      requestType: "FETCH_ATHLETE_DATA",
      requestBy: "ALL_MATCHING_ATHLETES",
      forDisplay: "BEST_RACES",
  
      
      data: {
        NM372: {
          firstName: "Nwabisa",
          surname: "Masiko",
          id: "NM372",
          races: [
            {
              date: '2022-11-18T20:00:00.000Z',
              time: [9, 7, 8, 6],
            },
            {
              date: '2022-12-02T20:00:00.000Z',
              time: [6, 7, 8, 7],
            },
          ],
        },
  
        SV782: {
          firstName: "Schalk",
          surname: "Venter",
          id: "SV782",
          races: [
            {
              date: '2022-11-18T20:00:00.000Z',
              time: [10, 8, 3, 12],
            },
            {
              date: '2022-11-25T20:00:00.000Z',
              time: [6, 8, 9, 11],
            },
            {
              date: '2022-12-02T20:00:00.000Z',
              time: [10, 11, 4, 8],
            },
            {
              date: '2022-12-09T20:00:00.000Z',
              time: [9, 8, 9, 11],
            },
          ],
        },
      },
    },
  };
  
  // Only edit below this comment
  
  const createHtml = (athleteId) => {
    const athlete = data.response.data[athleteId] // go in data - response - data - [athleteId] this is to get the athlete's data using a Parameter
    const { firstName, surname, id, races } = athlete // this is to acces the athlete  firstName, surname, id, races using a object destructuring
    const [LatestRace] = races.reverse() // this is to get the races races of the athlete using a array destructuring.we specify that we want to extract the first (and only) element
    const { date, time } = LatestRace // this is object destructuring - allows you to extract specific properties from an object and assign them to variables with the same names as the properties.

    const fragment = document.createDocumentFragment() // this i dont know it say create offscreen node
  
    const title = document.createElement('h2') // this it to create a element 'h2' that is assign title
    title.textContent = id // this is to get the text of id and that is "NM372" and "SV782"
    fragment.appendChild(title) // method append a node as the last child of a element which it title
  
    const list = document.createElement('dl') // this it to create a element 'd1' that is assign list
  
    const day = new Date(date).getDate() // this is to get the new date in date form '2022-12-09T20:00:00.000Z' to 2 Dec 2022 using .getDate()
    const month = MONTHS[new Date(date).getMonth()] // this is to get the month array to get the new month using the .getMonth()
    const year = new Date(date).getFullYear() // this is to get the new year in date form to get 2022 year using .getFullYear
  
    const [first, second, third, fourth] = time // This is the array destructuring. We specify the variables to which we want to assign the elements of the 'time' array. example const first = 10, const second = 8, const third = 3, const fourth = 12;
    const total = first + second + third + fourth // add the total of the times together like 10 + 8 + 6 + 12
  
    const hours = Math.floor(total / 60) // 91 / 60 = 1.5167 round it to floor it is 1 hour
    const minutes = total % 60 // 91 % 60 = 31 minutes
  
    list.innerHTML = /* html */
    ` <dt>Athlete:</dt>
      <dd>${firstName} ${surname}</dd>
  
      <dt>Total Races:</dt>
      <dd>${races.length}</dd>
  
      <dt>Event Date (Latest):</dt>
      <dd>${day} ${month} ${year}</dd>
  
      <dt>Total Time (Latest):</dt>
      <dd>${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}</dd>`
    //  The .innerHTML allows you to get or set the HTML content within that element.
    fragment.appendChild(list)
  
    return fragment
  };
  
  document.querySelector('[data-athlete="NM372"]').appendChild(createHtml("NM372")) // this is the get data-athlete="NM372" in the HTML to add the script, also add a node in html to insert the creatHtml of id "NM372"
  document.querySelector('[data-athlete="SV782"]').appendChild(createHtml("SV782")) // this is the get data-athlete="SV782" in the HTML to add the script, also add a node in html to insert the creatHtml of id "SV782"
  