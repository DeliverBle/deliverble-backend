import { createConnection, getConnection, QueryRunner } from 'typeorm';
import { News } from '../entity/News/News';
import { Script } from '../entity/Script/Script';
import { Tag } from '../entity/Tag/Tag';
import { Category } from '../shared/common/Category';
import { Channel } from '../shared/common/Channel';
import { Gender } from '../shared/common/Gender';
import { Suitability } from '../shared/common/Suitability';
import { Time } from '../vo/Time';
import {NewsInfo} from "../entity/News/types/newsInfo";

// 추천 태그 생성
let tagTestRecommend = new Tag();
tagTestRecommend.name = '딜리버블 추천';

// 뉴스 별 태그, 스크립트 생성

// 1번 뉴스
let tagTest1_1 = new Tag();
tagTest1_1.name = '경제';
let tagTest1_2 = new Tag();
tagTest1_2.name = '비트코인';
let tagTest1_3 = new Tag();
tagTest1_3.name = '폭락';

let scriptTest1_1 = new Script();
scriptTest1_1.startTime = new Time(0, 0);
scriptTest1_1.endTime = new Time(7, 7);
scriptTest1_1.text = '비트코인 가격이 1만 8천 달러선으로 폭락하면서 2020년 이후 최대치를 나타내고 있습니다.';
let scriptTest1_2 = new Script();
scriptTest1_2.startTime = new Time(7, 7);
scriptTest1_2.endTime = new Time(14, 78);
scriptTest1_2.text = '가상화폐 정보 사이트 코인게코에 따르면 비트코인 가격은 오늘 오전 한때 1만 7,800달러까지 하락하기도 했습니다.';
let scriptTest1_3 = new Script();
scriptTest1_3.startTime = new Time(14, 78);
scriptTest1_3.endTime = new Time(20, 55);
scriptTest1_3.text = '비트코인은 물가 상승 압력에 따른 세계적인 금리 인상 등의 여파로 12일 연속 하락했습니다.';
let scriptTest1_4 = new Script();
scriptTest1_4.startTime = new Time(20, 55);
scriptTest1_4.endTime = new Time(26, 55);
scriptTest1_4.text = '시가총액 2위 이더리움의 가격은 1천 달러가 무너지는 등 다른 코인의 가격도 동반 하락했습니다.';
let scriptTest1_5 = new Script();
scriptTest1_5.startTime = new Time(26, 85);
scriptTest1_5.endTime = new Time(35, 4);
scriptTest1_5.text = '가격이 폭락하면서 한때 3조 달러가 넘었던 전 세계 가상화폐 시장의 시가총액은 8천억 달러 선으로 하락했습니다.';

// 2번 뉴스
let tagTest2_1 = new Tag();
tagTest2_1.name = '북한';
let tagTest2_2 = new Tag();
tagTest2_2.name = '환경';
let tagTest2_3 = new Tag();
tagTest2_3.name = '임진강';

let scriptTest2_1 = new Script();
scriptTest2_1.startTime = new Time(0, 0);
scriptTest2_1.endTime = new Time(8, 18);
scriptTest2_1.text = '북한이 호우로 임진강 상류 황강댐 수문을 개방한 것으로 판단하고 있다고 군 소식통이 오늘 밝혔습니다.';
let scriptTest2_2 = new Script();
scriptTest2_2.startTime = new Time(8, 18);
scriptTest2_2.endTime = new Time(16, 71);
scriptTest2_2.text = '정부는 지난 28일 북한에 댐을 방류하면 사전 통지해 달라고 요청했지만, 북한은 이에 대한 응답 없이 방류에 나선 것으로 보입니다.';
let scriptTest2_3 = new Script();
scriptTest2_3.startTime = new Time(16, 71);
scriptTest2_3.endTime = new Time(27, 10);
scriptTest2_3.text = '군남댐 수위와 연계되는 임진강 최북단 필승교의 수위는 지난 28일 6m까지 오르기도 했지만 이후 현재까지 안정적으로 관리되고 있는 것으로 알려졌습니다.';
let scriptTest2_4 = new Script();
scriptTest2_4.startTime = new Time(27, 10);
scriptTest2_4.endTime = new Time(35, 74);
scriptTest2_4.text = '통일부는 이와 관련해 북한이 사전 통지 없이 황강댐 물을 방류한 데 대해 유감이라고 밝혔습니다.';

// 3번 뉴스
let tagTest3_1 = new Tag();
tagTest3_1.name = '제주';
let tagTest3_2 = new Tag();
tagTest3_2.name = '예산';
let tagTest3_3 = new Tag();
tagTest3_3.name = '무상급식';

let scriptTest3_1 = new Script();
scriptTest3_1.startTime = new Time(0, 0);
scriptTest3_1.endTime = new Time(4, 74);
scriptTest3_1.text = '초중고교 무상급식 예산이 46억 원 증액됩니다.';
let scriptTest3_2 = new Script();
scriptTest3_2.startTime = new Time(4, 74);
scriptTest3_2.endTime = new Time(15, 13);
scriptTest3_2.text = '오영훈 제주도지사와 김광수 제주도 교육감은 한라중학교를 찾아 올해 추경에 무상급식 예산 46억 원을 증액 반영하기로 합의했다고 밝혔습니다.';
let scriptTest3_3 = new Script();
scriptTest3_3.startTime = new Time(15, 13);
scriptTest3_3.endTime = new Time(21, 62);
scriptTest3_3.text = '이에 따라 무상급식 예산이 현재 439억 원에서 485억 원으로 늘게 됐습니다.';
let scriptTest3_4 = new Script();
scriptTest3_4.startTime = new Time(21, 62);
scriptTest3_4.endTime = new Time(30, 2);
scriptTest3_4.text = '중학생 1인당 1식 단가는 현재 2,980원에서 24% 인상된 3,695원으로 오르게 됐습니다.';
let scriptTest3_5 = new Script();
scriptTest3_5.startTime = new Time(30, 2);
scriptTest3_5.endTime = new Time(35, 0);
scriptTest3_5.text = '인상된 단가는 다음 학기부터 적용됩니다.';
let scriptTest3_6 = new Script();
scriptTest3_6.startTime = new Time(35, 0);
scriptTest3_6.endTime = new Time(37, 80);
scriptTest3_6.text = '지금까지 제주에서 전해 드렸습니다.';

// 4번 뉴스
let tagTest4_1 = new Tag();
tagTest4_1.name = '범죄';
let tagTest4_2 = new Tag();
tagTest4_2.name = '사망사고';
let tagTest4_3 = new Tag();
tagTest4_3.name = '공무원';

let scriptTest4_1 = new Script();
scriptTest4_1.startTime = new Time(0, 0);
scriptTest4_1.endTime = new Time(4, 74);
scriptTest4_1.text = '오늘 오전 9시쯤 경북 안동시청 주차타워 2층에서 50대 여성 공무원 A 씨가 쓰러진 채 발견됐습니다.';
let scriptTest4_2 = new Script();
scriptTest4_2.startTime = new Time(4, 74);
scriptTest4_2.endTime = new Time(15, 13);
scriptTest4_2.text = 'A 씨는 흉기에 복부를 찔려 크게 다친 상태로 병원으로 옮겨졌지만 1시간여 만에 숨졌습니다.';
let scriptTest4_3 = new Script();
scriptTest4_3.startTime = new Time(15, 13);
scriptTest4_3.endTime = new Time(21, 62);
scriptTest4_3.text = '용의자는 시청 산하기관 직원인 40대 남성 B 씨로 범행 직후 경찰에 자수했습니다.';
let scriptTest4_4 = new Script();
scriptTest4_4.startTime = new Time(21, 62);
scriptTest4_4.endTime = new Time(30, 2);
scriptTest4_4.text = '경찰은 B 씨가 사용한 흉기를 확보하고 범행 동기를 추궁하고 있습니다.';

// 5번 뉴스
let tagTest5_1 = new Tag();
tagTest5_1.name = '장관';
let tagTest5_2 = new Tag();
tagTest5_2.name = '인사';
let tagTest5_3 = new Tag();
tagTest5_3.name = '사퇴';

let scriptTest5_1 = new Script();
scriptTest5_1.startTime = new Time(0, 0);
scriptTest5_1.endTime = new Time(5, 47);
scriptTest5_1.text = '김승희 보건복지부 장관 후보자는 오늘 오전 입장문을 내고 후보직 사퇴 의사를 밝혔습니다.';
let scriptTest5_2 = new Script();
scriptTest5_2.startTime = new Time(5, 47);
scriptTest5_2.endTime = new Time(15, 74);
scriptTest5_2.text = '김 후보자는 지명 이후 객관적 근거가 없거나 관련이 없는 가족들의 사생활까지 수많은 비판이 제기됐다면서 각종 의혹이 사실이 아님을 반복적으로 설명했지만,';
let scriptTest5_3 = new Script();
scriptTest5_3.startTime = new Time(15, 74);
scriptTest5_3.endTime = new Time(23, 87);
scriptTest5_3.text = '이 과정에서 공직자로서 부끄럽지 않게 살아왔던 자신의 명예는 물론이고 가족들까지 상처를 입는 것이 매우 힘들었다고 설명했습니다.';
let scriptTest5_4 = new Script();
scriptTest5_4.startTime = new Time(23, 87);
scriptTest5_4.endTime = new Time(32, 43);
scriptTest5_4.text = '또 정치 자금 의혹에 대해서는 고의적으로 사적인 용도로 유용한 바가 전혀 없으며 회계 처리 과정에서 실무적인 착오로 문제가 생겼지만,';
let scriptTest5_5 = new Script();
scriptTest5_5.startTime = new Time(32, 43);
scriptTest5_5.endTime = new Time(40, 0);
scriptTest5_5.text = '이러한 사실과 별개로 최종적으로 관리 책임에서 자유로울 수 없다는 지적을 겸허하게 수용한다고 덧붙였습니다.';

// 6번 뉴스
let tagTest6_1 = new Tag();
tagTest6_1.name = '영국';
let tagTest6_2 = new Tag();
tagTest6_2.name = '중국';
let tagTest6_3 = new Tag();
tagTest6_3.name = '홍콩';

let scriptTest6_1 = new Script();
scriptTest6_1.startTime = new Time(0, 0);
scriptTest6_1.endTime = new Time(7, 23);
scriptTest6_1.text = '존슨 영국 총리는 중국이 25년 전 홍콩 주권을 돌려받을 때 약속을 지키지 않고 있다고 비판했습니다. ';
let scriptTest6_2 = new Script();
scriptTest6_2.startTime = new Time(7, 23);
scriptTest6_2.endTime = new Time(16, 12);
scriptTest6_2.text = '존슨 총리는 트위터에 올린 영상 메시지에서 영국이 1997년 홍콩을 반환한 뒤 중국은 일국양제를 준수하지 않고 있다고 말했습니다.';
let scriptTest6_3 = new Script();
scriptTest6_3.startTime = new Time(16, 12);
scriptTest6_3.endTime = new Time(25, 81);
scriptTest6_3.text = '영국과 중국은 1984년 공동선언을 통해 홍콩이 반환된 이후에도 50년 동안 고도의 자치와 함께 기존 체제를 유지하는 데 합의했습니다. ';
let scriptTest6_4 = new Script();
scriptTest6_4.startTime = new Time(25, 81);
scriptTest6_4.endTime = new Time(38, 89);
scriptTest6_4.text = '하지만 존슨 총리는 홍콩인들의 권리와 자유, 번영이 위협받는 상황이라면서 홍콩을 포기하지 않고 25년 전 약속을 지킬 것이며 중국이 약속을 지키도록 최선을 다하겠다고 밝혔습니다.';

// 7번 뉴스
let tagTest7_1 = new Tag();
tagTest7_1.name = '대선';
let tagTest7_2 = new Tag();
tagTest7_2.name = '이재명';
let tagTest7_3 = new Tag();
tagTest7_3.name = '의전논란';

let scriptTest7_1 = new Script();
scriptTest7_1.startTime = new Time(0, 0);
scriptTest7_1.endTime = new Time(13, 57);
scriptTest7_1.text = '더불어민주당 이재명 대선 후보의 부인 김혜경 씨가 자신에게 제기된 의전 논란과 관련해서 모든 것이 자신의 불찰이라며 국민 여러분께 심려를 끼쳐드린 데 대해 송구하다고 밝혔습니다. ';
let scriptTest7_2 = new Script();
scriptTest7_2.startTime = new Time(13, 57);
scriptTest7_2.endTime = new Time(30, 9);
scriptTest7_2.text = '김 씨는 기자들에게 배포한 입장문을 통해서 자신의 사적 용무를 대신했다고 주장한 전직 경기도 비서 a 씨의 주장에 대해 있어서는 안 될 일이 있었다며 그동안 고통받았을 a모 비서가 얼마나 힘들었을지 생각하니 마음이 아린다고 덧붙였습니다. ';
let scriptTest7_3 = new Script();
scriptTest7_3.startTime = new Time(30, 9);
scriptTest7_3.endTime = new Time(42, 78);
scriptTest7_3.text = '김혜경 씨는 공과 사를 명료하게 가려야 했는데 a 비서 상관이었던 경기도 사무관 배 모 씨와 친분이 있어 도움을 받았다면서도 상시 조력을 받은 것은 아니라고 해명했습니다.';

// 8번 뉴스
let tagTest8_1 = new Tag();
tagTest8_1.name = '우크라이나';
let tagTest8_2 = new Tag();
tagTest8_2.name = '루가노선언';
let tagTest8_3 = new Tag();
tagTest8_3.name = '경제회복';

let scriptTest8_1 = new Script();
scriptTest8_1.startTime = new Time(0, 0);
scriptTest8_1.endTime = new Time(7, 80);
scriptTest8_1.text = '이 시각 세계입니다.';
let scriptTest8_2 = new Script();
scriptTest8_2.startTime = new Time(7, 80);
scriptTest8_2.endTime = new Time(15, 89);
scriptTest8_2.text = '한국을 포함한 40여 개국 정상들이 러시아의 침공으로 초토화된 우크라이나를 투명하고 민주적으로 재건하기로 약속했습니다.';
let scriptTest8_3 = new Script();
scriptTest8_3.startTime = new Time(15, 89);
scriptTest8_3.endTime = new Time(26, 95);
scriptTest8_3.text = '스위스에서 이틀간 진행된 우크라이나 회의에 참석한 40여 개국 지도자들은 우크라이나의 경제 회복을 돕기 위한 루가노 선언에 서명했는데요.';
let scriptTest8_4 = new Script();
scriptTest8_4.startTime = new Time(26, 95);
scriptTest8_4.endTime = new Time(37, 13);
scriptTest8_4.text = '선언에 서명한 국가들은 우크라이나의 전후 복구 지원을 약속하는 한편, 투명성을 높이고 부패를 척결하기 위한 개혁 필요성에 동의했습니다.';
let scriptTest8_5 = new Script();
scriptTest8_5.startTime = new Time(37, 13);
scriptTest8_5.endTime = new Time(46, 67);
scriptTest8_5.text = '회담을 공동주최한 이그나지오 카시스 스위스 대통령은 루가노 선언은 우크라이나 재건을 위한 긴 여정의 시작이라고 평가했습니다.';
let scriptTest8_6 = new Script();
scriptTest8_6.startTime = new Time(46, 67);
scriptTest8_6.endTime = new Time(56, 0);
scriptTest8_6.text = '앞서 우크라이나 정부는 자국 재건 비용으로 7,500억 달러, 약 972조 원이 필요하다고 자체 추산했습니다.';

// 9번 뉴스
let tagTest9_1 = new Tag();
tagTest9_1.name = '원숭이두창';
let tagTest9_2 = new Tag();
tagTest9_2.name = '치료제';
let tagTest9_3 = new Tag();
tagTest9_3.name = '중대본';

let scriptTest9_1 = new Script();
scriptTest9_1.startTime = new Time(0, 0);
scriptTest9_1.endTime = new Time(6, 18);
scriptTest9_1.text = '원숭이두창 치료제인 테코비리마트 504명분이 이번 주 국내에 도입됩니다.';
let scriptTest9_2 = new Script();
scriptTest9_2.startTime = new Time(6, 18);
scriptTest9_2.endTime = new Time(16, 70);
scriptTest9_2.text = '중앙방역대책본부는 오늘 도입되는 치료제 물량은 초기 대응에 충분한 수준이라며 향후 발생 양상을 고려해 추가 도입하겠다고 밝혔습니다.';
let scriptTest9_3 = new Script();
scriptTest9_3.startTime = new Time(16, 70);
scriptTest9_3.endTime = new Time(29, 0);
scriptTest9_3.text = '방대본은 백신 접종 계획에 대해선 원숭이두창의 전파력은 강하지 않다며 일반 국민이 광범위하게 예방접종을 할 필요성이 있다고 보지 않는다고 답했습니다.';

// 10번 뉴스
let tagTest10_1 = new Tag();
tagTest10_1.name = 'WHO';
let tagTest10_2 = new Tag();
tagTest10_2.name = '원숭이두창';
let tagTest10_3 = new Tag();
tagTest10_3.name = '확산';

