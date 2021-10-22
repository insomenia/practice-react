# 프론트엔드 과제 안내

* 인썸니아 개발자 채용을 위한 프론트엔드 과제 입니다.

## 과제 개요

과제는 간단한 형태의 커머스 앱 프론트엔드 개발입니다. 현재 과제로 주어지는 앱에는 사용자가 회원가입/로그인을 할 수 있고, 상품 목록을 확인할 수 있도록 되어있습니다. 

과제 수행자는 하나의 주제를 정하고 그 주제에 맞는 커머스 앱( ex. 꽃다발 구매 앱, 생필품 구매 앱 등)을 만들어야 합니다. 그리고 추가적으로 사용자가 장바구니에 상품을 담고 주문서를 작성해 제출할 수 있는 기능을 구현해야 합니다.  

## 참고사항

### 백엔드API 사용

프론트엔드에서 사용자 인증 및 상품 조회, 장바구니 관리, 주문서 작성을 구현할 수 있도록 백엔드 API를 구축해두었습니다. 아래 링크에서 백엔드 API의 명세를 확인할 수 있고, 직접 요청을 보내고 응답을 확인해볼 수도 있습니다. 

https://assignment.barber.work/api-docs/index.html

### 구현해야 하는 기능

- 장바구니에 상품 담기
- 장바구니에 담긴 상품 확인하기
- 주문하기
  - 주문자 정보 입력
  - 주문 상품 확인
  - 주문 금액 확인

###### Typescript 기반의 React

과제 프로젝트는 Typescript 기반의 React로 구성되어 있습니다.

###### Framework7 React

모바일 앱 개발을 위해 Framework7 프레임워크를 사용합니다. 아래 링크에서 필요한 컴포넌트를 임포트하여 사용할 수 있습니다.

https://framework7.io/react/

###### Yarn 사용

과제 프로젝트의 패키지 매니저로는 yarn을 사용합니다. 

###### Tailwind CSS 사용

과제 프로젝트는 tailwind css를 사용합니다. inline-css의 사용은 최대한 지양해주시고 아래 링크를 참고하여 tailwind-css를 최대한 활용해주세요.

https://tailwindcss.com/

###### Formik / Yup 사용

Form을 만들 때에는 Formik과 form validation을 위해 사용하는 Yup을 사용합니다. 아래 링크를 참고해주세요.

Formik 공식 문서: https://formik.org/docs/overview

Formik에 대한 블로그 글: https://krpeppermint100.medium.com/ts-formik-%EC%82%AC%EC%9A%A9%EB%B2%95-4f526888c81a

Yup 문서: https://github.com/jquense/yup 

###### 화면 구성

과제에 세팅되어 있는 화면을 그대로 사용하지 않고 본인이 정한 주제에 맞는 구성으로 변경해주세요. 앱 사용자의 사용성 또한 고려되어야 합니다.

 