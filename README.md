# Dropboxx api

## Things to keep in mind
 - I have used a centralised middelware to check whether the req.body is empty or not
 - for documentaion see the doc folder and open tge index.html page
 - You have to use multipart form data for this please keep that in mind
 - When we fetch the files we will have a JSON array so you have to parse that too along with the request
 - I have tried to make this as modular as possible where. I made various class utilities which you can use which are reusable.
 - You can use the class components anywhere do check them out in the services folder everything is dynamic
 - For using the addNotification method in the util class rember the id column name for the particular table should be "tablenameid" otherwise it wont work make sure you check the addNotifiaction method in the ./services/Utils file before using it understand its parameters and its functionality

## Download
- If you are using vscode it would be helpful if you download the comment anchor extension as it would higlight my todos,note,section etc