let scriptTest10_1 = new Script();
scriptTest10_1.startTime = new Time(0, 0);
scriptTest10_1.endTime = new Time(8, 87);
scriptTest10_1.text = '세계보건기구 WHO가 올여름 휴가철 원숭이두창 전파 속도가 더 빨라질 수 있다고 경고했습니다.';
let scriptTest10_2 = new Script();
scriptTest10_2.startTime = new Time(9, 0);
scriptTest10_2.endTime = new Time(25, 17);
scriptTest10_2.text = '한스 클루즈 WHO 유럽 사무소 소장은 성명에서 코로나19 사태에 따른 국제 여행과 축제 규제를 해지하는 가운데 원숭이두창이 확산했다며 여름철 유럽과 다른 지역에서 추가 전파가 이루어질 가능성이 크다고 밝혔습니다.';
let scriptTest10_3 = new Script();
scriptTest10_3.startTime = new Time(25, 17);
scriptTest10_3.endTime = new Time(36, 0);
scriptTest10_3.text = '또 현재 코로나19와 같은 방역 조처가 필요하지는 않을 것이지만 바이러스 확산을 완벽하게 억제할 수 있을지는 아직 알 수 없다고 우려했습니다.';

// 11번 뉴스
let tagTest11_1 = new Tag();
tagTest11_1.name = '일본';
let tagTest11_2 = new Tag();
tagTest11_2.name = '선진국';
let tagTest11_3 = new Tag();
tagTest11_3.name = '경제';

let scriptTest11_1 = new Script();
scriptTest11_1.startTime = new Time(0, 0);
scriptTest11_1.endTime = new Time(2, 19);
scriptTest11_1.text = '선진국 탈락이 임박했다.';
let scriptTest11_2 = new Script();
scriptTest11_2.startTime = new Time(2, 19);
scriptTest11_2.endTime = new Time(5, 9);
scriptTest11_2.text = '몰락 전 중국 청나라 말기 같다.';
let scriptTest11_3 = new Script();
scriptTest11_3.startTime = new Time(5, 9);
scriptTest11_3.endTime = new Time(10, 20);
scriptTest11_3.text = '요즘 일본 경제에 대해 내부에서 잇따라 나오는 혹독한 경고음들입니다.';
let scriptTest11_4 = new Script();
scriptTest11_4.startTime = new Time(10, 20);
scriptTest11_4.endTime = new Time(20, 81);
scriptTest11_4.text = '1990년대 버블 붕괴 뒤 나온 잃어버린 10년이라는 말은 아직도 회복하지 못한 장기 침체 때문에 잃어버린 30년으로 바뀌게 됐습니다.';
let scriptTest11_5 = new Script();
scriptTest11_5.startTime = new Time(20, 81);
scriptTest11_5.endTime = new Time(24, 57);
scriptTest11_5.text = '어느 정도인지 도쿄에서 고현승 특파원이 전합니다.';

// 12번 뉴스
let tagTest12_1 = new Tag();
tagTest12_1.name = '서울';
let tagTest12_2 = new Tag();
tagTest12_2.name = '경찰';
let tagTest12_3 = new Tag();
tagTest12_3.name = '마약';

let scriptTest12_1 = new Script();
scriptTest12_1.startTime = new Time(0, 0);
scriptTest12_1.endTime = new Time(12, 16);
scriptTest12_1.text = '서울의 한 유흥주점 여 종업원이 손님이 건넨 술을 마신 뒤에 숨지는 사건이 발생해서 경찰이 수사에 나섰다는 기사도 많이 봤습니다.';
let scriptTest12_2 = new Script();
scriptTest12_2.startTime = new Time(12, 16);
scriptTest12_2.endTime = new Time(20, 27);
scriptTest12_2.text = '어제 오전 7시 50분쯤 서울 강남의 한 유흥주점에서 30대 여 종업원 A 씨가 의식을 잃고 쓰러졌습니다.';
let scriptTest12_3 = new Script();
scriptTest12_3.startTime = new Time(20, 27);
scriptTest12_3.endTime = new Time(28, 82);
scriptTest12_3.text = '유흥주점 동료는 A 씨가 손님들이 건넨 술을 마신 뒤에 쓰러졌다며 마약이 의심된다고 119와 경찰에 신고했습니다.';
let scriptTest12_4 = new Script();
scriptTest12_4.startTime = new Time(28, 82);
scriptTest12_4.endTime = new Time(32, 94);
scriptTest12_4.text = 'A 씨는 인근 병원으로 옮겨졌지만 결국 숨졌습니다.';
let scriptTest12_5 = new Script();
scriptTest12_5.startTime = new Time(32, 94);
scriptTest12_5.endTime = new Time(42, 17);
scriptTest12_5.text = '그런데 비슷한 시각 이 술자리에 함께 있었던 남성이 유흥주점에서 약 700m 떨어진 도심 한복판에서 교통사고를 냈습니다.';
let scriptTest12_6 = new Script();
scriptTest12_6.startTime = new Time(42, 17);
scriptTest12_6.endTime = new Time(48, 47);
scriptTest12_6.text = '경찰이 출동했을 당시 차량에서 마약으로 추정되는 봉투가 발견된 것으로 알려졌는데요.';
let scriptTest12_7 = new Script();
scriptTest12_7.startTime = new Time(48, 47);
scriptTest12_7.endTime = new Time(52, 28);
scriptTest12_7.text = '남성도 병원으로 옮겨졌지만 숨졌습니다.';
let scriptTest12_8 = new Script();
scriptTest12_8.startTime = new Time(52, 28);
scriptTest12_8.endTime = new Time(61, 0);
scriptTest12_8.text = '경찰은 술에 섞인 물질과 손님들의 인적 사항을 확인하는 동시에 두 사건 사이의 관련성을 수사하고 있습니다.';

// 13번 뉴스
let tagTest13_1 = new Tag();
tagTest13_1.name = '코로나';
let tagTest13_2 = new Tag();
tagTest13_2.name = '경제';
let tagTest13_3 = new Tag();
tagTest13_3.name = '인테리어';

let scriptTest13_1 = new Script();
scriptTest13_1.startTime = new Time(0, 0);
scriptTest13_1.endTime = new Time(7, 22);
scriptTest13_1.text = '코로나19로 폐업하거나 일자리를 잃은 사람도 많지만 반대로 몸값이 뛴 직종이 있습니다.';
let scriptTest13_2 = new Script();
scriptTest13_2.startTime = new Time(7, 22);
scriptTest13_2.endTime = new Time(13, 21);
scriptTest13_2.text = '코로나19 사태 이후 인테리어 수요 급증으로 시공 인력이 부족해지면서 일당이 껑충 뛰었습니다.';
let scriptTest13_3 = new Script();
scriptTest13_3.startTime = new Time(13, 21);
scriptTest13_3.endTime = new Time(22, 68);
scriptTest13_3.text = '업계에 따르면 올해 도배나 도장, 타일 등 인테리어 시공 직종의 일당은 1년 새 최대 40%, 많게는 10만 원 이상 올랐다는데요.';
let scriptTest13_4 = new Script();
scriptTest13_4.startTime = new Time(22, 68);
scriptTest13_4.endTime = new Time(29, 5);
scriptTest13_4.text = '도장 일당은 최대 40만 원에 이르고 도배사도 20만 원 후반대 수입을 올리는 것으로 알려졌습니다.';
let scriptTest13_5 = new Script();
scriptTest13_5.startTime = new Time(29, 5);
scriptTest13_5.endTime = new Time(36, 0);
scriptTest13_5.text = '경력으로 쌓인 노하우와 기술이 중요한 직종인 만큼 이들의 몸값은 더 높아질 것으로 보입니다.';
 
// 14번 뉴스
let tagTest14_1 = new Tag();
tagTest14_1.name = '과학';
let tagTest14_2 = new Tag();
tagTest14_2.name = '우주';
let tagTest14_3 = new Tag();
tagTest14_3.name = '누리호';

let scriptTest14_1 = new Script();
scriptTest14_1.startTime = new Time(0, 0);
scriptTest14_1.endTime = new Time(1, 23);
scriptTest14_1.text = '여러분 안녕하십니까.';
let scriptTest14_2 = new Script();
scriptTest14_2.startTime = new Time(1, 23);
scriptTest14_2.endTime = new Time(10, 66);
scriptTest14_2.text = '하늘은 파란 크레파스로 칠한 듯 선명했고, 그 안에 누리호가 동그란 점으로 희미해질 때까지 마음 졸이면서 1초 1초를 지켜봤습니다.';
let scriptTest14_3 = new Script();
scriptTest14_3.startTime = new Time(10, 66);
scriptTest14_3.endTime = new Time(17, 43);
scriptTest14_3.text = '수많은 사람들의 우주를 향한 꿈이 한 걸음 앞으로 나아간 날, 특집 9시 뉴스 시작합니다.';
let scriptTest14_4 = new Script();
scriptTest14_4.startTime = new Time(17, 43);
scriptTest14_4.endTime = new Time(25, 84);
scriptTest14_4.text = '누리호는 700킬로미터 상공, 목표 궤도까지 오르면서 여덟 달 전, 끝내지 못한 숙제를 성공적으로 마무리했습니다.';
let scriptTest14_5 = new Script();
scriptTest14_5.startTime = new Time(25, 84);
scriptTest14_5.endTime = new Time(29, 47);
scriptTest14_5.text = '먼저 발사 순간, 김민아 기자가 전해드립니다.';

// 15번 뉴스
let tagTest15_1 = new Tag();
tagTest15_1.name = '송해';
let tagTest15_2 = new Tag();
tagTest15_2.name = '별세';
let tagTest15_3 = new Tag();
tagTest15_3.name = '빈소';

let scriptTest15_1 = new Script();
scriptTest15_1.startTime = new Time(0, 0);
scriptTest15_1.endTime = new Time(1, 98);
scriptTest15_1.text = '여러분 안녕하십니까.';
let scriptTest15_2 = new Script();
scriptTest15_2.startTime = new Time(1, 98);
scriptTest15_2.endTime = new Time(7, 52);
scriptTest15_2.text = '"그는 바다 해(海) 자를 따서 마음속으로 자신을 \'송해\' 라고 불러보았다.”';
let scriptTest15_3 = new Script();
scriptTest15_3.startTime = new Time(7, 52);
scriptTest15_3.endTime = new Time(13, 55);
scriptTest15_3.text = '이름 두 글자에 바다를 품었던 희극인 송해 선생이 우리 곁을 떠났습니다.';
let scriptTest15_4 = new Script();
scriptTest15_4.startTime = new Time(13, 55);
scriptTest15_4.endTime = new Time(16, 26);
scriptTest15_4.text = '향년, 우리 나이 아흔 다섯입니다.';
let scriptTest15_5 = new Script();
scriptTest15_5.startTime = new Time(16, 26);
scriptTest15_5.endTime = new Time(27, 52);
scriptTest15_5.text = '자연인 송복희가 아닌 국민 진행자 송해로, 34년 동안 일요일 오후를 행복하게 만들어줬던 송해 선생 별세 소식으로, 오늘 9시 뉴스 시작합니다.';
let scriptTest15_6 = new Script();
scriptTest15_6.startTime = new Time(27, 52);
scriptTest15_6.endTime = new Time(31, 2);
scriptTest15_6.text = '먼저 빈소가 마련된 서울대병원 연결하겠습니다.';

// 16번 뉴스
let tagTest16_1 = new Tag();
tagTest16_1.name = '윤석열';
let tagTest16_2 = new Tag();
tagTest16_2.name = '권력사유화';
let tagTest16_3 = new Tag();
tagTest16_3.name = '친인척';

let scriptTest16_1 = new Script();
scriptTest16_1.startTime = new Time(0, 0);
scriptTest16_1.endTime = new Time(14, 4);
scriptTest16_1.text = '윤석열 대통령은 친인척인 선임 행정관 최모 씨의 부속실 근무를 둘러싼 논란과 관련해서 정치를 처음 시작할 때부터 캠프에서, 당사에서 공식적으로 함께 선거운동을 해 온 동지라고 밝혔습니다.';
let scriptTest16_2 = new Script();
scriptTest16_2.startTime = new Time(14, 4);
scriptTest16_2.endTime = new Time(20, 59);
scriptTest16_2.text = '윤 대통령은 출근길에 기자들과 만나 권력 사유화라는 비판에 어떤 입장이냐는 질문에 이같이 말했습니다.';
let scriptTest16_3 = new Script();
scriptTest16_3.startTime = new Time(20, 59);
scriptTest16_3.endTime = new Time(28, 93);
scriptTest16_3.text = '윤 대통령은 8촌인 최 씨는 부속실에서 이른바 관저팀 소속 팀장을 맡으며 김 여사 보좌 업무를 주로 담당한 것으로 알려졌습니다.';
let scriptTest16_4 = new Script();
scriptTest16_4.startTime = new Time(28, 93);
scriptTest16_4.endTime = new Time(35, 81);
scriptTest16_4.text = '윤 대통령은 또 나토 수행팀 문제는 이미 대변인이 말씀드린 것 같다며 말을 아꼈습니다.';

// 17번 뉴스
let tagTest17_1 = new Tag();
tagTest17_1.name = '의학';
let tagTest17_2 = new Tag();
tagTest17_2.name = '식중독';
let tagTest17_3 = new Tag();
tagTest17_3.name = '버섯';

let scriptTest17_1 = new Script();
scriptTest17_1.startTime = new Time(0, 0);
scriptTest17_1.endTime = new Time(7, 84);
scriptTest17_1.text = '장마철 야생에서 채취한 버섯은 식중독 위험이 높아 되도록 먹지 말 것을 식품의약품안전처가 권고했습니다.';
let scriptTest17_2 = new Script();
scriptTest17_2.startTime = new Time(7, 84);
scriptTest17_2.endTime = new Time(21, 16);
scriptTest17_2.text = '식약처는 국내 자생 버섯 1,900여 종 가운데 먹을 수 있는 건 400종에 불과하다면서, 가열하더라도 독버섯 성분은 대부분 남아 있기 때문에 익혀 먹으면 안전하다고 믿어선 안 된다고 강조했습니다.';
let scriptTest17_3 = new Script();
scriptTest17_3.startTime = new Time(21, 16);
scriptTest17_3.endTime = new Time(29, 41);
scriptTest17_3.text = '버섯을 먹은 뒤 통증이 생기면 즉시 토해내고, 먹은 버섯을 가지고 즉시 병원에 방문하라고 식약처는 당부했습니다.';

// 18번 뉴스
let tagTest18_1 = new Tag();
tagTest18_1.name = '법원';
let tagTest18_2 = new Tag();
tagTest18_2.name = '사기';
let tagTest18_3 = new Tag();
tagTest18_3.name = '마약';

let scriptTest18_1 = new Script();
scriptTest18_1.startTime = new Time(0, 0);
scriptTest18_1.endTime = new Time(11, 36);
scriptTest18_1.text = '20대 20여 명이 모여 사기 행각을 벌이고 마약 파티를 했던 이른바 검단 식구들의 주범, A 씨에 대해 1심 법원이 징역 5년을 선고했습니다.';
let scriptTest18_2 = new Script();
scriptTest18_2.startTime = new Time(11, 36);
scriptTest18_2.endTime = new Time(18, 50);
scriptTest18_2.text = '인천지법은 오늘 열린 선고공판에서 A씨의 죄질이 가볍지 않다며 징역 5년을 선고했습니다.';
let scriptTest18_3 = new Script();
scriptTest18_3.startTime = new Time(18, 50);
scriptTest18_3.endTime = new Time(28, 92);
scriptTest18_3.text = 'A 씨는 지인 여성들에게 접근해 취업을 대가로 대출을 받게 하고 돈을 가로챘고 이들 가운데 일부를 감금, 폭행한 혐의를 받고 있습니다.';

// 19번 뉴스
let tagTest19_1 = new Tag();
tagTest19_1.name = '가격';
let tagTest19_2 = new Tag();
tagTest19_2.name = '담합';
let tagTest19_3 = new Tag();
tagTest19_3.name = '토종닭';

let scriptTest19_1 = new Script();
scriptTest19_1.startTime = new Time(0, 0);
scriptTest19_1.endTime = new Time(8, 83);
scriptTest19_1.text = '국내 토종닭 신선육 가격을 4년 가까이 담합해 온 사업자들에게 공정거래위원회가 과징금을 부과하기로 했습니다.';
let scriptTest19_2 = new Script();
scriptTest19_2.startTime = new Time(8, 83);
scriptTest19_2.endTime = new Time(21, 67);
scriptTest19_2.text = '공정위는 하림과 올품, 체리부로, 참프레 등 국내 9개 토종닭 신선육 제조·판매사업자에게 시정명령과 함께 5억 9,500만 원의 과징금을 부과하기로 결정했다고 밝혔습니다.';
let scriptTest19_3 = new Script();
scriptTest19_3.startTime = new Time(21, 67);
scriptTest19_3.endTime = new Time(34, 19);
scriptTest19_3.text = '이들은 2013년부터 2017년 사이 4차례에 걸쳐 토종닭의 판매 가격과 출고량을 합의하고 가격에 영향을 미치는 비용 등을 공동으로 결정한 것으로 조사됐습니다.';

// 20번 뉴스
let tagTest20_1 = new Tag();
tagTest20_1.name = '통행료';
let tagTest20_2 = new Tag();
tagTest20_2.name = '국토부';
let tagTest20_3 = new Tag();
tagTest20_3.name = '친환경차';

