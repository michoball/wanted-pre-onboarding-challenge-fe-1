# :: 원티드 프리온보딩 챌린지 프론트엔드 코스 과제 
>  원티드에서 진행한 프리온보딩 챌린지 사전과제 

원티드에서 제공한 가상 Auth & Todo API를 이용하여 간단한 Todo APP 을 구현하였다. 

## 실행 방법

```sh
git clone // this repository
cd this file location
npm install 
npm run dev 
# front : http://localhost:3000  server : http://localhost:8080
```
## 구현 요구사항 목록

### Login / SignUP
---

- [x] 최소한 이메일, 비밀번호 input, 제출 button을 갖도록 구성해주세요
- [x] 이메일 조건 : 최소 @, . 포함
- [x] 비밀번호 조건 : 8자 이상 입력
- [x] 이메일과 비밀번호가 모두 입력되어 있고, 조건을 만족해야 제출 버튼이 활성화 되도록 해주세요
- [x] 응답으로 받은 토큰은 로컬 스토리지에 저장해주세요
- [x] 다음 번에 로그인 시 토큰이 존재한다면 루트 경로로 리다이렉트 시켜주세요
- [ ] 어떤 경우든 토큰이 유효하지 않다면 사용자에게 알리고 로그인 페이지로 리다이렉트 시켜주세요
 
 
 ### Todo List
---

- [ ] 목록 / 상세 영역으로 나누어 구현해주세요
- [x] Todo 목록을 볼 수 있습니다.
- [x] Todo 추가 버튼을 클릭하면 할 일이 추가 됩니다.
- [x] Todo 수정 버튼을 클릭하면 수정 모드를 활성화하고, 수정 내용을 제출하거나 취소할 수 있습니다.
- [x] Todo 삭제 버튼을 클릭하면 해당 Todo를 삭제할 수 있습니다.
- [x] 새로고침을 했을 때 현재 상태가 유지되어야 합니다.
- [ ] 개별 Todo를 조회 순서에 따라 페이지 뒤로가기를 통하여 조회할 수 있도록 해주세요.
- [x] 수정되는 Todo의 내용이 목록에서도 실시간으로 반영되어야 합니다


## 사용 프레임 워크 및 라이브러리

react-query  :  react-query 학습 및 서버 통신 부분 구현을 위해 선택했다.
axios : 서버 비동기 통신을 간편히 다루기 위해 사용했습니다. 

## SRC 폴더 구조

```
📦src
 ┣ 📂UI
 ┃ ┣ 📜FormInput.module.css
 ┃ ┣ 📜FormInput.tsx
 ┃ ┗ 📜Spinner.jsx
 ┣ 📂api
 ┃ ┣ 📜authService.ts
 ┃ ┣ 📜errorService.ts
 ┃ ┗ 📜todoService.ts
 ┣ 📂assests
 ┃ ┗ 📜spinner.gif
 ┣ 📂components
 ┃ ┣ 📜Login.module.css
 ┃ ┣ 📜Login.tsx
 ┃ ┣ 📜SignUp.tsx
 ┃ ┣ 📜TodoCard.module.css
 ┃ ┣ 📜TodoCard.tsx
 ┃ ┣ 📜TodoForm.module.css
 ┃ ┣ 📜TodoForm.tsx
 ┃ ┣ 📜TodoList.module.css
 ┃ ┗ 📜TodoList.tsx
 ┣ 📂context
 ┃ ┣ 📜authContext.tsx
 ┃ ┣ 📜createStore.ts
 ┃ ┗ 📜todoContext.tsx
 ┣ 📂hooks
 ┃ ┗ 📂services
 ┃ ┃ ┣ 📂mutations
 ┃ ┃ ┃ ┣ 📜useAuthMutation.tsx
 ┃ ┃ ┃ ┗ 📜useTodoMutation.tsx
 ┃ ┃ ┗ 📂queryies
 ┃ ┃ ┃ ┗ 📜useGetTodoQuery.tsx
 ┣ 📂page
 ┃ ┣ 📜Auth.tsx
 ┃ ┣ 📜Home.tsx
 ┃ ┣ 📜PrivateRoute.tsx
 ┃ ┗ 📜Todo.tsx
 ┣ 📂utill
 ┃ ┣ 📜apiConfig.ts
 ┃ ┗ 📜localStorage.ts
 ┣ 📜App.css
 ┣ 📜App.tsx
 ┣ 📜index.css
 ┣ 📜index.tsx
 ┣ 📜react-app-env.d.ts
 ┣ 📜reportWebVitals.ts
 ┗ 📜setupTests.ts
```


 
## 과제 진행 시 주안점 

 - 디자인보다 기능 구현에 초점을 맞추고 진행했습니다.
 - 최대한 라이브러리의 의존도를 줄여서 구현을 하고자 했습니다. 처음에는 비동기 HTTP 통신도 자바스크립트의 기본 api 인 fetch를 이용하여 구현했으나 axios 를 사용하는 것을 바꿨습니다.
 - react-query를 사용하기 전에 context API로 전역상태와 비동기 통신으로 전송받은 값을 다뤘고 이를 react-query를 사용하여 리펙토링하며 어떤 부분의 문제를 해결해주는지 살펴보았습니다. 

## 한계점 및 개선 사항 

- 로그인 validation을 위한 코드를 custom hook으로 리펙토링을 하려 하고 있습니다.  
- react-query error boundary 설정을 추가하려 합니다.
- 미쳐 채우지 못한 요구사항을 채우려 합니다.

이름 – 강명훈 
이메일 – myunghun0114@gmail.com

