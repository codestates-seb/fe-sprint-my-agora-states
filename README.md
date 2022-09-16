# fe-sprint-my-agora-states

local repo로 remote repo의 내용을 pull하는 방법으론 git clone을 통해 복제하였음.


git clone 

git init 
git remote add origin <url>
git pull origin main(default branch)


git clone을 통해 pull해왔기 때문에 자동적으로 local repo에서  remote repo를 부르는 이름은 origin으로 생성 되었다.

local branch variants를 생성하여 해당 브렌치에서 작성하였다
  
fe-sprint-my-agora-states git:(variants) git remote show origin
* remote origin
  Fetch URL: git@github.com:bakjonghyo52/fe-sprint-my-agora-states.git
  Push  URL: git@github.com:bakjonghyo52/fe-sprint-my-agora-states.git
  HEAD branch: main
  Remote branch:
    main tracked
  Local branch configured for 'git pull':
    main merges with remote main
  Local ref configured for 'git push':
    main pushes to main (up to date)

fe-sprint-my-agora-states git:(variants) git remote show origin
* remote origin
  Fetch URL: git@github.com:bakjonghyo52/fe-sprint-my-agora-states.git
  Push  URL: git@github.com:bakjonghyo52/fe-sprint-my-agora-states.git
  HEAD branch: main
  Remote branches:
    main     tracked
    variants tracked
  Local branches configured for 'git pull':
    main     merges with remote main
    variants merges with remote variants
  Local refs configured for 'git push':
    main     pushes to main     (up to date)
    variants pushes to variants (up to date)