let scriptTest20_1 = new Script();
scriptTest20_1.startTime = new Time(0, 0);
scriptTest20_1.endTime = new Time(7, 47);
scriptTest20_1.text = '올해 말 종료 예정이었던 전기·수소차와 화물차 통행료 감면 제도가 2년 더 연장됩니다.';
let scriptTest20_2 = new Script();
scriptTest20_2.startTime = new Time(7, 47);
scriptTest20_2.endTime = new Time(14, 51);
scriptTest20_2.text = '국토부는 이런 내용을 담은 유료도로법 시행령 개정안을 다음 달 11일까지 입법 예고한다고 밝혔습니다.';
let scriptTest20_3 = new Script();
scriptTest20_3.startTime = new Time(14, 51);
scriptTest20_3.endTime = new Time(24, 74);
scriptTest20_3.text = '정부는 미세먼지 저감과 친환경차 보급 확대를 위해 2017년 9월부터 전기 수소차에 대한 고속도로 통행료를 50% 감면해주고 있습니다.';
let scriptTest20_4 = new Script();
scriptTest20_4.startTime = new Time(24, 74);
scriptTest20_4.endTime = new Time(34, 46);
scriptTest20_4.text = '애초 이 제도는 연말에 종료될 예정이었지만 시행령이 개정되면 해당 운전자는 2024년 12월까지 감면 혜택을 받을 수 있습니다.';
let scriptTest20_5 = new Script();
scriptTest20_5.startTime = new Time(34, 46);
scriptTest20_5.endTime = new Time(40, 50);
scriptTest20_5.text = '또 화물차에 대한 고속도로 통행료 심야 할인 역시 2년 더 연장하기로 했습니다.';

// 21번 뉴스
let tagTest21_1 = new Tag();
tagTest21_1.name = 'IMF';
let tagTest21_2 = new Tag();
tagTest21_2.name = '경제전망';
let tagTest21_3 = new Tag();
tagTest21_3.name = '경기침체';

let scriptTest21_1 = new Script();
scriptTest21_1.startTime = new Time(0, 0);
scriptTest21_1.endTime = new Time(11, 57);
scriptTest21_1.text = '크리스탈리나 게이오르에바 IMF 총재가 현지 시간 6일 글로벌 경제 전망이 상당히 어두워졌다며 내년에 전 세계적인 경기침체가 닥칠 가능성이 있다고 경고했습니다.';
let scriptTest21_2 = new Script();
scriptTest21_2.startTime = new Time(11, 57);
scriptTest21_2.endTime = new Time(26, 78);
scriptTest21_2.text = '게오르게이바 총재는 이날 로이터통신과의 인터뷰에서 인플레이션 확산, 실질 금리 인상, 중국 경제 성장 둔화, 우크라이나 침공 등을 언급하며 4월 업데이트 이후 전망이 상당히 어두워졌다며 우리는 매우 거친 바다에 있다고 말했습니다.';
let scriptTest21_3 = new Script();
scriptTest21_3.startTime = new Time(26, 78);
scriptTest21_3.endTime = new Time(36, 0);
scriptTest21_3.text = '또 조만간 올해 세계 경제성장률 전망을 하향 조정하겠다고 밝혔는데 이럴 경우 올 들어 세 번째 이루어지는 IMF의 전망치 하향 조정입니다.';

// 22번 뉴스
let tagTest22_1 = new Tag();
tagTest22_1.name = 'BTS';
let tagTest22_2 = new Tag();
tagTest22_2.name = '대면공연';
let tagTest22_3 = new Tag();
tagTest22_3.name = '미국';

let scriptTest22_1 = new Script();
scriptTest22_1.startTime = new Time(0, 0);
scriptTest22_1.endTime = new Time(6, 28);
scriptTest22_1.text = '오늘 이 소식을 전하기 위해 저희 스튜디오도 보랏빛으로 물들여봤는데요.';
let scriptTest22_2 = new Script();
scriptTest22_2.startTime = new Time(6, 28);
scriptTest22_2.endTime = new Time(8, 52);
scriptTest22_2.text = '바로 BTS 이야기입니다.';
let scriptTest22_3 = new Script();
scriptTest22_3.startTime = new Time(8, 52);
scriptTest22_3.endTime = new Time(13, 24);
scriptTest22_3.text = '방탄소년단이 미국 LA에서 2년 만에 대면 공연을 열었습니다.';
let scriptTest22_4 = new Script();
scriptTest22_4.startTime = new Time(13, 24);
scriptTest22_4.endTime = new Time(16, 50);
scriptTest22_4.text = '오늘만 무려 5만 명이 넘는 팬들이 몰렸는데요.';
let scriptTest22_5 = new Script();
scriptTest22_5.startTime = new Time(16, 50);
scriptTest22_5.endTime = new Time(21, 39);
scriptTest22_5.text = '이번 공연의 제목은 BTS 퍼미션 투 댄스 온 스테이지입니다.';
let scriptTest22_6 = new Script();
scriptTest22_6.startTime = new Time(21, 39);
scriptTest22_6.endTime = new Time(27, 73);
scriptTest22_6.text = 'BTS의 노래 제목이기도 하고 팬들과 드디어 만나게 되는 기쁨을 담은 것 같기도 한데요.';
let scriptTest22_7 = new Script();
scriptTest22_7.startTime = new Time(27, 73);
scriptTest22_7.endTime = new Time(33, 47);
scriptTest22_7.text = '어떤 팬이 공연 제목의 알파벳을 재조합해 봤더니 스토리즈 온 팬데믹이 됐다고 합니다.';
let scriptTest22_8 = new Script();
scriptTest22_8.startTime = new Time(33, 47);
scriptTest22_8.endTime = new Time(38, 61);
scriptTest22_8.text = '아직 코로나의 유행은 끝나지 않았지만, BTS는 어떤 스토리를 전했을까요?';
let scriptTest22_9 = new Script();
scriptTest22_9.startTime = new Time(38, 61);
scriptTest22_9.endTime = new Time(41, 33);
scriptTest22_9.text = 'LA에서 김수진 특파원입니다.';

// 23번 뉴스
let tagTest23_1 = new Tag();
tagTest23_1.name = '코로나';
let tagTest23_2 = new Tag();
tagTest23_2.name = '중국';
let tagTest23_3 = new Tag();
tagTest23_3.name = '연휴';

let scriptTest23_1 = new Script();
scriptTest23_1.startTime = new Time(0, 0);
scriptTest23_1.endTime = new Time(5, 76);
scriptTest23_1.text = '중국에서 정부 수립을 기념하는 국경절 연휴가 올해는 무려 팔 일이나 이어졌는데요.';
let scriptTest23_2 = new Script();
scriptTest23_2.startTime = new Time(5, 76);
scriptTest23_2.endTime = new Time(11, 35);
scriptTest23_2.text = '연휴 동안 중국 국내 관광객만 육 억 삼천만 명에 달했다고 합니다.';
let scriptTest23_3 = new Script();
scriptTest23_3.startTime = new Time(11, 35);
scriptTest23_3.endTime = new Time(18, 20);
scriptTest23_3.text = '관광지 곳곳이 이렇게 중국 사람들로 가득 찼는데 마스크 안 쓴 사람들도 자주 눈에 띄었습니다.';
let scriptTest23_4 = new Script();
scriptTest23_4.startTime = new Time(18, 20);
scriptTest23_4.endTime = new Time(26, 67);
scriptTest23_4.text = '이렇게 중국은 코로나가 종식됐다고 과시하려는 것으로 보이지만 이러다 또 코로나가 퍼질 수 있다는 것은 간과했다는 지적이 나옵니다.';
let scriptTest23_5 = new Script();
scriptTest23_5.startTime = new Time(26, 67);
scriptTest23_5.endTime = new Time(28, 99);
scriptTest23_5.text = '강연섭 기자가 보도합니다.';

// 24번 뉴스
let tagTest24_1 = new Tag();
tagTest24_1.name = '윤여정';
let tagTest24_2 = new Tag();
tagTest24_2.name = '오스카';
let tagTest24_3 = new Tag();
tagTest24_3.name = '시상';

let scriptTest24_1 = new Script();
scriptTest24_1.startTime = new Time(0, 0);
scriptTest24_1.endTime = new Time(8, 73);
scriptTest24_1.text = '지난해 영화 미나리로 아카데미 여우조연상을 수상한 윤여정 배우가 올해는 시상자로 오스카 무대에 다시 올랐습니다.';
let scriptTest24_2 = new Script();
scriptTest24_2.startTime = new Time(8, 73);
scriptTest24_2.endTime = new Time(16, 11);
scriptTest24_2.text = '난민을 지지하는 의미의 파란 리본을 달고 등장했는데 올해도 특유의 유머와 재치를 뽐냈습니다.';
let scriptTest24_3 = new Script();
scriptTest24_3.startTime = new Time(16, 11);
scriptTest24_3.endTime = new Time(22, 33);
scriptTest24_3.text = '특히 청각 장애인 수상자에게 수어로 축하인사를 전해서 감동을 안기기도 했습니다.';
let scriptTest24_4 = new Script();
scriptTest24_4.startTime = new Time(22, 33);
scriptTest24_4.endTime = new Time(25, 81);
scriptTest24_4.text = '임소정 기자가 전해드리겠습니다.';

// 25번 뉴스
let tagTest25_1 = new Tag();
tagTest25_1.name = '아베';
let tagTest25_2 = new Tag();
tagTest25_2.name = '총리';
let tagTest25_3 = new Tag();
tagTest25_3.name = '우익';

let scriptTest25_1 = new Script();
scriptTest25_1.startTime = new Time(0, 0);
scriptTest25_1.endTime = new Time(9, 0);
scriptTest25_1.text = '아베 전 총리는 일본 역사상 가장 젊은 나이에 총리 자리에 올라서 가장 오래 권력을 잡았던 인물입니다.';
let scriptTest25_2 = new Script();
scriptTest25_2.startTime = new Time(9, 0);
scriptTest25_2.endTime = new Time(22, 30);
scriptTest25_2.text = '일본 우익의 상징으로 총리에서 물러난 뒤에도 막강한 영향력을 행사했던 아베 전 총리는 야스쿠니 심사 참배를 놓고 우리 과거사 문제를 놓고 우리와는 자주 부딪혔던 정치인이기도 합니다.';
let scriptTest25_3 = new Script();
scriptTest25_3.startTime = new Time(22, 30);
scriptTest25_3.endTime = new Time(27, 27);
scriptTest25_3.text = '앞으로 일본 사회에 변화가 있을지는 정형태 기자가 짚어봤습니다.';

// 26번 뉴스
let tagTest26_1 = new Tag();
tagTest26_1.name = '정준영';
let tagTest26_2 = new Tag();
tagTest26_2.name = '최종훈';
let tagTest26_3 = new Tag();
tagTest26_3.name = '성폭행';

let scriptTest26_1 = new Script();
scriptTest26_1.startTime = new Time(0, 0);
scriptTest26_1.endTime = new Time(9, 25);
scriptTest26_1.text = '술에 취한 여성을 집단 성폭행하고 또 영상을 찍어서 퍼뜨린 혐의를 받는 가수 정준영 씨에게 법원이 징역 6년을 선고했습니다.';
let scriptTest26_2 = new Script();
scriptTest26_2.startTime = new Time(9, 25);
scriptTest26_2.endTime = new Time(13, 34);
scriptTest26_2.text = '또 가수 최종훈 씨에게도 징역 5년이 선고됐습니다.';
let scriptTest26_3 = new Script();
scriptTest26_3.startTime = new Time(13, 34);
scriptTest26_3.endTime = new Time(21, 20);
scriptTest26_3.text = '법원은 사회적 책임을 다해야 할 유명 연예인들이 여성을 성적 쾌락의 도구로 여겼다며 중형을 선고했습니다.';
let scriptTest26_4 = new Script();
scriptTest26_4.startTime = new Time(21, 20);
scriptTest26_4.endTime = new Time(23, 87);
scriptTest26_4.text = '안상우 기자입니다.';

// 27번 뉴스
let tagTest27_1 = new Tag();
tagTest27_1.name = '영화배우';
let tagTest27_2 = new Tag();
tagTest27_2.name = '강수연';
let tagTest27_3 = new Tag();
tagTest27_3.name = '심정지';

let scriptTest27_1 = new Script();
scriptTest27_1.startTime = new Time(0, 0);
scriptTest27_1.endTime = new Time(4, 65);
scriptTest27_1.text = '영화배우 강수연 씨가 심정지 상태로 병원에 옮겨졌습니다.';
let scriptTest27_2 = new Script();
scriptTest27_2.startTime = new Time(4, 65);
scriptTest27_2.endTime = new Time(13, 70);
scriptTest27_2.text = '강 씨는 오늘 오후 5시 50분쯤, 서울 강남구 자택에서 통증을 호소하다 심정지 상태로 소방 구조대에 의해 인근 병원으로 이송됐습니다.';
let scriptTest27_3 = new Script();
scriptTest27_3.startTime = new Time(13, 70);
scriptTest27_3.endTime = new Time(17, 86);
scriptTest27_3.text = '강 씨는 현재 의식이 없는 상태에서 치료를 받고 있는 것으로 전해졌습니다.';
let scriptTest27_4 = new Script();
scriptTest27_4.startTime = new Time(17, 86);
scriptTest27_4.endTime = new Time(29, 56);
scriptTest27_4.text = '올해 55살인 강 씨는 만 4살에 아역 배우로 데뷔한 뒤 영화 \'씨받이\'로 1987년 베니스 국제 영화제 여우주연상을 받는 등 대한민국을 대표하는 배우로 활약해왔습니다.';

// 28번 뉴스
let tagTest28_1 = new Tag();
tagTest28_1.name = '항공권';
let tagTest28_2 = new Tag();
tagTest28_2.name = '환불';
let tagTest28_3 = new Tag();
tagTest28_3.name = '수수료';

let scriptTest28_1 = new Script();
scriptTest28_1.startTime = new Time(0, 0);
scriptTest28_1.endTime = new Time(4, 65);
scriptTest28_1.text = '지난달 국제선 탑승객이 120만 명을 넘어섰습니다.';
let scriptTest28_2 = new Script();
scriptTest28_2.startTime = new Time(4, 65);
scriptTest28_2.endTime = new Time(9, 81);
scriptTest28_2.text = '코로나19로 발이 묶였던 지난해와 비교하면 5배 넘게 급증한 겁니다.';
let scriptTest28_3 = new Script();
scriptTest28_3.startTime = new Time(9, 81);
scriptTest28_3.endTime = new Time(15, 83);
scriptTest28_3.text = '점차 국제선 항공편이 회복된다는 소식에 표 구하는 사람도 빠르게 느는 모습입니다.';
let scriptTest28_4 = new Script();
scriptTest28_4.startTime = new Time(15, 83);
scriptTest28_4.endTime = new Time(26, 41);
scriptTest28_4.text = '하지만 항공편 늘어나는 속도는 수요를 못 따라가고, 여기에 고유가로 유류 할증료까지 올라 항공권 가격은 말 그대로 하늘 높은 줄 모릅니다.';
let scriptTest28_5 = new Script();
scriptTest28_5.startTime = new Time(26, 41);
scriptTest28_5.endTime = new Time(39, 24);
scriptTest28_5.text = '조금이라도 부담을 덜어볼까, 온라인 해외 사이트에서 직접 표를 사는 소비자들도 적지 않은데 운항 일정이 일방적으로 바뀌어도 환불이나 취소가 까다로워서 각별한 주의가 필요합니다.';
let scriptTest28_6 = new Script();
scriptTest28_6.startTime = new Time(39, 24);
scriptTest28_6.endTime = new Time(41, 41);
scriptTest28_6.text = '최은진 기자가 보도합니다.';

// 29번 뉴스
let tagTest29_1 = new Tag();
tagTest29_1.name = '윤석열';
let tagTest29_2 = new Tag();
tagTest29_2.name = '삼부토건';
let tagTest29_3 = new Tag();
tagTest29_3.name = '봐주기의혹';

let scriptTest29_1 = new Script();
scriptTest29_1.startTime = new Time(0, 0);
scriptTest29_1.endTime = new Time(5, 13);
scriptTest29_1.text = '윤석열 후보와 가까운 사이로 알려진 조남욱 전 삼부토건 회장.';
let scriptTest29_2 = new Script();
scriptTest29_2.startTime = new Time(5, 13);
scriptTest29_2.endTime = new Time(9, 25);
scriptTest29_2.text = '그의 후계자인 둘째 아들의 말이 공개가 되면서 논란이 일고 있는데요.';
let scriptTest29_3 = new Script();
scriptTest29_3.startTime = new Time(9, 25);
scriptTest29_3.endTime = new Time(12, 35);
scriptTest29_3.text = '윤석열 총장한테 세 번이나 걸렸다.';
let scriptTest29_4 = new Script();
scriptTest29_4.startTime = new Time(12, 35);
scriptTest29_4.endTime = new Time(14, 71);
scriptTest29_4.text = '아버지가 봐달라고 난리 쳤다.';
let scriptTest29_5 = new Script();
scriptTest29_5.startTime = new Time(14, 71);
scriptTest29_5.endTime = new Time(23, 21);
scriptTest29_5.text = '과거 윤 후보의 검사 시절 삼부토건이 검찰 수사를 번번이 빠져나갔던 배경으로 의심되는 봐주기 의혹이 짙어지고 있습니다.';
let scriptTest29_6 = new Script();
scriptTest29_6.startTime = new Time(23, 21);
scriptTest29_6.endTime = new Time(25, 12);
scriptTest29_6.text = '이재욱 기자가 취재했습니다.';

// 30번 뉴스
let tagTest30_1 = new Tag();
tagTest30_1.name = '물가';
let tagTest30_2 = new Tag();
tagTest30_2.name = '월급';
let tagTest30_3 = new Tag();
tagTest30_3.name = '중산층';

