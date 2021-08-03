define(function (require) {
    var check = require('Check');
    var count = 0;
    return {
        init: function (id, params) {
            var base = params.viewModel;
        
            if (!base.id()) {
                count += 1;
                base.id = ko.observable('');
                base.id('monthpicker_' + count.toString());
            }
            id = base.id();
            var subscribe = function () {
                if ($('#' + id)[0] == null) {
                    setTimeout(function () {
                        subscribe();
                    }, 100);
                    return;
                } else {
                    $("#" + id).kendoDatePicker({
                        culture: "zh-CN",
                        start: "year",
                        // defines when the calendar should return date
                        depth: "year",
                        // display month and year in the input
                        format: "yyyy/MM",
                        // specifies that DateInput is used for masking the input element
                        dateInput: false
                    });
                }
            };
            subscribe();
        },
        calendarKeypress: check.OnlyNumPress,
        calendarFocus: function (vm, e) {
            calendarInput = this.viewModel;
            if (calendarInput() == '' || calendarInput() == null) return;
            calendarInput(calendarInput().replace(/\//g, ''));
            setTimeout(function () {
                $(e.currentTarget).select().css('ime-mode', 'disabled');
            }, 50);
            if (calendarInput.event.focus != null) {
                calendarInput.event.focus(vm, e);
            }
        },
        calendarBlur: function (vm, e) {
            if (calendarInput() == '' || calendarInput() == null) return;
            if (calendarInput.event.blur != null) {
                calendarInput.event.blur(vm, e);
            }
        }
    };
});