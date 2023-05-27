import '@picocss/pico'
import { useState } from 'react'

function App() {
  const [Lat, setLat] = useState("")
  const [Long, setLong] = useState("")


  function handleSubmit(event) {
    event.preventDefault()


    let currentDate = new Date(Date.now());
    let eightDaysAgo = new Date;
    let twoWeeksAgo = new Date;
    let oneYearAgo = new Date;
    let oneYearTwoWeeksAgo = new Date;
    eightDaysAgo.setDate(currentDate.getDate() - 8);
    twoWeeksAgo.setDate(currentDate.getDate() - 22);
    oneYearAgo.setDate(currentDate.getDate() - 373);
    oneYearTwoWeeksAgo.setDate(currentDate.getDate() - 387);

    console.log(eightDaysAgo.toISOString(8601).split('T', 1)[0]) 
    console.log(twoWeeksAgo.toISOString(8601).split('T', 1)[0]) 
    console.log(oneYearAgo.toISOString(8601).split('T', 1)[0]) 
    console.log(oneYearTwoWeeksAgo.toISOString(8601).split('T', 1)[0]) 





    let rainfallPast = fetch(
      'https://archive-api.open-meteo.com/v1/archive?latitude=' + Lat +
      '&longitude=' + Long +
      '&start_date=' + oneYearTwoWeeksAgo.toISOString(8601).split('T', 1)[0] +
      '&end_date=' + oneYearAgo.toISOString(8601).split('T', 1)[0] +
      '&daily=rain_sum&timezone=America%2FChicago&precipitation_unit=inch')
      
    let rainfallCurrent = fetch(
      'https://archive-api.open-meteo.com/v1/archive?latitude=' + Lat +
      '&longitude=' + Long +
      '&start_date=' + twoWeeksAgo.toISOString(8601).split('T', 1)[0] +
      '&end_date=' + eightDaysAgo.toISOString(8601).split('T', 1)[0] +
      '&daily=rain_sum&timezone=America%2FChicago&precipitation_unit=inch')
  }


  return (
    <>
    {}
      <main className="container">
        <h1>Is it raining more than last year?</h1>
        <article>
          <form onSubmit={handleSubmit}>
            <div className='grid'>
              <input type="text" id="lat" name="lat" placeholder="Latitude" value={Lat} onChange={e => setLat(e.target.value)}></input>
              <input type="text" id="long" name="long" placeholder="Longitude" value={Long} onChange={e => setLong(e.target.value)}></input>
            </div>
            {/* <div className="grid">
              <details role="list">
                <summary aria-haspopup="listbox">What time Frame?</summary>
                <ul role="listbox">
                  <li><a>The past Week</a></li>
                  <li><a>The past Month</a></li>
                  <li><a>The past Year</a></li>
                </ul>
              </details>
            </div> */}
           <button>Submit</button>
          </form>

        </article>
      </main>

    </>
  )
}


export default App