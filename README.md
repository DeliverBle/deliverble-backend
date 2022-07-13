# 딜리버블 DeliverBle 백엔드
## Tech Stack

* TypeScript/JavaScript
* Node.js & Express
* Jest/Supertest
* TypeORM & MySQL 8.0
* Local Profile: Docker/Docker Compose (MySQL container)
* Production Profile: AWS EC2/RDS (MySQL)/Subnet/Elastic IP/PM2/nginx
* CI/CD Tool: GitHub Action, AWS Codedeploy

![image](https://user-images.githubusercontent.com/41055141/178650150-32602a4e-c9b0-43c3-a801-73f6c86ddd81.png)

## 역할 분담

* [이우진](https://github.com/horsehair): 1순위 API 작성, AWS 인프라 관리 & 배포 담당, 웹 프론트엔드/기획 소통 전담, 서버 QA
* [박진형](https://github.com/sigridjineth): 1순위 API 작성, 2순위 API 작성(로그인 및 유사 태그 반환 기능), 우진 코드리뷰어 & 잔소리꾼

## UML

![image](https://user-images.githubusercontent.com/41055141/178649833-8e978aa9-6a1c-42d1-af14-b6843f1ff121.png)

## A simple ERD

![image-20220713132355959](https://user-images.githubusercontent.com/41055141/178675060-59f99dde-f84c-49e4-b791-59e1250a48ac.png)

## Coding Convention

* Prettier를 사용한다.
* Commit Convention
  * `feat`: (new feature for the user, not a new feature for build script)
  * `fix`: (bug fix for the user, not a fix to a build script)
  * `docs`: (changes to the documentation)
  * `style`: (formatting, missing semi colons, etc; no production code change)
  * `refactor`: (refactoring production code, eg. renaming a variable)
  * `test`: (adding missing tests, refactoring tests; no production code change)
  * `chore`: (updating grunt tasks etc; no production code change)


```
feat: add hat wobble
^--^  ^------------^
|     |
|     +-> Summary in present tense.
|
+-------> Type: chore, docs, feat, fix, refactor, style, or test.
```

## Branch Strategy

* 모든 작업은 GitHub 이슈를 만들고 해당 이슈를 기준으로 작업한다.
* Pull Request를 요청할 때, 제목에 이슈 번호를 명시하여 어떤 이슈를 해결했는지 작성한다.
* 브랜치는 작성자 이름을 기준으로 이슈번호를 병기한다.
* 별도의 develop 브랜치는 없으며, 모든 production 브랜치는 main을 기준으로 작업한다. (CI/CD 기준 main)

```
e.g) woojin/issue-14
```

## 프로젝트 폴더 구조

### v1 (As-is)

```
📦 
├─ .eslintrc.js
├─ .gitignore
├─ .idea
│  ├─ .gitignore
│  ├─ deliverble-backend.iml
│  ├─ misc.xml
│  ├─ modules.xml
│  ├─ vcs.xml
│  └─ workspace.xml
├─ .prettierrc.js
├─ LICENSE
├─ README.md
├─ nodemon.json
├─ ormconfig.ts
├─ package-lock.json
├─ package.json
├─ src
│  ├─ controllers
│  │  ├─ NewsController.ts
│  │  └─ index.ts
│  ├─ entity
│  │  ├─ News.ts
│  │  └─ Tag.ts
│  ├─ index.ts
│  ├─ modules
│  │  ├─ responseMessage.ts
│  │  ├─ statusCode.ts
│  │  └─ util.ts
│  ├─ repository
│  │  └─ NewsRepository.ts
│  ├─ routes
│  │  ├─ NewsRouter.ts
│  │  └─ index.ts
│  ├─ service
│  │  ├─ NewsService.ts
│  │  └─ index.ts
│  ├─ shared
│  │  └─ common
│  │     ├─ Category.ts
│  │     ├─ Channel.ts
│  │     ├─ Gender.ts
│  │     ├─ Name.ts
│  │     ├─ Suitability.ts
│  │     └─ utils.ts
│  ├─ types.ts
│  ├─ util
│  │  └─ insertNews.ts
│  └─ vo
│     └─ Time.ts
└─ tsconfig.json
```

### v2 (To-be)

```
📦 
├─ .eslintrc.js
├─ .gitignore
├─ .idea
│  ├─ .gitignore
│  ├─ deliverble-backend.iml
│  ├─ misc.xml
│  ├─ modules.xml
│  ├─ vcs.xml
│  └─ workspace.xml
├─ .prettierrc.js
├─ LICENSE
├─ README.md
├─ nodemon.json
├─ ormconfig.ts
├─ package-lock.json
├─ package.json
├─ src
│  ├─ entity
│  │  └─ News
│  │       └─ web
│  │       └─ domain
│  │       └─ repository
│  │       └─ service
│  │  └─ Tag
│  │  └─ User
│  ├─ modules
│  ├─ routes
│  ├─ shared
│  │  └─ common
│  ├─ types.ts
│  ├─ util
│  └─ vo
└─ tsconfig.json
```

## API 명세서

* [Mock API 명세서](https://www.notion.so/Mock-API-8c64a502f6e34b868fa002cf4587ec02) 구현 완료
* [API v1 명세서](https://www.notion.so/v1-16120d6874b84ab5813fde13eae7982e) 구현 완료
* API v2 명세서: TBD
  * 카카오 로그인 작업 중
