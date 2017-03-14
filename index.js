// generator basic
{
  console.log('\n ***** generators to pause function execution ***** \n');

  function* createLogger() {
    console.log('start');
    yield
    console.log('second');
    yield
    console.log('Third');  
    yield
    console.log('end');  
  }

  const logger = createLogger();
  logger.next();
  logger.next();
  logger.next();
  logger.next();
}

// send data to and from generators
{
  console.log('\n ***** send data to and from generators ***** \n');

  function* createHello() {
    const text = yield;
    console.log(`hello ${text}`);
    yield 'other value';
  }

  const hello = createHello();
  console.log(hello.next());
  console.log(hello.next('World'));
}

// handling error
{
  console.log('\n ***** error handling ***** \n');

  function* doSometing() {
    try {
      const text = yield
      console.log(`hello ${text}`);
    } catch (err) {
      console.log(err);
    }
  }

  const something = doSometing();
  something.next();
  // something.next('world');
  something.throw('some error');
}


// iterate over generators
{
  console.log('\n ***** iterate over generators ***** \n');

  function* createCounter() {
    yield 1
    yield 2
    yield 3
    yield 4
    yield 5
  }

  const counter = createCounter();
  for (const i of counter) {
    console.log(i);
  }
}

// delegate generator iteration control
{
  console.log('\n ***** delegate generator iteration control ***** \n');

  function* create3To4Counter() {
    yield 3
    yield 4
  }

  function* createInitCounter() {
    yield 1
    yield 2
    yield* create3To4Counter()
    yield 5
  }

  for (const i of createInitCounter()) {
    console.log(i);
  }
}

// generators with promise to handle async flows
{
  console.log('\n ***** generators with promise to handle async flows ***** \n');

  const fetch = require('node-fetch');
  const co = require('co');
  const url = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

  function* createQuoteFetcher() {
    const response = yield fetch(url);
    const quote = yield response.json();
    return `${quote.quoteText} - ${quote.quoteAuthor}`;
  }

  const quoteFetcher = co(createQuoteFetcher())
  quoteFetcher.then(quote => console.log(quote));
}