let scriptTest30_1 = new Script();
scriptTest30_1.startTime = new Time(0, 0);
scriptTest30_1.endTime = new Time(8, 91);
scriptTest30_1.text = '경기침체 공포에도 방금 전해드린 대로 미국 연준이 금리를 올리겠다는 의지를 가지는 건 그만큼 물가상승 폭이 크기 때문입니다.';
let scriptTest30_2 = new Script();
scriptTest30_2.startTime = new Time(8, 91);
scriptTest30_2.endTime = new Time(16, 74);
scriptTest30_2.text = '이 정도로 물가는 뛰는데 월급은 그만큼 오르지 않아서 중산층은 실질소득이 오히려 줄어든 것으로 나타났습니다.';
let scriptTest30_3 = new Script();
scriptTest30_3.startTime = new Time(16, 74);
scriptTest30_3.endTime = new Time(22, 43);
scriptTest30_3.text = '당장 월급 올려달라는 요구가 거센데 정부가 물가가 더 오를까 봐 자제를 요청하고 있습니다.';
let scriptTest30_4 = new Script();
scriptTest30_4.startTime = new Time(22, 43);
scriptTest30_4.endTime = new Time(24, 3);
scriptTest30_4.text = '정혜진 기자입니다.';

// 31번 뉴스
let tagTest31_1 = new Tag();
tagTest31_1.name = '미국';
let tagTest31_2 = new Tag();
tagTest31_2.name = '시위';
let tagTest31_3 = new Tag();
tagTest31_3.name = '트럼프';

let scriptTest31_1 = new Script();
scriptTest31_1.startTime = new Time(0, 0);
scriptTest31_1.endTime = new Time(9, 26);
scriptTest31_1.text = '흑인 남성 \'조지 플로이드\'가 백인 경찰의 강압적인 체포 과정에서 숨진 사건에 대한 항의 시위가 미국 전역에서 8일째 이어지고 있습니다.';
let scriptTest31_2 = new Script();
scriptTest31_2.startTime = new Time(9, 26);
scriptTest31_2.endTime = new Time(17, 6);
scriptTest31_2.text = '수도 워싱턴 DC에 주 방위군 1500명이 추가로 투입될 예정인 가운데 트럼프 대통령은 강경 대응 방침을 굽히지 않고 있습니다.';
let scriptTest31_3 = new Script();
scriptTest31_3.startTime = new Time(17, 6);
scriptTest31_3.endTime = new Time(22, 19);
scriptTest31_3.text = '이번 시위로 지금까지 체포된 사람은 5600명이 넘고 부상자가 속출하고 있습니다.';
let scriptTest31_4 = new Script();
scriptTest31_4.startTime = new Time(22, 19);
scriptTest31_4.endTime = new Time(31, 18);
scriptTest31_4.text = '전쟁터를 방불케 하는 상황이 곳곳에서 펼쳐지고 있습니다. 워싱턴과 뉴욕, LA 등 주요 도시에는 야간 통행 금지령이 계속해서 내려졌습니다.';
let scriptTest31_5 = new Script();
scriptTest31_5.startTime = new Time(31, 18);
scriptTest31_5.endTime = new Time(34, 7);
scriptTest31_5.text = '워싱턴에서 임종주 특파원이 소식 전해왔습니다.';

// 32번 뉴스
let tagTest32_1 = new Tag();
tagTest32_1.name = '경제성장률';
let tagTest32_2 = new Tag();
tagTest32_2.name = '불황';
let tagTest32_3 = new Tag();
tagTest32_3.name = '경제';

let scriptTest32_1 = new Script();
scriptTest32_1.startTime = new Time(0, 0);
scriptTest32_1.endTime = new Time(8, 95);
scriptTest32_1.text = '어느 정도 경제 발전을 이룬 나라가 계속해서 몇 퍼센트씩 높은 경제 성장률을 유지하기는 사실 쉽지는 않습니다.';
let scriptTest32_2 = new Script();
scriptTest32_2.startTime = new Time(8, 95);
scriptTest32_2.endTime = new Time(16, 56);
scriptTest32_2.text = '그렇다고 해도 갈수록 경제 활력이 떨어지고 또 경기가 부진한 지금 상황은 심각하게 볼 필요가 있습니다.';
let scriptTest32_3 = new Script();
scriptTest32_3.startTime = new Time(16, 56);
scriptTest32_3.endTime = new Time(21, 7);
scriptTest32_3.text = '박민하 기자가 우리 경제의 문제점과 그 해법까지 함께 짚어봤습니다.';

// 33번 뉴스
let tagTest33_1 = new Tag();
tagTest33_1.name = '필리핀';
let tagTest33_2 = new Tag();
tagTest33_2.name = '대선';
let tagTest33_3 = new Tag();
tagTest33_3.name = '독재';

let scriptTest33_1 = new Script();
scriptTest33_1.startTime = new Time(0, 0);
scriptTest33_1.endTime = new Time(8, 43);
scriptTest33_1.text = '필리핀에서 20여 년 동안 독재와 부정 축재를 일삼다 쫓겨난 마르코스 이멜다 부부, 기억하시는지요.';
let scriptTest33_2 = new Script();
scriptTest33_2.startTime = new Time(8, 43);
scriptTest33_2.endTime = new Time(13, 35);
scriptTest33_2.text = '이멜다가 다시 필리핀 대통령궁으로 들어갈 가능성이 높아지고 있습니다.';
let scriptTest33_3 = new Script();
scriptTest33_3.startTime = new Time(13, 35);
scriptTest33_3.endTime = new Time(20, 78);
scriptTest33_3.text = '그녀의 아들 \'봉봉 마르코스 주니어\'가 오는 5월에 있을 필리핀 대선에서 유력한 주자로 꼽히고 있습니다.';
let scriptTest33_4 = new Script();
scriptTest33_4.startTime = new Time(20, 78);
scriptTest33_4.endTime = new Time(22, 81);
scriptTest33_4.text = '방콕 김원장 특파원입니다.';

// 34번 뉴스
let tagTest34_1 = new Tag();
tagTest34_1.name = '완도실종';
let tagTest34_2 = new Tag();
tagTest34_2.name = '일가족';
let tagTest34_3 = new Tag();
tagTest34_3.name = '부검';

let scriptTest34_1 = new Script();
scriptTest34_1.startTime = new Time(0, 0);
scriptTest34_1.endTime = new Time(11, 6);
scriptTest34_1.text = '전남 완도 앞바다에서 숨진 채 발견된 조유나 양 일가족 3명의 정확한 사망 원인을 밝히기 위해 경찰이 1차 부검을 진행한 결과 \'사인 불명\'으로 나왔습니다.';
let scriptTest34_2 = new Script();
scriptTest34_2.startTime = new Time(11, 6);
scriptTest34_2.endTime = new Time(20, 85);
scriptTest34_2.text = '광주 남부경찰서는 국립과학수사연구원으로부터 사인은 불명이지만 익사 가능성을 배제할 수 없다는 1차 부검 결과를 통보받았다고 밝혔습니다. ';
let scriptTest34_3 = new Script();
scriptTest34_3.startTime = new Time(20, 85);
scriptTest34_3.endTime = new Time(29, 0);
scriptTest34_3.text = '경찰은 정확한 사인 파악을 위해 정밀 검사를 의뢰했고 최종 결과가 나오려면 한 달가량 걸릴 것으로 보입니다.';

// 35번 뉴스
let tagTest35_1 = new Tag();
tagTest35_1.name = '허준이';
let tagTest35_2 = new Tag();
tagTest35_2.name = '필즈상';
let tagTest35_3 = new Tag();
tagTest35_3.name = '수학자';

let scriptTest35_1 = new Script();
scriptTest35_1.startTime = new Time(0, 0);
scriptTest35_1.endTime = new Time(3, 25);
scriptTest35_1.text = '오늘 반가운 소식이 하나 전해졌습니다.';
let scriptTest35_2 = new Script();
scriptTest35_2.startTime = new Time(3, 25);
scriptTest35_2.endTime = new Time(8, 70);
scriptTest35_2.text = '수학계에서 가장 권위 있는 상으로 수학계 노벨상이라고 불리는 필즈상.';
let scriptTest35_3 = new Script();
scriptTest35_3.startTime = new Time(8, 70);
scriptTest35_3.endTime = new Time(16, 47);
scriptTest35_3.text = '미국 프린스턴 대학의 교수이자 한국 고등과학원의 석학 교수인 허준이 교수가 수상자로 선정이 됐습니다.';
let scriptTest35_4 = new Script();
scriptTest35_4.startTime = new Time(16, 47);
scriptTest35_4.endTime = new Time(22, 95);
scriptTest35_4.text = '한국계 수학자로서는 첫 수상인데 한국 수학의 발전을 보여준 쾌거라고 할 수 있겠습니다.';
let scriptTest35_5 = new Script();
scriptTest35_5.startTime = new Time(22, 95);
scriptTest35_5.endTime = new Time(25, 49);
scriptTest35_5.text = '먼저 박소희 기자가 전해드리겠습니다.';

// 36번 뉴스
let tagTest36_1 = new Tag();
tagTest36_1.name = '오징어게임';
let tagTest36_2 = new Tag();
tagTest36_2.name = '오일남';
let tagTest36_3 = new Tag();
tagTest36_3.name = '골든글로브';

let scriptTest36_1 = new Script();
scriptTest36_1.startTime = new Time(0, 0);
scriptTest36_1.endTime = new Time(8, 23);
scriptTest36_1.text = '깐부 할아버지로 잘 알려진 배우 오영수 씨가 드라마 \'오징어 게임\'으로 한국 배우 최초로 미국 골든글로브 연기상을 수상했습니다.';
let scriptTest36_2 = new Script();
scriptTest36_2.startTime = new Time(8, 23);
scriptTest36_2.endTime = new Time(12, 56);
scriptTest36_2.text = '오 씨가 수상한 부문은 골든글로브 TV 드라마 남우조연상입니다.';
let scriptTest36_3 = new Script();
scriptTest36_3.startTime = new Time(12, 56);
scriptTest36_3.endTime = new Time(20, 4);
scriptTest36_3.text = 'TV 드라마 남우주연상은 석세션의 제레미 스트롱에게 돌아가서 후보에 오른 이정재 씨의 수상은 불발됐습니다.';
let scriptTest36_4 = new Script();
scriptTest36_4.startTime = new Time(20, 4);
scriptTest36_4.endTime = new Time(30, 0);
scriptTest36_4.text = '오징어게임은 456억 원의 상금을 차지하기 위해서 목숨을 걸고 벌이는 서바이벌 게임을 그린 드라마로 오 씨는 게임 참가자 오일남 역을 맡았습니다.';

// 37번 뉴스
let tagTest37_1 = new Tag();
tagTest37_1.name = '커피콩';
let tagTest37_2 = new Tag();
tagTest37_2.name = '부가가치세';
let tagTest37_3 = new Tag();
tagTest37_3.name = '수입';

let scriptTest37_1 = new Script();
scriptTest37_1.startTime = new Time(10, 33);
scriptTest37_1.endTime = new Time(13, 97);
scriptTest37_1.text = '화제의 경제 뉴스를 빠르게 전해드리는 신선한 경제 시간입니다.';
let scriptTest37_2 = new Script();
scriptTest37_2.startTime = new Time(13, 97);
scriptTest37_2.endTime = new Time(22, 98);
scriptTest37_2.text = '커피콩이라고 하죠. 커피 생두에 붙이던 수입 부가가치세 10%를 면제하기로 하면서 커피 가격도 내릴까 기대가 큰데요.';
let scriptTest37_3 = new Script();
scriptTest37_3.startTime = new Time(22, 98);
scriptTest37_3.endTime = new Time(25, 39);
scriptTest37_3.text = '과연 내려갈까요?';
let scriptTest37_4 = new Script();
scriptTest37_4.startTime = new Time(25, 39);
scriptTest37_4.endTime = new Time(35, 52);
scriptTest37_4.text = '국내 커피 생두의 25%를 수입하는 동서식품은 이미 생두 가격이 2년 새 2배나 오른 상황이라 가격을 내릴 계획이 없다고 밝혔습니다.';
let scriptTest37_5 = new Script();
scriptTest37_5.startTime = new Time(35, 52);
scriptTest37_5.endTime = new Time(43, 77);
scriptTest37_5.text = '인하 방침을 밝힌 수입업체도 있긴 하지만 통관부터 배송까지 걸리는 시간을 감안하면 두 달 뒤에야 효과가 나타날 것으로 보이고요.';
let scriptTest37_6 = new Script();
scriptTest37_6.startTime = new Time(43, 77);
scriptTest37_6.endTime = new Time(55, 53);
scriptTest37_6.text = '이들 업체로부터 생두를 구매하는 카페들이 커피 가격을 내려야 소비자들이 혜택을 볼 텐데 임대료와 인건비 부담이 많이 늘어난 상황이라 실제 가격 인하로 이어질지는 미지수입니다.';
let scriptTest37_7 = new Script();
scriptTest37_7.startTime = new Time(55, 53);
scriptTest37_7.endTime = new Time(65, 34);
scriptTest37_7.text = '또 카페 프랜차이즈 1위 업체인 스타벅스 코리아는 생두 대신 볶은 원두를 수입해 부가세 면제 혜택을 볼 수 없다고 하네요.';

// 38번 뉴스
let tagTest38_1 = new Tag();
tagTest38_1.name = '현대자동차';
let tagTest38_2 = new Tag();
tagTest38_2.name = '디자이너';
let tagTest38_3 = new Tag();
tagTest38_3.name = '과로자살';

let scriptTest38_1 = new Script();
scriptTest38_1.startTime = new Time(0, 0);
scriptTest38_1.endTime = new Time(5, 33);
scriptTest38_1.text = '현대자동차 남양연구소는 현대차의 심장 같은 곳입니다.';
let scriptTest38_2 = new Script();
scriptTest38_2.startTime = new Time(5, 33);
scriptTest38_2.endTime = new Time(12, 32);
scriptTest38_2.text = '1년 4개월 전 이 연구소 디자인 센터의 한 팀장급 직원이 스스로 생을 정리했습니다.';
let scriptTest38_3 = new Script();
scriptTest38_3.startTime = new Time(12, 32);
scriptTest38_3.endTime = new Time(19, 41);
scriptTest38_3.text = 'MBC는 고인이 남긴 기록, 유가족과 여러 동료의 증언 그리고 회사의 입장을 취재했습니다.';
let scriptTest38_4 = new Script();
scriptTest38_4.startTime = new Time(19, 41);
scriptTest38_4.endTime = new Time(25, 44);
scriptTest38_4.text = '그 결과 이 죽음이 개인의 선택을 넘어 사회적 죽음이라고 판단하기로 했습니다.';
let scriptTest38_5 = new Script();
scriptTest38_5.startTime = new Time(25, 44);
scriptTest38_5.endTime = new Time(31, 43);
scriptTest38_5.text = '우리에게는 아직 생소한 과로 자살. 차주혁 기자의 보도로 시작합니다.';

// 39번 뉴스
let tagTest39_1 = new Tag();
tagTest39_1.name = '통일부';
let tagTest39_2 = new Tag();
tagTest39_2.name = '북한';
let tagTest39_3 = new Tag();
tagTest39_3.name = '어민';

let scriptTest39_1 = new Script();
scriptTest39_1.startTime = new Time(0, 0);
scriptTest39_1.endTime = new Time(9, 85);
scriptTest39_1.text = '2019년 11월 북한 어민 2명이 북송된 사건과 관련해 통일부가 당시 잘못된 부분이 있었다는 입장을 밝혔습니다. ';
let scriptTest39_2 = new Script();
scriptTest39_2.startTime = new Time(9, 85);
scriptTest39_2.endTime = new Time(15, 55);
scriptTest39_2.text = '헌법상 대한민국 국민인 탈북 어민들이 적절한 조치를 받지 못했다는 건데요.';
let scriptTest39_3 = new Script();
scriptTest39_3.startTime = new Time(15, 55);
scriptTest39_3.endTime = new Time(22, 64);
scriptTest39_3.text = '검찰 수사가 시작된 가운데 당시 어민들의 귀순 의사에 진정성이 있었는지가 쟁점이 될 것으로 보입니다.';
let scriptTest39_4 = new Script();
scriptTest39_4.startTime = new Time(22, 64);
scriptTest39_4.endTime = new Time(24, 9);
scriptTest39_4.text = '김수연 기자입니다.';

// 40번 뉴스
let tagTest40_1 = new Tag();
tagTest40_1.name = '이은해';
let tagTest40_2 = new Tag();
tagTest40_2.name = '조현수';
let tagTest40_3 = new Tag();
tagTest40_3.name = '보험사기';

let scriptTest40_1 = new Script();
scriptTest40_1.startTime = new Time(0, 0);
scriptTest40_1.endTime = new Time(7, 15);
scriptTest40_1.text = '3년 전 수영을 못하는 한 30대 남성이 계곡에서 다이빙을 하다가 숨진 사건이 있었습니다.';
let scriptTest40_2 = new Script();
scriptTest40_2.startTime = new Time(7, 15);
scriptTest40_2.endTime = new Time(10, 62);
scriptTest40_2.text = '단순한 사망 사고로 끝날 뻔했던 이 사건.';
let scriptTest40_3 = new Script();
scriptTest40_3.startTime = new Time(10, 62);
scriptTest40_3.endTime = new Time(17, 21);
scriptTest40_3.text = '부인이 숨진 남편의 명의로 8억 원이 넘는 보험금을 타려고 하면서 재수사가 시작됐는데요.';
let scriptTest40_4 = new Script();
scriptTest40_4.startTime = new Time(17, 21);
scriptTest40_4.endTime = new Time(24, 24);
scriptTest40_4.text = '검찰이 숨진 남성의 부인 그리고 공범인 30대 남성을 살인 혐의로 공개 수배했습니다.';
let scriptTest40_5 = new Script();
scriptTest40_5.startTime = new Time(24, 24);
scriptTest40_5.endTime = new Time(26, 19);
scriptTest40_5.text = '차현진 기자가 취재했습니다.';

