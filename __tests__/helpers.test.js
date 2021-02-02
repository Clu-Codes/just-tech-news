test('format_date() returns a date string', () => {
    const date = new Date ('2020-03-20 16:12:03');

    expect(format_date(date)).toBe('3/20/2020');
});

test('format_plural() returns proper pluralization', () => {
    expect(format_plural("Tiger", 2)).toBe('Tigers');
});

test('format_plural() returns proper singular', () => {
    expect(format_plural("Lion", 1)).toBe('Lion');
});

test('format_url() returns shortened URL', () => {
    expect(format_url("https://www.testexample.com/?very-test-like")).toBe("testexample.com");
})


const {format_date, format_plural, format_url } = require('../utils/helpers');