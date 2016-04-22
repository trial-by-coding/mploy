FOLLOW THIS EXACTLY AND SAY SOMETHING IF ANY ISSUES ARISE:

** You find or create a GitHub issue (e.g. 1930-filters) that you want to work on, now what? **

// on dev branch:

—> git pull dev
—> git checkout -b 1930-filters

// on 1930-filters branch:

—> git status
—> git add <files>
—> git commit “Implemented x and y features to do blah blah”
—> git push origin 1930-filters

** yay! Your work is done and this branch is pull-request ready, now what? **

—> git checkout dev
//on dev branch
—> git pull
—> git checkout 1930-filters
// on 1930-filters branch
—> git rebase dev
—> git push origin 1930-filters

-> open a pull request from 1930-filters to dev on GitHub 

** Only one person is responsible for merging dev with master and this happens on Wednesday and Saturday when dev is reviewed and working totally as intended **