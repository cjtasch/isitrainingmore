import '@picocss/pico'
import { useState } from 'react'

function App() {
  const [Lat, setLat] = useState("")
  const [Long, setLong] = useState("")


  async function handleSubmit(event) {
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





    let rainfallPast = await fetch(
      'https://archive-api.open-meteo.com/v1/archive?latitude=' + Lat +
      '&longitude=' + Long +
      '&start_date=' + oneYearTwoWeeksAgo.toISOString(8601).split('T', 1)[0] +
      '&end_date=' + oneYearAgo.toISOString(8601).split('T', 1)[0] +
      '&daily=rain_sum&timezone=America%2FChicago&precipitation_unit=inch')
      
    let rainfallCurrent = await fetch(
      'https://archive-api.open-meteo.com/v1/archive?latitude=' + Lat +
      '&longitude=' + Long +
      '&start_date=' + twoWeeksAgo.toISOString(8601).split('T', 1)[0] +
      '&end_date=' + eightDaysAgo.toISOString(8601).split('T', 1)[0] +
      '&daily=rain_sum&timezone=America%2FChicago&precipitation_unit=inch')

      const rainfallCurrentJson = await rainfallCurrent.json()
      const rainfallPastJson = await rainfallPast.json()


   



    let rainfallCurrentSum = 0;
    let currentDaily = rainfallCurrentJson.daily
    let n = 0;
    for(n =0; n < currentDaily.rain_sum.length - 1 ; n++)
    {
      rainfallCurrentSum += currentDaily.rain_sum[n];
    }


    let rainfallPastSum = 0;
    let pastDaily = rainfallPastJson.daily
    let i = 0;
    for(i =0; i < pastDaily.rain_sum.length-1; i++)
    {
      rainfallPastSum += pastDaily.rain_sum[i];
    }


    let isItRainingMore = rainfallCurrentSum > rainfallPastSum ? "Yes" : "No"

    console.log(rainfallCurrentSum, rainfallPastSum, isItRainingMore)
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