// 41번 뉴스
let tagTest41_1 = new Tag();
tagTest41_1.name = '스리랑카';
let tagTest41_2 = new Tag();
tagTest41_2.name = '국가부도';
let tagTest41_3 = new Tag();
tagTest41_3.name = '대통령사임';

let scriptTest41_1 = new Script();
scriptTest41_1.startTime = new Time(0, 0);
scriptTest41_1.endTime = new Time(4, 88);
scriptTest41_1.text = '이번에는 국가 부도 상태에 빠진 스리랑카 소식 전해드립니다.';
let scriptTest41_2 = new Script();
scriptTest41_2.startTime = new Time(4, 88);
scriptTest41_2.endTime = new Time(11, 57);
scriptTest41_2.text = '전기도 끊기고 연료도 살 수 없게 되자 분노한 국민들이 정권 퇴진을 외치며 거리로 나왔는데요.';
let scriptTest41_3 = new Script();
scriptTest41_3.startTime = new Time(11, 57);
scriptTest41_3.endTime = new Time(18, 81);
scriptTest41_3.text = '대통령 집무실과 관저를 점거한 지 하루 만에 스리랑카 대통령이 전격 사임 의사를 밝혔습니다.';
let scriptTest41_4 = new Script();
scriptTest41_4.startTime = new Time(18, 81);
scriptTest41_4.endTime = new Time(23, 33);
scriptTest41_4.text = '최악의 경제난에 이어 정치권까지 격랑에 빠지게 됐습니다.';
let scriptTest41_5 = new Script();
scriptTest41_5.startTime = new Time(23, 33);
scriptTest41_5.endTime = new Time(25, 10);
scriptTest41_5.text = '조재형 기자입니다.';

// 42번 뉴스
let tagTest42_1 = new Tag();
tagTest42_1.name = '대선';
let tagTest42_2 = new Tag();
tagTest42_2.name = '청년';
let tagTest42_3 = new Tag();
tagTest42_3.name = '가난';

let scriptTest42_1 = new Script();
scriptTest42_1.startTime = new Time(0, 0);
scriptTest42_1.endTime = new Time(6, 28);
scriptTest42_1.text = '이번 대선에서 후보들이 가장 공들이는 대상은 2030 청년세대입니다.';
let scriptTest42_2 = new Script();
scriptTest42_2.startTime = new Time(6, 28);
scriptTest42_2.endTime = new Time(19, 46);
scriptTest42_2.text = '이들 표심에 따라서 판도 자체가 확 바뀔 수 있다고 해도 과언이 아닌데, 청년들이 후보들에게 요구하는 내용, 얼마 전 청년 시민단체 38개의 합동 기자회견에 단서가 있습니다.';
let scriptTest42_3 = new Script();
scriptTest42_3.startTime = new Time(19, 46);
scriptTest42_3.endTime = new Time(37, 49);
scriptTest42_3.text = '보시는 것처럼 이대로라면 5년 뒤에는 더 엉망일 거라면서 청년의 목소리와 현실을 반영한 공약을 내놔라, 또 대선 다가올 때만 선심 쓰는 척하지 말고, 평소에도 함께 머리 맞대고, 어려움을 헤쳐 나갈 자리를 마련하자 이렇게 말했습니다.';
let scriptTest42_4 = new Script();
scriptTest42_4.startTime = new Time(37, 49);
scriptTest42_4.endTime = new Time(43, 63);
scriptTest42_4.text = '그렇다면 2030 청년들, 어떤 특징을 가지고 있고, 가장 고민하는 게 뭘까요?';
let scriptTest42_5 = new Script();
scriptTest42_5.startTime = new Time(43, 63);
scriptTest42_5.endTime = new Time(46, 24);
scriptTest42_5.text = '강병수 기자가 자세히 들여다봤습니다.';

// 43번 뉴스
let tagTest43_1 = new Tag();
tagTest43_1.name = '방탄소년단';
let tagTest43_2 = new Tag();
tagTest43_2.name = 'AMA';
let tagTest43_3 = new Tag();
tagTest43_3.name = '그래미';

let scriptTest43_1 = new Script();
scriptTest43_1.startTime = new Time(0, 0);
scriptTest43_1.endTime = new Time(11, 21);
scriptTest43_1.text = '방탄소년단 BTS가 미국의 3대 대중 음악 시상식으로 꼽히는 아메리칸 뮤직어워즈에서 대상에 해당하는 올해의 아티스트상을 받았습니다.';
let scriptTest43_2 = new Script();
scriptTest43_2.startTime = new Time(11, 21);
scriptTest43_2.endTime = new Time(19, 13);
scriptTest43_2.text = '아시아 가수가 이 상을 받은 건 사상 처음인데, 내년 초에 열릴 그래미 시상식에 대한 기대감도 높아지고 있습니다.';
let scriptTest43_3 = new Script();
scriptTest43_3.startTime = new Time(19, 13);
scriptTest43_3.endTime = new Time(21, 4);
scriptTest43_3.text = '워싱턴 김윤수 특파원입니다.';

// 44번 뉴스
let tagTest44_1 = new Tag();
tagTest44_1.name = '승리';
let tagTest44_2 = new Tag();
tagTest44_2.name = '빅뱅';
let tagTest44_3 = new Tag();
tagTest44_3.name = '성매매';

let scriptTest44_1 = new Script();
scriptTest44_1.startTime = new Time(0, 0);
scriptTest44_1.endTime = new Time(4, 76);
scriptTest44_1.text = '여러분, 안녕하십니까? 8월 12일 목요일 MBC 5시 뉴스입니다.';
let scriptTest44_2 = new Script();
scriptTest44_2.startTime = new Time(4, 76);
scriptTest44_2.endTime = new Time(18, 91);
scriptTest44_2.text = '투자 유치를 위해 외국인 투자자에게 성매매를 알선하고 20억 원대 해외 원정 도박을 한 혐의 등으로 구속된 그룹 빅뱅의 전 멤버 승리가 군사법원에서 징역 3년을 선고받고 법정 구속됐습니다.';
let scriptTest44_3 = new Script();
scriptTest44_3.startTime = new Time(18, 91);
scriptTest44_3.endTime = new Time(30, 67);
scriptTest44_3.text = '경기 용인시 소재 지사 작전사령부 보통군사법원은 오늘 성매매 알선 등 9개 혐의로 기소된 승리에게 징역 3년의 추징금 11억 5,000만 원을 선고했습니다.';
let scriptTest44_4 = new Script();
scriptTest44_4.startTime = new Time(30, 67);
scriptTest44_4.endTime = new Time(47, 14);
scriptTest44_4.text = '재판부는 승리가 전 유리홀딩스 대표 유인석과 공모해 외국인 투자자들에게 여러 차례 성매매를 알선하고 이득을 얻었다며 성을 상품화하고 풍속을 해친 피고인의 범행은 사회적 해악이 작지 않다고 밝혔습니다.';

// 45번 뉴스
let tagTest45_1 = new Tag();
tagTest45_1.name = '아이돌학교';
let tagTest45_2 = new Tag();
tagTest45_2.name = '투표조작';
let tagTest45_3 = new Tag();
tagTest45_3.name = '구속영장';

let scriptTest45_1 = new Script();
scriptTest45_1.startTime = new Time(0, 0);
scriptTest45_1.endTime = new Time(9, 80);
scriptTest45_1.text = '시청자 투표로 아이돌 가수를 뽑는 프로그램에서 그 투표 결과를 조작한 혐의로 구속된 엠넷의 제작진이 지금 재판을 받고 있습니다.';
let scriptTest45_2 = new Script();
scriptTest45_2.startTime = new Time(9, 80);
scriptTest45_2.endTime = new Time(18, 46);
scriptTest45_2.text = '그런데 같은 회사의 다른 오디션 프로그램에서도 결과를 조작했다는 정황이 드러나서 제작진 2명에 대해 구속영장이 청구됐습니다.';
let scriptTest45_3 = new Script();
scriptTest45_3.startTime = new Time(18, 46);
scriptTest45_3.endTime = new Time(20, 2);
scriptTest45_3.text = '전연남 기자입니다.';

// 46번 뉴스
let tagTest46_1 = new Tag();
tagTest46_1.name = '가상화폐';
let tagTest46_2 = new Tag();
tagTest46_2.name = '루나';
let tagTest46_3 = new Tag();
tagTest46_3.name = '권도형';

let scriptTest46_1 = new Script();
scriptTest46_1.startTime = new Time(0, 0);
scriptTest46_1.endTime = new Time(9, 58);
scriptTest46_1.text = '가상화폐인 테라, 루나의 폭락 사태 이후 우리나라와 미국 검찰이 수사에 나섰지만, 아직 이렇다 할 성과를 내지 못하고 있습니다.';
let scriptTest46_2 = new Script();
scriptTest46_2.startTime = new Time(9, 58);
scriptTest46_2.endTime = new Time(19, 6);
scriptTest46_2.text = '그러자 그 발행업체의 대표인 권도형 씨를 추적하고 또 의혹을 밝히기 위해서 가상화폐에 투자했던 사람들이 직접 나섰습니다.';
let scriptTest46_3 = new Script();
scriptTest46_3.startTime = new Time(19, 6);
scriptTest46_3.endTime = new Time(21, 33);
scriptTest46_3.text = '이 내용 김혜민 기자가 전하겠습니다.';

// 47번 뉴스
let tagTest47_1 = new Tag();
tagTest47_1.name = '북한';
let tagTest47_2 = new Tag();
tagTest47_2.name = '바이든';
let tagTest47_3 = new Tag();
tagTest47_3.name = '미사일';

let scriptTest47_1 = new Script();
scriptTest47_1.startTime = new Time(0, 0);
scriptTest47_1.endTime = new Time(9, 86);
scriptTest47_1.text = '방금 이야기한 대로 정부는 북한의 움직임을 예의주시하고 있는데 이르면 이번 주 안에 북한이 장거리 탄도미사일을 추가로 쏠 거란 관측이 나오고 있습니다.';
let scriptTest47_2 = new Script();
scriptTest47_2.startTime = new Time(9, 86);
scriptTest47_2.endTime = new Time(18, 97);
scriptTest47_2.text = '지난주 바이든 미국 대통령이 우리나라에 왔을 때 북한이 도발에 나설 수 있다는 분석도 있었는데 조용히 지나갔던 이유가 있었습니다.';
let scriptTest47_3 = new Script();
scriptTest47_3.startTime = new Time(18, 97);
scriptTest47_3.endTime = new Time(22, 0);
scriptTest47_3.text = '안정식 북한 전문기자가 그 이유를 설명해 드리겠습니다.';

// 48번 뉴스
let tagTest48_1 = new Tag();
tagTest48_1.name = '베이징올림픽';
let tagTest48_2 = new Tag();
tagTest48_2.name = '쇼트트랙';
let tagTest48_3 = new Tag();
tagTest48_3.name = '편파판정';

let scriptTest48_1 = new Script();
scriptTest48_1.startTime = new Time(0, 0);
scriptTest48_1.endTime = new Time(6, 88);
scriptTest48_1.text = '지금부터는 남자 쇼트트랙, 분노의 편파 판정 논란 자세하게 보도해드립니다.';
let scriptTest48_2 = new Script();
scriptTest48_2.startTime = new Time(6, 88);
scriptTest48_2.endTime = new Time(16, 0);
scriptTest48_2.text = '왜 하필 중국 선수 앞에 섰다가 실격이 되고 그래서 맨 먼저 들어오지도 않은 중국 선수가 결국 금메달을 목에 걸었는지.';
let scriptTest48_3 = new Script();
scriptTest48_3.startTime = new Time(16, 0);
scriptTest48_3.endTime = new Time(25, 80);
scriptTest48_3.text = '심판의 판정이라는 절차적 이유만 앞세울 게 아니라 그 한참 위에 있는 올림픽 정신에 부끄럽지 않은 답이 나와야 할 겁니다.';
let scriptTest48_4 = new Script();
scriptTest48_4.startTime = new Time(25, 80);
scriptTest48_4.endTime = new Time(32, 28);
scriptTest48_4.text = '한국 팀은 황당한 편파 판정을 국제스포츠중재재판소에 제소하기로 했습니다.';
let scriptTest48_5 = new Script();
scriptTest48_5.startTime = new Time(32, 28);
scriptTest48_5.endTime = new Time(39, 16);
scriptTest48_5.text = '먼저 바람만 스쳐도 실격될 거라는 우려가 현실이 된 과정을 이명노 기자가 보도합니다.';

// 49번 뉴스
let tagTest49_1 = new Tag();
tagTest49_1.name = '농협';
let tagTest49_2 = new Tag();
tagTest49_2.name = '직원';
let tagTest49_3 = new Tag();
tagTest49_3.name = '횡령';

let scriptTest49_1 = new Script();
scriptTest49_1.startTime = new Time(0, 0);
scriptTest49_1.endTime = new Time(6, 57);
scriptTest49_1.text = '농협 직원이 도박 손실을 막으려고 회삿돈 40억 원을 횡령했다는 사건, YTN이 단독으로 전해드렸죠.';
let scriptTest49_2 = new Script();
scriptTest49_2.startTime = new Time(6, 57);
scriptTest49_2.endTime = new Time(11, 3);
scriptTest49_2.text = '이 농협 직원은 복권을 사는 데도 10억 원 넘게 쓴 거로 알려졌습니다.';
let scriptTest49_3 = new Script();
scriptTest49_3.startTime = new Time(11, 33);
scriptTest49_3.endTime = new Time(19, 49);
scriptTest49_3.text = '그런데 YTN 취재 결과 복권을 대신 사달라는 부탁을 받은 복권방 사장이 횡령금을 몰래 빼돌렸을 가능성이 새롭게 제기됐습니다.';
let scriptTest49_4 = new Script();
scriptTest49_4.startTime = new Time(19, 49);
scriptTest49_4.endTime = new Time(23, 63);
scriptTest49_4.text = '경찰도 수사 범위를 확대해 복권방과 사무실을 압수수색 했습니다.';
let scriptTest49_5 = new Script();
scriptTest49_5.startTime = new Time(23, 63);
scriptTest49_5.endTime = new Time(27, 59);
scriptTest49_5.text = '취재기자 연결해 자세한 내용 알아보겠습니다. 강민경 기자!';

// 50번 뉴스
let tagTest50_1 = new Tag();
tagTest50_1.name = '연세대';
let tagTest50_2 = new Tag();
tagTest50_2.name = '청소노동자';
let tagTest50_3 = new Tag();
tagTest50_3.name = '손해배상';

let scriptTest50_1 = new Script();
scriptTest50_1.startTime = new Time(0, 0);
scriptTest50_1.endTime = new Time(7, 9);
scriptTest50_1.text = '연세대학교 청소 노동자들이 근로 조건을 개선해달라며, 넉 달째 집회를 이어가고 있습니다.';
let scriptTest50_2 = new Script();
scriptTest50_2.startTime = new Time(7, 9);
scriptTest50_2.endTime = new Time(14, 73);
scriptTest50_2.text = '그런데, 몇몇 학생들이 집회 소음으로 수업권이 침해됐다며 소송을 제기해 논란이 커지고 있습니다.';
let scriptTest50_3 = new Script();
scriptTest50_3.startTime = new Time(14, 73);
scriptTest50_3.endTime = new Time(20, 70);
scriptTest50_3.text = '이 학생들에 대한 비판도 나오는 가운데 문제를 풀어야 할 학교는 침묵하고 있습니다.';
let scriptTest50_4 = new Script();
scriptTest50_4.startTime = new Time(20, 70);
scriptTest50_4.endTime = new Time(22, 75);
scriptTest50_4.text = '김성수 기잡니다.';


