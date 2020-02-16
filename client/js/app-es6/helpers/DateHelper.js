export class DateHelper {

    constructor() {
        throw new Error('DateHelper should not be instanciated.');
    }

    static toString(date) {
        return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
    }

    static toDate(string) {
        if(!/[0-9]{4}-[0-9]{2}-[0-9]{2}/.test(string))
            throw new Error("Invalid date format. Should be YYYY-MM-DD");

        return new Date(string.split('-'));
    }
}
