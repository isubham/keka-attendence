import axios from 'axios';

/**
 * @employeeId : id of employee @example 575169
 * @requestDate : date @example "2022-11-02",
 * @date : date @example"2022-11-02",
 * @inTime : in time @example 10:00
 * @outTime : out time @example 19:00
 */
function getBody(employeeId, date, inTime, outTime) {
	var data = 
	{
	    "timeEntries": [
		{
		    "actualTimestamp": `${date}T${inTime}:00.000Z`,
		    "adjustedTimestamp": `${date}T${inTime}:00.000Z`,
		    "timestamp": `${date}T${inTime}:00.000Z`,
		    "originalPunchStatus": 0,
		    "modifiedPunchStatus": 0,
		    "punchStatus": 0,
		    "attendanceLogSource": 1,
		    "premiseName": "Attendance Adjustment",
		    "manualClockinType": 2,
		    "isAdjusted": true,
		    "isEditable": true,
		    "isManuallyAdded": true
		},
		{
		    "actualTimestamp": `${date}T${outTime}:00.000Z`,
		    "adjustedTimestamp": `${date}T${outTime}:00.000Z`,
		    "timestamp": `${date}T${outTime}:00.000Z`,
		    "originalPunchStatus": 1,
		    "modifiedPunchStatus": 1,
		    "punchStatus": 1,
		    "attendanceLogSource": 1,
		    "premiseName": "Attendance Adjustment",
		    "manualClockinType": 2,
		    "isAdjusted": true,
		    "isEditable": true,
		    "isManuallyAdded": true
		}
	    ],
	    "note": "attendence",
	    "employeeId": employeeId,
	    "requestDate": date, 
	    "requestType": 1
	};
	const dataParsed = JSON.stringify(data);
	return dataParsed;
}

/** 
 * @token : authentication token 
 * @employeeId : id of employee @example 575169
 * @date : date @example"2022-11-02",
 * @inTime : in time @example 10:00
 * @outTime : out time @example 19:00
 */
async function dayAttendence (token, employeeId, date,  inTime='10:00', outTime='19:00') {
	const data = getBody(employeeId, date, inTime, outTime);

	return new Promise((resolve, reject) => {

		var config = {
			method: 'post',
			url: 'https://recrosoft.keka.com/k/attendance/api/mytime/attendance/saveattendanceadjustment',
			headers: { 
				'authority': 'recrosoft.keka.com', 
				'accept': 'application/json, text/plain, */*', 
				'accept-language': 'en-US,en;q=0.9', 
				'authorization': token, 
				'content-type': 'application/json; charset=UTF-8', 
				'cookie': '_gcl_au=1.1.652810817.1674533285; _clck=11fpquf|1|f8j|0; _fbp=fb.1.1674533290617.1859693227; geo=IN; _ga=GA1.2.752066704.1674533286; _gid=GA1.2.1442142194.1674646278; _ga_19064LH1ZY=GS1.1.1674646277.2.0.1674646279.58.0.0; _ga_LVR3B71RG5=GS1.1.1674646277.2.0.1674646279.58.0.0; Subdomain=recrosoft.keka.com; ai_user=0W76o+gILhyfdDuwl0q/VL|2023-01-25T11:34:11.721Z; ai_session=0VUfNTh3ZG6YT65+c0aZma|1674646452082|1674646833966', 
				'origin': 'https://recrosoft.keka.com', 
				'referer': 'https://recrosoft.keka.com/', 
				'sec-ch-ua': '"Not_A Brand";v="99", "Google Chrome";v="109", "Chromium";v="109"', 
				'sec-ch-ua-mobile': '?0', 
				'sec-ch-ua-platform': '"Windows"', 
				'sec-fetch-dest': 'empty', 
				'sec-fetch-mode': 'cors', 
				'sec-fetch-site': 'same-origin', 
				'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36', 
				'x-requested-with': 'XMLHttpRequest'
			},
			data : data
			};

			axios(config)
			.then(function (response) {
				resolve(response)
			})
			.catch(function (error) {
				reject(error);
			});

	});
}

/// utils /////////////////

function formatDate(date=new Date()) {
	const offset = date.getTimezoneOffset();
	const yourDate = new Date(date.getTime() - (offset*60*1000));
	const dateString = yourDate.toISOString().split('T')[0]
	return dateString;
}

const wait = function(delay) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log(`sleep for ${delay}`)
                resolve(0);
            })
        }, delay)
    }


export { formatDate, dayAttendence, wait }