export const insertNewsData = async (connection) => {
  // await createConnection().then(async (connection) => {

    // drop tables
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    console.log("queryRunner executed")
    // console.log(">>>>>>", await queryRunner.hasTable("tag"))
    // if (await queryRunner.hasTable("tag")) {
    //   await queryRunner.dropTable("tag")
    // }
    // if (await queryRunner.hasTable("news")) {
    //   await queryRunner.dropTable("news")
    // }
    // await queryRunner.createTa
    // console.log(">>>>>>>><<<<<")
    // await queryRunner.dropTable("tag");
    // await queryRunner.dropTable("news");

    //삭제 ^^
    // const newsRepository = News.getRepository();
    // newsRepository.delete({ id: 193});

    const newsRepository = await News.getRepository();
    const tagRepository = await Tag.getRepository();
    const scriptRepository = await Script.getRepository();

    await tagRepository.query(`set FOREIGN_KEY_CHECKS = 0`)
    await tagRepository.clear();

    await scriptRepository.query(`set FOREIGN_KEY_CHECKS = 0`)
    await scriptRepository.clear();

    await newsRepository.query(`set FOREIGN_KEY_CHECKS = 0`)
    await newsRepository.clear();

    await tagRepository.query(`set FOREIGN_KEY_CHECKS = 1`)
    await scriptRepository.query(`set FOREIGN_KEY_CHECKS = 1`)
    await newsRepository.query(`set FOREIGN_KEY_CHECKS = 1`)
    
    // 추천 태그 객체 생성
    let tagRecommend = tagRepository.create(tagTestRecommend);
    // tagRepository.save(tagRecommend);

    // 뉴스 별 태그 객체 생성
    let tag1_1 = tagRepository.create(tagTest1_1);
    let tag1_2 = tagRepository.create(tagTest1_2);
    let tag1_3 = tagRepository.create(tagTest1_3);

    let script1_1 = scriptRepository.create(scriptTest1_1);
    let script1_2 = scriptRepository.create(scriptTest1_2);
    let script1_3 = scriptRepository.create(scriptTest1_3);
    let script1_4 = scriptRepository.create(scriptTest1_4);
    let script1_5 = scriptRepository.create(scriptTest1_5);

    let tag2_1 = tagRepository.create(tagTest2_1);
    let tag2_2 = tagRepository.create(tagTest2_2);
    let tag2_3 = tagRepository.create(tagTest2_3);

    let script2_1 = scriptRepository.create(scriptTest2_1);
    let script2_2 = scriptRepository.create(scriptTest2_2);
    let script2_3 = scriptRepository.create(scriptTest2_3);
    let script2_4 = scriptRepository.create(scriptTest2_4);

    let tag3_1 = tagRepository.create(tagTest3_1);
    let tag3_2 = tagRepository.create(tagTest3_2);
    let tag3_3 = tagRepository.create(tagTest3_3);

    let script3_1 = scriptRepository.create(scriptTest3_1);
    let script3_2 = scriptRepository.create(scriptTest3_2);
    let script3_3 = scriptRepository.create(scriptTest3_3);
    let script3_4 = scriptRepository.create(scriptTest3_4);
    let script3_5 = scriptRepository.create(scriptTest3_5);
    let script3_6 = scriptRepository.create(scriptTest3_6);

    let tag4_1 = tagRepository.create(tagTest4_1);
    let tag4_2 = tagRepository.create(tagTest4_2);
    let tag4_3 = tagRepository.create(tagTest4_3);

    let script4_1 = scriptRepository.create(scriptTest4_1);
    let script4_2 = scriptRepository.create(scriptTest4_2);
    let script4_3 = scriptRepository.create(scriptTest4_3);
    let script4_4 = scriptRepository.create(scriptTest4_4);

    let tag5_1 = tagRepository.create(tagTest5_1);
    let tag5_2 = tagRepository.create(tagTest5_2);
    let tag5_3 = tagRepository.create(tagTest5_3);

    let script5_1 = scriptRepository.create(scriptTest5_1);
    let script5_2 = scriptRepository.create(scriptTest5_2);
    let script5_3 = scriptRepository.create(scriptTest5_3);
    let script5_4 = scriptRepository.create(scriptTest5_4);
    let script5_5 = scriptRepository.create(scriptTest5_5);

    let tag6_1 = tagRepository.create(tagTest6_1);
    let tag6_2 = tagRepository.create(tagTest6_2);
    let tag6_3 = tagRepository.create(tagTest6_3);

    let script6_1 = scriptRepository.create(scriptTest6_1);
    let script6_2 = scriptRepository.create(scriptTest6_2);
    let script6_3 = scriptRepository.create(scriptTest6_3);
    let script6_4 = scriptRepository.create(scriptTest6_4);

    let tag7_1 = tagRepository.create(tagTest7_1);
    let tag7_2 = tagRepository.create(tagTest7_2);
    let tag7_3 = tagRepository.create(tagTest7_3);

    let script7_1 = scriptRepository.create(scriptTest7_1);
    let script7_2 = scriptRepository.create(scriptTest7_2);
    let script7_3 = scriptRepository.create(scriptTest7_3);

    let tag8_1 = tagRepository.create(tagTest8_1);
    let tag8_2 = tagRepository.create(tagTest8_2);
    let tag8_3 = tagRepository.create(tagTest8_3);

    let script8_1 = scriptRepository.create(scriptTest8_1);
    let script8_2 = scriptRepository.create(scriptTest8_2);
    let script8_3 = scriptRepository.create(scriptTest8_3);
    let script8_4 = scriptRepository.create(scriptTest8_4);
    let script8_5 = scriptRepository.create(scriptTest8_5);
    let script8_6 = scriptRepository.create(scriptTest8_6);
    
    let tag9_1 = tagRepository.create(tagTest9_1);
    let tag9_2 = tagRepository.create(tagTest9_2);
    let tag9_3 = tagRepository.create(tagTest9_3);

    let script9_1 = scriptRepository.create(scriptTest9_1);
    let script9_2 = scriptRepository.create(scriptTest9_2);
    let script9_3 = scriptRepository.create(scriptTest9_3);

    let tag10_1 = tagRepository.create(tagTest10_1);
    let tag10_2 = tagRepository.create(tagTest10_2);
    let tag10_3 = tagRepository.create(tagTest10_3);

    let script10_1 = scriptRepository.create(scriptTest10_1);
    let script10_2 = scriptRepository.create(scriptTest10_2);
    let script10_3 = scriptRepository.create(scriptTest10_3);

    let tag11_1 = tagRepository.create(tagTest11_1);
    let tag11_2 = tagRepository.create(tagTest11_2);
    let tag11_3 = tagRepository.create(tagTest11_3);

    let script11_1 = scriptRepository.create(scriptTest11_1);
    let script11_2 = scriptRepository.create(scriptTest11_2);
    let script11_3 = scriptRepository.create(scriptTest11_3);
    let script11_4 = scriptRepository.create(scriptTest11_4);
    let script11_5 = scriptRepository.create(scriptTest11_5);

    let tag12_1 = tagRepository.create(tagTest12_1);
    let tag12_2 = tagRepository.create(tagTest12_2);
    let tag12_3 = tagRepository.create(tagTest12_3);

    let script12_1 = scriptRepository.create(scriptTest12_1);
    let script12_2 = scriptRepository.create(scriptTest12_2);
    let script12_3 = scriptRepository.create(scriptTest12_3);
    let script12_4 = scriptRepository.create(scriptTest12_4);
    let script12_5 = scriptRepository.create(scriptTest12_5);
    let script12_6 = scriptRepository.create(scriptTest12_6);
    let script12_7 = scriptRepository.create(scriptTest12_7);
    let script12_8 = scriptRepository.create(scriptTest12_8);

    let tag13_1 = tagRepository.create(tagTest13_1);
    let tag13_2 = tagRepository.create(tagTest13_2);
    let tag13_3 = tagRepository.create(tagTest13_3);

    let script13_1 = scriptRepository.create(scriptTest13_1);
    let script13_2 = scriptRepository.create(scriptTest13_2);
    let script13_3 = scriptRepository.create(scriptTest13_3);
    let script13_4 = scriptRepository.create(scriptTest13_4);
    let script13_5 = scriptRepository.create(scriptTest13_5);

    let tag14_1 = tagRepository.create(tagTest14_1);
    let tag14_2 = tagRepository.create(tagTest14_2);
    let tag14_3 = tagRepository.create(tagTest14_3);

    let script14_1 = scriptRepository.create(scriptTest14_1);
    let script14_2 = scriptRepository.create(scriptTest14_2);
    let script14_3 = scriptRepository.create(scriptTest14_3);
    let script14_4 = scriptRepository.create(scriptTest14_4);
    let script14_5 = scriptRepository.create(scriptTest14_5);

    let tag15_1 = tagRepository.create(tagTest15_1);
    let tag15_2 = tagRepository.create(tagTest15_2);
    let tag15_3 = tagRepository.create(tagTest15_3);

    let script15_1 = scriptRepository.create(scriptTest15_1);
    let script15_2 = scriptRepository.create(scriptTest15_2);
    let script15_3 = scriptRepository.create(scriptTest15_3);
    let script15_4 = scriptRepository.create(scriptTest15_4);
    let script15_5 = scriptRepository.create(scriptTest15_5);
    let script15_6 = scriptRepository.create(scriptTest15_6);

    let tag16_1 = tagRepository.create(tagTest16_1);
    let tag16_2 = tagRepository.create(tagTest16_2);
    let tag16_3 = tagRepository.create(tagTest16_3);

    let script16_1 = scriptRepository.create(scriptTest16_1);
    let script16_2 = scriptRepository.create(scriptTest16_2);
    let script16_3 = scriptRepository.create(scriptTest16_3);
    let script16_4 = scriptRepository.create(scriptTest16_4);

    let tag17_1 = tagRepository.create(tagTest17_1);
    let tag17_2 = tagRepository.create(tagTest17_2);
    let tag17_3 = tagRepository.create(tagTest17_3);

    let script17_1 = scriptRepository.create(scriptTest17_1);
    let script17_2 = scriptRepository.create(scriptTest17_2);
    let script17_3 = scriptRepository.create(scriptTest17_3);

    let tag18_1 = tagRepository.create(tagTest18_1);
    let tag18_2 = tagRepository.create(tagTest18_2);
    let tag18_3 = tagRepository.create(tagTest18_3);

    let script18_1 = scriptRepository.create(scriptTest18_1);
    let script18_2 = scriptRepository.create(scriptTest18_2);
    let script18_3 = scriptRepository.create(scriptTest18_3);

    let tag19_1 = tagRepository.create(tagTest19_1);
    let tag19_2 = tagRepository.create(tagTest19_2);
    let tag19_3 = tagRepository.create(tagTest19_3);

    let script19_1 = scriptRepository.create(scriptTest19_1);
    let script19_2 = scriptRepository.create(scriptTest19_2);
    let script19_3 = scriptRepository.create(scriptTest19_3);

    let tag20_1 = tagRepository.create(tagTest20_1);
    let tag20_2 = tagRepository.create(tagTest20_2);
    let tag20_3 = tagRepository.create(tagTest20_3);

    let script20_1 = scriptRepository.create(scriptTest20_1);
    let script20_2 = scriptRepository.create(scriptTest20_2);
    let script20_3 = scriptRepository.create(scriptTest20_3);
    let script20_4 = scriptRepository.create(scriptTest20_4);
    let script20_5 = scriptRepository.create(scriptTest20_5);

    let tag21_1 = tagRepository.create(tagTest21_1);
    let tag21_2 = tagRepository.create(tagTest21_2);
    let tag21_3 = tagRepository.create(tagTest21_3);

    let script21_1 = scriptRepository.create(scriptTest21_1);
    let script21_2 = scriptRepository.create(scriptTest21_2);
    let script21_3 = scriptRepository.create(scriptTest21_3);

    let tag22_1 = tagRepository.create(tagTest22_1);
    let tag22_2 = tagRepository.create(tagTest22_2);
    let tag22_3 = tagRepository.create(tagTest22_3);

    let script22_1 = scriptRepository.create(scriptTest22_1);
    let script22_2 = scriptRepository.create(scriptTest22_2);
    let script22_3 = scriptRepository.create(scriptTest22_3);
    let script22_4 = scriptRepository.create(scriptTest22_4);
    let script22_5 = scriptRepository.create(scriptTest22_5);
    let script22_6 = scriptRepository.create(scriptTest22_6);
    let script22_7 = scriptRepository.create(scriptTest22_7);
    let script22_8 = scriptRepository.create(scriptTest22_8);
    let script22_9 = scriptRepository.create(scriptTest22_9);

    let tag23_1 = tagRepository.create(tagTest23_1);
    let tag23_2 = tagRepository.create(tagTest23_2);
    let tag23_3 = tagRepository.create(tagTest23_3);

    let script23_1 = scriptRepository.create(scriptTest23_1);
    let script23_2 = scriptRepository.create(scriptTest23_2);
    let script23_3 = scriptRepository.create(scriptTest23_3);
    let script23_4 = scriptRepository.create(scriptTest23_4);
    let script23_5 = scriptRepository.create(scriptTest23_5);

    let tag24_1 = tagRepository.create(tagTest24_1);
    let tag24_2 = tagRepository.create(tagTest24_2);
    let tag24_3 = tagRepository.create(tagTest24_3);

    let script24_1 = scriptRepository.create(scriptTest24_1);
    let script24_2 = scriptRepository.create(scriptTest24_2);
    let script24_3 = scriptRepository.create(scriptTest24_3);
    let script24_4 = scriptRepository.create(scriptTest24_4);

    let tag25_1 = tagRepository.create(tagTest25_1);
    let tag25_2 = tagRepository.create(tagTest25_2);
    let tag25_3 = tagRepository.create(tagTest25_3);

    let script25_1 = scriptRepository.create(scriptTest25_1);
    let script25_2 = scriptRepository.create(scriptTest25_2);
    let script25_3 = scriptRepository.create(scriptTest25_3);

    let tag26_1 = tagRepository.create(tagTest26_1);
    let tag26_2 = tagRepository.create(tagTest26_2);
    let tag26_3 = tagRepository.create(tagTest26_3);

    let script26_1 = scriptRepository.create(scriptTest26_1);
    let script26_2 = scriptRepository.create(scriptTest26_2);
    let script26_3 = scriptRepository.create(scriptTest26_3);
    let script26_4 = scriptRepository.create(scriptTest26_4);

    let tag27_1 = tagRepository.create(tagTest27_1);
    let tag27_2 = tagRepository.create(tagTest27_2);
    let tag27_3 = tagRepository.create(tagTest27_3);

    let script27_1 = scriptRepository.create(scriptTest27_1);
    let script27_2 = scriptRepository.create(scriptTest27_2);
    let script27_3 = scriptRepository.create(scriptTest27_3);
    let script27_4 = scriptRepository.create(scriptTest27_4);

    let tag28_1 = tagRepository.create(tagTest28_1);
    let tag28_2 = tagRepository.create(tagTest28_2);
    let tag28_3 = tagRepository.create(tagTest28_3);
    
    let script28_1 = scriptRepository.create(scriptTest28_1);
    let script28_2 = scriptRepository.create(scriptTest28_2);
    let script28_3 = scriptRepository.create(scriptTest28_3);
    let script28_4 = scriptRepository.create(scriptTest28_4);
    let script28_5 = scriptRepository.create(scriptTest28_5);
    let script28_6 = scriptRepository.create(scriptTest28_6);

    let tag29_1 = tagRepository.create(tagTest29_1);
    let tag29_2 = tagRepository.create(tagTest29_2);
    let tag29_3 = tagRepository.create(tagTest29_3);

    let script29_1 = scriptRepository.create(scriptTest29_1);
    let script29_2 = scriptRepository.create(scriptTest29_2);
    let script29_3 = scriptRepository.create(scriptTest29_3);
    let script29_4 = scriptRepository.create(scriptTest29_4);
    let script29_5 = scriptRepository.create(scriptTest29_5);
    let script29_6 = scriptRepository.create(scriptTest29_6);

    let tag30_1 = tagRepository.create(tagTest30_1);
    let tag30_2 = tagRepository.create(tagTest30_2);
    let tag30_3 = tagRepository.create(tagTest30_3);

    let script30_1 = scriptRepository.create(scriptTest30_1);
    let script30_2 = scriptRepository.create(scriptTest30_2);
    let script30_3 = scriptRepository.create(scriptTest30_3);
    let script30_4 = scriptRepository.create(scriptTest30_4);

    let tag31_1 = tagRepository.create(tagTest31_1);
    let tag31_2 = tagRepository.create(tagTest31_2);
    let tag31_3 = tagRepository.create(tagTest31_3);

    let script31_1 = scriptRepository.create(scriptTest31_1);
    let script31_2 = scriptRepository.create(scriptTest31_2);
    let script31_3 = scriptRepository.create(scriptTest31_3);
    let script31_4 = scriptRepository.create(scriptTest31_4);
    let script31_5 = scriptRepository.create(scriptTest31_5);

    let tag32_1 = tagRepository.create(tagTest32_1);
    let tag32_2 = tagRepository.create(tagTest32_2);
    let tag32_3 = tagRepository.create(tagTest32_3);

    let script32_1 = scriptRepository.create(scriptTest32_1);
    let script32_2 = scriptRepository.create(scriptTest32_2);
    let script32_3 = scriptRepository.create(scriptTest32_3);

    let tag33_1 = tagRepository.create(tagTest33_1);
    let tag33_2 = tagRepository.create(tagTest33_2);
    let tag33_3 = tagRepository.create(tagTest33_3);

    let script33_1 = scriptRepository.create(scriptTest33_1);
    let script33_2 = scriptRepository.create(scriptTest33_2);
    let script33_3 = scriptRepository.create(scriptTest33_3);
    let script33_4 = scriptRepository.create(scriptTest33_4);

    let tag34_1 = tagRepository.create(tagTest34_1);
    let tag34_2 = tagRepository.create(tagTest34_2);
    let tag34_3 = tagRepository.create(tagTest34_3);

    let script34_1 = scriptRepository.create(scriptTest34_1);
    let script34_2 = scriptRepository.create(scriptTest34_2);
    let script34_3 = scriptRepository.create(scriptTest34_3);

    let tag35_1 = tagRepository.create(tagTest35_1);
    let tag35_2 = tagRepository.create(tagTest35_2);
    let tag35_3 = tagRepository.create(tagTest35_3);

    let script35_1 = scriptRepository.create(scriptTest35_1);
    let script35_2 = scriptRepository.create(scriptTest35_2);
    let script35_3 = scriptRepository.create(scriptTest35_3);
    let script35_4 = scriptRepository.create(scriptTest35_4);
    let script35_5 = scriptRepository.create(scriptTest35_5);

    let tag36_1 = tagRepository.create(tagTest36_1);
    let tag36_2 = tagRepository.create(tagTest36_2);
    let tag36_3 = tagRepository.create(tagTest36_3);
    
    let script36_1 = scriptRepository.create(scriptTest36_1);
    let script36_2 = scriptRepository.create(scriptTest36_2);
    let script36_3 = scriptRepository.create(scriptTest36_3);
    let script36_4 = scriptRepository.create(scriptTest36_4);

    let tag37_1 = tagRepository.create(tagTest37_1);
    let tag37_2 = tagRepository.create(tagTest37_2);
    let tag37_3 = tagRepository.create(tagTest37_3);

    let script37_1 = scriptRepository.create(scriptTest37_1);
    let script37_2 = scriptRepository.create(scriptTest37_2);
    let script37_3 = scriptRepository.create(scriptTest37_3);
    let script37_4 = scriptRepository.create(scriptTest37_4);
    let script37_5 = scriptRepository.create(scriptTest37_5);
    let script37_6 = scriptRepository.create(scriptTest37_6);
    let script37_7 = scriptRepository.create(scriptTest37_7);

    let tag38_1 = tagRepository.create(tagTest38_1);
    let tag38_2 = tagRepository.create(tagTest38_2);
    let tag38_3 = tagRepository.create(tagTest38_3);

    let script38_1 = scriptRepository.create(scriptTest38_1);
    let script38_2 = scriptRepository.create(scriptTest38_2);
    let script38_3 = scriptRepository.create(scriptTest38_3);
    let script38_4 = scriptRepository.create(scriptTest38_4);
    let script38_5 = scriptRepository.create(scriptTest38_5);

    let tag39_1 = tagRepository.create(tagTest39_1);
    let tag39_2 = tagRepository.create(tagTest39_2);
    let tag39_3 = tagRepository.create(tagTest39_3);

    let script39_1 = scriptRepository.create(scriptTest39_1);
    let script39_2 = scriptRepository.create(scriptTest39_2);
    let script39_3 = scriptRepository.create(scriptTest39_3);
    let script39_4 = scriptRepository.create(scriptTest39_4);

    let tag40_1 = tagRepository.create(tagTest40_1);
    let tag40_2 = tagRepository.create(tagTest40_2);
    let tag40_3 = tagRepository.create(tagTest40_3);

    let script40_1 = scriptRepository.create(scriptTest40_1);
    let script40_2 = scriptRepository.create(scriptTest40_2);
    let script40_3 = scriptRepository.create(scriptTest40_3);
    let script40_4 = scriptRepository.create(scriptTest40_4);
    let script40_5 = scriptRepository.create(scriptTest40_5);

    let tag41_1 = tagRepository.create(tagTest41_1);
    let tag41_2 = tagRepository.create(tagTest41_2);
    let tag41_3 = tagRepository.create(tagTest41_3);

    let script41_1 = scriptRepository.create(scriptTest41_1);
    let script41_2 = scriptRepository.create(scriptTest41_2);
    let script41_3 = scriptRepository.create(scriptTest41_3);
    let script41_4 = scriptRepository.create(scriptTest41_4);
    let script41_5 = scriptRepository.create(scriptTest41_5);

    let tag42_1 = tagRepository.create(tagTest42_1);
    let tag42_2 = tagRepository.create(tagTest42_2);
    let tag42_3 = tagRepository.create(tagTest42_3);

    let script42_1 = scriptRepository.create(scriptTest42_1);
    let script42_2 = scriptRepository.create(scriptTest42_2);
    let script42_3 = scriptRepository.create(scriptTest42_3);
    let script42_4 = scriptRepository.create(scriptTest42_4);
    let script42_5 = scriptRepository.create(scriptTest42_5);

    let tag43_1 = tagRepository.create(tagTest43_1);
    let tag43_2 = tagRepository.create(tagTest43_2);
    let tag43_3 = tagRepository.create(tagTest43_3);

    let script43_1 = scriptRepository.create(scriptTest43_1);
    let script43_2 = scriptRepository.create(scriptTest43_2);
    let script43_3 = scriptRepository.create(scriptTest43_3);

    let tag44_1 = tagRepository.create(tagTest44_1);
    let tag44_2 = tagRepository.create(tagTest44_2);
    let tag44_3 = tagRepository.create(tagTest44_3);

    let script44_1 = scriptRepository.create(scriptTest44_1);
    let script44_2 = scriptRepository.create(scriptTest44_2);
    let script44_3 = scriptRepository.create(scriptTest44_3);
    let script44_4 = scriptRepository.create(scriptTest44_4);

    let tag45_1 = tagRepository.create(tagTest45_1);
    let tag45_2 = tagRepository.create(tagTest45_2);
    let tag45_3 = tagRepository.create(tagTest45_3);

    let script45_1 = scriptRepository.create(scriptTest45_1);
    let script45_2 = scriptRepository.create(scriptTest45_2);
    let script45_3 = scriptRepository.create(scriptTest45_3);

    let tag46_1 = tagRepository.create(tagTest46_1);
    let tag46_2 = tagRepository.create(tagTest46_2);
    let tag46_3 = tagRepository.create(tagTest46_3);

    let script46_1 = scriptRepository.create(scriptTest46_1);
    let script46_2 = scriptRepository.create(scriptTest46_2);
    let script46_3 = scriptRepository.create(scriptTest46_3);

    let tag47_1 = tagRepository.create(tagTest47_1);
    let tag47_2 = tagRepository.create(tagTest47_2);
    let tag47_3 = tagRepository.create(tagTest47_3);

    let script47_1 = scriptRepository.create(scriptTest47_1);
    let script47_2 = scriptRepository.create(scriptTest47_2);
    let script47_3 = scriptRepository.create(scriptTest47_3);

    let tag48_1 = tagRepository.create(tagTest48_1);
    let tag48_2 = tagRepository.create(tagTest48_2);
    let tag48_3 = tagRepository.create(tagTest48_3);

    let script48_1 = scriptRepository.create(scriptTest48_1);
    let script48_2 = scriptRepository.create(scriptTest48_2);
    let script48_3 = scriptRepository.create(scriptTest48_3);
    let script48_4 = scriptRepository.create(scriptTest48_4);
    let script48_5 = scriptRepository.create(scriptTest48_5);

    let tag49_1 = tagRepository.create(tagTest49_1);
    let tag49_2 = tagRepository.create(tagTest49_2);
    let tag49_3 = tagRepository.create(tagTest49_3);

    let script49_1 = scriptRepository.create(scriptTest49_1);
    let script49_2 = scriptRepository.create(scriptTest49_2);
    let script49_3 = scriptRepository.create(scriptTest49_3);
    let script49_4 = scriptRepository.create(scriptTest49_4);
    let script49_5 = scriptRepository.create(scriptTest49_5);

    let tag50_1 = tagRepository.create(tagTest50_1);
    let tag50_2 = tagRepository.create(tagTest50_2);
    let tag50_3 = tagRepository.create(tagTest50_3);

    let script50_1 = scriptRepository.create(scriptTest50_1);
    let script50_2 = scriptRepository.create(scriptTest50_2);
    let script50_3 = scriptRepository.create(scriptTest50_3);
    let script50_4 = scriptRepository.create(scriptTest50_4);

    const newsInfo = [
      // 1번 뉴스
      {
        title: '비트코인, 한때 1만 8천 달러 붕괴',
        category: Category.ECONOMY,
        tags: [tag1_1, tag1_2, tag1_3, tagRecommend],
        scripts: [script1_1, script1_2, script1_3, script1_4, script1_5],
        announcerGender: Gender.MEN,
        channel: Channel.SBS,
        link: 'S_gtbu2VRlI',
        thumbnail: 'https://img.youtube.com/vi/S_gtbu2VRlI/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(35, 4),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-06-19'),
      },
      // 2번 뉴스
      {
        title: '북, 최근 임진강 상류 황강댐 수문 개방',
        category: Category.SOCIETY,
        tags: [tag2_1, tag2_2, tag2_3, tagRecommend],
        scripts: [script2_1, script2_2, script2_3, script2_4],
        announcerGender: Gender.MEN,
        channel: Channel.KBS,
        link: 'ee-0DeY21rU',
        thumbnail: 'https://img.youtube.com/vi/ee-0DeY21rU/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(36, 0),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-06-30'),
      },
      // 3번 뉴스
      {
        title: '제주, 초중고교 무상급식 예산 46억 원 증액 ',
        category: Category.SOCIETY,
        tags: [tag3_1, tag3_2, tag3_3, tagRecommend],
        scripts: [script3_1, script3_2, script3_3, script3_4, script3_5, script3_6],
        announcerGender: Gender.WOMEN,
        channel: Channel.SBS,
        link: '45IAfzlB_tQ',
        thumbnail: 'https://img.youtube.com/vi/45IAfzlB_tQ/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(37, 80),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-06'),
      },
      // 4번 뉴스
      {
        title: '안동시 공무원, 동료 직원 흉기에 찔려 사망',
        category: Category.SOCIETY,
        tags: [tag4_1, tag4_2, tag4_3, tagRecommend],
        scripts: [script4_1, script4_2, script4_3, script4_4],
        announcerGender: Gender.WOMEN,
        channel: Channel.SBS,
        link: 'sId-zbgWuZU',
        thumbnail: 'https://img.youtube.com/vi/sId-zbgWuZU/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(27, 16),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-05'),
      },
      // 5번 뉴스
      {
        title: '김승희 보건복지부 장관 후보자 자진 사퇴',
        category: Category.POLITICS,
        tags: [tag5_1, tag5_2, tag5_3],
        scripts: [script5_1, script5_2, script5_3, script5_4, script5_5],
        announcerGender: Gender.MEN,
        channel: Channel.SBS,
        link: 'IisQfwEp8D8',
        thumbnail: 'https://img.youtube.com/vi/IisQfwEp8D8/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(40, 0),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-04'),
      },
      // 6번 뉴스
      {
        title: '영 총리 "중, 일국양제 약속 어겨…홍콩 포기 안 할 것"',
        category: Category.WORLD,
        tags: [tag6_1, tag6_2, tag6_3],
        scripts: [script6_1, script6_2, script6_3, script6_4],
        announcerGender: Gender.MEN,
        channel: Channel.SBS,
        link: 'BXs223nIWWo',
        thumbnail: 'https://img.youtube.com/vi/BXs223nIWWo/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(38, 89),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-01'),
      },
      // 7번 뉴스
      {
        title: '김혜경 ‘의전 논란’에 “모든 것이 제 불찰…송구”',
        category: Category.POLITICS,
        tags: [tag7_1, tag7_2, tag7_3],
        scripts: [script7_1, script7_2, script7_3],        
        announcerGender: Gender.MEN,
        channel: Channel.KBS,
        link: '-XsbzwxjiVo',
        thumbnail: 'https://img.youtube.com/vi/-XsbzwxjiVo/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(42, 78),
        suitability: Suitability.MEDIUM,
        isEmbeddable: true,
        reportDate: new Date('2022-02-02'),
      },
      // 8번 뉴스
      {
        title: '우크라이나 재건회의 \'루가노 선언\' 채택',
        category: Category.WORLD,
        tags: [tag8_1, tag8_2, tag8_3, tagRecommend],
        scripts: [script8_1, script8_2, script8_3, script8_4, script8_5, script8_6],
        announcerGender: Gender.WOMEN,
        channel: Channel.MBC,
        link: '1SRz_AE8R9E',
        thumbnail: 'https://img.youtube.com/vi/1SRz_AE8R9E/hqdefault.jpg',
        startTime: new Time(6, 0),
        endTime: new Time(56, 0),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-06'),
      },
      // 9번 뉴스
      {
        title: '원숭이두창 치료제 504명분 이번 주 도입',
        category: Category.SOCIETY,
        tags: [tag9_1, tag9_2, tag9_3, tagRecommend],
        scripts: [script9_1, script9_2, script9_3],
        announcerGender: Gender.WOMEN,
        channel: Channel.MBC,
        link: 'WtuMp5G3yNo',
        thumbnail: 'https://img.youtube.com/vi/WtuMp5G3yNo/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(29, 0),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-05'),
      },
      // 10번 뉴스
      {
        title: 'WHO "여름철 원숭이두창 추가 확산 가능성"',
        category: Category.SOCIETY,
        tags: [tag10_1, tag10_2, tag10_3, tagRecommend],
        scripts: [script10_1, script10_2, script10_3],
        announcerGender: Gender.MEN,
        channel: Channel.MBC,
        link: 'nsTeNVwGRMQ',
        thumbnail: 'https://img.youtube.com/vi/nsTeNVwGRMQ/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(36, 0),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-06-01'),
      },
      // 11번 뉴스
      {
        title: '"청나라 말기 같다"‥\'日 선진국 탈락\' 잇단 경고',
        category: Category.WORLD,
        tags: [tag11_1, tag11_2, tag11_3, tagRecommend],
        scripts: [script11_1, script11_2, script11_3, script11_4, script11_5],
        announcerGender: Gender.WOMEN,
        channel: Channel.MBC,
        link: 'hhbs2rUII94',
        thumbnail: 'https://img.youtube.com/vi/hhbs2rUII94/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(24, 57),
        suitability: Suitability.MEDIUM,
        isEmbeddable: true,
        reportDate: new Date('2022-01-30'),
      },
      // 12번 뉴스
      {
        title: '손님들이 건넨 술 마시고 사망…함께 있던 남성은 사고사',
        category: Category.SOCIETY,
        tags: [tag12_1, tag12_2, tag12_3, tagRecommend],
        scripts: [script12_1, script12_2, script12_3, script12_4, script12_5, script12_6, script12_7, script12_8],
        announcerGender: Gender.WOMEN,
        channel: Channel.SBS,
        link: 'mDW6crrUVpA',
        thumbnail: 'https://img.youtube.com/vi/mDW6crrUVpA/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(61, 0),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-06'),
      },
      // 13번 뉴스
      { 
        title: '"하루만 일해도 40만 원"‥코로나 이후 몸값 \'껑충\'',
        category: Category.SOCIETY,
        tags: [tag13_1, tag13_2, tag13_3],
        scripts: [script13_1, script13_2, script13_3, script13_4, script13_5],
        announcerGender: Gender.WOMEN,
        channel: Channel.MBC,
        link: 'IL_-MlTZAmQ',
        thumbnail: 'https://img.youtube.com/vi/IL_-MlTZAmQ/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(36, 0),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-04-07'),
      },
      // 14번 뉴스
      { 
        title: '누리호 2차 발사 성공.."우주시대 도약"',
        category: Category.SOCIETY,
        tags: [tag14_1, tag14_2, tag14_3, tagRecommend],
        scripts: [script14_1, script14_2, script14_3, script14_4, script14_5],
        announcerGender: Gender.WOMEN,
        channel: Channel.KBS,
        link: 'srjLy3NQO6w',
        thumbnail: 'https://img.youtube.com/vi/srjLy3NQO6w/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(29, 47),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-06-21'),
      },
      // 15번 뉴스
      { 
        title: '‘국민 MC’ 송해 씨 별세…빈소 애도 물결',
        category: Category.ENTERTAINMENT,
        tags: [tag15_1, tag15_2, tag15_3],
        scripts: [script15_1, script15_2, script15_3, script15_4, script15_5, script15_5],
        announcerGender: Gender.WOMEN,
        channel: Channel.KBS,
        link: 'fbUYD6Nk3aA',
        thumbnail: 'https://img.youtube.com/vi/fbUYD6Nk3aA/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(31, 2),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-06-08'),
      },
      // 16번 뉴스
      { 
        title: '윤 대통령, 친인척 채용 논란에 "선거운동 함께한 동지"',
        category: Category.POLITICS,
        tags: [tag16_1, tag16_2, tag16_3],
        scripts: [script16_1, script16_2, script16_3, script16_4],
        announcerGender: Gender.MEN,
        channel: Channel.SBS,
        link: '8g1Vh4XSngw',
        thumbnail: 'https://img.youtube.com/vi/8g1Vh4XSngw/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(35, 81),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-08'),
      },
      // 17번 뉴스
      { 
        title: '식약처 “야생버섯 식중독 위험…섭취 삼가야”',
        category: Category.SOCIETY,
        tags: [tag17_1, tag17_2, tag17_3],
        scripts: [script17_1, script17_2, script17_3],
        announcerGender: Gender.WOMEN,
        channel: Channel.KBS,
        link: 'qKiGmo1VDnQ',
        thumbnail: 'https://img.youtube.com/vi/qKiGmo1VDnQ/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(29, 41),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-06'),
      },    
      // 18번 뉴스
      { 
        title: '법원, \'검단 식구들\' 주범에 징역 5년 선고',
        category: Category.SOCIETY,
        tags: [tag18_1, tag18_2, tag18_3],
        scripts: [script18_1, script18_2, script18_3],
        announcerGender: Gender.WOMEN,
        channel: Channel.SBS,
        link: '7Vjdrppm83M',
        thumbnail: 'https://img.youtube.com/vi/7Vjdrppm83M/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(28, 92),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-07'),
      }, 
      // 19번 뉴스
      { 
        title: '토종닭 신선육 가격 담합한 9개 사업자에 과징금',
        category: Category.SOCIETY,
        tags: [tag19_1, tag19_2, tag19_3],
        scripts: [script19_1, script19_2, script19_3],
        announcerGender: Gender.WOMEN,
        channel: Channel.KBS,
        link: 'yqGnXRY6ii8',
        thumbnail: 'https://img.youtube.com/vi/yqGnXRY6ii8/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(34, 19),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-05-12'),
      },       
      // 20번 뉴스
      { 
        title: '전기 · 수소차 통행료 할인, 화물차 심야할인 2년 연장',
        category: Category.SOCIETY,
        tags: [tag20_1, tag20_2, tag20_3],
        scripts: [script20_1, script20_2, script20_3, script20_4, script20_5],
        announcerGender: Gender.WOMEN,
        channel: Channel.SBS,
        link: 'apvCTvWxc08',
        thumbnail: 'https://img.youtube.com/vi/apvCTvWxc08/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(40, 50),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-03'),
      },    
      // 21번 뉴스
      { 
        title: 'IMF 총재 "세계 경제전망 상당히 어두워져"',
        category: Category.WORLD,
        tags: [tag21_1, tag21_2, tag21_3],
        scripts: [script21_1, script21_2, script21_3],
        announcerGender: Gender.MEN,
        channel: Channel.MBC,
        link: 'jYnkP18MOVc',
        thumbnail: 'https://img.youtube.com/vi/jYnkP18MOVc/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(36, 0),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-07'),
      },   
      // 22번 뉴스
      { 
        title: '"2년을 기다렸어요"‥보라색으로 물든 LA \'BTS 특수\'',
        category: Category.ENTERTAINMENT,
        tags: [tag22_1, tag22_2, tag22_3],
        scripts: [script22_1, script22_2, script22_3, script22_4, script22_5, script22_6, script22_7, script22_8, script22_9],
        announcerGender: Gender.WOMEN,
        channel: Channel.MBC,
        link: 'tM7G9grxRvU',
        thumbnail: 'https://img.youtube.com/vi/tM7G9grxRvU/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(41, 33),
        suitability: Suitability.MEDIUM,
        isEmbeddable: true,
        reportDate: new Date('2021-11-28'),
      },   
      // 23번 뉴스
      { 
        title: '중 국경절 연휴, 관광객 6억명…인파 속 \'노마스크\'',
        category: Category.WORLD,
        tags: [tag23_1, tag23_2, tag23_3],
        scripts: [script23_1, script23_2, script23_3, script23_4, script23_5],
        announcerGender: Gender.WOMEN,
        channel: Channel.ETC,
        link: 'Ca6Wc_JepO8',
        thumbnail: 'https://img.youtube.com/vi/Ca6Wc_JepO8/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(28, 99),
        suitability: Suitability.MEDIUM,
        isEmbeddable: true,
        reportDate: new Date('2020-10-10'),
      },     
      // 24번 뉴스
      { 
        title: '오스카 빛낸 윤여정의 수어‥\'파란 리본\'도 화제',
        category: Category.ENTERTAINMENT,
        tags: [tag24_1, tag24_2, tag24_3],
        scripts: [script24_1, script24_2, script24_3, script24_4],
        announcerGender: Gender.WOMEN,
        channel: Channel.MBC,
        link: 'Iiaf4LT7zbY',
        thumbnail: 'https://img.youtube.com/vi/Iiaf4LT7zbY/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(25, 81),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-03-08'),
      },         
      // 25번 뉴스
      { 
        title: '막강했던 \'우경화 상징\'…일본 정책 기조 바뀌나',
        category: Category.WORLD,
        tags: [tag25_1, tag25_2, tag25_3],
        scripts: [script25_1, script25_2, script25_3],
        announcerGender: Gender.MEN,
        channel: Channel.SBS,
        link: 'p03Y9VRwCNA',
        thumbnail: 'https://img.youtube.com/vi/p03Y9VRwCNA/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(27, 27),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-08'),
      },    
      // 26번 뉴스
      { 
        title: '정준영 · 최종훈, 중형 선고되자…고개 숙이고 \'오열\'',
        category: Category.ENTERTAINMENT,
        tags: [tag26_1, tag26_2, tag26_3],
        scripts: [script26_1, script26_2, script26_3, script26_4],
        announcerGender: Gender.MEN,
        channel: Channel.SBS,
        link: 'DK3UZOiYBA4',
        thumbnail: 'https://img.youtube.com/vi/DK3UZOiYBA4/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(23, 87),
        suitability: Suitability.MEDIUM,
        isEmbeddable: true,
        reportDate: new Date('2019-11-29'),
      },        
      // 27번 뉴스
      { 
        title: '영화배우 강수연 씨, 심정지 상태로 병원 이송',
        category: Category.ENTERTAINMENT,
        tags: [tag27_1, tag27_2, tag27_3],
        scripts: [script27_1, script27_2, script27_3, script27_4],
        announcerGender: Gender.WOMEN,
        channel: Channel.KBS,
        link: 'M5rq2V-vLzc',
        thumbnail: 'https://img.youtube.com/vi/M5rq2V-vLzc/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(29, 56),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-05-05'),
      },
      // 28번 뉴스
      { 
        title: '일정 변경 항공사 마음대로…“환불도 안 됩니다”',
        category: Category.SOCIETY,
        tags: [tag28_1, tag28_2, tag28_3],
        scripts: [script28_1, script28_2, script28_3, script28_4, script28_5, script28_6],
        announcerGender: Gender.WOMEN,
        channel: Channel.KBS,
        link: 'UgDrQsk46nQ',
        thumbnail: 'https://img.youtube.com/vi/UgDrQsk46nQ/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(41, 41),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-04'),
      },    
      // 29번 뉴스
      { 
        title: '"윤총한테 세 번 걸려"‥윤, \'삼부토건 봐주기\' 의혹 점입가경',
        category: Category.POLITICS,
        tags: [tag29_1, tag29_2, tag29_3],
        scripts: [script29_1, script29_2, script29_3, script29_4, script29_5, script29_6],
        announcerGender: Gender.WOMEN,
        channel: Channel.MBC,
        link: 'B2bfgPd9ljk',
        thumbnail: 'https://img.youtube.com/vi/B2bfgPd9ljk/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(25, 12),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-02-25'),
      },    
      // 30번 뉴스
      { 
        title: '물가 치솟는데 월급은?…중산층 실질소득 오히려 줄어',
        category: Category.ECONOMY,
        tags: [tag30_1, tag30_2, tag30_3],
        scripts: [script30_1, script30_2, script30_3, script30_4],
        announcerGender: Gender.MEN,
        channel: Channel.SBS,
        link: 'ze8mQX5Y5kQ',
        thumbnail: 'https://img.youtube.com/vi/ze8mQX5Y5kQ/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(24, 3),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-07'),
      },       
      // 31번 뉴스
      { 
        title: '미 시위대 5600여 명 체포·부상자 속출…전쟁터 방불',
        category: Category.WORLD,
        tags: [tag31_1, tag31_2, tag31_3],
        scripts: [script31_1, script31_2, script31_3, script31_4, script31_5],
        announcerGender: Gender.MEN,
        channel: Channel.ETC,
        link: 'Gy39BunUfX4',
        thumbnail: 'https://img.youtube.com/vi/Gy39BunUfX4/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(34, 7),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2020-06-03'),
      },    
      // 32번 뉴스
      { 
        title: '외부 충격도 없는데 가라앉는 경제…무엇이 문제일까',
        category: Category.ECONOMY,
        tags: [tag32_1, tag32_2, tag32_3],
        scripts: [script32_1, script32_2, script32_3],
        announcerGender: Gender.MEN,
        channel: Channel.SBS,
        link: 'PwXCLeIzv5A',
        thumbnail: 'https://img.youtube.com/vi/PwXCLeIzv5A/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(21, 7),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2019-10-24'),
      },        
      // 33번 뉴스
      { 
        title: '마르코스·이멜다 아들 ‘봉봉 마르코스’, 필리핀 대권 유력',
        category: Category.WORLD,
        tags: [tag33_1, tag33_2, tag33_3],
        scripts: [script33_1, script33_2, script33_3, script33_4],
        announcerGender: Gender.WOMEN,
        channel: Channel.KBS,
        link: 'M6wpIFo_yBI',
        thumbnail: 'https://img.youtube.com/vi/M6wpIFo_yBI/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(22, 81),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-02-20'),
      },      
      // 34번 뉴스
      { 
        title: '완도 실종 일가족 ‘사인 불명’…정밀 검사 의뢰',
        category: Category.SOCIETY,
        tags: [tag34_1, tag34_2, tag34_3],
        scripts: [script34_1, script34_2, script34_3],
        announcerGender: Gender.WOMEN,
        channel: Channel.KBS,
        link: 'ygpfA2W6L5s',
        thumbnail: 'https://img.youtube.com/vi/ygpfA2W6L5s/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(29, 0),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-06-30'),
      },      
      // 35번 뉴스
      { 
        title: '허준이 교수 \'수학계 노벨상\' 필즈상 한국계 최초 수상',
        category: Category.SOCIETY,
        tags: [tag35_1, tag35_2, tag35_3],
        scripts: [script35_1, script35_2, script35_3, script35_4, script35_5],
        announcerGender: Gender.WOMEN,
        channel: Channel.MBC,
        link: 'vRRGRSRFUXQ',
        thumbnail: 'https://img.youtube.com/vi/vRRGRSRFUXQ/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(25, 49),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-05'),
      },                  
      // 36번 뉴스
      { 
        title: '\'오징어 게임\' 오영수, 골든글로브 남우조연상 수상',
        category: Category.ENTERTAINMENT,
        tags: [tag36_1, tag36_2, tag36_3],
        scripts: [script36_1, script36_2, script36_3, script36_4],
        announcerGender: Gender.MEN,
        channel: Channel.SBS,
        link: 'V3B6JTh7uoQ',
        thumbnail: 'https://img.youtube.com/vi/V3B6JTh7uoQ/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(30, 0),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-01-10'),
      },  
      // 37번 뉴스
      { 
        title: '부가가치세 면제하면 커피값 내릴까?',
        category: Category.ECONOMY,
        tags: [tag37_1, tag37_2, tag37_3],
        scripts: [script37_1, script37_2, script37_3, script37_4, script37_5, script37_6, script37_7],
        announcerGender: Gender.WOMEN,
        channel: Channel.MBC,
        link: '90eAX6cEyPs',
        thumbnail: 'https://img.youtube.com/vi/90eAX6cEyPs/hqdefault.jpg',
        startTime: new Time(10, 33),
        endTime: new Time(65, 34),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-05'),
      },      
      // 38번 뉴스
      { 
        title: '신차 발표 8일 앞두고‥두 아이의 아빠, 현대차 디자이너의 죽음',
        category: Category.SOCIETY,
        tags: [tag38_1, tag38_2, tag38_3],
        scripts: [script38_1, script38_2, script38_3, script38_4, script38_5],
        announcerGender: Gender.MEN,
        channel: Channel.MBC,
        link: 'yZvyeH3GPRA',
        thumbnail: 'https://img.youtube.com/vi/yZvyeH3GPRA/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(31, 43),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-01-11'),
      },   
       // 39번 뉴스
      { 
        title: '통일부 “북송 잘못된 부분 있어”…자필 귀순의향서 논란',
        category: Category.SOCIETY,
        tags: [tag39_1, tag39_2, tag39_3],
        scripts: [script39_1, script39_2, script39_3, script39_4],
        announcerGender: Gender.WOMEN,
        channel: Channel.KBS,
        link: 'umVXmyNfkr0',
        thumbnail: 'https://img.youtube.com/vi/umVXmyNfkr0/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(24, 9),
        suitability: Suitability.MEDIUM,
        isEmbeddable: true,
        reportDate: new Date('2022-07-11'),
      }, 
      // 40번 뉴스
      { 
        title: '다이빙 시켜 남편 살해‥아내·공범 공개수배',
        category: Category.SOCIETY,
        tags: [tag40_1, tag40_2, tag40_3],
        scripts: [script40_1, script40_2, script40_3, script40_4, script40_5],
        announcerGender: Gender.WOMEN,
        channel: Channel.MBC,
        link: 's5DQBY9dMd4',
        thumbnail: 'https://img.youtube.com/vi/s5DQBY9dMd4/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(26, 19),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-03-30'),
      },        
      // 41번 뉴스
      { 
        title: '\'국가부도\' 스리랑카 대통령 결국 사임‥\'도미노\' 우려',
        category: Category.SOCIETY,
        tags: [tag41_1, tag41_2, tag41_3],
        scripts: [script41_1, script41_2, script41_3, script41_4, script41_5],
        announcerGender: Gender.WOMEN,
        channel: Channel.MBC,
        link: '0pu4Se9jdBU',
        thumbnail: 'https://img.youtube.com/vi/0pu4Se9jdBU/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(25, 10),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-10'),
      },  
      // 42번 뉴스
      { 
        title: '부모보다 가난한 첫 세대…“잘 배웠지만, 희망 없어”',
        category: Category.POLITICS,
        tags: [tag42_1, tag42_2, tag42_3],
        scripts: [script42_1, script42_2, script42_3, script42_4, script42_5],
        announcerGender: Gender.WOMEN,
        channel: Channel.KBS,
        link: 'hJ0B64QzRFA',
        thumbnail: 'https://img.youtube.com/vi/hJ0B64QzRFA/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(46, 24),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2021-11-30'),
      },   
      // 43번 뉴스
      { 
        title: '방탄소년단, 아시아 최초 AMA 3관왕…그래미만 남았다',
        category: Category.ENTERTAINMENT,
        tags: [tag43_1, tag43_2, tag43_3],
        scripts: [script43_1, script43_2, script43_3],
        announcerGender: Gender.WOMEN,
        channel: Channel.SBS,
        link: 'zrZCIEpLqOA',
        thumbnail: 'https://img.youtube.com/vi/zrZCIEpLqOA/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(21, 4),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2021-11-22'),
      },    
      // 44번 뉴스
      { 
        title: '빅뱅 승리, \'성매매 알선\' 징역 3년…법정 구속',
        category: Category.ENTERTAINMENT,
        tags: [tag44_1, tag44_2, tag44_3],
        scripts: [script44_1, script44_2, script44_3, script44_4],
        announcerGender: Gender.WOMEN,
        channel: Channel.MBC,
        link: 'Frq3s4KhgF4',
        thumbnail: 'https://img.youtube.com/vi/Frq3s4KhgF4/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(47, 14),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2021-08-12'),
      },        
      // 45번 뉴스
      { 
        title: '아이돌학교도 투표 조작 정황…제작진 2명 구속영장',
        category: Category.ENTERTAINMENT,
        tags: [tag45_1, tag45_2, tag45_3],
        scripts: [script45_1, script45_2, script45_3],
        announcerGender: Gender.MEN,
        channel: Channel.SBS,
        link: '1xTirJm-CVM',
        thumbnail: 'https://img.youtube.com/vi/1xTirJm-CVM/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(20, 2),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2020-02-14'),
      },   
      // 46번 뉴스
      { 
        title: '"권도형 인생 끝, 도망 못 가"…비밀 모임 만들어 추적',
        category: Category.SOCIETY,
        tags: [tag46_1, tag46_2, tag46_3],
        scripts: [script46_1, script46_2, script46_3],
        announcerGender: Gender.MEN,
        channel: Channel.SBS,
        link: 'fXaU9mwG5Bg',
        thumbnail: 'https://img.youtube.com/vi/fXaU9mwG5Bg/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(21, 33),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-07-08'),
      },
      // 47번 뉴스            
      { 
        title: '바이든 한국 왔을 때 \'도발 없었던\' 북한, 이유 있었다',
        category: Category.SOCIETY,
        tags: [tag47_1, tag47_2, tag47_3],
        scripts: [script47_1, script47_2, script47_3],
        announcerGender: Gender.MEN,
        channel: Channel.SBS,
        link: 'AMFsyoRlShM',
        thumbnail: 'https://img.youtube.com/vi/AMFsyoRlShM/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(22, 0),
        suitability: Suitability.HIGH,
        isEmbeddable: true,
        reportDate: new Date('2022-05-23'),
      },       
      // 48번 뉴스            
      { 
        title: '\'스쳐도 실격\' 현실로‥ 도 넘은 편파 판정 "제소"',
        category: Category.UNSPECIFIED,
        tags: [tag48_1, tag48_2, tag48_3],
        scripts: [script48_1, script48_2, script48_3, script48_4, script48_5],
        announcerGender: Gender.MEN,
        channel: Channel.MBC,
        link: 'OCEd79FBPz44',
        thumbnail: 'https://img.youtube.com/vi/OCEd79FBPz4/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(39, 16),
        suitability: Suitability.UNSPECIFIED,
        isEmbeddable: true,
        reportDate: new Date('2022-02-08'),
      },  
      // 49번 뉴스            
      { 
        title: '40억 농협 횡령사건 \'반전\'...경찰, 복권방 압수수색',
        category: Category.SOCIETY,
        tags: [tag49_1, tag49_2, tag49_3],
        scripts: [script49_1, script49_2, script49_3, script49_4, script49_5],
        announcerGender: Gender.WOMEN,
        channel: Channel.ETC,
        link: 'qNyYtkg37JI',
        thumbnail: 'https://img.youtube.com/vi/qNyYtkg37JI/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(27, 59),
        suitability: Suitability.UNSPECIFIED,
        isEmbeddable: true,
        reportDate: new Date('2021-08-23'),
      },    
      // 50번 뉴스            
      { 
        title: '연세대 청소 노동자 소송 논란 ‘확산’…학교는 ‘묵묵부답’',
        category: Category.SOCIETY,
        tags: [tag50_1, tag50_2, tag50_3],
        scripts: [script50_1, script50_2, script50_3, script50_4],
        announcerGender: Gender.MEN,
        channel: Channel.KBS,
        link: '0wfYtl3Ao24',
        thumbnail: 'https://img.youtube.com/vi/0wfYtl3Ao24/hqdefault.jpg',
        startTime: new Time(0, 0),
        endTime: new Time(22, 75),
        suitability: Suitability.UNSPECIFIED,
        isEmbeddable: true,
        reportDate: new Date('2022-07-06'),
      },                                                                                                                                                                                                           
    ];

    const news = newsRepository.create(newsInfo);
    const news2 = await newsRepository.save(news);
    
    for (let i in news2) {
      // console.log(i);
      const news3 = await newsRepository.find({
        relations: ['tags'],
        where: {
          id: news2[i].id,
        },
      });
      console.log(news3);
    }
};
// insertNewsData();
// 
