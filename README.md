# ConSerV-Inc

GitHub Repository for ConSerV 

##  Download Git On Windows First:

https://gitforwindows.org/

## Git Commands Docs

1. https://dzone.com/articles/top-20-git-commands-with-examples
2. Google for git cli commands docs


**Section A: (Only applicable to repository owner)**

##### Upload existing project to GitHub repository:

1. git init  (initializes empty repository)
2. git add . (adds all files that have been changed to commit list)
3. git commit -m '' (commits all added files with a message)
4. git remote add origin https://github.com/Ben-Tay/Conserv-Inc.git
5. git push origin master -f (need to do force push for some reason but doesnt affect)

**Section B: All Sections except A should be done by everyone**

Section B should only be done once at the start



##### Import codes from Github repository into local environment: 

1. git clone https://github.com/Ben-Tay/Conserv-Inc.git (do this in D:\IonicApps)
2. cd Conserv-Inc
3. git pull origin master (may or may not need but will not affect codes since only importing on first time) 
4. npm install (to install all dependencies)
5. ionic serve (check that u can preview the app)

##### Create your own branch: 

Remember u must be in D:\IonicApps\Conserv-Inc

1. git checkout -b branchname (creates a new branch and switches you to that branch)
2. git checkout branchname (switch to any other branch)

**Section C: (Should be done everytime u want to upload changes to your own branch)**


##### Everytime u make changes in your own branch and want to push your codes to github in your own branch:
1. git branch (check what branch u are on first)
2. git add . (adds all files that have been changed to commit list) or git add ../.. (path of file if you do not want to add all files that have changes)
3. git status
4. git commit -m 'hello' (commits all added files with a message)  
5. git status
6. git pull origin master
7. ionic serve (check after updating codes with master integrated with your codes does the app work)
8. git push origin branchname (pushes your codes to your branch)

**Section D: Branch Merging** (Assuming you have done section C) 

Realistically you would only want to do this when u have finished the feature you are working on

##### Each time you want to make a pull request (merge your branch to the master):

1. git pull origin master (updates your branch/own local project with the master branch codes)

   1.1 Will not affect your codes unless someone else has touched the file you have worked on and merged their changes into master - this may result in a merge conflict
   
   1.2 We often advise to do git pull origin master regularly even if not merging yet so that your branch wont be behind by the master by a lot of commits'
   
2. Assume you have not faced any merge conflict, do git push origin yourbranchname again after updating local project with master branch
3. make a pull request for your branch(it will be shown on the Github repository site itself)
4. select a reviewer who will go through your codes and decide if you should make changes or merge your branch to master
5. If branch is merged, DO NOT DELETE your branch, u can still use the same branch to continue working on other features and make other pull requests in future


##### Assume you face a merge conflict after git pull origin master: (Feel free to ask us if you meet issues with this)]

1. Resolve the merge conflict 

   1.1 Merge conflict errors will be shown in your own local project - you have to resolve them by deleting the lines in files that are stated to have errors in your terminal. 
  
   1.2 Search the internet to see how to resolve
   
2. git add .
3. git commit -m '' 
4. git push origin your branch name
5. make a pull request for your branch(it will be shown on the Github repository site itself)
6. select a reviewer who will go through your codes and decide if you should make changes or merge your branch to master
7. If branch is merged, DO NOT DELETE your branch, u can still use the same branch to continue working on other features and make other pull requests in future


**Section E: Helpful Git Commands**

1. git status (checks added files or files to be committed)
2. git branch (checks what branch you are on)
