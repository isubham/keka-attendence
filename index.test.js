import { dayAttendence, formatDate } from "./index";
import config from './config.json';

describe("attendence", () => {

        it('with daily attendence input should fill the attendence', async () => {
            const attendenceDate  = new Date(2023, 1, 28);
            const { token, employeeId } = config;
            const attendenceDateFormatted = formatDate(attendenceDate);
            const response = await dayAttendence(token, employeeId, attendenceDateFormatted);
            expect(response.status).toBe(200);
    });
});

describe("formatDate", () => {
    it('with no input date should return YYYY-mm-dd', () => {
        const dateString = formatDate()
        console.log(dateString)
        expect(dateString.length).toBe(10);
    })
    it('with input date should return YYYY-mm-dd', () => {
        const jan1 = new Date(2023, 0, 1) // 2023 jan 1 
        const dateString = formatDate(jan1)
        expect(dateString).toBe('2023-01-01');
    })
})