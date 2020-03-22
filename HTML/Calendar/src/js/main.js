
class Calendar {
    constructor(year){
        this.year = year;
        this.january = this.getDaysInMonth(0,this.year);
        this.febrary = this.getDaysInMonth(1,this.year);
        this.march = this.getDaysInMonth(2,this.year);
        this.april = this.getDaysInMonth(3,this.year);
        this.may = this.getDaysInMonth(4,this.year);
        this.june = this.getDaysInMonth(5,this.year);
        this.july = this.getDaysInMonth(6,this.year);
        this.august = this.getDaysInMonth(7,this.year);
        this.september = this.getDaysInMonth(8,this.year);
        this.october =  this.getDaysInMonth(9,this.year);
        this.november = this.getDaysInMonth(10,this.year);
        this.december = this.getDaysInMonth(11,this.year);
        this.allMonths = this.getAllMonths();
    }

    getDaysInMonth(month, year) {
        let weeks = [];
        let date = new Date(Date.UTC(year, month, 1));
        while (date.getUTCMonth() === month) {
            let dateTemp = new Date(date);
            weeks.push({
                dayDate:dateTemp,
                dayWeek:dateTemp.getDay()===0 ? 7 : dateTemp.getDay(),
            });
            date.setUTCDate(date.getUTCDate() + 1);
        }
        return weeks;
    }

    getWeeksInMonth(month) {
        let weeks = [];
        let week = [];
        for(let i=0; i < month.length; i++) {
            week.push(month[i]);
            if (month[i].dayWeek === 7) {
                weeks.push(week);
                week = [];

            } else if (month[i].dayDate === month.length ) {
                weeks.push(week);
                week = [];
            }
        }
        return weeks;
    }

    getAllMonths() {
        let months = [
            this.january,
            this.febrary,
            this.march,
            this.april,
            this.may,
            this.june,
            this.july,
            this.august,
            this.september,
            this.october,
            this.november,
            this.december
        ];
        return months
    }
}
class PersonCalendar extends Calendar {
    constructor(name, sirname, year) {
        super(year);
        this.name = name;
        this.name = sirname;
    }

    getDaysInMonth(month, year) {
        super.getDaysInMonth();
        let weeks = [];
        let date = new Date(Date.UTC(year, month, 1));
        while (date.getUTCMonth() === month) {
            let dateTemp = new Date(date);
            weeks.push({
                dayDate: date.getDate(),
                dayWeek:dateTemp.getDay()===0 ? 7 : dateTemp.getDay(),
                color:''
            });
            date.setUTCDate(date.getUTCDate() + 1);
        }
        return weeks;
    }

    setGreen(month, start, end) {
        for (let i = start-1; i < end-1; i++){
            month[i].color = 'green'
        }
    }

    setRed(month, start, end) {
        for (let i = start-1; i < end-1; i++){
            month[i].color = 'red'
        }
    }

    setBlue(month, start, end) {
        for (let i = start-1; i < end-1; i++){
            month[i].color = 'blue'
        }
    }

    setYellow(month, start, end) {
        for (let i = start-1; i < end-1; i++){
            month[i].color = 'Yellow'
        }
    }
}

let y = new PersonCalendar('Иван','Иванов', 2019);
let r = new PersonCalendar('Катерина','Иванова', 2019);
y.january[1].color = 'green';
r.january[1].color = 'red';
// console.log(y.allMonths[0])
// console.log(r.allMonths[0])
// y.setGreen(y.january,1,10);

document.querySelectorAll('.week').forEach(function (elem) {

    elem.onmouseenter = function () {
        let green = this.querySelectorAll('.day--green');
        let red = this.querySelectorAll('.day--red');
        let yellow = this.querySelectorAll('.day--yellow');

        if (green.length > 0) {
            let card = `
                <div class="days-info">
                    <div class="days-info__person">
                        <img src="src/image/photo-2.png" alt="Person photo">
                        <span>Иван<br>Иванов</span>
                    </div>
                    <div class="days-info__date">
                        <span class="period period--green">09.08.2019 — 23.08.2019 (14д.)</span><br>
                        <span class="days-type">отпуск</span>
                    </div>
                </div>
            `;
            this.insertAdjacentHTML("beforeend", card)
        } else if(red.length > 0) {
            let card = `
                <div class="days-info">
                    <div class="days-info__person">
                        <img src="src/image/photo-2.png" alt="Person photo">
                        <span>Иван<br>Иванов</span>
                    </div>
                    <div class="days-info__date ">
                        <span class="period period--red">09.08.2019 — 23.08.2019 (14д.)</span><br>
                        <span class="days-type">отпуск</span>
                    </div>
                </div>
            `;
            this.insertAdjacentHTML("beforeend", card)
        } else if(yellow.length > 0) {
            let card = `
                <div class="days-info">
                    <div class="days-info__person">
                        <img src="src/image/photo-2.png" alt="Person photo">
                        <span>Иван<br>Иванов</span>
                    </div>
                    <div class="days-info__date ">
                        <span class="period period--yellow">09.08.2019 — 23.08.2019 (14д.)</span><br>
                        <span class="days-type">отпуск</span>
                    </div>
                </div>
            `;
            this.insertAdjacentHTML("beforeend", card)
        }
    };

    elem.onmouseleave = function () {
        let card = this.querySelector('.days-info');
        if (card) card.remove();
    }

});