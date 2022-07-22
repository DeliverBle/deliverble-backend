require("dotenv").config();

const NEWS_ID = 2

/**
 * 1. 아래 정보로 저장된 spacing을 삭제해야 함
*/
const SCRIPT_ID_TO_CREATE_HIGHLIGHT = 100;
const HIGHLIGHT_STARTING_INDEX = 10;
const HIGHLIGHT_ENDING_INDEX = 10;

const REMOVE_HIGHLIGHT_ID = 79; // 2. (change by every test) 삭제를 위해 저장된 임의의 highlight의 id를 넣어주어야 함
const HIGHLIGHT_ID_FOR_MEMO = 7; // 3. 메모 저장을 위해 저장된 임의의 highlight id를 넣어주어야 함

const CREATE_SPACING_SCRIPT_ID = 7;
const SPACING_INDEX = 1;
const SPACING_ID_TO_REMOVE = 1; // 4. (change by every test) 저장된 임의의 spacing의 id를 넣어주어야 함

/**
 * 5. (change by every test) 해당 kakao id로 이미 가입이 되었다면, 해당 user 정보 삭제해야 함
 * 6. (토큰이 만료되었다면).env에서 'ACCESS_TOKEN', 'ACCESS_TOKEN_FOR_SIGNUP' 갱신해야 함
*/
const SIGNUP_TOKEN = process.env.ACCESS_TOKEN_FOR_SIGNUP; 
const SIGNUP_KAKAO_ID = process.env.KAKAO_ID_FOR_SIGNUP;

export {
    NEWS_ID,
    SCRIPT_ID_TO_CREATE_HIGHLIGHT,
    HIGHLIGHT_STARTING_INDEX,
    HIGHLIGHT_ENDING_INDEX,
    REMOVE_HIGHLIGHT_ID,
    HIGHLIGHT_ID_FOR_MEMO,
    CREATE_SPACING_SCRIPT_ID,
    SPACING_INDEX,
    SPACING_ID_TO_REMOVE,
    SIGNUP_TOKEN,
    SIGNUP_KAKAO_ID,
}
