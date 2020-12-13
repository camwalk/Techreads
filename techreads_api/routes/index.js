var express = require('express');
var router = express.Router();
var session = require('express-session');
var passport = require('passport');
var bodyParser = require('body-parser');
var LocalStrategy = require('passport-local').Strategy;

// CSWDConf API version 1.0
var users =[
    {
        "id": "1",
        "username": ["NeilS"], 
        "password" : "Pa$$w0rd",
        "firstname" : "Simon",
        "lastname" : "Neil",
        //this should be corrected once interests have been defined (categories?)
        "interests": [5,4],
        // "history" : [
        //     {},
        // ]
    }
]

var books =[
    {
        "id": "1",
        "authors": ["David Flanagan"], 
        "title": "JavaScript:The Definitive Guide, 7th Edition", 
        "description": "JavaScript is the programming language of the web and is used by more software developers today than any other programming language. For nearly 25 years this best seller has been the go-to guide for JavaScript programmers. The seventh edition is fully updated to cover the 2020 version of JavaScript, and new chapters cover classes, modules, iterators, generators, Promises, async/await, and metaprogramming. You'll find illuminating and engaging example code throughout. This book is for programmers who want to learn JavaScript and for web developers who want to take their understanding and mastery to the next level.",
        "publisher": "O'Reilly", 
        "year": "2020",
        "isbn": "978-1491952023",
        "category": "JavaScript",
        "ratings": [5,4],
        "reviews" : [
            {"reviewer":"anon1", "review": "Great book, very comprehensive"},
            {"reviewer":"anon2", "review": "Tells you everything you need to know about JavaScript"},
        ]
    },
    {
        "id": "2",
        "authors": ["David Herron"], 
        "title": "Node.js Web Development, 5th Edition", 
        "description": "Build scalable web applications using Node.js, Express.js, and the latest ECMAScript techniques, along with deploying applications with AWS and Docker with this updated fifth edition.",
        "publisher": "Packt Publishing", 
        "year": "2020",
        "isbn": "978-1838987572",
        "category": "Full-stack",
        "ratings": [2,3,3,4,5,2,3,3,2,4,4,5,4,3,5,4,2],
        "reviews" : [
            {"reviewer":"anon", "review": "Very useful and up to date"},
        ]
    },
    {
        "id": "3",
        "authors": ["Eve Porcello", "Alex Banks"], 
        "title": "Learning React: Modern Patterns for Developing React Apps", 
        "description": "If you want to learn how to build efficient React applications, this is your book. Ideal for web developers and software engineers who understand how JavaScript, CSS, and HTML work in the browser, this updated edition provides best practices and patterns for writing modern React code. No prior knowledge of React or functional programming is necessary.",
        "publisher": "O'Reilly", 
        "year": "2020",
        "isbn": "978-1492051725",
        "category": "React",
        "ratings": [3,5,4,4,2,4,4,4,5,5,1,2,4,3],
        "reviews" : [
            {"reviewer":"anon1", "review": "I read this cover to cover, it was amazing"},
            {"reviewer":"anon2", "review": "Really good book for modern React developers"},
            {"reviewer":"anon3", "review": "Upea kirja, erittäin kattava"}
        ]
    },
    {
        "id": "4",
        "authors": ["Aristeidis Bampakos", "Pablo Deeleman"], 
        "title": "Learning Angular: A no-nonsense beginner's guide to building web applications with Angular 10 and TypeScript", 
        "description": "Angular, loved by millions of web developers around the world, continues to be one of the top JavaScript frameworks thanks to its regular updates and new features that enable fast, cross-platform, and secure frontend web development. With Angular, you can achieve high performance using the latest web techniques and extensive integration with web tools and integrated development environments (IDEs). Updated to Angular 10, this third edition of the Learning Angular book covers new features and modern web development practices to address the current frontend web development landscape. ",
        "publisher": "Packt Publishing", 
        "year": "2020",
        "isbn": "978-1492051725",
        "category": "Angular",
        "ratings": [4,4,4,3,3,3,5,5,2,1,1,4,5,4,3,3,3,3,3,3],
        "reviews" : [
            {"reviewer":"anon", "review": "Diz tudo o que você precisa saber sobre Angular"}
        ]
    },
    {
        "id": "5",
        "authors": ["Sebastian Grebe"], 
        "title": "Hands-On Full-Stack Web Development with GraphQL and React", 
        "description": "React, one of the most widely used JavaScript frameworks, allows developers to build fast and scalable front end applications for any use case. GraphQL is the modern way of querying an API. It represents an alternative to REST and is the next evolution in web development. Combining these two revolutionary technologies will give you a future-proof and scalable stack you can start building your business around.",
        "publisher": "Packt Publishing", 
        "year": "2019",
        "isbn": "978-1789134520",
        "category": "Full-stack",
        "ratings": [4,5,5,5,3,2,4,5,4,4,4,3,3,5,4,4,3,1],
        "reviews" : []
    },
    {
        "id": "6",
        "authors": ["Marc Garreau", "Will Faurot"], 
        "title": "Redux in Action", 
        "description": "With Redux in Action, you'll discover how to integrate Redux into your React application and development environment, write custom middleware, and optimize for performance.",
        "publisher": "Manning", 
        "year": "2018",
        "isbn": "978-1617294976",
        "category": "React",
        "ratings": [4,2,4,5,2,3,3,3,5,2,2,4,5,4,3,4,4,4,2],
        "reviews" : [
            {"reviewer":"anon1", "review": "This book is the best thing ever in the entire world"},
            {"reviewer":"anon2", "review": "Ag innse dhut a h-uile dad a dh ’fheumas tu a bhith agad mu JavaScript"},
        ]
    },
    {
        "id": "7",
        "authors": ["Kyle Simpson"], 
        "title": "You Don't Know JS: ES6 & Beyond", 
        "description": "No matter how much experience you have with JavaScript, odds are you don’t fully understand the language. As part of the You Don’t Know JS series, this compact guide focuses on new features available in ECMAScript 6 (ES6), the latest version of the standard upon which JavaScript is built.",
        "publisher": "O'Reilly", 
        "year": "2016",
        "isbn": "978-1491904244",
        "category": "JavaScript",
        "ratings": [5,2,2,2,2,3,1,1,1,3,4,2,5,1,2,2,2],
        "reviews" : [
            {"reviewer":"anon1", "review": "This is good but getting a bit out of date"},
            {"reviewer":"anon2", "review": "Braw!"}
        ]
    },
    {
        "id": "8",
        "authors": ["Salvatore Loreto", "Simon Pietro Romano"], 
        "title": "Real-Time Communication with WebRTC: Peer-to-Peer in the Browser", 
        "description": "Deliver rich audio and video real-time communication and peer-to-peer data exchange right in the browser, without the need for proprietary plug-ins. This concise hands-on guide shows you how to use the emerging Web Real-Time Communication (WebRTC) technology to build a browser-to-browser application, piece by piece.",
        "publisher": "O'Reilly", 
        "year": "2014",
        "isbn": "978-1449371876",
        "category": "Real-time",
        "ratings": [5,5,5,3,3,3,5,5,5,3,3,3,5,5,3,3,3,3,5],
        "reviews" : [
            {"reviewer":"anon1", "review": "Quite old now but still a really useful guide to an important technology"},
            {"reviewer":"anon2", "review": "Makes a complex technology clear and understandable"},
            {"reviewer":"anon3", "review": "Fac universa artes patet quod facile intellegi."}
        ]
    },
    {
        "id": "9",
        "authors": ["Andrew Lombardi"], 
        "title": "WebSocket", 
        "description": "Until recently, creating desktop-like applications in the browser meant using inefficient Ajax or Comet technologies to communicate with the server. With this practical guide, you’ll learn how to use WebSocket, a protocol that enables the client and server to communicate with each other on a single connection simultaneously. No more asynchronous communication or long polling!.",
        "publisher": "O'Reilly", 
        "year": "2015",
        "isbn": "978-1449369279",
        "category": "Real-time",
        "ratings": [2,2,2,4,2,4,2,4,2,4,4,4,4,4,4,4,2,4],
        "reviews" : [
            {"reviewer":"anon", "review": "Quite good"},
        ]
    },
    {
        "id": "10",
        "authors": ["Frank Zammemetti"], 
        "title": "Modern Full-Stack Development: Using TypeScript, React, Node.js, Webpack, and Docker", 
        "description": "React is one of the most popular web development tools available today, and Node.js is extremely popular for server-side development.  The fact that both utilize JavaScript is a big selling point, but as developers use the language more, they begin to recognize the shortcomings, and that’s where TypeScript comes in and why it’s gaining in popularity quickly.  Add Webpack and Docker to the mix, and you’ve got a potent full development stack on which to build applications.",
        "publisher": "Apress", 
        "year": "2020",
        "isbn": "978-1484257371",
        "category": "Full-stack",
        "ratings": [],
        "reviews" : [
            {"reviewer":"anon1", "review": "Very up to date and covers a lot of ground"},
            {"reviewer":"anon2", "review": "Comprehensive, but could be more clearly written"},
        ]
    },
    {
        "id": "11",
        "authors": ["Daniel Bugl"], 
        "title": "Learn React Hooks: Build and refactor modern React.js applications using Hooks", 
        "description": "React Hooks revolutionize how you manage state and effects in your web applications. They enable you to build simple and concise React.js applications, along with helping you avoid using wrapper components in your applications, making it easy to refactor code.",
        "publisher": "Packt Publishing", 
        "year": "2019",
        "isbn": "978-1838641443",
        "category": "React",
        "ratings": [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
        "reviews" : [
            {"reviewer":"anon1", "review": "Really interesting and well written"},
            {"reviewer":"anon2", "review": "I didn't get the point of this at all, I prefer to use Redux"},
            {"reviewer":"anon3", "review": "Worth reading"}
        ]
    },
    {
        "id": "12",
        "authors": ["Matt Frisbie"], 
        "title": "Professional JavaScript for Web Developers", 
        "description": "Professional JavaScript for Web Developers is the essential guide to next-level JavaScript development. Written for intermediate-to-advanced programmers, this book jumps right into the technical details to help you clean up your code and become a more sophisticated JavaScript developer. From JavaScript-specific object-oriented programming and inheritance, to combining JavaScript with HTML and other markup languages, expert instruction walks you through the fundamentals and beyond.",
        "publisher": "Wrox", 
        "year": "2019",
        "isbn": "978-1119366447",
        "category": "JavaScript",
        "ratings": [4,3,3,4,2,3,5,4,3,2,1,2,3,4,5,3,3,3],
        "reviews" : [
            {"reviewer":"anon1", "review": "Comprehensive, a really good guide to modern JavaScript"},
            {"reviewer":"anon2", "review": "I didn't get the point of this at all, I prefer to use Redux"},
            {"reviewer":"anon3", "review": "Worth reading"}
        ]
    },
    {
        "id": "13",
        "authors": ["Eve Porcello", "Alex Banks"], 
        "title": "Learning GraphQL: Declarative Data Fetching for Modern Web Apps", 
        "description": "GraphQL, a data query language that provides an alternative to REST and ad-hoc webservice architectures, is the most revolutionary technology for data fetching since Ajax. Just as React has changed the way web developers approach UI, GraphQL will change the way web developers work with data over HTTP.",
        "publisher": "O'Reilly", 
        "year": "2018",
        "isbn": "978-1492030713",
        "category": "Full-stack",
        "ratings": [1,2,3,4,5,1,2,3,4,5,1,2,3,4,5],
        "reviews" : [
            {"reviewer":"anon", "review": "GraphQL is a really interesting technology for APIs and this book explains it very well"},
        ]
    },
    {
        "id": "14",
        "authors": ["Shama Hoque"], 
        "title": "Full-Stack React Projects: Learn MERN stack development by building modern web apps using MongoDB, Express, React, and Node.js", 
        "description": "Facebook's React combined with industry-tested, server-side technologies, such as Node, Express, and MongoDB, enables you to develop and deploy robust real-world full-stack web apps. This updated second edition focuses on the latest versions and conventions of the technologies in this stack, along with their new features such as Hooks in React and async/await in JavaScript. The book also explores advanced topics such as implementing real-time bidding, a web-based classroom app, and data visualization in an expense tracking app.",
        "publisher": "Packt Publishing", 
        "year": "2020",
        "isbn": "978-1839215414",
        "category": "Full-stack",
        "ratings": [4,4,4,4,4,4,4,4,4,4,4,4,4,1,5],
        "reviews" : [
            {"reviewer":"anon1", "review": "This is probably the worst £20 I've spent since, well . . . maybe ever. The book doesn't give any background on actually learning core concepts of any of the development stack. There's no explanation given of classes/methods commonly used in React. It gives no background on what any of the NodeJS server components are doing, what's actually happening under the hood with Webpack, etc."},
            {"reviewer":"anon2", "review": "This is a great book! "}
        ]
    },
    {
        "id": "15",
        "authors": ["Martine Dowden", "Michael Dowden"], 
        "title": "Architecting CSS: The Programmer’s Guide to Effective Style Sheets", 
        "description": "​Leverage various CSS features in combination with popular architectures in order to bring your style sheets back under your control. While CSS is the primary technology used for building beautiful web user interfaces, the style sheet files themselves are often quite ugly; left chaotic and unstructured through lack of a consistent architectural approach. By addressing the structure of your style sheets in the same way that you do with code, see how it is possible to create style rules that are clean and easy to read. Dig deep into CSS fundamentals and learn how to use the available selectors to build powerful rules.",
        "publisher": "Apress", 
        "year": "2020",
        "isbn": "978-1484257494",
        "category": "CSS",
        "ratings": [4,3,2,4,4,4,3,5,4,2,3,5,5,4,3,3,4,5,5,5,3],
        "reviews" : [
            {"reviewer":"anon1", "review": "ਹੁਸ਼ਿਆਰ"},
            {"reviewer":"anon2", "review": "Блестящий"},
            {"reviewer":"anon3", "review": "شاندار"},
            {"reviewer":"anon4", "review": "훌륭한"}
        ]
    },
    {
        "id": "16",
        "authors": ["Andrew Hoffman"], 
        "title": "Web Application Security: Exploitation and Countermeasures for Modern Web Applications", 
        "description": "​While many resources for network and IT security are available, detailed knowledge regarding modern web application security has been lacking-until now. This practical guide provides both offensive and defensive security concepts that software engineers can easily learn and apply. Andrew Hoffman, a senior security engineer at Salesforce, introduces three pillars of web application security: recon, offense, and defense. You'll learn methods for effectively researching and analyzing modern web applications-including those you don't have direct access to. You'll also learn how to break into web applications using the latest hacking techniques. Finally, you'll learn how to develop mitigations for use in your own web applications to protect against hackers.",
        "publisher": "O'Reilly", 
        "year": "2020",
        "isbn": "978-1492053118",
        "category": "Security",
        "ratings": [5,5,5,5,5,5,5,5,5,5,5,4,4,4,4,3,3,2,1],
        "reviews" : [
            {"reviewer":"anon1", "review": "Very detailed and informative"},
            {"reviewer":"anon2", "review": "I didn't undestand a word of this"},
        ]
    },
    {
        "id": "17",
        "authors": ["Eric Meyer", "Estelle Weyl"], 
        "title": "CSS: The Definitive Guide: Visual Presentation for the Web", 
        "description": "​If you're a web designer or app developer interested in sophisticated page styling, improved accessibility, and saving time and effort, this book is for you. This revised edition provides a comprehensive guide to CSS implementation, along with a thorough review of the latest CSS specifications. CSS is a constantly evolving language for describing the presentation of web content on screen, printers, speech synthesizers, screen readers, and chat windows. It is used by all browsers on all screen sizes on all types of IoT devices, including phones, computers, video games, televisions, watches, kiosks, and auto consoles. ",
        "publisher": "O'Reilly", 
        "year": "2020",
        "isbn": "978-1449393199",
        "category": "CSS",
        "ratings": [1,2,5,4,3,4,5,4,3,4,5,4,3,4,5,4,3,4],
        "reviews" : [
            {"reviewer":"anon", "review": "A classic book and, indeed, a definitive guide"}
        ]
    },
    {
        "id": "18",
        "authors": ["Prabrath Siriwardena"], 
        "title": "Advanced API Security: OAuth 2.0 and Beyond", 
        "description": "Security must be an integral part of any development project. This book shares best practices in designing APIs for rock-solid security. API security has evolved since the first edition of this book, and the growth of standards has been exponential. OAuth 2.0 is the most widely adopted framework that is used as the foundation for standards, and this book shows you how to apply OAuth 2.0 to your own situation in order to secure and protect your enterprise APIs from exploitation and attack.",
        "publisher": "Apress", 
        "year": "2019",
        "isbn": "978-1484220498",
        "category": "Security",
        "ratings": [4,4,4,3,3,3,2,2,2,1,1,1,1,1,1,1,2,2,3,5,5,5,5,5,],
        "reviews" : []
    }
]

//added to user instead
//var interests = []

var history = [
    {"user":"anon", "book":1, "date": new Date()}
]

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// ENDPOINTS
/* GET all details of all users */
router.get('/users', function(req, res) { 
    users.length==0 ? res.status(404): res.status(200);
    res.send(users);
})

/* GET user by id */
router.get('/users/:id', function(req, res) { 
    var selectedUser = users.filter(function(user) {
      return user.id == req.params["id"];
    });
    selectedUser.length==0 ? res.status(404): res.status(200);
    res.send(selectedUser);
})

/* GET user by username */
router.get('/users/:username', function(req, res) { 
    var selectedUser = users.filter(function(user) {
      return user.id == req.params["id"];
    });
    selectedUser.length==0 ? res.status(404): res.status(200);
    res.send(selectedUser);
})

/* authenticate user */
passport.serializeUser(function(user, done) {
    if(user) done(null, user);
});
  
passport.deserializeUser(function(id, done) {
    done(null, id);
});

router.use(session({ secret: 'anything', resave: true, saveUninitialized: true }));
router.use(passport.initialize());
router.use(passport.session());
router.use(bodyParser.json());

var auth = () => {
    return (req, res, next) => {
        passport.authenticate('local', (error, user, info) => {
            if(error) res.status(400).json({"statusCode" : 400 ,"message" : error});
            req.login(user, function(error) {
                if (error) return next(error);
                next();
            });
        })(req, res, next);
    }
}

router.post('/authenticate', auth() , (req, res) => {
    res.status(200).json({"statusCode" : 200 ,"user" : req.user});
});

// hardcoded solution
passport.use(new LocalStrategy(
    function(username, password, done) {
        var selectedUser = users.find(function (user) {
            return user.username == username;
        });
        if (selectedUser.password == password)
        {
            return done(null, username);
        }
        else
        {
            return done("unauthorized access", false);
        }
    }
));

/* get login status - may not be used */
var isLoggedIn = (req, res, next) => {
    console.log('session ', req.session);
    if(req.isAuthenticated()){
        //console.log('user ', req.session.passport.user)
        return next()
    }
    return res.status(400).json({"statusCode" : 400, "message" : "not authenticated"})
}
router.get('/getLoginStatus', isLoggedIn, (req, res) => {
    res.json("data is")
})

/* GET all details of all books */
router.get('/books', function(req, res) { 
    books.length==0 ? res.status(404): res.status(200);
    res.send(books);
})

/* GET distinct categories for books */
router.get('/books/categories', function(req, res) { 
    var categories = []
    books.forEach(x => categories.push(x.category));
    categories = categories.filter((v, i, a) => a.indexOf(v) === i);
    categories.length==0 ? res.status(404): res.status(200);
    res.send(categories);
  })
  
/* GET book by id */
router.get('/books/:id', function(req, res) { 
    var selectedbooks = books.filter(function(book) {
      return book.id == req.params["id"];
    });
    selectedbooks.length==0 ? res.status(404): res.status(200);
    res.send(selectedbooks);
})

/* GET books by search term in description or title (TBD) */
router.get('/books/search/:term', function(req, res) { 
  var selectedbooks = books.filter(function(book) {
    var result = (book.description.toLowerCase().search(req.params["term"].toLowerCase())>=0) || 
        (book.title.toLowerCase().search(req.params["term"].toLowerCase())>=0);
    return result;
  });
  selectedbooks.length==0 ? res.status(404): res.status(200);
  res.send(selectedbooks);
})

/* GET books by category */
router.get('/books/category/:term', function(req, res) { 
    var selectedbooks = books.filter(function(book) {
      return book.category.toLowerCase().search(req.params["term"].toLowerCase())>=0;
    });
    selectedbooks.length==0 ? res.status(404): res.status(200);
    res.send(selectedbooks);
  })

/* GET books by author */
router.get('/books/authors/:term', function(req, res) { 
  var selectedbooks = books.filter(function(book) {
    return book.authors.find(el => el.toLowerCase().search(req.params["term"].toLowerCase())>=0);
  });
  selectedbooks.length==0 ? res.status(404): res.status(200);
  res.send(selectedbooks);
})

/* POST new rating for book by id */
router.post('/books/rate/:id/:rating', function(req, res) { 
  var id = req.params["id"];
  var rating = Number(req.params["rating"]);
  var book = books.find(x => x.id == id);
  book.ratings.push(rating);
  res.status(202);
  res.send(book);
})

/* POST new review for book by id */
/* body should be of the form {"reviewer":"anon", "review":"Great book"}  */
router.post('/books/review/:id', function(req, res) { 
  var id = req.params["id"];
  var book = books.find(x => x.id == id);
  var newreview = req.body;
  book.reviews.push(newreview);     
  res.status(202);
  res.send(book);
})

/* GET history by user */
router.get('/history/:user', function(req, res) { 
  res.status(200);
  var selectedreads = history.filter(function(read) {
    return read.user == req.params["user"];
  });
  selectedreads.length==0 ? res.status(404): res.status(200);
  res.send(selectedreads);
})

/* POST new read to history by user */
/* body should be of the form {"user":"anon", "book":2, "date":"2020-11-10T13:54:39.040Z"} */
router.post('/history/', function(req, res) { 
   //var id = req.params["id"];
    var newread = req.body;
    history.push(newread);     
    res.status(202);
    res.send(newread);
  })

/* GET interests by user */
router.get('/interests/:user', function(req, res) { 
    var selectedinterests = interests.filter(function(topic) {
        return topic.user == req.params["user"];
    });
    selectedinterests.length==0 ? res.status(404): res.status(200);
    res.send(selectedinterests);
})


/* POST new interest by user */
/* body should be of the form {"user":"anon", "topic":"JavaScript"} */
router.post('/interests/', function(req, res) { 
    var newinterest = req.body;
    interests.push(newinterest);     
    res.status(202);
    res.send(newinterest);
})

module.exports = router;
