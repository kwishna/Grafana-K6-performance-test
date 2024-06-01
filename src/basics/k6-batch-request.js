/**
 * Defines a GET request to the 'https://httpbin.org/get' endpoint.
 */
let req1 = {
  method: "GET",
  url: "https://httpbin.org/get",
};

/**
 * Defines a POST request to the 'https://httpbin.org/post' endpoint with a 'hello' field in the request body and sets the 'Content-Type' header to 'application/x-www-form-urlencoded'.
 */
let req2 = {
  method: "POST",
  url: "https://httpbin.org/post",
  body: {
    hello: "world!",
  },
  params: {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  },
};
let responses = http.batch([req1, req2]);