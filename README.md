# Developer_Profile_Generator
This is a command-line application that dynamically generates a PDF profile from  the information found on Github accounts. 


## User Walkthrough

When the user opens the  index.js page he/she should navigates to the terminal using command + `. Once the terminal opens at the bottom of the VS code the user should run node index.js to trigger the system to run the code. First, using inquirer package,  the user is prompted to answer two questions, one being the name of the user's profile they want to generate. The second question that the user will be asked is to choose among four colors to use for the background of the PDF profile that will be geenrated. Using fetch node library, the application will make a series of API calls that will go and retrieve information on user Name , Profile image, username, links to user location (Google maps) and User blog. In addition, these API calls retrieve other important information like the number of repos, number of followers, number of stars and number of following.  The apps takes the info it obtained from the user's input and github calls, and inserts them into a HTML template document as a large string.This string is later converted in to a PDF file using pdf-creator-node package package.
   

## How to use:

Step 1 - Open index.js and open terminal within your code editior

Step 2 - Run npm i to install all dependencies indicated in the package.json file.

Step 3 - In terminal run node index.js and this should prompt the user to provide the name of the github account of the user they want to generate a PDF profile for.

![Alt text](/asset/Screenshot_1.jpg)

Step 4 - The app should prompt the user to choose one among four colors for their PDF profile color scheme. 

![Alt text](/asset/Screenshot_2.jpg)

Stept 5 - The app takes the info obtained from the user's input and github calls, insert into a premade HTML document as a large string.

Step 4 - Almost immediately the app puts that string through an HTML to PDF converter (pdf-creator-node package) and generates the PDF file.

![Alt text](/asset/Screenshot_3.jpg)

![Alt text](/asset/Screenshot_4.jpg)

![Alt text](/asset/Screenshot_5.jpg)






