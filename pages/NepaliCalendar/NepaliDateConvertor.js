
var bs = [];
var months = [];
function GetYears() {
    if (bs == null) InitializeData();
    return bs.keys;
}

function GetMonths() {
    if (bs == null) InitializeData();
    return months;
}
function IsLeapYear(year) {
    var a = year;
    if (a == 0) {
        if (a % 400 == 0) {
            return true;
        }
        else {
            return false;
        }

    }
    else {
        if (a % 4 == 0) {
            return true;
        }
        else {
            return false;
        }
    }
}
function EngToNep(yy, mm, dd) {
    if (bs == null) InitializeData();
    if (IsRangeEng(yy, mm, dd) == false) {
        return null;
    }
    else {

        // english month data.
        var month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        var lmonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        var def_eyy = 1944; //spear head english date...
        var def_nyy = 2000;
        var def_nmm = 9;
        var def_ndd = 17 - 1; //spear head nepali date...
        var total_eDays = 0;
        var total_nDays = 0; var a = 0; var day = 7 - 1; //all the initializations...
        var m = 0; var y = 0; var i = 0; var j = 0;
        var numDay = 0;

        // count total no. of days in-terms of year
        for (i = 0; i < (yy - def_eyy); i++) { //total days for month calculation...(english)
            if (IsLeapYear(def_eyy + i))
                for (j = 0; j < 12; j++)
                    total_eDays += lmonth[j];
            else
                for (j = 0; j < 12; j++)
                    total_eDays += month[j];
        }

        // count total no. of days in-terms of month
        for (i = 0; i < (mm - 1); i++) {
            if (IsLeapYear(yy))
                total_eDays += lmonth[i];
            else
                total_eDays += month[i];
        }

        // count total no. of days in-terms of date
        total_eDays += dd;


        i = 0; j = def_nmm;
        total_nDays = def_ndd;
        m = def_nmm;
        y = def_nyy;

        // count nepali date from array
        while (total_eDays != 0) {
            a = bs[i][j];
            total_nDays++; //count the days
            day++; //count the days interms of 7 days
            if (total_nDays > a) {
                m++;
                total_nDays = 1;
                j++;
            }
            if (day > 7)
                day = 1;
            if (m > 12) {
                y++;
                m = 1;
            }
            if (j > 12) {
                j = 1; i++;
            }
            total_eDays--;
        }

        numDay = day;

        var nepDate = new NepDate();
        nepDate.Year = y;
        nepDate.Month = m;

        nepDate.Day = total_nDays;
        nepDate.TotalDaysOfMonth = bs[i][j];
        nepDate.WeekDayName = GetDayOfWeek(day);
        nepDate.MonthName = GetNepaliMonth(m);
        nepDate.WeekDay = numDay;
        return nepDate;
    }
}
function GetNepaliMonth(m) {
    return months[m];
}
function GetDayOfWeek(d) {
    var day = "";
    switch (d) {
        case 1:
            day = "Sunday";
            break;

        case 2:
            day = "Monday";
            break;

        case 3:
            day = "Tuesday";
            break;

        case 4:
            day = "Wednesday";
            break;

        case 5:
            day = "Thursday";
            break;

        case 6:
            day = "Friday";
            break;

        case 7:
            day = "Saturday";
            break;
    }
    return day;
}
function InitializeData() {
    bs =
        [
            { key: 0, date: [2000, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31] },
            { key: 1, date: [2001, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
            { key: 2, date: [2002, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30] },
            { key: 3, date: [2003, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31] },
            { key: 4, date: [2004, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31] },
            { key: 5, date: [2005, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
            { key: 6, date: [2006, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30] },
            { key: 7, date: [2007, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31] },
            { key: 8, date: [2008, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31] },
            { key: 9, date: [2009, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
            { key: 10, date: [2010, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30] },
            { key: 11, date: [2011, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31] },
            { key: 12, date: [2012, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30] },
            { key: 13, date: [2013, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
            { key: 14, date: [2014, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30] },
            { key: 15, date: [2015, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31] },
            { key: 16, date: [2016, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30] },
            { key: 17, date: [2017, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
            { key: 18, date: [2018, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30] },
            { key: 19, date: [2019, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31] },
            { key: 20, date: [2020, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30] },
            { key: 21, date: [2021, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
            { key: 22, date: [2022, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30] },
            { key: 23, date: [2023, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31] },
            { key: 24, date: [2024, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30] },
            { key: 25, date: [2025, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
            { key: 26, date: [2026, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31] },
            { key: 27, date: [2027, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31] },
            { key: 28, date: [2028, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
            { key: 29, date: [2029, 31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30] },
            { key: 30, date: [2030, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31] },
            { key: 31, date: [2031, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31] },
            { key: 32, date: [2032, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
            { key: 33, date: [2033, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30] },
            { key: 34, date: [2034, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31] },
            { key: 35, date: [2035, 30, 32, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31] },
            { key: 36, date: [2036, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
            { key: 37, date: [2037, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30] },
            { key: 38, date: [2038, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31] },
            { key: 39, date: [2039, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30] },
            { key: 40, date: [2040, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
            { key: 41, date: [2041, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30] },
            { key: 42, date: [2042, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31] },
            { key: 43, date: [2043, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30] },
            { key: 44, date: [2044, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
            { key: 45, date: [2045, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30] },
            { key: 46, date: [2046, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31] },
            { key: 47, date: [2047, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30] },
            { key: 48, date: [2048, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
            { key: 49, date: [2049, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30] },
            { key: 50, date: [2050, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31] },
            { key: 51, date: [2051, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30] },
            { key: 52, date: [2052, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
            { key: 53, date: [2053, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30] },
            { key: 54, date: [2054, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31] },
            { key: 55, date: [2055, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
            { key: 56, date: [2056, 31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30] },
            { key: 57, date: [2057, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31] },
            { key: 58, date: [2058, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31] },
            { key: 59, date: [2059, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
            { key: 60, date: [2060, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30] },
            { key: 61, date: [2061, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31] },
            { key: 62, date: [2062, 30, 32, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31] },
            { key: 63, date: [2063, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
            { key: 64, date: [2064, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30] },
            { key: 65, date: [2065, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31] },
            { key: 66, date: [2066, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31] },
            { key: 67, date: [2067, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
            { key: 68, date: [2068, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30] },
            { key: 69, date: [2069, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31] },
            { key: 70, date: [2070, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30] },
            { key: 71, date: [2071, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
            { key: 72, date: [2072, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30] },
            { key: 73, date: [2073, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31] },
            { key: 74, date: [2074, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30] },
            { key: 75, date: [2075, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
            { key: 76, date: [2076, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30] },
            { key: 77, date: [2077, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31] },
            { key: 78, date: [2078, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30] },
            { key: 79, date: [2079, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] },
            { key: 80, date: [2080, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30] },
            { key: 81, date: [2081, 31, 31, 32, 32, 31, 30, 30, 30, 29, 30, 30, 30] },
            { key: 82, date: [2082, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30] },
            { key: 83, date: [2083, 31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30] },
            { key: 84, date: [2084, 31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30] },
            { key: 85, date: [2085, 31, 32, 31, 32, 30, 31, 30, 30, 29, 30, 30, 30] },
            { key: 86, date: [2086, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30] },
            { key: 87, date: [2087, 31, 31, 32, 31, 31, 31, 30, 30, 29, 30, 30, 30] },
            { key: 88, date: [2088, 30, 31, 32, 32, 30, 31, 30, 30, 29, 30, 30, 30] },
            { key: 89, date: [2089, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30] },
            { key: 90, date: [2090, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30] }
        ];

    var months = [];
    months.push(1, "Baishak");
    months.push(2, "Jestha");
    months.push(3, "Ashad");
    months.push(4, "Shrawn");
    months.push(5, "Bhadra");
    months.push(6, "Ashwin");
    months.push(7, "kartik");
    months.push(8, "Mangshir");
    months.push(9, "Poush");
    months.push(10, "Magh");
    months.push(11, "Falgun");
    months.push(12, "Chaitra");

}
function NepDate
{
    var Year;
    var Month;
    var TotalDaysOfMonth;
    var Day;
    var _weekDayName;

    var MonthName;
    var WeekDay;
}