/* eslint-disable linebreak-style */
const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger_output.json";
const endpointsFile = ["./server"];

swaggerAutogen(outputFile,endpointsFile);