$(function () {

    const addErrorMessage = (afterElement, msgContent) => {
        let msg = $('<p></p>').addClass('err-msg').text(msgContent);
        afterElement.after(msg);
    }

    const isLeap = (year) => {
        return new Date(year, 1, 29).getDate() === 29;
    }

    const resetErrors = () => {

        const errColorElements = $('.err-color');
        const errMsgElements = $('.err-msg');

        for (element of errColorElements) {
            $(element).removeClass('err-color');
        }

        for (element of errMsgElements) {
            $(element).remove();
        }
    }

    const resetInputErrors = (e) => {

        const target = e.target;

        const inputLabel = $(target).prev();
        const inputErrMsg = $(target).next();

        if ($(target).hasClass('err-color')) {
            $(target).removeClass('err-color');
        }

        if (inputLabel.hasClass('err-color')) {
            inputLabel.removeClass('err-color');
        }

        if (inputErrMsg) {
            inputErrMsg.remove();
        }
    }


    const validation = () => {

        resetErrors();

        const dayInput = $('#day');
        const monthInput = $('#month');
        const yearInput = $('#year');

        const dayLabel = $('#day-label');
        const monthLabel = $('#month-label');
        const yearLabel = $('#year-label');

        const dayInputValue = dayInput.val();
        const monthInputValue = monthInput.val();
        const yearInputValue = yearInput.val();

        const numYears = $('#num-years');
        const wordYears = $('#word-years');
        const numMonths = $('#num-months');
        const wordMonths = $('#word-months');
        const numDays = $('#num-days');
        const wordDays = $('#word-days');


        if (!dayInputValue || (dayInputValue < 1) || (dayInputValue > 31)) {
            dayLabel.addClass('err-color');
            dayInput.addClass('err-color');
            addErrorMessage(dayInput, 'Must be a valid day');
        }

        if (!monthInputValue || monthInputValue < 1 || monthInputValue > 31) {
            monthLabel.addClass('err-color');
            monthInput.addClass('err-color');
            addErrorMessage(monthInput, 'Must be a valid month');
        }

        if (!yearInputValue || yearInputValue < 1 || yearInputValue > new Date().getFullYear()) {
            yearLabel.addClass('err-color');
            yearInput.addClass('err-color');
            addErrorMessage(yearInput, 'Must be a valid year');
        }

        if (monthInputValue == 4 || monthInputValue == 6 ||
            monthInputValue == 9 || monthInputValue == 11) {
            if (dayInputValue > 30) {
                dayLabel.addClass('err-color');
                dayInput.addClass('err-color');
                addErrorMessage(dayInput, 'Must be a valid day');
            }
        }

        if (monthInputValue == 2) {
            if (yearInputValue) {
                if (isLeap(yearInputValue)) {
                    if (dayInputValue > 29) {
                        dayLabel.addClass('err-color');
                        dayInput.addClass('err-color');
                        addErrorMessage(dayInput, 'Must be a valid day');
                    }
                } else {
                    if (dayInputValue > 28) {
                        dayLabel.addClass('err-color');
                        dayInput.addClass('err-color');
                        addErrorMessage(dayInput, 'Must be a valid day');
                    }
                }
            } else {
                if (dayInputValue > 29) {
                    dayLabel.addClass('err-color');
                    dayInput.addClass('err-color');
                    addErrorMessage(dayInput, 'Must be a valid day');
                }
            }
        }

        if ($('.err-color').length > 1 || $('.err-msg').length > 1) {

            numYears.text("- -");
            numMonths.text("- -");
            numDays.text("- -");
            wordYears.text("years");
            wordMonths.text("months");
            wordDays.text("days");

        } else {

            const passedDate = new Date(`${yearInputValue}-${monthInputValue}-${dayInputValue}`);

            const diff = new Date(new Date() - passedDate);

            const years = diff.getFullYear() - 1970;
            const months = diff.getMonth();
            const days = diff.getDate() - 1;

            numYears.text(years);
            numMonths.text(months);
            numDays.text(days);

            if (years === 1) {
                wordYears.text('year');
            } else {
                wordYears.text('years');
            }

            if (months === 1) {
                wordMonths.text('month');
            } else {
                wordMonths.text('months');
            }

            if (days === 1) {
                wordDays.text('day');
            } else {
                wordDays.text('days');
            }

        }
    }

    $('#btn').on('click', validation);

    for (element of $('input')) {
        $(element).on('click', resetInputErrors);
    }

});