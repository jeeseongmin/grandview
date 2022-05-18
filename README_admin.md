# A2A apollo project - admin

이 README 파일은 `metatron-app/a2a-admin git` 을 기준으로 설명하고 있습니다.

해당 git은 수정 사항이 있을 때에 dev, prd 서버와 직접적으로 반영되는 git이기 때문에 프론트 및 퍼블리싱 개발을 위한 별도의 git을 운영하는 것을 권장합니다.

1. `admin-front` : a2a 리액트 폴더
2. `admin-html` : a2a 퍼블리싱 폴더

## A2A 프로젝트 실행 방법 (local)

1. `git clone https://github.com/metatron-app/a2a-admin.git`
2. `cd a2a-admin/admin-front`
3. `npm install` or `yarn install`
4. `yarn start`
5. http://localhost:3000 에서 확인

## A2A project stg 및 prd url

- dev와 stg 서버는 분리될 예정.
- dev(stg) : https://atoa-dev.metatron.app/
- prd : https://atoa.metatron.app/

## 프로젝트 배포 방법

- dev와 stg 서버는 분리될 예정.
- dev(stg) : dev 서버에 배포하는 방법은 `a2a 프로젝트 git`(https://github.com/metatron-app/a2a-admin.git)에 push하게 되면 정해진 배포시간에 자동으로 배포됩니다. (Jenkins에서 수동배포도 가능)
- prd : prd 서버에 배포하는 방법은 `a2a 프로젝트 git`에 push한 후 Jenkins에서 수동 배포로 진행합니다. prd 배포 시간은 아침 10시 이전, 점심 12-13시, 저녁 6시 이후입니다.

## Proxy 설정

a2a 프로젝트에서 사용하는 api는 크게 `Tmap api`, `NUGU api`, `상용 backend 개발 API` 세 가지가 있습니다.
(자세한 사항은 관련 문서 참고)

Backend 서버에 api를 요청 시 공통적인 도메인을 붙여줍니다. 이때 proxy 설정을 진행하는데,

stg, dev(분리 예정), prd에 따라 각각

- https://api.a2a.apollo-ai.io -> prd
- https://api-dev.a2a.apollo-ai.io -> stg
- https://api-test.a2a.apollo-ai.io -> dev

로 proxy 설정을 해주어야 정상적으로 api 요청이 진행됩니다.

프로젝트 내에서 Proxy를 설정하는 방법은 `개발 환경(로컬/서버 배포)`에 따라 달라집니다.

1. **로컬**

   src/setupProxy.js 파일에서 proxy를 설정합니다.

2. **서버 배포**

   run.sh라는 쉘 스크립트를 통해 서버에 배포될 때 server.js 파일이 실행되는데, 이때 server.js 내에 작성되어있는 코드에 따라 proxy를 설정합니다.

## env 파일

Proxy 설정 이외에도 API 요청을 위해서는 환경에 따라 다른 도메인을 위한 API Key 관리가 필요합니다.

더불어 local, dev, prd에 따라 테스트 유저 혹은 각종 설정을 달리해야 하기 때문에 각 환경에 따른 .env 파일을 두어 관리를 하고 있습니다.
(`.env.local`, `.env.development`, `.env.production`)

## 퍼블리싱 적용

admin-html이라는 퍼블리싱 폴더에서 퍼블리싱 결과물을 확인할 수 있습니다.

`admin-html/client/dist/html/@Index.html` 파일을 열게 되면, 퍼블리싱된 페이지 별 마크업을 관련 html 파일에서 확인할 수 있습니다.

매번 퍼블리싱 폴더가 git 업데이트될 때마다 최신 상태로 pull한 뒤에, `admin-html/client/dist/css` 폴더 또한 리액트 폴더의 `admin-front/src/assets/css` 경로로 최신화시켜줍니다. (images, fonts 업데이트 시에는 css와 마찬가지로 최신화)
