import { useState } from 'react'

import './App.css'
import axios from 'axios';

function App() {
  const [count, setCount] = useState(0);
const [days, setDays] = useState([]);
const [userName, setUserName] = useState();
const [attendanceData, setAttendanceData] = useState({});



const handleAddDays =()=> {

  if(userName == null){
    alert("Enter Username First");
  }
else{

  const findDate = days.length;
  const newDate = findDate+1;
  const newDay = "Day"+newDate;
  setDays([...days , newDay]);

}
 
}

const handleCalculateSalary = () => {



  const formattedData = {
    userName: userName,
    attendance: {},
  };

  days.forEach((day) => {
    const inTimeInput = document.getElementById(`${day}-inTime`);
    const outTimeInput = document.getElementById(`${day}-outTime`);

    const inTime = inTimeInput.value ? formatTime(inTimeInput.value) : "00:00 AM";
    const outTime = outTimeInput.value ? formatTime(outTimeInput.value) : "00:00 PM";

    formattedData.attendance[day] = {
      inTime: inTime,
      outTime: outTime,
    };
  });

  axios.post('http://localhost:8990/getSalary', formattedData)
  .then((response) => {
    console.log('API Response:', response.data);
    setAttendanceData(response.data);
    console.log(attendanceData);
  })
  .catch((error) => {
    console.error('Error making API request:', error);
  });



console.log(formattedData);

};

const formatTime = (time) => {

  

  const [hours, minutes] = time.split(":");
  let formattedHours = parseInt(hours, 10);
  const ampm = formattedHours >= 12 ? "PM" : "AM";

  //*********** */ Convert hours to 12-hour format
  formattedHours = formattedHours % 12 || 12;

  //********** */ Add leading zero to single-digit hours
  formattedHours = formattedHours < 10 ? `0${formattedHours}` : formattedHours;

  return `${formattedHours}:${minutes} ${ampm}`;
};
const handleReset = () => {
  window.location.reload(); 
};

  return (
    <>
      <div className='outerMost'>
<h1 >Salary Calculator</h1>


<div className='name'>
  <span className='username'>Enter Your Username</span><br />
<input type="text" placeholder='Enter Your Username'  onChange={(e)=>setUserName(e.target.value)}/>

</div>

<div className='datesTable'> 

<table>
<tr>
  <th>Date</th>
  <th>In time</th>
  <th>Out Time</th>
</tr>

{days.map((data) => (
              <tr style={{ textAlign: 'center' }} key={data}>
                <td>{data}</td>
                <td style={{ width: '130px' }}>
                  {' '}
                  <input type='time' id={`${data}-inTime`} />
                </td>
                <td style={{ width: '130px' }}>
                  {' '}
                  <input type='time' id={`${data}-outTime`} />
                </td>
              </tr>


            ))}

</table>



</div>

<div className='buttonSec'>
<button onClick={handleAddDays}>Add Days</button>

{ days ==0? "" : <button style={{marginLeft:"15px"}} onClick={handleCalculateSalary}> Calculate Now</button>   }   

</div>



{Object.keys(attendanceData).length > 0 && (
<div className='response'>
<h2>Your Salary Details</h2>

 
  
  <table>
    <tr>
      <td>UserName</td>
      <td>{attendanceData.userName}</td>
    </tr>

    <tr>
      <td>Total Present Days</td>
      <td>{attendanceData.totalPresentDays}</td>
    </tr>

    <tr>
      <td>Total Half Days</td>
      <td>{attendanceData.totalHalfDays}</td>
    </tr>

    <tr>
      <td>Total Absent Days</td>
      <td>{attendanceData.totalAbsentDays}</td>
    </tr>

    <tr>
      <td>Total Salary</td>
      <td>{attendanceData.totalSalary}.00 Rupees</td>
    </tr>
  </table>
<br />
<br />
<span >Reset The Page</span>
<button style={{marginLeft:"10px"}} onClick={handleReset}>Reset</button>

</div>

)}

      </div>
    </>
  )
}

export default App
