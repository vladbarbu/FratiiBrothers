import Config from "../config";

let GLOBAL_CALENDAR = {
    weekdays : [
        {
            day_in_week : 1,
            name: "Luni"
        },
        {
            day_in_week : 2,
            name: "Marti"
        },
        {
            day_in_week : 3,
            name: "Miercuri"
        },
        {
            day_in_week : 4,
            name: "Joi"
        },
        {
            day_in_week : 5,
            name: "Vineri"
        },
        {
            day_in_week : 6,
            name: "Sambata"
        },
        {
            day_in_week : 7,
            name: "Duminica"
        }],
    months : [
        {
            name : "Ianuarie",
            month_in_year : 1,
            days_count : 31
        },
        {
            name : "Februarie",
            month_in_year : 2,
            days_count : 28
        },
        {
            name : "Martie",
            month_in_year : 3,
            days_count : 31
        },
        {
            name : "Aprilie",
            month_in_year : 4,
            days_count : 30
        },
        {
            name : "Mai",
            month_in_year : 5 ,
            days_count : 31
        },
        {
            name : "Iunie",
            month_in_year : 6 ,
            days_count : 30
        },
        {
            name : "Iulie",
            month_in_year : 7 ,
            days_count : 31
        },
        {
            name : "August",
            month_in_year : 8 ,
            days_count : 31
        },
        {
            name : "Septembrie",
            month_in_year : 9 ,
            days_count : 30
        },
        {
            name : "Octombrie",
            month_in_year :10,
            days_count : 31
        },
        {
            name : "Noiembrie",
            month_in_year :11,
            days_count : 30
        },
        {
            name : "Decembrie",
            month_in_year :12,
            days_count : 31
        },
    ],
    daysInMonths :  [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    firstWeekdayIndex : 1,
};


class Calendar{

    get current_month_index() {
        return this._current_month_index;
    }

    set current_month_index(value) {
        this._current_month_index = value;
    }
    get days() {
        return this._days;
    }

    set days(value) {
        this._days = value;
    }
    get months() {
        return this._months;
    }

    set months(value) {
        this._months = value;
    }


    constructor(){

        let self = this;

        this.current_month_index = 1;

        this.months = [
            null,
        ];
        this.days =  [
            null,
        ];

        this.setup_days();



    }



    setup_days(){


        let self = this;


        let day_in_week = GLOBAL_CALENDAR.firstWeekdayIndex;
        let day_in_month = 1;
        let month_end_tracker = 0;
        let month_end = GLOBAL_CALENDAR.daysInMonths[month_end_tracker];

        for(let day = 1; day <= 365; day++){


            if(day_in_month > month_end){
                //month is finished
                day_in_month = 1; //refresh the month_index to start/1
                month_end_tracker++; //move the tracker so you get the next month_end
                month_end =GLOBAL_CALENDAR.daysInMonths[month_end_tracker];
            }

            if(day_in_week === 8){ day_in_week = 1; } //week is finished

            self.days.push(new CalendarDay({
                day_in_year : day, // the n'th day in the year
                day_in_month : day_in_month, //the n'th day in the month
                day_in_week : day_in_week, //the n'th day in the week
                month : new CalendarMonth(GLOBAL_CALENDAR.months[month_end_tracker])
            }));




            if(day_in_month === 1){ //if you are at the beginning of any month, init it.
                let object =   GLOBAL_CALENDAR.months[month_end_tracker];
                object["start_day_in_year"] = day;
                self.months.push(new CalendarMonth(object));
            }

            day_in_month++;
            day_in_week++;
        }
    }



    pick_month(month_in_year = null){}







}


class CalendarMonth{
    get end_day_in_year() {
        return this._end_day_in_year;
    }

    set end_day_in_year(value) {
        this._end_day_in_year = value;
    }
    get start_day_in_year() {
        return this._start_day_in_year;
    }

    set start_day_in_year(value) {
        this._start_day_in_year = value;
    }
    get month_in_year() {
        return this._month_in_year;
    }

    set month_in_year(value) {
        this._month_in_year = value;
    }
    get days_count() {
        return this._days_count;
    }

    set days_count(value) {
        this._days_count = value;
    }
    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    constructor(object){
        this.name = Config.getValue(object, "name");
        this.days_count = Config.getValue(object, "days_count");
        this.month_in_year =  Config.getValue(object, "month_in_year");


        this.start_day_in_year = Config.getValue(object, "start_day_in_year");
        this.end_day_in_year = Config.isEmpty(this.start_day_in_year) ? null :  this.start_day_in_year + this.days_count - 1;
    }


}

class CalendarDay{
    get day_in_year() {
        return this._day_in_year;
    }

    set day_in_year(value) {
        this._day_in_year = value;
    }
    get day_in_week() {
        return this._day_in_week;
    }

    set day_in_week(value) {
        this._day_in_week = value;
    }
    get day_in_month() {
        return this._day_in_month;
    }

    set day_in_month(value) {
        this._day_in_month = value;
    }
    get month() {
        return this._month;
    }

    set month(value) {
        this._month = value;
    }
    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get images() {
        return this._images;
    }

    set images(value) {
        this._images = value;
    }



    constructor(object){

        this.day_in_month =  Config.getValue(object, "day_in_month");
        this.day_in_week = Config.getValue(object, "day_in_week");
        this.day_in_year = Config.getValue(object, "day_in_year");


        this.month = Config.getObject(object, "month");
        if(!Config.isEmpty(this.day_in_week)) this.name = GLOBAL_CALENDAR.weekdays[this.day_in_week - 1].name;

        this.images = [];
    }






}