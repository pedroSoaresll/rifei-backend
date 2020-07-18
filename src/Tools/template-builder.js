"use strict";
exports.__esModule = true;
const fs = require("fs");
const path = require("path");
// @ts-ignore
const mjml2html = require("mjml");
const mjmlPath = '../Emails/mjml';
const htmlPath = '../Emails/html';
const nameTemplateFiles = fs.readdirSync(path.resolve(__dirname, mjmlPath));
const getFilesFromMjmlDirectory = function (fileName) {
    return fs.readFileSync(path.resolve(__dirname, mjmlPath + "/" + fileName));
};
const transformBufferToString = function (fileBuffer) {
    return Buffer.from(fileBuffer).toString('utf-8');
};
const renderFileToHtml = function (file) { return mjml2html(file).html; };
const saveFileRederized = function (html, index) {
    return fs.writeFileSync(path.resolve(__dirname, htmlPath + "/" + nameTemplateFiles[index].replace('mjml', 'html')), html);
};
nameTemplateFiles
    .map(getFilesFromMjmlDirectory)
    .map(transformBufferToString)
    .map(renderFileToHtml)
    .map(saveFileRederized);
