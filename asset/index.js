/*

    1. Prompt user for following
        - Get favorite color
        - Get github username

    2. Make API calls to github
        - Retrieve information on user
            - Name
            - Profile image
            - username
            - Links to 
                - user location (Google maps)
                - User blog
            - User bio
        - Retrieve information on user repos
            - Number of repos
            - Number of followers
            - Number of stars
            - Number of following

    3. Take info we obtained from the user's input and github calls, insert
       into a premade HTML document as a large string;
    4. Put that string (or maybe HTML file) through an HTML to PDF converter
       and write the PDF to disk.

*/

//Get username and favorite color

const inquirer= require('inquirer');
const fetchUrl = require('fetch').fetchUrl;
const fs = require("fs");
const pdf = require("pdf-creator-node");

const htmlGenerator = require("./htmlTemplate");


inquirer.prompt([
    {
      type: "input",
      message: "What is your github user name?",
      name: "githubName"
    },
    {
      type: "list",
      message: "What is your favorite color?",
      name: "favoriteColor",
      choices: ["green" , "blue" , "pink" , "red"]
    }
  ]).then(response => {

    //Call the function that will get the github user info

    getGithubUserInfo(response);

  });


  getGithubUserInfo = (userResponse) => {

    //Do a fetch request to get Github user info

    fetchUrl(`https://api.github.com/users/${userResponse.githubName}`, function(error, meta, body) {

        let bodyJSON = JSON.parse(body.toString());
        // console.log(bodyJSON);

        // let userInfo = {};
        let userInfo = {}

        userInfo.githubName = userResponse.githubName;
        userInfo.favoriteColor = userResponse.favoriteColor;
        userInfo.name = bodyJSON.name;
        userInfo.profileImg = bodyJSON.avatar_url;
        userInfo.locationLink = `https://www.google.com/maps/place/${bodyJSON.location}`;
        userInfo.location = bodyJSON.location;
        userInfo.blog = bodyJSON.blog;
        userInfo.followers = bodyJSON.followers;
        userInfo.following = bodyJSON.following;
        userInfo.repos = bodyJSON.public_repos;

        getGithubUserRepoInfo(userInfo);
        

    })

  }

  getGithubUserRepoInfo = (userInfo) => {

    //Do a fetch request to get Github user info

    fetchUrl(`https://api.github.com/users/${userInfo.githubName}/repos`, function(error, meta, body) {

        let bodyJSON = JSON.parse(body.toString());
        
        let totalStars = 0;

        //Loop through all the repos and get the star count for each and add it to the total
        for (let repo of bodyJSON) {

            // totalStars = totalStars + repo.stargazers_count;
            totalStars += repo.stargazers_count;
        }

        userInfo.totalStars = totalStars;
        console.log(userInfo);

        let htmlString = htmlGenerator.generateHTML(userInfo);
        fs.writeFile("testPDFResume.html", htmlString, function(err) {
            if (err) {
                console.log(err);
            } else {
                //Start the PDF creation process
                var htmlFile = fs.readFileSync("testPDFResume.html", "utf8");
                var options = {
                    "width": "10in" 
                };

                var document = {
                    html: htmlFile,
                    data: {},
                    path: "./output.pdf"
                }

                pdf.create(document, options)
                .then(result => {
                    console.log(result);
                })
                .catch(error => {
                    console.log(error);
                })
            }
        })
        // console.log(`In total all your repos have ${totalStars} stars`);
        //console.log(userInfo);

    });

  }

// TESTING DATA
// let userResponse = {githubName: "armandojhc", favoriteColor: "red"};
// getGithubUserInfo(userResponse);
