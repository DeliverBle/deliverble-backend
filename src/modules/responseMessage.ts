const message = {
  NULL_VALUE: '필요한 값이 없습니다.',
  NONEXISTENT_ID: '존재하지 않는 ID 값을 파라미터로 전닳하였습니다.',
  NOT_FOUND: '존재하지 않는 자원',
  BAD_REQUEST: '잘못된 요청',
  INTERNAL_SERVER_ERROR: '서버 내부 오류',
  EXCEED_PAGE_INDEX: '요청한 페이지 번호가 존재하는 인덱스 개수를 넘어섰습니다.',
  DUPLICATE_ENTRY: '이미 회원가입을 하였습니다.',
  ALREADY_LOGGED_OUT: '이미 로그아웃을 하였습니다.',
  ACCESS_TOKEN_EXPIRED: '액세스 토큰이 만료되었습니다.',
  ALREADY_SIGNED_UP: '이미 회원가입을 하였습니다.',
  RESOURCE_NOT_FOUND_ERROR: '필요한 정보를 보내지 않으셨습니다.',

  // 뉴스
  SEARCH_NEWS_SUCCESS: '영상 검색 결과 조회 성공',
  RECOMMEND_NEWS_SUCCESS: '추천 영상 조회 성공',
  DETAIL_NEWS_SUCCESS: '영상 조회 성공',
  
  // 하이라이트
  CREATE_HIGHLIGHT_SUCCESS: '하이라이트 생성 성공',
  GET_HIGHLIGHT_SUCCESS: '하이라이트 조회 성공',

  // 스페이싱
  CREATE_SPACING_SUCCESS: '스페이싱 생성 성공',
  GET_SPACING_SUCCESS: '스페이싱 조회 성공',
  REMOVE_SPACING_SUCCESS: '스페이싱 삭제 성공',
  
  // 마지막 ',' 붙이면 작동하지 않음
  DUPLICATE_INDEX_FAIL: '동일한 시작 인덱스와 종료 인덱스를 갖고 있는 하이라이트가 이미 존재합니다.',
  REMOVE_HIGHLIGHT_SUCCESS: '하이라이트 삭제 성공'
};

export default message;
