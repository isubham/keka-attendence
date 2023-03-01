import { dayAttendence, formatDate, } from "./index.js";

async function client ({ token, employeeId, month, year, leaves, weekends }) {

        const dates = [];
        {
            const dayOff = weekends.concat(leaves);

            function daysInMonth (month, year) {
                return new Date(year, month - 1, 0).getDate();
            }

            const isNotWeekend = (date) => dayOff.indexOf(date) === -1;

            const days = daysInMonth(month, year);
            for (var i = 1; i < days; i++) {
                if (isNotWeekend(i)) {
                    const attendenceDate  = new Date(2023, month - 1, i); // month starts from 0 jan, 1 feb and so on
                    console.log('making attendence for', i)
                    dates.push(formatDate(attendenceDate));
                }
            }
        }

        {
            let counter = 1;
            const responses = dates.map(async (attendenceDateFormatted) => {
                counter += 1;
                setTimeout(async () => {
                    console.log(formatDate(), 'taking attendence for ', attendenceDateFormatted);
                    const response = await dayAttendence(token, employeeId, attendenceDateFormatted);
                    console.log(response.data.id);
                    return response;
                }, 1000 + (counter*1000))
            });
            console.log(responses);
        }


}

import config from './config.json' assert { type: "json" };;
const { token, employeeId, month, year, leaves, weekends } = config;

console.log('STEP 1. reading config=================\n\n', { token, employeeId, month, year, leaves, weekends }, '\n\nend of config=================\n\n');

//
client({ token, employeeId, month, year, leaves, weekends }).then((value) => {
    console.log('success');
}).catch(error => {
    console.log(error);
});
//