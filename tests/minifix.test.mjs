import { minifyContent } from '../lib/handler.mjs';

test('Minifies JavaScript correctly', async () => {
    const input = `function test() { console.log("Hello World"); }`;
    const output = await minifyContent(input, 'js', {});
    expect(output).toBe('function test(){console.log("Hello World")}');
});

test('Minifies CSS correctly', async () => {
    const input = `body { color: red; }`;
    const output = await minifyContent(input, 'css', {});
    expect(output).toBe('body{color:red}');
});

test('Minifies HTML correctly', async () => {
    const input = `<html> <body> <h1> Hello </h1> </body> </html>`;
    const output = await minifyContent(input, 'html', { html: { collapseWhitespace: true } });
    expect(output).toBe('<html><body><h1>Hello</h1></body></html>');
});
